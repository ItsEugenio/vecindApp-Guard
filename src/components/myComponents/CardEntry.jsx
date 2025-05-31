import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function CardEntry({ neighborhoodId }) {
  const api = "https://vecindapp.up.railway.app";
  const token = localStorage.getItem("token");

  // const id = localStorage.getItem("neighborhoodId");

  const entrada = async () => {
    try {
      const response = await axios.post(
        `${api}/security-guards/guard/entry`,
        {
          neighborhoodId: neighborhoodId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Entrada registrada");
      //console.log('res',response)
    } catch (error) {
      console.log("error", error);
    }
  };

  const salida = async () => {
    try {
      const response = await axios.post(
        `${api}/security-guards/guard/exit`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Salida registrada");
      //console.log('res salida')
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">
          Registra tu acceso y salida como guardia
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <div className="flex w-full justify-center">
          <Button onClick={() => entrada()} variant="blue" className="m-2">
            Entrada
          </Button>
          <Button onClick={() => salida()} variant="blue" className="m-2">
            Salida
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CardEntry;
