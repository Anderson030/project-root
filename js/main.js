import { getUsers, addUser, updateUser, deleteUser } from './api.js';
import { renderUserTable } from './ui.js';
import { openModal, closeModal, fillForm, clearForm } from './modal.js';
import { validateForm } from './validate.js';
import { login, register, getCurrentUser, logout } from './auth.js';

// Mostrar la interfaz principal
function showApp() {
  document.querySelector('.sidebar').style.display = 'block';
  document.querySelector('.main-content').style.display = 'block';
  document.getElementById('loginSection').style.display = 'none';
  renderUserTable();
}

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = getCurrentUser();

  // Mostrar vista según sesión activa
  if (currentUser) {
    showApp();
  } else {
    document.getElementById('loginSection').style.display = 'block';
    document.querySelector('.sidebar').style.display = 'none';
    document.querySelector('.main-content').style.display = 'none';
  }

  // Botón de Logout
  const logoutBtn = document.querySelector('.logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }

  // Botón para abrir modal de crear
  const addBtn = document.getElementById('addBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      clearForm();
      document.getElementById('modalTitle').textContent = 'Create Event';
      openModal();
    });
  }

  // Cerrar modal
  const closeModalBtn = document.getElementById('closeModalBtn');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Delegación para editar o eliminar
  const tableBody = document.querySelector('tbody');
  if (tableBody) {
    tableBody.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;

      if (e.target.classList.contains('edit-btn')) {
        const users = await getUsers();
        const user = users.find(u => u.id == id);
        fillForm(user);
        document.getElementById('modalTitle').textContent = 'Edit Event';
        openModal();
      }

      if (e.target.classList.contains('delete-btn')) {
        const confirmDelete = confirm('Delete?');
        if (confirmDelete) {
          await deleteUser(id);
          renderUserTable();
        }
      }
    });
  }

  // Enviar formulario de evento (crear o editar)
  const userForm = document.getElementById('userForm');
  if (userForm) {
    userForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const user = {
        name: e.target.name.value.trim(),
        description: e.target.description.value.trim(),
        capacity: e.target.capacity.value.trim(),
        dateOfEvent: e.target.dateOfEvent.value
      };

      const id = e.target.userId.value;

      if (!validateForm(user)) {
        alert('Please complete all fields correctly.');
        return;
      }

      if (id) {
        await updateUser(id, user);
      } else {
        await addUser(user);
      }

      closeModal();
      renderUserTable();
    });
  }

  // ===== Login =====
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
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
  }

  // ===== Registro =====
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
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
          alert('Registration successful. You can now log in.');
          registerForm.reset();
        }
      } catch (error) {
        alert('Registration failed. Try another email.');
      }
    });
  }

  // Mostrar formulario de registro
  const showRegister = document.getElementById('showRegister');
  const showLogin = document.getElementById('showLogin');

  if (showRegister) {
    showRegister.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('loginForm').classList.add('hidden');
      document.getElementById('registerForm').classList.remove('hidden');
    });
  }

  if (showLogin) {
    showLogin.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('registerForm').classList.add('hidden');
      document.getElementById('loginForm').classList.remove('hidden');
    });
  }
});