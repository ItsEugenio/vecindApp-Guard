import React, { useState, useEffect } from "react";
import CardVerifyCode from "@/components/myComponents/CardVerifyCode";
import CardNotify from "@/components/myComponents/CardNotify";
import NavBar from "@/components/myComponents/NavBar";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import axios from "axios";
import CardEntry from "@/components/myComponents/CardEntry";

function Home() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const api = "https://vecindappback-production.up.railway.app";
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("neighborhoodName");
  const id = localStorage.getItem("neighborhoodId")

  

  useEffect(() => {
    const isAuthenticated = token !== null;
    setAuthenticated(isAuthenticated);
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate, token]);

  const registerEntry = async () =>{
    try {
      const response = await axios.post(`${api}/security-guards/guard/entry`, {
        neighborhoodId:id
      },{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Entrada registrada")
     // console.log('res',response)
      
    } catch (error) {
      console.log('error',error)
    }
  }

  

  return (
    <>
      {authenticated && (
        <>
          <main className="min-h-screen flex flex-col">
            <NavBar />
            <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Vecindario : {name}
              </h3>

              <CardVerifyCode />
              <CardNotify />
              <CardEntry />
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default Home;
