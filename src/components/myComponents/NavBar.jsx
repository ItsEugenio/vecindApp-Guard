import React from "react";
import img from "../../assets/iconVA1.png";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../ThemeProvider";

function NavBar() {
  const logo = img;
  const { theme, toggleTheme } = useTheme();

  const logOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("neighborhoodCode");
    localStorage.removeItem("neighborhoodId");
    window.location.assign("/"); 
  };

  return (
    <nav className="border-b bg-background px-4 py-3 flex items-center">
      <div className="flex items-center gap-2 justify-between w-full">
        <div className="flex items-center">
          <img src={logo} alt="logo" width="70px" />
          <h1 className="text-xl font-semibold">VecindApp Guard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button variant="blue" onClick={() => logOut()}>Cerrar sesion</Button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
