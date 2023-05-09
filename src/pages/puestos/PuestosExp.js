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
        <h2>Puestos disponibles</h2>
      </div>
      <div className="d-flex justify-content-evenly flex-wrap p-4 gap-2">
        {puestos.map((el) => (
          <div className="">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              style={{ width: "250px", height: "250px" }}
            >
              <div className="carousel-inner">
                {el.imagenes.map((img) => (
                  <div className="carousel-item active">
                    <img
                      src={`${host}/${img}`}
                      style={{
                        width: "250px",
                        height: "250px",
                        objectFit: "cover",
                      }}
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div>
              <p className="text-center fw-bold">{el.nombre}</p>
            </div>
            <div>
              <button
                className="btn btn-warning mx-auto d-block"
                onClick={() => navigate(`/Puestos/${el._id}`)}
              >
                Revisar
              </button>
            </div>
          </div>
        ))}
      </div>
      {auth && <Link to={"/InserPuestos"}>Añadir puesto</Link>}
    </>
  );
};
