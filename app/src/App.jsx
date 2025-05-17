import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import UserDetails from './pages/UserDetails.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users/:id" element={<UserDetails />} />
    </Routes>
  );
};

export default App;
