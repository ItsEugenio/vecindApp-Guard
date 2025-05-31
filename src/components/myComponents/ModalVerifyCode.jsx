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
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import axios from "axios";
import { UserCheck, UserX, ServerCrash, FileJson2 } from "lucide-react";
import { Label } from "@/components/ui/label";

function ModalVerifyCode({ isOpen, setIsOpen, code }) {
  const api = "https://vecindapp.up.railway.app";
  const token = localStorage.getItem("token");
  const [statusCode, setStatusCode] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [name, setName] = useState("");
  const [placaCarro, setPlacaCarro] = useState("");
  const [idResidencia, setIdResidencia] = useState("");
  const [residencialID, setResidencialID] = useState("")

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
      setOpenConfirm(true);
      setResidencialID(response.data.residentId)
     // console.log('resss',response.data)
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

  const registerEntry = async () => {
    // console.log("name", name);
    // console.log("placaCarro", placaCarro);
    // console.log("residencial", residencialID);

    try {
      const response = await axios.post(
        `${api}/security-guards/log`,
        {
          nombre: name,
          placaCarro:placaCarro,
          idResidencia:residencialID
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Datos cargados", {
        description: "Puede pasar",
        action: {
          label: "Hecho",
        },
      });
      setStatusCode("")
     // console.log('resss',response.data)
    } catch (error) {
      console.log('error',error)
    }
  };

  return (
    <>
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
            variant="blue"
              onClick={() => {
                setIsOpen(false);
                setStatusCode("");
               
              }}
            >
              Cerrar
            </Button>
            <Button variant="blue" onClick={verifyCode}>Verificar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent className="sm:max-w-[400px] ">
          <DialogHeader>
            <DialogTitle>Codigo valido</DialogTitle>
            <DialogDescription>
              Ingresa los datos del visitante
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-center">
                Nombre
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Nombre del visitante"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div>
              <Label htmlFor="placaCarro" className="text-center mb-2">
                Placa deCarro
              </Label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={7}
                  value={placaCarro}
                  onChange={setPlacaCarro}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={5} />
                    <InputOTPSlot index={6} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>


          </div>

          <DialogFooter className="flex justify-center">
            <Button onClick={() => registerEntry()} variant="success">
              Guardar datos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalVerifyCode;
