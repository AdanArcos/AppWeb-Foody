import React from 'react'
import {Routes,Route} from "react-router-dom";
import {Layout} from "../layouts";
import { Home,Footer, formAlumno,FormPersonas, AdminPersonas, Perfil, Registrar, Puestos, Comidas } from '../pages';

export function Rutas() {
    const loadLayouts=(Layout,Page)=>{
        return(
            <Layout>
                <Page/>
            </Layout>
        )
    }
  return (
   <Routes>
    <Route path='/' element={loadLayouts(Layout, Home)}/>
    <Route path='/alumno' element={loadLayouts(Layout, formAlumno)}/>
    <Route path='/persona' element={loadLayouts(Layout, AdminPersonas)}/>
    <Route path='/formpersona' element={<FormPersonas/>}/>
    <Route path='/Vendedor' element={loadLayouts(Layout, Perfil)}/>
    <Route path='/Registrar' element={loadLayouts(Layout, Registrar)}/>
    <Route path='/Puestos' element={loadLayouts(Layout, Puestos)}/>
    <Route path='/Puestos' element={loadLayouts(Layout, Comidas)}/>
   </Routes> 
  )
}
