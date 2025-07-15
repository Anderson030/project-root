const API_URL = 'http://localhost:3000/events';

// Obtener todos los eventos
export async function getEvents() {
  const res = await fetch(API_URL);
  return await res.json();
}

// Generar ID único (si crypto no está disponible)
function generateId() {
  return self.crypto?.randomUUID?.() || Math.random().toString(16).slice(2, 6);
}

// Agregar un nuevo evento
export async function addEvent(event) {
  // Si no tiene ID, generar uno manualmente
  if (!event.id || event.id.trim() === "") {
    event.id = generateId();
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  });

  return await res.json();
}

// Actualizar un evento existente
export async function updateEvent(id, event) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  });
  return await res.json();
}

// Eliminar un evento por ID
export async function deleteEvent(id) {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
}
