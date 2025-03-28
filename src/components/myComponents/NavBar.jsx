import React from "react";
import img from "../../assets/iconVA1.png";
import { Button } from "@/components/ui/button";
import axios from "axios";

function NavBar() {
  const logo = img;
  const api = "https://vecindappback-production.up.railway.app";
  const token = localStorage.getItem("token");
  const logOut = async () => {
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
      localStorage.removeItem("token");
      localStorage.removeItem("neighborhoodCode");
      localStorage.removeItem("neighborhoodId");
      window.location.assign("/"); 
    } catch (error) {
      console.log('error',error)
    }
 
   
  };
  return (
    <nav className="border-b bg-background px-4 py-3 flex items-center">
      <div className="flex items-center gap-2 justify-between w-full">
        <div className="flex items-center">
          <img src={logo} alt="logo" width="70px" />
          <h1 className="text-xl font-semibold">VecindApp Guard</h1>
        </div>
        <div>
          <Button onClick={logOut}>Cerrar sesion</Button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
