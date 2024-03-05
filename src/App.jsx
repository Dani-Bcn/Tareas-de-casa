import './App.css';

import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import SectionChilds from './components/Sectionchilds';
import PageRewards from './components/PageRewards';
import Date from './components/Date';
import PageChild from './components/PageChild';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorPage from './views/ErrorPage';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import Tasks from './components/Tasks';
import ListTasks from './components/ListTasks';
import ListChilds from './components/ListChilds';
import User from './components/User'
import InfoChild from './components/InfoChild'
import AddChild from './components/AddChild'
import CreateTask from './components/CreateTask'
import EditChild from './components/EditChild'
import EditTask from './components/EditTask'
import UpImages from './components/UpImages'
import DeleteTasksChild from './components/DeleteTasksChild'
import Help from './components/Help'
function App() {
  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />       
        <Route path="/SectionChilds" element={<SectionChilds />} />
        <Route path="/PageRewards/:id" element={<PageRewards />} />
        <Route path="/Date" element={<Date/>} />
        <Route path="/PageChild/:id" element={<PageChild />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />        
        <Route path="/ListChilds" element={<ListChilds />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/ListTasks/:id" element={<ListTasks />} />
        <Route path="/User" element={<User/>} />
        <Route path="/InfoChild/:id" element={<InfoChild />} />
        <Route path="/AddChild/" element={<AddChild />} />
        <Route path="/EditChild/:id" element={<EditChild />} />
        <Route path="/EditTask/:id" element={<EditTask />} />
        <Route path="/CreateTask" element={<CreateTask />} />
        <Route path="/UpImages" element={<UpImages />} />
        <Route path="/private" element={<IsPrivate><PrivateView/></IsPrivate>}/>
        <Route path="*" element={<ErrorPage />} />  
        <Route path="DeleteTasksChild/:id" element={<DeleteTasksChild />} />       
        <Route path="/Help" element={<Help />}/>       
      </Routes>
      <Footer/>
    </div>
  );
}
export default App;