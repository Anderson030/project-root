import { getUsers } from './api.js';

export async function renderUserTable() {
  const users = await getUsers();
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="./assets/img/avatar.png" class="avatar"></td>
      <td>${user.name}</td>
      <td>${user.description}</td>
      <td>${user.capacity}</td>
      <td>${user.dateOfEvent}</td>
      <td>
        <button class="edit-btn" data-id="${user.id}">✏️</button>
        <button class="delete-btn" data-id="${user.id}">🗑️</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}
