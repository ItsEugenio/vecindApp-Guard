import { useNavigate } from "react-router";

export function useNavigateToHome() {
  const navigate = useNavigate();

  return (code, id, name) => {
    // localStorage.setItem("neighborhoodCode", code);
    // localStorage.setItem("neighborhoodId", id);
    // localStorage.setItem("neighborhoodName", name);

    navigate("/Home", { state: { infoState: { id, code, name } } });
  };
}