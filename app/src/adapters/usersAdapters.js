import handleFetch from './handleFetch.js';

export const getAllUsers = async () => {
  const [users, error] = await handleFetch('/api/users');

  return [users, error];
};

export const getUserById = async (id) => {
  const [user, error] = await handleFetch(`/api/users/${id}`);

  return [user, error];
};

export const createUser = async (name, email) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  };

  const [response, error] = await handleFetch(`api/users`, options);

  return [response, error];
};

export const deleteUser = async (id) => {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  const [response, error] = await handleFetch(`/api/users/${id}`, options);

  return [response, error];
};

export const updateUserEmail = async (id, newEmail) => {
  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: newEmail }),
  };

  const [response, error] = await handleFetch(`/api/users/${id}`, options);

  return [response, error];
};
