import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import axios from "axios";
import { UserCheck, UserX, ServerCrash, FileJson2 } from "lucide-react";

function ModalVerifyCode({ isOpen, setIsOpen, code }) {
  const api = "https://vecindappback-production.up.railway.app";
  const token = localStorage.getItem("token");
  const [statusCode, setStatusCode] = useState("");

  const verifyCode = async () => {
    try {
      const response = await axios.post(
        `${api}/security-guards/verify-invite/${code}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      responseOk();
    } catch (error) {
      if (error.response.status === 404) {
        responseBad();
      } else {
        errorResponse();
      }
    }
  };

  const responseOk = () => {
    const responseOK = "Acceso correcto";
    setStatusCode(responseOK);
    toast.success("Código de acceso valido", {
      description: "El código de acceso del visitante es valido.",
      action: {
        label: "Hecho",
      },
    });
  };

  const responseBad = () => {
    const responseBad = "Acceso denegado";
    setStatusCode(responseBad);
    toast.error("Código de acceso no valido", {
      description: "El código de acceso del visitante no es valido.",
      action: {
        label: "Hecho",
      },
    });
  };

  const errorResponse = () => {
    const responseBad = "Error";
    setStatusCode(responseBad);
    toast.error("Error al verificar código", {
      description: "Intentalo de nuevo",
      action: {
        label: "Hecho",
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Validar código del Visitante</DialogTitle>
          <DialogDescription>Verificar el código : {code}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-4">
          {statusCode === "Acceso correcto" ? (
            <>
              <div className="flex flex-col items-center">
                <h1>Acceso correcto</h1>
                <UserCheck size={80} color="#007200" />
              </div>
            </>
          ) : statusCode === "Acceso denegado" ? (
            <>
              <div className="flex flex-col items-center">
                <h1>Acceso denegado</h1>
                <UserX size={80} color="#c1121f" />
              </div>
            </>
          ) : statusCode === "" ? (
            <>
              <div className="flex flex-col items-center">
                <h1>Seleccione el boton verificar</h1>
                <FileJson2 size={80} />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <h1>Error</h1>
                <ServerCrash size={80} color="#c1121f" />
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              setIsOpen(false);
              setStatusCode("");
            }}
          >
            Cerrar
          </Button>
          <Button onClick={verifyCode}>Verificar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ModalVerifyCode;
