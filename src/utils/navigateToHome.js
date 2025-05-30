import { useNavigate } from "react-router";

export function navigateToHome(id,code,name){
    const navigate = useNavigate();
    navigate("/Home", state={id,code,name})
}