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
  <button className="btn btn-info m-2" onClick={() => navigate("/")}>
    Inicio
  </button>
  <div className="w-100 h-100 mt-5">
    {auth && (
      <div className="card p-5 mx-auto">
        <h3 className="text-center mb-4">Mi perfil</h3>
        <table className="table table-striped table-hover">
          <tbody>
            <tr>
              <th>Nombre: </th>
              <td>{inf[0].nombre}</td>
            </tr>
            <tr>
              <th>Apellidos: </th>
              <td>
                {inf[0].apepat} {inf[0].apemat}
              </td>
            </tr>
            <tr>
              <th>Edad: </th>
              <td>{inf[0].edad}</td>
            </tr>
            <tr>
              <th>Correo: </th>
              <td>{inf[0].correo}</td>
            </tr>
            <tr>
              <th>Telefono: </th>
              <td>{inf[0].telefono}</td>
            </tr>
          </tbody>
        </table>
        <div className="text-center mt-4">
          <button
            className="btn btn-warning mx-2"
            onClick={() => navigate("/PuestosXVendedor/" + inf[0]._id)}
          >
            Mis restaurantes
          </button>
          <button
            className="btn btn-warning mx-2"
            onClick={() => navigate("/editPerfil/")}
          >
            Editar perfil
          </button>
        </div>
      </div>
    )}
    <div className="d-flex flex-column w-25 mx-auto mt-5">
      {!auth && (
        <>
          {" "}
          <button onClick={logear} className="btn btn-success mb-2">
            Iniciar sesión
          </button>
          <button onClick={crearCuenta} className="btn btn-warning mb-2">
            Registrarse
          </button>
        </>
      )}
      {auth && (
        <button onClick={salirSession} className="btn btn-danger mb-2">
          Salir de sesión
        </button>
      )}
    </div>
  </div>
</>
  );
};
