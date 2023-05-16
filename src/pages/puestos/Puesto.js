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
      {!puesto && <h2 className="text-danger">No se encontró el puesto</h2>}
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
    <div className="p-5">
      <h2 className="text-center">{puesto.nombre}</h2>
      <div className="d-flex justify-around">
        <div className="w-50">
          <img
            src={`${host}/${puesto.imagenes[0]}`}
            className="d-block w-60"
            alt="..."
            style={{
              objectFit: "cover",
              borderRadius: "50%",
              height: "300px",
              width: "300px",
            }}
          />
        </div>
        <div className="p-4">
          <p>
            <span className="fw-bold">Dirección: </span>
            {puesto.direccion}
          </p>
          <p>
            <span className="fw-bold">Teléfono: </span>
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
        <div className="d-flex flex-wrap justify-content-center">
          {comidas.length === 0 && (
            <h2 className="text-danger">Este vendedor aun no ha agregago ningun platillo</h2>
          )}
          <div
            className="d-flex flex-wrap"
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              paddingRight: "16px",
            }}
          >
            {comidas.map((el) => (
              <div
                key={el._id}
                className="card m-2"
                style={{ width: "250px" }}
              >
                <img
                  src={`${host}/${el.imagenes[0]}`}
                  className="card-img-top"
                  alt="..."
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{el.nombre}</h5>
                  <p className="card-text">${el.precio}</p>
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
      </div>
      {auth && JSON.parse(auth)[0]._id === puesto.vendedor._id && (
        <div className="d-flex justify-content-center">
          <button
            onClick={addComida}
            className="btn btn-success mt-4"
            style={{ width: "200px" }}
          >
            Agregar comidas
          </button>
        </div>
      )}
    </div>
  );
};

export default Puesto;
