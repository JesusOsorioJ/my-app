import Form from "../components/Form";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getIdCollection, onSnapshotData, getOneCollection, addOneDocument, updateDocument } from '../utils/crud'
import "./scss/Form1.scss"

function FormQuestion() {
  const idStudent= "3e23e23e5tt6y665y"
  const { id } = useParams();
  const [check, setCheck] = useState([]);
  const [form, setForm] = useState([]);
  const [question, setQuestion] = useState([]);
  const [exist ,setExist] = useState();
  const [optionValue ,setOptionValue] = useState();
  
  const getOnSnapshotCollection = async(collectionName, id)=>{
    const col = getIdCollection( collectionName , id)
    const unsubscribe = onSnapshotData(col, (doc) => {
      const collection = doc.data();
      setCheck([...collection.data])
    });
    return unsubscribe
}

async function HandlerCreateDocument(){
  await addOneDocument('formStudent', `${id}-${idStudent}`, {name:form.name});
  setExist(true)
}

function HandlerOnChange(e){
  const idOp = e.target.id
  setOptionValue(idOp)
}
function HandlerResponse(e){
  e.preventDefault();
  console.log()
  updateDocument('formStudent', `${id}-${idStudent}`,{[question.id]:{opcion:optionValue}}).then(document=>(document));
}


useEffect(()=>{
  getOneCollection('formStudent', `${id}-${idStudent}` ).then(response=>setExist(true))
  getOneCollection('form', id).then(response=>setForm(response))
  getOnSnapshotCollection('formActive',id)

}
,[])

useEffect(()=>{
  console.log("form.data", form.data)
  const value = check.filter(item=>(item.status===true))[0]
  if (value){
  const filter = form.data?.filter(item=>(item.id === value.id))[0]
  setQuestion(filter)
  }else{setQuestion()}
}
,[check])

  return (
    <div className="FormQuestion">
      {exist?
      <>
      {question?
      <form onSubmit={HandlerResponse}>
      <div>{question.name}</div>
      {question.options?.map(item=>(
        <>
        <input type="radio" id={item.codigo} onClick={HandlerOnChange} name={question.id} />
        <label for={item.codigo} >{item.value}</label>
        </>
      ))}
      <button type="submit">Enviar</button>
      </form>
    :
    <div>Formulario cerrado</div>
    }
      </>
      :
      <button type="button" className="" onClick={HandlerCreateDocument}>Comenzar Formulario</button>
     }
      
       
       
      
  
        
    </div>
  );
}
export default FormQuestion;
