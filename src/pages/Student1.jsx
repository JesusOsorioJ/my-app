
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { onSnapshotData, getIdCollection } from "../utils/crud";
import "./scss/ListTest.scss";


function Student1(){

    const [form, setForm] = useState([]);
    const { id } = useParams();
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
          <h1>LISTA DE EXAMENES DISPONIBLES</h1>
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
                Ingresar
              </button>
            </div>
          ))}
        </div>
        )
}

export default Student1;
