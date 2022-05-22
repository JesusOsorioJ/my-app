import { useState } from "react";
import { useParams } from 'react-router-dom';
import {  updateDocument, randomString } from '../utils/crud'
import "./scss/Form.scss";

function Form({ setValue, value, setQuestion, question, 
  id, form, setForm, editId, setEditId}) {
 
  const [input, setInput] = useState({ value: "" });
  const [ error, setError ] = useState();
  const [ freeQuestion, setFreeQuestion] =  useState(false);
  const [ freeQuestion1, setFreeQuestion1] =  useState(false);

  function HandlerOnClick(e) {
    e.preventDefault();
    if (input.value.length === 0){
      return setError("El campo es requerido")
      
    }
    if (input.value.length <= 4){
      return setError("La opcion debe tener al menos 3 letras")
    }
    setForm([...form, input]);
    setInput({ value: "" });
  }

  function HandlerForm() {
    let question1;
    
    const trueanswer = form.filter(item=>(item.correct===true))
    if (trueanswer.length === 0 && !freeQuestion) {
      return setError("Debe tener al menos una opcion marcada")
    }
    if (editId !== null){
      const editchange = question.filter(item=>(item.id!==editId))
      question1 = {data:[...editchange, { name: value, id:editId, options: [...form] }]}
    } else{
      question1 = {data:[...question, { name: value, id:randomString(20), options: [...form] }]}
    } 
    console.log("question1.data", question1.data)
    setQuestion(question1.data);
    updateDocument('form', id, question1).then(document=>(document));
    let mat = []
    question1.data.map(item=> mat.push({ name: item.name, id: item.id, status:false }))
    console.log("mat = []", mat,   )
    console.log("idActive", id)
    updateDocument('formActive', id , {data:[...mat]}).then(document=>(document))
    setValue();
    setForm([]);
    setEditId(null)
  }

  function HandlerFreeQuestion(){
    setFreeQuestion(true);
  }
  function HandlerFreeQuestion1(){
    setFreeQuestion1(true);
  }

  function HandlerEliminate(e) {
    const { value } = e.target;
    const eliminate = form.filter((item) => !(item.codigo === value));
    setForm(eliminate);
  }

  function HandlerCorrect(e){
    const { value } = e.target;
    const mat = []
    form.map((item)=>((item.codigo === value)? mat.push({...item, correct:!item.correct}):mat.push(item)))
    setForm (mat)
  }

  function HandlerOnChange(e) {
    const { value, name } = e.target;
    if (input.length > 0){
      setError()
    }
    setInput({ codigo: name, value: value, correct:false });
  }
  return (
    <div className="Form">
      {form?.map((option) => (
        <div className="FormOptions">
          <p>{option.value}</p>
          <button
            type="button"
            value={option.codigo}
            onClick={HandlerEliminate}
          >
            X
          </button>
          <button
            type="button"
            value={option.codigo}
            onClick={HandlerCorrect}
          >
            {option.correct?"Quitar":"Poner"}
          </button>
          
        </div>
      ))}

      
      {freeQuestion?
      <>
      {!freeQuestion1?
      <>
      <h3>Desea añadir una respuesta comparativa</h3>
      <button type="button" onClick={HandlerForm}>Enviar formulario </button>
      <button type="button" onClick={HandlerFreeQuestion1}>Añadir respuesta comparativa </button>
      </>
      :
      <>
      <textarea onChange={HandlerOnChange} ></textarea>
      <button type="button" onClick={HandlerForm}>Enviar respuesta</button>
      </>
      
      }
      </>
     :
     <>
      {(form.length===0)&&
      (<button type="button" onClick={HandlerFreeQuestion} value="FreeQuestion">Agregar pregunta con Input libre</button>)
      }
      <form onSubmit={HandlerOnClick}>
        <input
          onChange={HandlerOnChange}
          name={parseInt(Math.random() * 1000000, 10)}
          value={input?.value}
          placeholder={`Ingrese opcion ${form?.length+1}`}
        />
        <button type="submit">Agregar</button>
        <div>{error}</div>
      </form>
      <button type="button" onClick={HandlerForm}>
        Agregar Formulario
      </button>
    </>
     }
    </div>
  );
}

export default Form;
