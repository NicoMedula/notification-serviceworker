import { useEffect, useState } from 'react';

export default function App() {
  const [registration, setRegistration] = useState(null);
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/src/service-worker.js')
        .then(reg => {
          console.log('Service Worker registrado con éxito:', reg);
          setRegistration(reg);

          Notification.requestPermission().then(perm => {
            setPermission(perm);
            console.log('Permiso para notificaciones:', perm);
            if (perm === 'granted') {
              console.log('Permiso para notificaciones concedido.');

              setInterval(() => {
                console.log('Ejecutando fetch para notificación automática');
                fetch('http://localhost:3001/api/mesa/1234/profesor/parnotificar')
                  .then(response => {
                    console.log('Respuesta fetch:', response);
                    return response.json();
                  })
                  .then(data => {
                    console.log('Datos recibidos:', data);
                    reg.showNotification('Notificación', {
                      body: data.message,
                      icon: '/favicon.ico'
                    });
                  })
                  .catch(err => console.error('Error en fetch:', err));
              }, 10000);
            } else {
              console.warn('Permiso para notificaciones no concedido');
            }
          });
        })
        .catch(error => {
          console.error('Error al registrar el Service Worker:', error);
        });
    } else {
      console.warn('Service Worker no soportado en este navegador');
    }
  }, []);

  const sendNotificationNow = () => {
    if (registration && permission === 'granted') {
      fetch('http://localhost:3001/api/mesa/1234/profesor/parnotificar')
        .then(response => response.json())
        .then(data => {
          registration.showNotification('Notificación', {
            body: data.message,
            icon: '/favicon.ico'
          });
        })
        .catch(err => console.error('Error en fetch:', err));
    } else {
      alert('Service Worker no registrado o permiso de notificaciones no concedido.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 text-white bg-gradient-to-br from-blue-400 to-purple-600">
      <h1 className="mb-4 text-4xl font-bold">Notificaciones con ServiceWorker</h1>
      <p className="max-w-md mb-6 text-center">
        Esta aplicación muestra notificaciones cada 10 segundos desde una API simulada.
        Puedes también enviar una notificación manualmente con el botón.
      </p>
      <button
        onClick={sendNotificationNow}
        className="px-6 py-3 font-semibold text-blue-600 transition bg-white rounded shadow hover:bg-gray-100"
      >
        Enviar notificación ahora
      </button>
    </div>
  );
}
