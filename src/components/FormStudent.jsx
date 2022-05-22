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

  const getOnSnapshotCollection = async (collectionName, id) => {
    const col = getIdCollection(collectionName, id);
    const unsubscribe = onSnapshotData(col, (doc) => {
      const collection = doc.data();
      setCheck([...collection.data]);
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
    const { value } = e.target;
    setOptionValue(value);
  }
  async function HandlerResponse(e) {
    e.preventDefault();
    const data = {
      questionid: question.id,
      questionname: question.name,
      optionid: question.options[optionValue].codigo,
      optionname: question.options[optionValue].value,
      optioncorrect: question.options[optionValue].correct,
    };

    let mat = "";
    if (optionValue) {
      await getOneCollection("formStudent", `${id}-${idStudent}`).then(
        (response) =>
          response.data.map(
            (item) => item.questionid === data.questionid && (mat = "item")
          )
      );
      console.log("mat.lenght", mat.length);
      if (mat.length === 0) {
        await getOneCollection("formStudent", `${id}-${idStudent}`).then(
          (response) =>
            updateDocument("formStudent", `${id}-${idStudent}`, {
              data: [...response.data, data],
            }).then((document) => console.log("document", document))
        );
      }

      let cal = 0;
      await getOneCollection("formStudent", `${id}-${idStudent}`).then(
        (response) =>
          response.data.map(
            (item) => item.optioncorrect === true && (cal = cal + 1)
          )
      );
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
  }, []);

  useEffect(() => {
    const value = check.filter((item) => item.status === true)[0];
    if (value) {
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
            <form onSubmit={HandlerResponse}>
              <div>{question.name}</div>
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
