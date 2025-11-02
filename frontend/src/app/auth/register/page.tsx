"use client";

import Image from "next/image";
import banner from "../../../../public/images/picslogin.jpg";
import logo from "../../../../public/images/logo1.jpg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { protectSignUpAction } from "@/actions/auth";
import { useToast } from "@/hooks/use-toast";

const Registerpage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const checkFirstLevelOfValidation = await protectSignUpAction(
      formData.email
    );
    if (!checkFirstLevelOfValidation.success) {
      toast({
        title: checkFirstLevelOfValidation.error,
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <div className="min-h-screen bg-[#fff6f4] flex">
      <div className="hidden lg:block w-1/2 bg-[#ffede1] relative">
        <Image
          src={banner}
          alt="Register"
          fill
          style={{
            objectFit: "contain",
            objectPosition: "left center",
          }}
          priority
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-16 justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="flex justify-center">
            <Image src={logo} width={200} height={50} alt="Logo" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                className="bg-[#ffede1]"
                value={formData.name}
                onChange={handleOnChange}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="bg-[#ffede1]"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleOnChange}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                className="bg-[#ffede1]"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleOnChange}
              />
            </div>

            {/* Animated Button */}
            <Button
              type="submit"
              className="w-full bg-black text-white relative overflow-hidden group transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-purple-500/30 transform hover:scale-[1.02] border-2 border-transparent hover:border-purple-500/50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                CREATE ACCOUNT
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </span>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            </Button>

            <p className="text-center text-[#3f3d56] text-sm">
              Already have an account{" "}
              <Link
                href={"/auth/login"}
                className="text-[#000] hover:underline font-bold"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;
