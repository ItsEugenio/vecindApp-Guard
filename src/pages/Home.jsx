// Home.jsx
import React, { useState, useEffect } from "react";
import CardVerifyCode from "@/components/myComponents/CardVerifyCode";
import CardNotify from "@/components/myComponents/CardNotify";
import NavBar from "@/components/myComponents/NavBar";
import { useNavigate, useLocation } from "react-router";
import CardEntry from "@/components/myComponents/CardEntry";

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
  

  return (
    authenticated && infoState && (
      <main className="min-h-screen flex flex-col">
        <NavBar />
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
