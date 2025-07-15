export function validateForm(user) {
  const { name, description, capacity, dateOfEvent } = user;

  // Validación básica de campos no vacíos
  if (!name || !description || !capacity || !dateOfEvent) return false;

  // Validar que la capacidad sea un número mayor a 0
  const capacityNumber = parseInt(capacity, 10);
  if (isNaN(capacityNumber) || capacityNumber <= 0) return false;

  return true;
}
