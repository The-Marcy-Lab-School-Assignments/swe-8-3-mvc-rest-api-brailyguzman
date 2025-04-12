import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  deleteUser,
  getUserById,
  updateUserEmail,
} from '../adapters/usersAdapters.js';

const UserDetails = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [newEmail, setNewEmail] = useState('');
  const navigate = useNavigate();

  const handleGetUser = useCallback(async () => {
    const [response, error] = await getUserById(params.id);

    if (error) {
      console.error(`An error occurred: ${error}`);
      return navigate('/');
    }

    setData(response.user);
  }, [navigate, params.id]);

  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!newEmail) {
      return;
    }

    const [_, error] = await updateUserEmail(data.id, newEmail);

    if (error) {
      console.error(`An error occurred: ${error}`);
      return;
    }

    setNewEmail('');
    await handleGetUser();
  };

  const handleDelete = async () => {
    const [_, error] = await deleteUser(data.id);

    if (error) {
      console.error(`An error occurred: ${error}`);
      return;
    }

    navigate('/');
  };

  return (
    <div className="user">
      <Link to={'/'}>Go Home</Link>
      <form onSubmit={handleEdit}>
        <p>ID: {data.id}</p>
        <p>Name: {data.name}</p>
        <p>Email: {data.email}</p>
        <input
          type="text"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="New Email Address"
        />

        <div style={{ paddingTop: '20px' }}>
          <button type="submit" disabled={!newEmail}>
            Update
          </button>
          <button style={{ color: 'red' }} type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDetails;
