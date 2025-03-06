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
import { Separator } from "@/components/ui/separator"

export default function RegisterGuard() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const api = "https://vecindappback-production.up.railway.app";
  const token = localStorage.getItem("token");
  const [codeNeighborhood, setCodeNeighborhood] = useState("");

  useEffect(() => {
    const isAuthenticated = token !== null;
    setAuthenticated(isAuthenticated);
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate, token]);

  const verifyCode = async () => {
    try {
      const response = await axios.post(
        `${api}/security-guards/register`,
        {
          neighborhoodCode: code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("neighborhoodId", code);
      window.location.assign("/Home");
    } catch (error) {
      if (error.response.status === 404) {
        responseBad();
      } else if (error.response.status === 409) {
        conflic();
      } else {
        errorResponse();
      }
    }
  };

  const changeCodeNeighborhood = () =>{
    localStorage.setItem("neighborhoodId", codeNeighborhood);
    window.location.assign("/Home");

  }

  const responseBad = () => {
    toast.error("Codigo no encontrado", {
      description: "Vuelva e intentarlo con otro codigo",
      action: {
        label: "Hecho",
      },
    });
  };

  const errorResponse = () => {
    toast.error("Ocurrio un error al verificar", {
      description: "Compruebe su conexion a internte",
      action: {
        label: "Hecho",
      },
    });
  };

  const conflic = () => {
    toast.error("Este codigo ya fue asignado a un guardia", {
      description: "Vuelva e intentarlo con otro codigo",
      action: {
        label: "Hecho",
      },
    });
  };

  return (
    <>
      {authenticated && (
        <>
          <div className="flex-1 flex flex-col min-h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">
                  Registrarse como guardia a un vecindario
                </CardTitle>
                <CardDescription className="text-center">
                  Ingresa el código de 5 dígitos para registrarte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <InputOTP maxLength={5} value={code} onChange={setCode}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  disabled={code.length < 5 ? true : false}
                  onClick={verifyCode}
                >
                  verificar
                </Button>
              </CardFooter>
            </Card>
            <Separator className="my-4" />
            <Card className="w-full max-w-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">
                  Ingresa el codigo si ya te registraste a un vecindario
                </CardTitle>
                <CardDescription className="text-center">
                  Ingresa el código de 5 dígitos para acceder al vecindario
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <InputOTP maxLength={5} value={codeNeighborhood} onChange={setCodeNeighborhood}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  disabled={codeNeighborhood.length < 5 ? true : false}
                  onClick={changeCodeNeighborhood}
                >
                  verificar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
