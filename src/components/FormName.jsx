import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./scss/FormName.scss";

import { addDocument, updateDocument } from "../utils/crud"

function FormName({ setTitleName, id, name }) {
  const navigate = useNavigate();
  const [form, setForm] = useState("");
  const [ error, setError ] = useState()

  function HandlerOnSubmit(e) {
    e.preventDefault();
    if (form.length === 0){
      return setError("Campo requerido")
    }
    if (form.length <= 4){
      return setError("El formulario debe tener al menos 5 letras")
    }
    
    setTitleName(false)
    ((id==="0")?addDocument('form',{name:form }).then(document=>(navigate(`/home/${document.id}/${document.name}`)))
    :
    updateDocument('form', id, {name:form}).then(document=>(navigate(`/home/${id}/${form}`))))

    
  }

  function handlerOnChange(e) {
    const { value } = e.target;
    setForm(value);
    if (value.length > 0){
      setError()
    }
  }

  return (
    <div className="FormName">
      <form onSubmit={HandlerOnSubmit} action>
        <div className="titulo_FormName">Formulario</div>
        <div className="texto_FormName">{(name==="0")?"Crea tu nuevo formulario":"Cambia el nombre"}</div>
        <input
          name="name"
          placeholder={(name==="0")?"Ingresa nombre de nuevo formulario": name}
          type="text"
          onChange={handlerOnChange}
        />
        <h1>{error}</h1>
        <div className="button_flex">
          <button type="button">atras</button>
          <button type="submit">{(name==="0")?"Guardar":"Cambiar"}</button>
        </div>
      </form>
    </div>
  );
}

export default FormName;
