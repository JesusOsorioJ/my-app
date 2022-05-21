import Form from "../components/Form";
import { useState } from "react";
import "./scss/Form1.scss"

function FormQuestion({id}) {
  const [question, setQuestion] = useState([]);
  const [value, setValue] = useState();
  const [editValue, setEditValue] = useState(false);
  const [change, setChange] = useState({});

  function HandlerOnClick(e) {
    e.preventDefault();
    setValue(change);
  }

  function HandleEditValue(e){
    e.preventDefault();
    setValue(change);
    setEditValue(false)
  }

  function HandlerOnChange(e) {
    const { value } = e.target;
    setChange(value);
  }

  return (
    <div className="FormQuestion">
  
        <form className="titleEdit" onSubmit={HandlerOnClick}>
          <input
            placeholder="Ingrese nueva pregunta"
            onChange={HandlerOnChange}
          />
          <button type="submit">Agregar pregunta</button>
        </form>
    </div>
  );
}
export default FormQuestion;
