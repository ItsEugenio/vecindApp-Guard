import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BuildingApartment } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import CardSkeleton from "./CardSkeleton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { navigateToHome } from "@/utils/navigateToHome";
import { useNavigateToHome } from "@/hooks/useNavigateToHome";

function CardNeighborhood({ neighborhoods }) {
  // const guard =  (code,id,name) =>{
  //   localStorage.setItem("neighborhoodCode", code);
  //   localStorage.setItem("neighborhoodId",id)
  //   localStorage.setItem("neighborhoodName",name)
  //     window.location.assign("/Home");
  // }
  const navigateToHome = useNavigateToHome();
  return (
    <>
      {neighborhoods.length === 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <>
          {neighborhoods.map((vecindad) => (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  Información General
                </CardTitle>
                <BuildingApartment
                  size={48}
                  className="text-muted-foreground"
                />
              </CardHeader>
              <CardContent>
                <div>
                  <div>
                    <span>Nombre:</span>
                    {vecindad.nombre}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div>
                  <Button
                    onClick={() =>
                      navigateToHome(
                        vecindad.codigo,
                        vecindad.id,
                        vecindad.nombre
                      )
                    }
                  >
                    Ingresar
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </>
      )}
    </>
  );
}

export default CardNeighborhood;
