import React from "react";
import TabsLogin from "@/components/myComponents/TabsLogin";
import ImageSection from "@/components/myComponents/ImageSection";

function Login() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-4xl items-center justify-center gap-8 md:flex-row flex-col">
        <TabsLogin />
        <ImageSection />
      </div>
    </div>
  );
}

export default Login;
