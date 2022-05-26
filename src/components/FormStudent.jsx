import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getIdCollection,
  onSnapshotData,
  getOneCollection,
  addOneDocument,
  updateDocument,
} from "../utils/crud";
import "./scss/FormStudent.scss";
import { onAuthStateChanged, getAuth} from "firebase/auth";

function FormQuestion() {

  
  const { id, id1 } = useParams();
  const [check, setCheck] = useState([]);
  const [form, setForm] = useState([]);
  const [question, setQuestion] = useState([]);
  const [exist, setExist] = useState(false);
  const [error, setError] = useState("");
  const [optionValue, setOptionValue] = useState({value:""});
  const [message, setMessage] = useState("Formulario cerrado");
  const [ formstudent, setFormstudent] = useState([]);
  const[ user, setUser] = useState("asas");

  const getOnSnapshotCollection = async (collectionName, id) => {
    const col = getIdCollection(collectionName, id);
    const unsubscribe = onSnapshotData(col, (doc) => {
      const collection = doc.data();
      setCheck([...collection.data]);
    });
    return unsubscribe;
  };
  
  
  const getOnSnapshotCollection1 = async (collectionName, id) => {
    const col = getIdCollection(collectionName, id);
    const unsubscribe = onSnapshotData(col, (doc) => {
      const collection = doc.data();
      setFormstudent([...collection.data]);
    });
    return unsubscribe;
  };

  async function HandlerCreateDocument() {
    
    await addOneDocument("formStudent", `${user}-${id1}`, {
      student: user,
      idcurse:id,
      idtest:id1,
      data: [],
    });
    setExist(true);
  }

  function HandlerOnChange(e) {
    const { value, name } = e.target;
    setOptionValue({ value:value, name:name }); 
  }

  async function HandlerResponse(e) {
    e.preventDefault();
    if (optionValue.value.length!==0) {
    let cont = 0
    if  (optionValue.name === "TextArea"){
      const valor = question.options[0].value.split(" ")
      const valor1= optionValue.value.split(" ")
      const total = valor.map((item)=>{
        let valor = false
        valor1.map(item1=> (item.toLowerCase()===item1.toLowerCase())&&(valor=true))
        return valor
      })
      total.map(item=>((item)&&(cont=cont+1)))
      cont = cont/valor.length
    }

    const data = {
      questionid: question.id,
      questionname: question.name,
      optionid: question.options[(optionValue.name==="TextArea")?0:optionValue.value].codigo,
      optionname: question.options[(optionValue.name==="TextArea")?0:optionValue.value].value,
      optioncorrect: optionValue.name==="TextArea"?cont:(question.options[optionValue.value].correct?1:0),
      optiontext: optionValue.name==="TextArea"?optionValue.value:null,
    };

    let mat = "";
    
      formstudent.map((item) => item.questionid === data.questionid && (mat = "item") )
      ;
      if (mat.length === 0) {
          updateDocument("formStudent", `${user}-${id1}`, {
            data: [...formstudent, data],
            }).then((document) => console.log("document", document))
      }

      let cal = cont;
      formstudent.map((item) => (cal = cal + item.optioncorrect ))
      updateDocument("formStudent", `${user}-${id1}`, {
        cal: cal / check.length,
      });

      setOptionValue();
      setQuestion();
      setMessage("Formulario recibido espere proxima pregunta");
    } else {
      console.log("error",error)
      setError("Agrege un valor al cuestionario");
    }
  }


    useEffect(() => {
    getOneCollection("formStudent", `${user}-${id1}`).then(
      (response) => response && setExist(true)
    );
    onAuthStateChanged(getAuth(), (user)=>user&&setUser(user))
    getOneCollection("form", id1).then((response) => setForm(response));
    getOnSnapshotCollection("formActive", id1);
    getOnSnapshotCollection1("formStudent",`${user}-${id1}`);
  }, []);

  useEffect(() => {
    const value = check.filter((item) => item.status === true)[0];
    const value1 = formstudent.filter(item=> value.id === item.questionid)
    
    if (value && value1.length === 0 ) {
      const filter = form.data?.filter((item) => item.id === value.id)[0];
      setQuestion(filter);
    } else {
      setQuestion();
    }
  }, [check]);

  return (
    <div className="FormStudent">
      {exist ? (
        <>
          {question ? (
            <div className="FormStudentBox">
              <div>{question.name}</div>
              {question.options[0].codigo.substring(0, 8) === "TextArea" ? (
                <form onSubmit={HandlerResponse}>
                  <textarea
                    name="TextArea"
                    id="TextArea"
                    cols="20"
                    rows="5"
                    placeholder="Digite respuesta de pregunta"
                    onChange={HandlerOnChange}
                  />
                  <button type="submit">Enviar</button>
                </form>
              ) : (
                <form onSubmit={HandlerResponse}>
                  {question.options?.map((item, index) => (
                    <div className="FormStudentBoxRow">
                      <input
                        type="radio"
                        id={item.codigo}
                        name={question.name}
                        onClick={HandlerOnChange}
                        value={index}
                      />
                      <label for={item.codigo}>{item.value}</label>
                    </div>
                  ))}
                  <button type="submit">Enviar</button>
                  <h3>{error}</h3>
                </form>
              )}
            </div>
          ) : (
            <div className="FormStudentMessage">{message}</div>
          )}
        </>
      ) : (
        <button className="FormStudentButtonCreate" type="button" onClick={HandlerCreateDocument}>
          Comenzar Formulario
        </button>
      )}
    </div>
  );
}
export default FormQuestion;

