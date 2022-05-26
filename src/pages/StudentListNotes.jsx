import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged, getAuth} from "firebase/auth";
import { collection, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase';
import StudentListNotes1 from './StudentListNotes1'

import Footer from "../components/Footer";
import Header from "../components/Header";
import SideMenu1 from "../components/SideMenu";
import { getCollection, onSnapshotData } from "../utils/crud";
import "./scss/ListTest.scss";



function StudentListNotes () {
  const { idtest } = useParams();
  const[ user, setUser] = useState("asas");
  const [form, setForm] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   getAllCollection("formRegister").then((response) => setForm(response));
  // }, []);
  
  const getOnSnapshotCollection = async (collectionName, email) => {
    const col = query(collection(db, collectionName), where("emil", "==", email));
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
  onAuthStateChanged(getAuth(), (user)=>setUser(user))
    
  }, []);

  useEffect(() => {
    if (user.length !== 0){
      getOnSnapshotCollection("formStudent",user);
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
          <h1>LISTA DE MIS NOTAS</h1>
          <div className="itemFlexTest">
            <span>Codigo de cuestionario</span>
            <span>Nota Final</span>
            <span>DETALLE</span>
          </div>
          {form.map((item) => (
            <div className="itemFlexTest">
              <span>{item.idtest}</span>
              <span>{item.cal}</span>
              <button onClick={() => navigate(`/studentListnotes/${item.student}-${item.idtest}`)}>
                Ver respuestas
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