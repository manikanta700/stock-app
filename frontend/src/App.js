import AddUser from './Component/AddUser';
import EditUser from './Component/EditUser';
import NavBar from './Component/NavBar';
import NotFound from './Component/NotFound'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProfile from './Component/userdetails';

function App() {

  
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<UserProfile/> } />
        <Route path="/add" element={<AddUser />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
