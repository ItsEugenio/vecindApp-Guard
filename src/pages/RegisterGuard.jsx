import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router";
import CardNeighborhood from "@/components/myComponents/CardNeighborhood";
import CardAddNeighborhood from "@/components/myComponents/CardAddNeighborhood";
import { useNeighborhood } from "@/hooks/useNeighborhood";

export default function RegisterGuard() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const { neighborhoods, getNeighborhoods} = useNeighborhood()
  const token = localStorage.getItem("token");

  useEffect(() => {
    const isAuthenticated = token !== null;
    setAuthenticated(isAuthenticated);
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    getNeighborhoods();
  }, []);

  

  return (
    <>
      {authenticated && (
        <>
          <div className="flex-1 flex flex-col min-h-screen items-center justify-center bg-gray-50 p-4">
            <main className="min-h-screen flex flex-col">
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
                Selecciona el residencial
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <CardNeighborhood neighborhoods={neighborhoods} />
              </div>
              <CardAddNeighborhood />
              
            </main>
          </div>
        </>
      )}
    </>
  );
}
