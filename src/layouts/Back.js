import React from "react";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);
  return (
    <button 
      onClick={back} 
      style={{
        backgroundColor: "#ffffff",
        color: "#333333",
        border: "1px solid #333333",
        padding: "10px 15px",
        borderRadius: "5px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
    >
      {""} Regresar
    </button>
  );
};

export default Back;
