// Abre el modal y si se pasa un evento, llena el formulario
export function openModal(event = null) {
  const modal = document.getElementById('userModal');
  modal.classList.remove('hidden');
  modal.classList.add('open');

  if (event) {
    fillForm(event);
  } else {
    clearForm();
  }
}

// Cierra el modal
export function closeModal() {
  const modal = document.getElementById('userModal');
  modal.classList.add('hidden');
  modal.classList.remove('open');
}

// Llena el formulario con los datos de un evento (para editar)
export function fillForm(event) {
  document.getElementById('userId').value = event.id;
  document.getElementById('name').value = event.name;
  document.getElementById('description').value = event.description;
  document.getElementById('capacity').value = event.capacity;
  document.getElementById('dateOfEvent').value = event.dateOfEvent;
}

// Limpia el formulario (para nuevo evento)
export function clearForm() {
  document.getElementById('userId').value = '';
  document.getElementById('name').value = '';
  document.getElementById('description').value = '';
  document.getElementById('capacity').value = '';
  document.getElementById('dateOfEvent').value = '';
}
