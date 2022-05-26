import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged, getAuth} from "firebase/auth";

import Footer from "../components/Footer";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import { getCollection, onSnapshotData } from "../utils/crud";
import "./scss/ListTest.scss";

import FormRegisterStu from "../components/FormRegisterStu";

function TeacherCurse() {
  const { id } = useParams();
  const[ user, setUser] = useState("");
  const [form, setForm] = useState([]);
  const navigate = useNavigate();

  
  const getOnSnapshotCollection = async (collectionName, email) => {
    const col = getCollection(collectionName, email);
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
  onAuthStateChanged(getAuth(),  (user) => (user.photoURL==="teacher")?setUser(user):navigate('/validate/signup'))
    
  }, []);

  useEffect(() => {
    if (user.length !== 0){
      getOnSnapshotCollection("formRegister",user.email);
    }   
    }, [user]);

  return (
    <div className="ListTest">
      <Header />
      <div className="ListTestFLex">
        <SideMenu />
        {id !== "0" ?
        <FormRegisterStu email={user.email}/>
        :
        <div>
          <h1>LISTA DE CURSO DISPONIBLES</h1>
          <div className="itemFlexTest">
            <span>codigo</span>
            <span>Nombre de Curso</span>
            <span>DETALLE</span>
          </div>
          {form.map((item) => (
            <div className="itemFlexTest">
              <span>{item.id}</span>
              <span>{item.name}</span>
              <button onClick={() => navigate(`/teachercurse/${item.id}`)}>
                Ir a detalle
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
export default TeacherCurse;
