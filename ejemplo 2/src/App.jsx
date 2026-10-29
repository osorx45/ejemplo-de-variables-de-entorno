import React, { useState, useEffect } from 'react';
export default function App() {
  const [status, setStatus] = useState("Esperando conexión...");
  const [inputCode, setInputCode] = useState("");
  const [resultadoAuth, setResultadoAuth] = useState("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    fetch(`${backendUrl}/api/status`)
      .then(res => res.json())
      .then(data => setStatus(data.mensaje))
      .catch(err => setStatus("Error de conexión"));
  }, [backendUrl]);
  const verificarContrasena = (e) => {
    e.preventDefault(); // Evita que la página se recargue
        fetch(`${backendUrl}/api/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: inputCode }) // Enviamos lo que escribimos
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setResultadoAuth("🟢 " + data.mensaje);
      } else {
        setResultadoAuth("🔴 " + data.mensaje);
      }
    })
    .catch(err => setResultadoAuth("Error comunicándose con el servidor"));
  };
  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Demostración: Frontend vs Backend</h1>
            <p style={{ color: status.includes('exitosa') ? 'green' : 'red', fontWeight: 'bold' }}>
        Estado: {status}
      </p>
      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', display: 'inline-block' }}>
        <h3>Área Restringida del Servidor</h3>
        <form onSubmit={verificarContrasena}>
          <input 
            type="password" 
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Ingresa la contraseña"
            style={{ padding: '8px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Verificar
          </button>
        </form>
                {resultadoAuth && (
          <h4 style={{ marginTop: '20px' }}>{resultadoAuth}</h4>
        )}
      </div>
    </div>
  );
}
