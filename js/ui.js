import { getEvents } from './api.js';

export async function renderEventTable() {
  console.log('⚙️ Ejecutando renderEventTable...'); 
  const events = await getEvents();
  console.log('📦 Datos recibidos:', events);       

  const tbody = document.getElementById('userTableBody');
  tbody.innerHTML = '';

  events.forEach(event => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="./assets/img/avatar.png" class="avatar"></td>
      <td>${event.name}</td>
      <td>${event.description}</td>
      <td>${event.capacity}</td>
      <td>${event.dateOfEvent}</td>
      <td>
        <button class="edit-btn" data-id="${event.id}">✏️</button>
        <button class="delete-btn" data-id="${event.id}">🗑️</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}
