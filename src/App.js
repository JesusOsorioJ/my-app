import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Teacher from './pages/Teacher';
import Student from './pages/Student';
import { BrowserRouter as Router, Routes, Route}  from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="home/:id/:name" element={<Home />} />
          <Route path="student/:id/:name" element={<Student />} />
          <Route path="teacher/:id/:name" element={<Teacher />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

