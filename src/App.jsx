import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdoptionPage from './pages/AdoptionPage';
import PostPage from './pages/PostPage';
import LostPage from './pages/LostPage';

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/adoption' element={<AdoptionPage/>} />
      <Route path='/post' element={<PostPage/>} />
      <Route path='/lost' element={<LostPage/>} />
    </Routes>
  )
}

export default App
