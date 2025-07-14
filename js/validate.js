export function validateForm(user) {
    const { name, description, capacity,dateOfEvent } = user;
    return name && description && capacity && dateOfEvent;
  }
  