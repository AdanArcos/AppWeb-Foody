import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Rutas } from './routes';
import backgroundImage from './assets/banner.png'; // Importa la imagen

export default function AppAlumno() {
  return (
    <BrowserRouter>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Rutas />
      </div>
    </BrowserRouter>
  );
}
