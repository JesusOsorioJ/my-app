import Form from "../components/Form";
import { useState, useEffect } from "react";
import "./scss/Form1.scss"
import { getIdCollection, onSnapshotData } from '../utils/crud'

function Form1({id}) {
  const [question, setQuestion] = useState([]);
  const [value, setValue] = useState();
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState(false);
  const [change, setChange] = useState({});
  const [form, setForm] = useState([]);
  const [ error, setError ] = useState("");

  function HandlerOnClick(e) {
    e.preventDefault();
    if (change.length === 0){
      return setError("El campo es requerido")
    }
    console.log("change.length",change.length)
    if (change.length <= 4){
      return setError("La pregunta debe tener al menos 5 letras")
    }
    setValue(change);
  }

  function HandleEditValue(e){
    e.preventDefault();
    setValue(change);
    setEditValue(false)
  }

  function HandlerOnChange(e) {
    const { value } = e.target;
    if (value.length > 0){
      setError()
    }
    setChange(value);
  }

  function HandlerEditQuestion(e){
    const { value } = e.target;
    const filters = question.filter(questiones=>(questiones.id === value));
    setForm( filters[0]["options"]);
    setValue(filters[0]["name"]);
    setEditId(filters[0]["id"])
  }

  
const getOnSnapshotCollection = async(collectionName, id)=>{
        const col = getIdCollection( collectionName , id)
        const unsubscribe = onSnapshotData(col, (doc) => {
          const collection = doc.data();
            setQuestion(collection["data"])
        });
        return unsubscribe
    }

  useEffect(()=>{
        getOnSnapshotCollection('form',id)
      }
      ,[id])

  return (
    <div className="Form1">
    {question?.map((item,index)=>(
      <div>
      <div>{`Pregunta ${index+1}. ${item.name}`}</div>
      <button onClick={HandlerEditQuestion} value={item.id}>Editar</button>
      {item.options.map((option)=>(
        <div>{option.value}</div>
      ))}
      </div>
    ))}
    <div className="Form1-Container">
      {value ? (
        <>
          {editValue?
          <form className="titleEdit" onSubmit={HandleEditValue}>
          <input
            placeholder={value}
            onChange={HandlerOnChange}
          />
          <button type="submit">Modificar</button>
          </form>
          :
          <div className="titleEdit">
          <p>{value}</p>
          <button type="button" onClick={()=>(setEditValue(true))}>Editar</button>
          </div>
          }
          <Form 
          id={id}
          value={value}
          setValue={setValue} 
          question={question}
          setQuestion={setQuestion}
          form={form}
          setForm={setForm}
          editId={editId}
          setEditId={setEditId}
          />
        </>
      ) : (
        <form className="titleEdit" onSubmit={HandlerOnClick}>
          <input
            placeholder="Ingrese nueva pregunta"
            onChange={HandlerOnChange}
          />
          <button type="submit">Agregar pregunta</button>
          <div>{error}</div>
        </form>
      )}
      </div>
    </div>
  );
}
export default Form1;
