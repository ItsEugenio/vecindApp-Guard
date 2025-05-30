import { useAuth } from "@/context/Auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";

function TabsLogin() {
  const {
    loginData,
    registerData,
    showPassword,
    tab,
    setTab,
    togglePasswordVisibility,
    handleChange,
    handleLogin,
    handleRegister,
  } = useAuth();

  const disabled = false;

  return (
    <Tabs defaultValue="account" value={tab} onValueChange={setTab} className="w-[380px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Inicio de sesión</TabsTrigger>
        <TabsTrigger value="password">Registrarse</TabsTrigger>
      </TabsList>

      {/* LOGIN */}
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Inicio de sesión</CardTitle>
            <CardDescription>Ingresa tus credenciales para iniciar sesión</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="correo@gmail.com"
                required
                value={loginData.email}
                onChange={(e) => handleChange(e, "login")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginData.password}
                  onChange={(e) => handleChange(e, "login")}
                  disabled={disabled}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                  onClick={togglePasswordVisibility}
                  disabled={disabled}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleLogin}>
              Login
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* REGISTER */}
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Registrarse</CardTitle>
            <CardDescription>Crea una nueva cuenta.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email-register">Email</Label>
              <Input
                id="email-register"
                name="email"
                type="email"
                placeholder="correo@gmail.com"
                required
                value={registerData.email}
                onChange={(e) => handleChange(e, "register")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password-register">Password</Label>
              <div className="relative">
                <Input
                  id="password-register"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={registerData.password}
                  onChange={(e) => handleChange(e, "register")}
                  disabled={disabled}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                  onClick={togglePasswordVisibility}
                  disabled={disabled}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleRegister}>
              Register
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default TabsLogin;
