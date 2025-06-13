import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdoptionPage from './pages/AdoptionPage';
import PostPage from './pages/PostPage';
import LostPage from './pages/LostPage';
import AnimalPage from './pages/AnimalPage';
import AdoptionForm from './pages/AdoptionForm'
import CompareList from './pages/CompareList';
import User from './pages/User' 
import LoginPage from './pages/LoginPage';
import CreateAccount from './pages/CreateAccount';
import Verify from "./pages/Verify";

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/adoption" element={<AdoptionPage />} />
      <Route path="/adoption/:id" element={<AnimalPage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/lost" element={<LostPage />} />
      <Route path="/adoption-form/:id" element={<AdoptionForm />} />
      <Route path="/compare-list" element={<CompareList />} />
      <Route path="/user" element={<User />} />
      <Route path="/log-in" element={<LoginPage />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/verify" element={<Verify />} />
    </Routes>
  );
}

export default App
