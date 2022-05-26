import './App.css';
// import Home from './pages/Home';
import Teacher from './pages/Teacher';
import Student from './pages/Student';
import TeacherNotes from './pages/TeacherNotes';
import TeacherCurse from './pages/TeacherCurse';
import TestName from './components/TestName';
import ListTest from './pages/ListTest';
import SignUp from './pages/SignUp'
import StudentListNotes from './pages/StudentListNotes'
import Payments from './pages/Payments'
import { BrowserRouter as Router, Routes, Route}  from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          {/* dieccion con imagen con foto */}
          <Route path="listtest/" element={<ListTest />} />
          {/* para ver lista de todos los lest hechos */}
          <Route path="testname/:id/:name" element={<TestName />} />
          {/* Para crear o modificar un test */}
          <Route path="student/:type/:id/:id1" element={<Student />} />
          {/* para hacer y enviar el test para student */}
          <Route path="studentlistnotes/:idtest" element={<StudentListNotes />} />
          {/* para ver las notas */}
          <Route path="teacher/:id/:name" element={<Teacher />} />
          {/* para poder abilitar plas preguntas y test */}
          <Route path="teachernotes/:type/:filter" element={<TeacherNotes />} />
          {/* para modificar las notas de los estudente */}
          <Route path="teachercurse/:id" element={<TeacherCurse />} />
          {/* Para modificar una lista de curso de cedula */}
          <Route path="validate/:type" element={<SignUp />} />
          {/* Para modificar una lista de curso de cedula */}

          <Route path="payments/" element={<Payments />} />
        </Routes>
      </Router>
    </div>
  );
}



export default App;

