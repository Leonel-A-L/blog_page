import { Route, Router, Routes } from 'react-router';
import './App.css';
import Header from './Header';
import Post from './Post';
import Layout from './Layout/Layout';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import CreatePost from './Pages/CreatePost';
import SelectedPost from './Pages/SelectedPost';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
            <Route  index element={<IndexPage /> }/>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/register' element={<RegisterPage />}/>
            <Route path='/createPost' element={<CreatePost />}/>
            <Route path='/post/:id' element={<SelectedPost />}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
