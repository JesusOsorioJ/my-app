import Form from "../components/Form";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getIdCollection,
  onSnapshotData,
  getOneCollection,
  addOneDocument,
  updateDocument,
} from "../utils/crud";
import "./scss/Form1.scss";

function FormQuestion() {
  const idStudent = "3e23e23e5tt6y665y";
  const { id } = useParams();
  const [check, setCheck] = useState([]);
  const [form, setForm] = useState([]);
  const [question, setQuestion] = useState([]);
  const [exist, setExist] = useState(false);
  const [error, setError] = useState("");
  const [optionValue, setOptionValue] = useState();
  const [message, setMessage] = useState("Formulario cerrado");
  const [ formstudent, setFormstudent] = useState([]);

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
    await addOneDocument("formStudent", `${id}-${idStudent}`, {
      name: form.name,
      id: id,
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
    if (optionValue.value) {
      formstudent.map((item) => item.questionid === data.questionid && (mat = "item") )
      ;
      if (mat.length === 0) {
          updateDocument("formStudent", `${id}-${idStudent}`, {
            data: [...formstudent, data],
            }).then((document) => console.log("document", document))
      }

      let cal = cont;
      formstudent.map((item) => (cal = cal + item.optioncorrect ))
      updateDocument("formStudent", `${id}-${idStudent}`, {
        cal: cal / check.length,
      });

      setOptionValue();
      setQuestion();
      setMessage("Formulario recibido espere proxima pregunta");
    } else {
      setError("Agrege un valor al cuestionario");
    }
  }


    useEffect(() => {
    getOneCollection("formStudent", `${id}-${idStudent}`).then(
      (response) => response && setExist(true)
    );
    getOneCollection("form", id).then((response) => setForm(response));
    getOnSnapshotCollection("formActive", id);
    getOnSnapshotCollection1("formStudent",`${id}-${idStudent}`);
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
    <div className="FormQuestion">
      {exist ? (
        <>
          {exist === true ? "true" : "flase"}
          {question ? (
            <>
              <div>{question.name}</div>
              {question.options[0].codigo.substring(0, 8) === "TextArea" ? (
                <form onSubmit={HandlerResponse}>
                  <textarea
                    name="TextArea"
                    id="te"
                    cols="30"
                    rows="10"
                    placeholder="Digite respuesta de pregunta"
                    onChange={HandlerOnChange}
                  />
                  <button type="submit">Enviar</button>
                </form>
              ) : (
                <form onSubmit={HandlerResponse}>
                  {question.options?.map((item, index) => (
                    <>
                      <input
                        type="radio"
                        id={item.codigo}
                        name={question.name}
                        onClick={HandlerOnChange}
                        value={index}
                      />
                      <label for={item.codigo}>{item.value}</label>
                    </>
                  ))}
                  <button type="submit">Enviar</button>
                  <h3>{error}</h3>
                </form>
              )}
            </>
          ) : (
            <div>{message}</div>
          )}
        </>
      ) : (
        <button type="button" className="" onClick={HandlerCreateDocument}>
          Comenzar Formulario
        </button>
      )}
    </div>
  );
}
export default FormQuestion;

//que el profe pueda modificar el value crear el value hecha
// que se pueda input libre y comparar con input libre hecha
// por los de pregunta con tiempo mañana o proxima version
// que al recargar no apesca la pregunta mandada hecho

// if (optionValue.value) {
//   await getOneCollection("formStudent", `${id}-${idStudent}`).then(
//     (response) =>
//       response.data.map(
//         (item) => item.questionid === data.questionid && (mat = "item")
//       )
//   );

//   if (mat.length === 0) {
//     await getOneCollection("formStudent", `${id}-${idStudent}`).then(
//       (response) =>
//         updateDocument("formStudent", `${id}-${idStudent}`, {
//           data: [...response.data, data],
//         }).then((document) => console.log("document", document))
//     );
//   }

//   let cal = 0;
//   await getOneCollection("formStudent", `${id}-${idStudent}`).then(
//     (response) =>
//       response.data.map(
//         (item) => (cal = cal + item.optioncorrect )
//       )
//   );