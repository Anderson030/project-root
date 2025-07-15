import { getEvents, addEvent, updateEvent, deleteEvent } from './api.js';
import { renderEventTable } from './ui.js';
import { openModal, closeModal, fillForm, clearForm } from './modal.js';
import { validateForm } from './validate.js';
import { login, register, getCurrentUser, logout } from './auth.js';

// Mostrar la interfaz principal
function showApp() {
  const user = getCurrentUser();
  if (!user) return;

  document.getElementById('sidebarName').textContent = user.name;
  document.getElementById('sidebarRole').textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);

  document.getElementById('loginSection').classList.add('hidden');
  document.getElementById('appSection').classList.remove('hidden');
  document.querySelector('.sidebar').classList.remove('hidden');
  document.querySelector('.main-content').classList.remove('hidden');

  renderEventTable();
}

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    showApp();
  } else {
    document.getElementById('loginSection').classList.remove('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('appSection').classList.add('hidden');
    document.querySelector('.sidebar').classList.add('hidden');
    document.querySelector('.main-content').classList.add('hidden');
  }

  // Botón Logout
  document.querySelector('.logout')?.addEventListener('click', () => {
    logout();
    document.getElementById('loginSection').classList.remove('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('appSection').classList.add('hidden');
    document.querySelector('.sidebar').classList.add('hidden');
    document.querySelector('.main-content').classList.add('hidden');
  });

  // Botón Crear Evento
  document.getElementById('addBtn')?.addEventListener('click', () => {
    clearForm();
    document.getElementById('modalTitle').textContent = 'Create Event';
    openModal();
  });

  // Botón Cerrar Modal
  document.getElementById('closeModalBtn')?.addEventListener('click', () => {
    closeModal();
  });

  // Editar o Eliminar evento
  const tableBody = document.querySelector('tbody');
  tableBody?.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;

    if (e.target.classList.contains('edit-btn')) {
      const events = await getEvents();
      const event = events.find(ev => ev.id === id);
      if (event) {
        document.getElementById('modalTitle').textContent = 'Edit Event';
        openModal(event);
      }
    }

    if (e.target.classList.contains('delete-btn')) {
      if (confirm('Delete?')) {
        await deleteEvent(id);
        renderEventTable();
      }
    }
  });

  // Guardar evento (crear o editar)
  document.getElementById('userForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('userId').value;
    const event = {
      id,
      name: document.getElementById('name').value.trim(),
      description: document.getElementById('description').value.trim(),
      capacity: document.getElementById('capacity').value.trim(),
      dateOfEvent: document.getElementById('dateOfEvent').value
    };

    if (!validateForm(event)) {
      alert('Please complete all fields correctly.');
      return;
    }

    if (id) {
      await updateEvent(id, event);
    } else {
      await addEvent(event);
    }

    closeModal();
    renderEventTable();
  });

  // Login
  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const user = await login(email, password);

    if (user) {
      showApp();
    } else {
      document.getElementById('loginError').textContent = 'Incorrect credentials';
    }
  });

  // Registro
  const registerForm = document.getElementById('registerForm');
  registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newUser = {
      name: document.getElementById('registerName').value.trim(),
      email: document.getElementById('registerEmail').value.trim(),
      password: document.getElementById('registerPassword').value.trim(),
      role: document.getElementById('registerRole').value,
      phone: '',
      enrollNumber: '',
      dateOfAdmission: new Date().toISOString().slice(0, 10)
    };

    try {
      const registered = await register(newUser);
      if (registered) {
        alert('Registro exitoso. Inicia sesión.');
        registerForm.reset();
        registerForm.classList.add('hidden');
        document.getElementById('loginForm').classList.remove('hidden');
      }
    } catch (error) {
      alert('Correo ya registrado.');
    }
  });

  // Alternar entre login y registro sin parpadeos
  document.getElementById('showRegister')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('loginError').textContent = '';
  });

  document.getElementById('showLogin')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('loginError').textContent = '';
  });
});
