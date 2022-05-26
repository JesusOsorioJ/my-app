import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getAuth,onAuthStateChanged } from "firebase/auth";

import { getAllCollection,
  onSnapshotData,
  getIdCollection,
   getCollection, 
   updateDocument } from "../utils/crud";
import "./scss/FormRegisterStu.scss";
import "../pages/scss/ListTest.scss";

function FormRegisterStu1({setAddTest}) {

  const [data, setData] = useState([]);
  const [form, setForm] = useState([]);
  const[ user, setUser] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  
  const getOnSnapshotCollection = async (collectionName, email) => {
    const col = getCollection(collectionName, email);
    onSnapshotData(col, (querySnapshot) => {
      const collection = [];
      querySnapshot.forEach((doc) => {
        collection.push(doc.data());
      });
      console.log("data", collection)
      setData(collection);
      
  });};

  const getOnSnapshotCollection1 = async (collectionName, id) => {
    const col = getIdCollection(collectionName, id);
    const unsubscribe = onSnapshotData(col, (doc) => {
      const collection = doc.data();
      setForm(collection);
      console.log("collection regsister stu1", collection);
    });
    return unsubscribe;
  };

useEffect(() => {
  onAuthStateChanged(getAuth(), (user)=>setUser(user))
    
  }, []);

  useEffect(() => {
    if (user.length !== 0){
      getOnSnapshotCollection("form",user.email);
      getOnSnapshotCollection1("formRegister", id);
    }   
    }, [user]);


    function HandlerUpdate(idtest, name){
      console.log("form.form", form.form)
      updateDocument("formRegister", id, { form:[...form.form, {name:name, id:idtest}]});
      setAddTest(false)
      console.log("entro en handler update")
      navigate(`/teachercurse/${id}`)
    }
  

  return (
    <div className="ListTest">
      <div className="FormRegisterStu1FLex">
        <div >
        <h1>LISTA DE FORMULARIO DISPONIBLES</h1>
        <div className="itemFlexTest">
              <span>codigo</span>
              <span>Nombre de Formulario</span>
              <span>DETALLE</span>
            </div>
          {data.map((item) => (
            <div className="itemFlexTest">
              <span>{item.id}</span>
              <span>{item.name}</span>
              <button onClick={()=>(HandlerUpdate(item.id, item.name))}>
                Agregar a curso
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default FormRegisterStu1;
