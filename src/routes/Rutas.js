import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../layouts";
import {
  Home,
  Footer,
  formAlumno,
  FormPersonas,
  AdminPersonas,
  Perfil,
  Registrar,
  PuestosForm,
  Puesto,
  Login,
  ComidasForm,
  PuestosExp,
  Create,
  PuestoVendedor,
  PerfilEdit,
  EditPuesto,
  EditComida,
} from "../pages";

export function Rutas() {
  const loadLayouts = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      <Route path="/" element={loadLayouts(Layout, Home)} />
      <Route path="/alumno" element={loadLayouts(Layout, formAlumno)} />
      <Route path="/persona" element={loadLayouts(Layout, AdminPersonas)} />
      <Route path="/formpersona" element={<FormPersonas />} />
      <Route path="/Vendedor" element={loadLayouts(Layout, Perfil)} />
      <Route path="/Registrar" element={loadLayouts(Layout, Registrar)} />
      <Route path="/Login" element={loadLayouts(Layout, Login)} />
      <Route path="/editPerfil" element={loadLayouts(Layout, PerfilEdit)} />
      <Route path="/editPuesto" element={loadLayouts(Layout, EditPuesto)} />
      <Route path="/editComida" element={loadLayouts(Layout, EditComida)} />
      <Route path="/Puestos" element={loadLayouts(Layout, PuestosExp)} />
      <Route path="/Puestos/:idPuesto" element={loadLayouts(Layout, Puesto)} />
      <Route
        path="/PuestosXVendedor/:idVendedor"
        element={loadLayouts(Layout, PuestoVendedor)}
      />{" "}
      <Route path="/Create" element={loadLayouts(Layout, Create)} />
      <Route
        path="/InserComida/:idPuesto"
        element={loadLayouts(Layout, ComidasForm)}
      />
      <Route path="/InserPuestos" element={loadLayouts(Layout, PuestosForm)} />
    </Routes>
  );
}
