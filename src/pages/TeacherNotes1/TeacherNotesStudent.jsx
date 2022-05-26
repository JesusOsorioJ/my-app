import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth,onAuthStateChanged } from "firebase/auth";

import { getAllCollection,onSnapshotData, getCollection } from "../../utils/crud";
import "../scss/ListTest.scss";

function TeacherNotesStudent() {

  const [data, setData] = useState([]);
  const[ user, setUser] = useState("");
  const navigate = useNavigate();
  
  const getOnSnapshotCollection = async (collectionName, email) => {
    const col = getCollection(collectionName, email);
    console.log("email", email)
    onSnapshotData(col, (querySnapshot) => {
      const collection = [];
      querySnapshot.forEach((doc) => {
        collection.push(doc.data());
      });
      console.log("data", collection)
      setData(collection);
      
    });
  };
useEffect(() => {
  onAuthStateChanged(getAuth(), (user)=>setUser(user))
    
  }, []);

  useEffect(() => {
    if (user.length !== 0){
      getOnSnapshotCollection("formRegister",user.email);
    }   
    }, [user]);
  

  return (
    <div className="ListTest">
      <div className="TeacherTestFLex">
        <div >
        <h1>LISTA DE CURSOS DISPONIBLES</h1>
        <div className="itemFlexTest">
              <span>codigo</span>
              <span>Nombre de curso</span>
              <span>DETALLE</span>
            </div>
          {data.map((item) => (
            <div className="itemFlexTest">
              <span>{item.id}</span>
              <span>{item.name}</span>
              <button onClick={() => navigate(`/teachernotes/curse/${item.id}`)}>
                Ir a detalle
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TeacherNotesStudent;