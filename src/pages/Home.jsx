import React, { useState, useEffect } from "react";
import CardVerifyCode from "@/components/myComponents/CardVerifyCode";
import CardNotify from "@/components/myComponents/CardNotify";
import NavBar from "@/components/myComponents/NavBar";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const isAuthenticated = token !== null;
    setAuthenticated(isAuthenticated);
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <>
      {authenticated && (
        <>
          <main className="min-h-screen flex flex-col">
            <NavBar />
            <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4">
              <CardVerifyCode />
              <CardNotify />
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default Home;
