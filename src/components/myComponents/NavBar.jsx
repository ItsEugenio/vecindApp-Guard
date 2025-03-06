import React from "react";
import img from "../../assets/logovecin.png";
import { Button } from "@/components/ui/button";


function NavBar() {
  const logo = img;
  const logOut = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("neighborhoodId");
    window.location.assign("/")
  }
  return (
    <nav className="border-b bg-background px-4 py-3 flex items-center">
      <div className="flex items-center gap-2 justify-between w-full">
        <div className="flex items-center">
          <img src={logo} alt="logo" width="50px" />
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
