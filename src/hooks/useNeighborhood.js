import { useState, useEffect } from "react";
import axios from "axios";

export function useNeighborhood() {
  const api = "https://vecindapp.up.railway.app";
  const token = localStorage.getItem("token");
  const [neighborhoods, setNeighborhoods] = useState([]);

  const getNeighborhoods = async () => {
    try {
      const response = await axios.get(`${api}/security-guards/neighborhood`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setNeighborhoods(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  

  return {neighborhoods, getNeighborhoods}
}
