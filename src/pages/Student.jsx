import Footer from "../components/Footer";
import Header from "../components/Header";
import FormStudent from "../components/FormStudent";
import SideMenu1 from "../components/SideMenu1";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged, getAuth} from "firebase/auth";

import Student1 from "./Student1"


import { onSnapshotData, getIdCollection } from "../utils/crud";
import "./scss/ListTest.scss";

function Student() {
  const { type, id  } = useParams();
  const[ user, setUser] = useState({email:""});
  const [form, setForm] = useState([]);
  const navigate = useNavigate();

  const getOnSnapshotCollection = async (collectionName, id) => {
  
    const col = getIdCollection(collectionName, id);
    onSnapshotData(col, (doc) => {
      const collection = doc.data();
      let mat = []
      collection.data.map(item=>(item.email===user.email)&&mat.push(item))
      setForm(mat[0].course);
  })
   
}
  useEffect(() => {
  onAuthStateChanged(getAuth(),(user) => (user?.photoURL==="student")?setUser(user):navigate('/validate/signup'))

  
  }, []);
  
  useEffect(() => {
      getOnSnapshotCollection("formRegister","allstudents");
    }, [user]);

    return(
    <div className="ListTest">
      <Header />
      <div className="ListTestFLex">
        <SideMenu1 />
        {id !== "0" ?
        <>
        {type !== "curse" ?
        <FormStudent />
        :
        <Student1 />
        }
        </>
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
              <button onClick={() => navigate(`/student/curse/${item.id}/0`)}>
                Examenes
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
export default Student;




