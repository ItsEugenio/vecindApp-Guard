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
  const { neighborhoods, getNeighborhoods } = useNeighborhood();
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

  const logOut = async () => {
    window.location.assign("/"); 
  };

  return (
    <>
      {authenticated && (
        
          <main className="min-h-screen flex flex-col p-8">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
              Selecciona el residencial
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <CardNeighborhood neighborhoods={neighborhoods} />
            </div>
            <CardAddNeighborhood />
            <div className="flex w-full justify-center mt-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Cerrar sesión
          </CardTitle>
    
        </CardHeader>
        <CardContent className="space-y-4">

        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={logOut}
            variant="blue"
          >
            Cerrar sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
          </main>
      
      )}
    </>
  );
}
