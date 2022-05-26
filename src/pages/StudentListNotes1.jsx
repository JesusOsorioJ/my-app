import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged, getAuth} from "firebase/auth";
import { collection, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase';


import { onSnapshotData,getIdCollection } from "../utils/crud";
import "./scss/ListTest.scss";



function StudentListNotes1 () {
  const { idtest } = useParams();
  const[ user, setUser] = useState("asas");
  const [form, setForm] = useState({data:[]});
  const navigate = useNavigate();


  
  const getOnSnapshotCollection = async (collectionName, idtest) => {
    const col = getIdCollection(collectionName, idtest);
    onSnapshotData(col, (doc) => {
      const collection = doc.data();
      setForm(collection);
    });
    
  };
useEffect(() => {
  onAuthStateChanged(getAuth(),  (user) => (user?.photoURL==="student")?setUser(user):navigate('/validate/signup'))
    
  }, []);

  useEffect(() => {
      getOnSnapshotCollection("formStudent",idtest);
    }, [user]);

  return (
        <div>
          <h1>{`${form.nametest}`}</h1>
          <div className="itemFlexTest">
            <span>PREGUNTA</span>
            <span>RESPUESTA</span>
            <span>NOTA</span>
          </div>
          {form?.data.map((item) => (
            <div className="itemFlexTest">
              <span>{item.questionname}</span>
              <span>{item.optionname}</span>
              <span>{item.optioncorrect}</span>
            </div>
          ))}
        </div>
  );
}
export default StudentListNotes1;