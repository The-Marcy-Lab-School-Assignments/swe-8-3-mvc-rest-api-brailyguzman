import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser, getAllUsers } from '../adapters/usersAdapters.js';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleGetUsers = async () => {
    const [data, error] = await getAllUsers();

    if (error) {
      console.error(`An error occurred: ${error}`);
      return;
    }

    setUsers(data.users);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const [_, error] = await createUser(name, email);

    if (error) {
      console.error(`An error occurred: ${error}`);
      return;
    }

    setName('');
    setEmail('');
    await handleGetUsers();
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <div>
      <form
        onSubmit={handleCreateUser}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={true}
        />

        <input
          type="email"
          placeholder="john@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />

        <button>Create new User</button>
      </form>
      <ul>
        {users.map((user) => (
          <li className="user-container">
            <Link to={`/users/${user.id}`}>
              <p>
                ID: {user.id} - {user.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
