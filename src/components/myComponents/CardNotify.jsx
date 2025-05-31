import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner";
import axios from "axios";
import ModalNotify from './ModalNotify'

function CardNotify() {
    const [message, setMessage] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    
    const notify = () =>{
      setIsOpen(true);
    }

    
  
    return (
      <> 
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Visitante sin código</CardTitle>
          <CardDescription>Ingresa el mensaje para notificar quien esta entrando al residencial</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              {/* <Label htmlFor="email">Correo electrónico</Label>
              <Input
                disabled
                type="text"
                placeholder="Alerta General"
              /> */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mensaje</Label>
              <Input
                id="message"
                type="text"
                placeholder="Ejemplo: Entra provedor de gas"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={message ? false : true} variant="blue"  className="w-full" onClick={notify} >Enviar mensaje</Button>
        </CardFooter>
      </Card>
      <ModalNotify isOpen={isOpen} setIsOpen={setIsOpen} message={message} />
      </>
    )
}

export default CardNotify
