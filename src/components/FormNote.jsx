import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getIdCollection, onSnapshotData, getOneCollection, addOneDocument, updateDocument } from '../utils/crud'
import "./scss/FormNote.scss"
import { collection, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";


function FormNote({id}) {
  const [form, setForm] = useState([]);
  const [ optionValue, setOptionValue] = useState([]);
  const [value, setValue] = useState();
  
  const getOnSnapshotCollection = async(collectionName, id)=>{
    const col = query(
      collection(db, collectionName),
      where("idtest", "==", id)
    );
    onSnapshotData(col, (querySnapshot) => {
      const collection = [];
      querySnapshot.forEach((doc) => {
        collection.push(doc.data());
      });
      setForm(collection[0]);
    });
  }


function HandlerModific(e){
  const { name } = e.target
  setOptionValue(name)
}

function HandlerOnChange(e){
  const { value } = e.target
  setValue (value)
  console.log("value", value)
}

function HandlerSubmit(e){
  e.preventDefault();
  let mat = []
  let cont = 0
  form.data.map(item=>(optionValue===item.questionid)?mat.push({...item, optioncorrect : parseFloat(value)}):mat.push( {...item} ))
  mat.map(item=>(cont = cont+item.optioncorrect))
  updateDocument('formStudent', id ,{data:[...mat]}).then(document=>(document));
  updateDocument('formStudent', id ,{cal:cont})
}


useEffect(()=>{
  // getOneCollection('form', id).then(response=>response&&setForm(response))
  getOnSnapshotCollection('formStudent',id)
}
,[])


  return (
    <div className="FormNote">
      <div className="FormNoteTitle">{form?.name}</div>
      <h3>{`Nota final ${form?.cal}`}</h3>
      <div className="FormNoteHead">
      {form.data?.map((item, index)=>(
        <div className="FormNoteInput">
          <div className="FormNoteInput1">
        <div>{`${index+1}. ${item.questionname}`}</div>
        <div>{`${item.optiontext?"Texto":"Opcion"} ${item.optionname}`}</div>
        </div>
        <div className="FormNoteInput1">
        <div>{`cal ${item.optioncorrect}`}</div>
        
        
        
        { (optionValue === item.questionid)?

        <form onSubmit={HandlerSubmit}>
          <input type="text" name="" id="" onChange={HandlerOnChange} placeholder="Nota"/>
        <button type="submit">Agregar</button>
        
        </form>
        :
        <button type="button" name={item.questionid} onClick={HandlerModific}>Modificar</button>
        }
        </div>
        {/* que botton se quede quieto cuando se despliegue -------------w-----------------  */}
        {/* Agregar error de editar debe tener. y no , y ser entre 1 y 0 */}
        {/* <input type="radio" id={item.codigo} onClick={HandlerOnChange} name={question.id} />
        <label for={item.codigo} >{item.value}</label> */}
        </div>
      ))}
      </div>
      
    </div>
  );
}
export default FormNote;
