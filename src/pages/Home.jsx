// Home.jsx
import React, { useState, useEffect } from "react";
import CardVerifyCode from "@/components/myComponents/CardVerifyCode";
import CardNotify from "@/components/myComponents/CardNotify";
import NavBar from "@/components/myComponents/NavBar";
import { useNavigate, useLocation } from "react-router";
import CardEntry from "@/components/myComponents/CardEntry";
import { ArrowLeft } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  const token = localStorage.getItem("token");

  const infoState = location?.state?.infoState;

  useEffect(() => {
    const isAuthenticated = token !== null;
    setAuthenticated(isAuthenticated);
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    if (!infoState) {
      navigate("/register");
    }
  }, [infoState, navigate]);

  const name = infoState?.name;
  const neighborhoodId = infoState?.id;
  
  const navigateBack = () => {
    navigate("/register");
  };

  return (
    authenticated && infoState && (
      <main className="min-h-screen flex flex-col">
        <NavBar />
        <div className="ml-8 pt-4">
          <Button variant="ghost" className="pl-0" onClick={navigateBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Vecindario : {name}
          </h3>
      
          <CardVerifyCode />
          <CardNotify />
          <CardEntry neighborhoodId={neighborhoodId}/>
        </div>
      </main>
    )
  );
}

export default Home;
