import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios, { host } from "../../services/Axios";
import Back from "../../layouts/Back";
import banner from "../../assets/banner_2.jpg";

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
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(${banner})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          padding: "20px",
          marginLeft: "-20px",
          marginRight: "-20px",
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Show the image over the banner */}
        <img
          src={`${host}/${puesto.imagenes[0]}`}
          alt="Puesto"
          style={{
            objectFit: "cover",
            borderRadius: "50%",
            height: "340px",
            width: "340px",
            position: "absolute",
            border: "4px solid #ccc",
            top: "90%",
            left: "10%",
            transform: "translateY(-50%)",
            zIndex: 1,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
            marginTop: "-20px",
          }}
        />
        <h2 style={{ color: "#FFF", marginBottom: "20px", fontSize: 40, fontFamily: "WOODCUT" }}>
          {puesto.nombre}
        </h2>
      </div>
      <div className="p-5">
        <h3 style={{ fontFamily: "WOODCUT", textAlign: "center" }}>Nuestros Platillos</h3>
        {comidas.length === 0 && (
          <h2 className="text-danger text-center">Este vendedor aún no ha agregado ningún platillo</h2>
        )}
        <div className="d-flex flex-wrap justify-content-center p-5">
          {comidas.map((el) => (
            <div
              key={el._id}
              className="card m-2"
              style={{
                width: "250px",
                backgroundColor: "#F3F1E9",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              <img
                src={`${host}/${el.imagenes[0]}`}
                className="card-img-top"
                alt="..."
                style={{ height: "200px", objectFit: "cover", borderRadius: "8px 8px 0 0" }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                  {el.nombre}
                </h5>
                <p className="card-text" style={{ fontSize: "18px", marginBottom: "1rem" }}>
                  ${el.precio}
                </p>
                {auth && JSON.parse(auth)[0]._id === puesto.vendedor._id && (
                  <button
                    className="btn btn-warning"
                    onClick={(e) => editComida(e, el)}
                    style={{ width: "100%" }}
                  >
                    Editar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4">
          <div className="mb-4">
            <p className="mb-1" style={{ fontSize: 20 }}>
              <span className="fw-bold">Dirección: </span>
              {puesto.direccion}
            </p>
            <p className="mb-1" style={{ fontSize: 20 }}>
              <span className="fw-bold">Teléfono: </span>
              {puesto.vendedor.telefono}
            </p>
            <p className="mb-1" style={{ fontSize: 20 }}>
              <span className="fw-bold">Correo: </span>
              {puesto.vendedor.correo}
            </p>
            <p className="mb-1" style={{ fontSize: 20 }}>
              <span className="fw-bold">Propietario: </span>
              {puesto.vendedor.nombre} {puesto.vendedor.apepat} {puesto.vendedor.apemat}
            </p>
          </div>
          {auth && JSON.parse(auth)[0]._id === puesto.vendedor._id && (
            <button className="btn btn-warning" onClick={editarPuesto}>
              Editar
            </button>
          )}
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
