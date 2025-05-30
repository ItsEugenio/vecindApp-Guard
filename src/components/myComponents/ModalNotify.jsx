import React, { useState,useEffect } from "react";
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
import { BellRing, TicketX, ServerCrash, Bell } from "lucide-react";

function ModalNotify({ isOpen, setIsOpen, message }) {
  const api = "https://vecindapp.up.railway.app";
  const token = localStorage.getItem("token");
  const neighborhoodCode = localStorage.getItem("neighborhoodCode");
  const [statusCode, setStatusCode] = useState("");

  const notifyAll = async () => {
    //console.log("message", neighborhoodCode)
    try {
      const response = await axios.post(
        `${api}/security-guards/notify-neighborhood/${neighborhoodCode}`,
        {
          title: "Alerta General",
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      responseOk();
    } catch (error) {
      console.log('eror',error)
      if (error.response.status === 404) {
        responseBad();
      } else {
        errorResponse();
      }
    }
  };

  const responseOk = () => {
    const responseOK = "Notificacion enviada";
    setStatusCode(responseOK);
    toast.success("Notificacion enviada con exito", {
      description: "Vecinos notificados, puede pasar",
      action: {
        label: "Hecho",
      },
    });
  };

  const responseBad = () => {
    const responseBad = "Vecindario no encontrado";
    setStatusCode(responseBad);
    toast.error("Ocurrio un error al enviar la notificacion", {
      description: "Vuelva a intentarlo o cierre sesion",
      action: {
        label: "Hecho",
      },
    });
  };

  const errorResponse = () => {
    const responseBad = "Error";
    setStatusCode(responseBad);
    toast.error("Error al enviar la notificacion", {
      description: "Intentalo de nuevo",
      action: {
        label: "Hecho",
      },
    });
  };

  useEffect(() => {
   setStatusCode("")
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Notificar a vecinos de quien entra</DialogTitle>
          <DialogDescription>
            Mensaje para los vecinos : {message}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-4">
          {statusCode === "Notificacion enviada" ? (
            <>
              <div className="flex flex-col items-center">
                <h1>Notificacion enviada</h1>
                <BellRing size={80} color="#007200" />
              </div>
            </>
          ) : statusCode === "Vecindario no encontrado" ? (
            <>
              <div className="flex flex-col items-center">
                <h1>Vecindario no encontrado, verifique su codigo de vecindario</h1>
                <TicketX size={80} color="#c1121f" />
              </div>
            </>
          ) : statusCode === "" ? (
            <>
              <div className="flex flex-col items-center">
                <h1>Seleccione enviar notificacion</h1>
                <Bell size={80} />
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
            Cancelar
          </Button>
          <Button onClick={notifyAll}>Enviar notificacion</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ModalNotify;
