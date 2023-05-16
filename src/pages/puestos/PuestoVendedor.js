import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios, { host } from "../../services/Axios";

export const PuestoVendedor = () => {
  const [puestos, setPuestos] = useState([]);
  useEffect(() => {
    consultar();
  }, []);

  const navigate = useNavigate();
  const { idVendedor } = useParams();

  const consultar = async () => {
    try {
      const data = await Axios.get("/puestosXVendedor/" + idVendedor);
      setPuestos(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const auth = localStorage.getItem("session");

  return (
    <div className="p-5">
      <h1 className="p-3"></h1>
    <div>
      <h2 className="text-center">Puestos</h2>
      <div className="d-flex justify-content-evenly flex-wrap">
        {puestos.map((el) => (
          <div className="m-4">
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
      <div>
        {auth && JSON.parse(auth)[0]._id === idVendedor && (
          <div className="bg-warning d-inline-block p-2 rounded">
            <Link to={"/InserPuestos"}>Crear un nuevo puesto</Link>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};
