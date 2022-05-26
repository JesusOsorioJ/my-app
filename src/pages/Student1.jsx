import Footer from "../components/Footer";
import Header from "../components/Header";
import FormStudent from "../components/FormStudent";
import SideMenu1 from "../components/SideMenu1";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged, getAuth} from "firebase/auth";


import { onSnapshotData, getIdCollection } from "../utils/crud";
import "./scss/ListTest.scss";


function Student1(){

    const [form, setForm] = useState([]);
    const { id, id1  } = useParams();
    const navigate = useNavigate();

    const getOnSnapshotCollection = async (collectionName, id) => {
  
        const col = getIdCollection(collectionName, id);
        onSnapshotData(col, (doc) => {
          const collection = doc.data();
          console.log("collection", collection)
          setForm(collection.form);
      })
    }


      useEffect(() => {
          getOnSnapshotCollection("formRegister", id); 
        }, []);

        return(
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
              <button onClick={() => navigate(`/student/test/${id}/${item.id}`)}>
                Ir a detalle
              </button>
            </div>
          ))}
        </div>
        )
}

export default Student1;