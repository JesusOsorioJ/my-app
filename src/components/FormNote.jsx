import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getIdCollection, onSnapshotData, getOneCollection, addOneDocument, updateDocument } from '../utils/crud'
import "./scss/Form1.scss"

function FormNote({id}) {
  const [form, setForm] = useState([]);
  const [ optionValue, setOptionValue] = useState([]);
  const [value, setValue] = useState();
  
  const getOnSnapshotCollection = async(collectionName, id)=>{
    const col = getIdCollection( collectionName , id)
    const unsubscribe = onSnapshotData(col, (doc) => {
      const collection = doc.data();
      setForm(collection)
      console.log(collection)
    });
    return unsubscribe
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
  getOneCollection('form', id).then(response=>setForm(response))
  getOnSnapshotCollection('formStudent',id)
}
,[])


  return (
    <div className="FormNote">
      <div>{form?.name}</div>
      <h3>{form?.cal}</h3>
      {form.data?.map(item=>(
        <>
        <div>{item.questionid}</div>
        <div>{item.questionname}</div>
        <div>{item.optionname}</div>
        <div>{item.optioncorrect}</div>
        <div>{item.optiontext}</div>
        
        { (optionValue === item.questionid)?

        <form onSubmit={HandlerSubmit}>
        <button type="submit">Agregar</button>
        <input type="text" name="" id="" onChange={HandlerOnChange} />
        </form>
        :
        <button type="button" name={item.questionid} onClick={HandlerModific}>Modificar</button>
        }
        <br/>
        <br/>
        {/* que botton se quede quieto cuando se despliegue -------------w-----------------  */}
        {/* Agregar error de editar debe tener. y no , y ser entre 1 y 0 */}
        {/* <input type="radio" id={item.codigo} onClick={HandlerOnChange} name={question.id} />
        <label for={item.codigo} >{item.value}</label> */}
        </>
      ))}
      
    </div>
  );
}
export default FormNote;
