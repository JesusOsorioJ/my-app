import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged, getAuth} from "firebase/auth";
import { collection, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase';
import StudentListNotes1 from './StudentListNotes1'

import Footer from "../components/Footer";
import Header from "../components/Header";
import SideMenu1 from "../components/SideMenu1";
import {  onSnapshotData } from "../utils/crud";
import "./scss/ListTest.scss";



function StudentListNotes () {
  const { idtest } = useParams();
  const[ user, setUser] = useState("asas");
  const [form, setForm] = useState([]);
  const navigate = useNavigate();

  const getOnSnapshotCollection = async (collectionName, email) => {
    const col = query(collection(db, collectionName), where("student", "==", email));
    onSnapshotData(col, (querySnapshot) => {
      const collection = [];
      querySnapshot.forEach((doc) => {
        collection.push(doc.data());
      });
      console.log("data", collection)
      setForm(collection);
      
    });
  };
useEffect(() => {
  onAuthStateChanged(getAuth(), (user) => (user?.photoURL==="student")?setUser(user):navigate('/validate/signup'))
    
  }, []);

  useEffect(() => {
    if (user.length !== 0){
      getOnSnapshotCollection("formStudent",user.email);
    }   
    }, [user]);

  return (
    <div className="ListTest">
      <Header />
      <div className="ListTestFLex">
        <SideMenu1 />
        
          {idtest!=="0"?
          <StudentListNotes1 />
          :
          <div>
          <h1>LISTA DE MIS EXAMENES</h1>
          <div className="itemFlexTest">
            <span>Nombre de cuestionario</span>
            <span>Nota Final</span>
            <span>DETALLE</span>
          </div>
          {form.map((item) => (
            <div className="itemFlexTest">
              <span>{item.nametest}</span>
              <span>{item.cal}</span>
              <button onClick={() => navigate(`/studentListnotes/${item.student}-${item.idtest}`)}>
                RESPUESTAS
              </button>
            </div>
          ))}
        </div>
          }
          
      </div>
      <Footer />
    </div>
  );
}
export default StudentListNotes;