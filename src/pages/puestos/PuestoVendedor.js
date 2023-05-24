import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios, { host } from "../../services/Axios";
import banner from "../../assets/banner.png";

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
    <div>
      <h2 className="p-4"></h2>
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
        }}
      >
        <h2 style={{ color: "#FFF", marginBottom: "20px", fontFamily: "WOODCUT" }}>
          MIS RESTAURANTES
        </h2>
      </div>
      <div className="d-flex justify-content-evenly flex-wrap">
        {puestos.map((el) => (
          <div
            key={el._id}
            className="m-4"
            style={{ width: "250px", boxShadow: "0px 2px 4px rgba(0,0,0,0.2)", borderRadius: "0.5rem", padding: "1rem", backgroundColor: "#F3F1E9" }}
          >
            <img
              src={`${host}/${el.imagenes[0]}`}
              alt={el.nombre}
              style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px" }}
            />
            <div style={{fontFamily: "WOODCUT"}}>
              <p className="text-center p-3">{el.nombre}</p>
            </div>
            <div className="p-2">
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
  );
};
