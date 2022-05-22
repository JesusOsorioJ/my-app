import Form from "../components/Form";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getIdCollection, onSnapshotData } from '../utils/crud'
import "./scss/Form1.scss"

function FormQuestion() {
  const { id } = useParams();
  
  // const getOnSnapshotCollection = async(collectionName, id)=>{
  //       const col = getIdCollection( collectionName , id)
  //       const unsubscribe = onSnapshotData(col, (doc) => {
  //         const collection = doc.data();
  //           setQuestion(collection["data"])
  //       });
  //       return unsubscribe
  //   }
  //   useEffect(()=>{
  //     getOnSnapshotCollection('form',id)
  //   }
  //   ,[id]) 

    // cuando cree el intento se guarda hora de creacion de intento y esto se resta con la hora actual ===> tiempo total q
    // para tiempo por pregunta seria hacer handlerclick cunado se pase el tiempo
    // para que el prfesor presione y cierre pregunta


  return (
    <div className="FormQuestion">
       

  
        
    </div>
  );
}
export default FormQuestion;
