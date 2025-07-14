const API_URL = 'http://localhost:3000/users'; 

// Obtener usuario logueado desde localStorage
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user')) || null;
}

// Guardar usuario en localStorage
function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

// Eliminar sesión
export function logout() {
  localStorage.removeItem('user');
  location.reload(); 
}

// Login con email y contraseña
export async function login(email, password) {
  try {
    const res = await fetch('${API_URL}?email=${email}&password=${password}'); 
    const users = await res.json();

    if (users.length > 0) {
      const user = users[0];
      setCurrentUser(user);
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

// Registrar un nuevo usuario
export async function register(userData) {
  try {
    const res = await fetch('${API_URL}?email=${userData.email}'); 
    const existingUsers = await res.json();

    if (existingUsers.length > 0) {
      throw new Error('El correo ya está registrado');
    }

    const postRes = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const newUser = await postRes.json();
    setCurrentUser(newUser);
    return newUser;

  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
}