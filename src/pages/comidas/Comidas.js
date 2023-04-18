import React from 'react'
import { useState } from 'react'
import Axios from '../../services/Axios'

export const Comidas = () => {
    const [body,setBody]=useState("")
    const enviar= async (e)=>{
        e.preventDefault()
        console.log(body)
        let res=await Axios.post("/comida", body)
        console.log(res)
        e.target.reset()
    }
    const handle=(e)=>{
        setBody({...body,[e.target.name]:e.target.value})
    }
  return (
    <div>
         <div>Registrar Comida</div>
         <form onSubmit={enviar}>
            <div>
            <label className="label-default">Nombre</label>   
            <input type="text" name="nombre" onChange={handle}/>
            </div>
            <div>
            <label>Apellidos</label>   
            <input type="text" name="apellidos" onChange={handle}/>
            <div>
            <label>Telefono</label>   
            <input type="number" name="telefono" onChange={handle}/>
            </div>
            </div>
            
            <button>
                Guardar
            </button>
         </form>
    </div>

  )
}
