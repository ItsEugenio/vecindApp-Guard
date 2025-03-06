import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import ModalVerifyCode from "./ModalVerifyCode";

function CardVerifyCode() {
  const [code, setCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleVerify = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verificación OTP</CardTitle>
          <CardDescription>
            Ingresa el código de verificación que recibiste
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-4">
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            disabled={code.length < 6 ? true : false}
            className="w-full"
            onClick={handleVerify}
          >
            Verificar código
          </Button>
        </CardFooter>
      </Card>
      <ModalVerifyCode isOpen={isOpen} setIsOpen={setIsOpen} code={code} />
    </>
  );
}

export default CardVerifyCode;
