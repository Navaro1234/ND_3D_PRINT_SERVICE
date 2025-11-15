export function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

export function getUsers() {
  const usersJSON = localStorage.getItem('users');
  return usersJSON ? JSON.parse(usersJSON) : [];
}
