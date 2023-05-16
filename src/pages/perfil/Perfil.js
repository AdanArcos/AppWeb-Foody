import React from "react";
import { useNavigate } from "react-router-dom";

export const Perfil = () => {
  const auth = localStorage.getItem("session");
  let inf = auth ? JSON.parse(auth) : null;
  const salirSession = () => {
    localStorage.removeItem("session");
    navigate("/");
  };
  const navigate = useNavigate();

  const logear = () => navigate("/Login");

  const crearCuenta = () => navigate("/create");

  return (
    <>
      <button
        style={{
          backgroundColor: "#1877F2",
          color: "white",
          margin: "0.5rem",
          padding: "0.5rem",
          border: "none",
          borderRadius: "0.3rem",
        }}
        onClick={() => navigate("/")}
      >
        Inicio
      </button>
      <div
        style={{
          width: "100%",
          height: "100%",
          marginTop: "5rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {auth && (
          <div
            style={{
              width: "50%",
              padding: "2rem",
              backgroundColor: "white",
              boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
              borderRadius: "0.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>Mi perfil</h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "1rem",
              }}
            >
              <tbody>
                <tr>
                  <th style={{ textAlign: "left" }}>Nombre:</th>
                  <td>{inf[0].nombre}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "left" }}>Apellidos:</th>
                  <td>
                    {inf[0].apepat} {inf[0].apemat}
                  </td>
                </tr>
                <tr>
                  <th style={{ textAlign: "left" }}>Edad:</th>
                  <td>{inf[0].edad}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "left" }}>Correo:</th>
                  <td>{inf[0].correo}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "left" }}>Teléfono:</th>
                  <td>{inf[0].telefono}</td>
                </tr>
              </tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                style={{
                  backgroundColor: "#FFB700",
                  color: "white",
                  margin: "0.5rem",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "0.3rem",
                }}
                onClick={() =>
                  navigate("/PuestosXVendedor/" + inf[0]._id)
                }
              >
                Mis restaurantes
              </button>
              <button
                style={{
                  backgroundColor: "#FFB700",
                  color: "white",
                  margin: "0.5rem",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "0.3rem",
                }}
                onClick={() => navigate("/editPerfil/")}
                >
                Editar perfil
            </button>
            </div>
             </div>
                )}
            <div
                style={{
                display: "flex",
                flexDirection: "column",
                width: "25%",
                marginTop: "5rem",
                alignItems: "center",
                }}
                >
                {!auth && (
            <>
            <button
                style={{
                backgroundColor: "#28A745",
                color: "white",
                marginBottom: "0.5rem",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "0.3rem",
                }}
                onClick={logear}
              >
                Iniciar sesión
                </button>
                <button
                style={{
                backgroundColor: "#FFB700",
                color: "white",
                marginBottom: "0.5rem",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "0.3rem",
                }}
                onClick={crearCuenta}
                >
                Registrarse
                </button>
                </>
                )}
                {auth && (
                <button
                style={{
                backgroundColor: "#DC3545",
                color: "white",
                marginBottom: "0.5rem",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "0.3rem",
                }}
                onClick={salirSession}
                >
                Cerrar Sesión
                </button>
                )}
                </div>
                </div>
                </>
                );
                };
