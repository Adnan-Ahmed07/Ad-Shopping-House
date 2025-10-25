param(
    [switch]$Migrate
)

# start-database.ps1
# Usage:
#  .\start-database.ps1          # starts Docker Desktop (if needed) and brings up docker compose stack
#  .\start-database.ps1 -Migrate # also runs prisma migrate deploy and prisma generate in backend

function Start-DockerDesktopIfNeeded {
    if (-not (Get-Process -Name 'Docker Desktop' -ErrorAction SilentlyContinue)) {
        Write-Host 'Starting Docker Desktop...'
        $exe = 'C:\Program Files\Docker\Docker\Docker Desktop.exe'
        if (Test-Path $exe) {
            Start-Process -FilePath $exe -ErrorAction SilentlyContinue
        } else {
            Write-Warning "Docker Desktop not found at $exe. Make sure Docker is installed and start it manually."
        }
        Start-Sleep -Seconds 5
    } else {
        Write-Host 'Docker Desktop process already running.'
    }
}

function Wait-For-DockerEngine([int]$timeoutSec = 120) {
    Write-Host "Waiting up to $timeoutSec seconds for Docker engine to become available..."
    $start = Get-Date
    while (((Get-Date) - $start).TotalSeconds -lt $timeoutSec) {
        try {
            docker info > $null 2>$null
            Write-Host 'Docker engine is ready.'; return $true
        } catch {
            Write-Host 'Docker engine not ready yet...'; Start-Sleep -Seconds 3
        }
    }
    Write-Error 'Docker engine did not become ready within timeout.'; return $false
}

function Compose-Up {
    Write-Host 'Bringing up docker compose stack (detached)...'
    docker compose up --build -d
}

function Wait-For-Postgres([int]$timeoutSec = 120) {
    # find the postgres container
    $start = Get-Date
    while (((Get-Date) - $start).TotalSeconds -lt $timeoutSec) {
        $cont = docker ps --filter "name=postgres" --format "{{.Names}}" | Select-Object -First 1
        if (-not $cont) { Write-Host 'Postgres container not found yet...'; Start-Sleep -Seconds 2; continue }

        # prefer docker inspect health if available
        try {
            $health = docker inspect --format '{{.State.Health.Status}}' $cont 2>$null
            if ($health) {
                Write-Host "Container $cont health: $health"
                if ($health -eq 'healthy') { return $true }
            }
        } catch { }

        # fallback to pg_isready inside container
        try {
            $res = docker exec $cont pg_isready -U adnan -d adshoppinghouse 2>$null
            if ($res -and $res -match 'accepting connections') { Write-Host 'Postgres is accepting connections'; return $true }
        } catch { }

        Start-Sleep -Seconds 3
    }
    Write-Error 'Postgres did not become ready within timeout.'; return $false
}

function Run-Prisma-Deploy {
    Write-Host 'Applying migrations (prisma migrate deploy) and generating client...'
    Push-Location backend
    try {
        # Ensure DATABASE_URL is picked from backend/.env automatically by prisma
        npx prisma migrate deploy
        npx prisma generate
    } finally {
        Pop-Location
    }
}

# Main
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $here

Start-DockerDesktopIfNeeded
if (-not (Wait-For-DockerEngine -timeoutSec 120)) { exit 1 }

Compose-Up
if (-not (Wait-For-Postgres -timeoutSec 120)) { exit 1 }

Write-Host 'Database stack is up and Postgres is ready.' -ForegroundColor Green

if ($Migrate) {
    Run-Prisma-Deploy
    Write-Host 'Migrations applied and Prisma client generated.' -ForegroundColor Green
}

Write-Host 'Done.'
