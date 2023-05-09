import React, { useEffect, useState } from "react";
import Axios, { host } from "../../services/Axios";
import { Link, useNavigate } from "react-router-dom";
import Back from "../../layouts/Back";
export const PuestosExp = () => {
  const [puestos, setPuestos] = useState([]);
  useEffect(() => {
    consultar();
  }, []);

  const consultar = async () => {
    try {
      const data = await Axios.get("/puestos");
      console.log(data);
      setPuestos(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const auth = localStorage.getItem("session");

  const navigate = useNavigate();
  return (
<>
  <Back />
  <div>
    <h2></h2>
  </div>
  <ul style={{ listStyleType: "none", paddingLeft: 20, paddingRight: 20 }}>
    {puestos.map((el) => (
      <li key={el._id} className="d-flex justify-content-between align-items-center my-4">
        <div className="d-flex align-items-center">
          <div style={{ width: "250px", height: "250px" }}>
            <div id={`carouselExampleControls-${el._id}`} className="carousel slide" style={{ height: "100%" }}>
              <div className="carousel-inner">
                {el.imagenes.map((img, i) => (
                  <div key={`${el._id}-${i}`} className={`carousel-item ${i === 0 && "active"}`}>
                    <img src={`${host}/${img}`} style={{ width: "250px", height: "250px", objectFit: "cover" }} className="d-block w-100" alt="..." />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleControls-${el._id}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleControls-${el._id}`} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="mx-4">
            <p className="fw-bold">{el.nombre}</p>
          </div>
        </div>
        <button className="btn btn-warning" onClick={() => navigate(`/Puestos/${el._id}`)}>Revisar</button>
      </li>
    ))}
  </ul>
  {auth && <Link to={"/InserPuestos"}>Añadir puesto</Link>}
</>
  );
};
