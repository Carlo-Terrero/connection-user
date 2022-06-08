import logo from './logo.svg';
import './App.css';
import './styles/css/main.css'
import {BrowserRouter as Router , Routes, Route } from 'react-router-dom';

import {LogIn} from './component/login';
import {GetOneUser} from  './component/getOneUser';
import {CreateUser} from './component/createUser';
import {GetUsers} from './component/getUsers';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route exec path='/' element={<LogIn />} />
          <Route exec path='/client/get/one/:id' element={<GetOneUser />} />
          <Route exec path='/client/post' element={<CreateUser />} />
          <Route exec path='/client/getUsers' element={<GetUsers />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
