import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios, { host } from "../../services/Axios";
import Back from "../../layouts/Back";

export const Puesto = () => {
  const [puesto, setPuesto] = useState(null);
  const { idPuesto } = useParams();

  const consultar = async () => {
    try {
      const data = await Axios.get(`/puestos/${idPuesto}`);
      setPuesto(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    consultar();
  }, []);

  return (
    <div>
      <Back />
      {!puesto && <h2 className="text-danger">No se encontro el puesto</h2>}
      {puesto && <Success puesto={puesto} />}
    </div>
  );
};

const Success = ({ puesto }) => {
  const [comidas, setComidas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    consultar();
  }, []);

  const consultar = async () => {
    try {
      const data = await Axios.get(`/comidasByPuesto/${puesto._id}`);
      console.log(data);
      setComidas(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addComida = () => {
    navigate(`/InserComida/${puesto._id}`);
    localStorage.setItem("puesto", JSON.stringify(puesto));
  };

  const auth = localStorage.getItem("session");

  const editarPuesto = () => {
    localStorage.setItem("puestotemp", JSON.stringify(puesto));
    navigate("/editPuesto");
  };

  const editComida = (e, el) => {
    localStorage.setItem("comidatemp", JSON.stringify(el));
    navigate("/editComida");
  };

  return (
    <div className="p-2">
      <h2 className="text-center">{puesto.nombre}</h2>
      <div className="d-flex justify-around">
        <div className="w-50">
          <div
            id="carouselExampleControls"
            className="carousel slide w-100"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {puesto.imagenes.map((img) => (
                <div className="carousel-item active">
                  <img
                    src={`${host}/${img}`}
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
        </div>
        {/* <img
          src={host + "/" + puesto.imagenes[0]}
          alt="imagen"
          style={{ width: " 500px" }}
        /> */}
        <div className="p-4">
          <p>
            <span className="fw-bold">Direccion: </span>
            {puesto.direccion}
          </p>
          <p>
            <span className="fw-bold">Telefono: </span>
            {puesto.vendedor.telefono}
          </p>
          <p>
            <span className="fw-bold">Correo: </span>
            {puesto.vendedor.correo}
          </p>
          <p>
            <span className="fw-bold">Vendor: </span>
            {puesto.vendedor.nombre} {puesto.vendedor.apepat}{" "}
            {puesto.vendedor.apemat}
          </p>
          <div>
            {auth && JSON.parse(auth)[0]._id === puesto.vendedor._id && (
              <button className="btn btn-warning" onClick={editarPuesto}>
                Editar
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        <h3>Productos</h3>
        <div className="d-flex justify-content-evenly">
          {comidas.length === 0 && (
            <h2 className="text-danger">Sin productos aun</h2>
          )}
          {comidas.map((el) => (
            <div style={{ width: "250px" }}>
              <div style={{ width: "250px", height: "250px" }}>
                <div
                  id="carouselExampleControls"
                  className="carousel slide w-100"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {el.imagenes.map((img, i) => (
                      <div className={`carousel-item ${i === 0 && "active"}`}>
                        <img
                          src={`${host}/${img}`}
                          className="d-block w-100"
                          style={{
                            height: "250px",
                            width: "250px",
                            objectFit: "contain",
                          }}
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
              </div>
              <p className="m-1">
                <span className="fw-bold">Comida: </span>
                {el.nombre}
              </p>
              <p className="m-1">
                <span className="fw-bold">Precio: </span> ${el.precio}
              </p>
              <div>
                {auth && JSON.parse(auth)[0]._id === puesto.vendedor._id && (
                  <button
                    className="btn btn-warning"
                    onClick={(e) => editComida(e, el)}
                  >
                    Editar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {auth && JSON.parse(auth)[0]._id === puesto.vendedor._id && (
        <button onClick={addComida} className="btn btn-success m-2">
          Agregar comidas
        </button>
      )}
    </div>
  );
};

export default Puesto;
