import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdoptionPage from './pages/AdoptionPage';
import PostPage from './pages/PostPage';
import LostPage from './pages/LostPage';
import AnimalPage from './pages/AnimalPage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/adoption" element={<AdoptionPage />} />
      <Route path="/adoption/:id" element={<AnimalPage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/lost" element={<LostPage />} />
    </Routes>
  );
}

export default App
