import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Rutas } from './routes';

export default function AppAlumno() {
  return (
    <BrowserRouter>
      <div
        style={{
          backgroundColor: 'F3F1E9',
          minHeight: '100vh',
        }}
      >
        <Rutas />
      </div>
    </BrowserRouter>
  );
}
