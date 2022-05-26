import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getIdCollection,
  onSnapshotData,
  getOneCollection,
  updateDocument
} from "../utils/crud";
import "./scss/FormTeacher.scss";

function FormTeacher() {
  const { id } = useParams();
  const abcd = "ABCDEFHI"
  const [ position, setPosition] = useState(-1);
  const [check, setCheck] = useState([]);
  const [form, setForm] = useState([]);
  const [idForm ,setIdForm] = useState();
  const [question, setQuestion] = useState([]);

  function onClickStatus(e){
    const { value, name } = e.target
    const mat = []
    let val
    if (value ) {
      check.map((item)=>((item.id === value)? mat.push({...item, status:!item.status}):mat.push({...item, status:false})))
      check.map((item,index)=>((item.id === value)&& (val = index) ))
      console.log("check[val].status",check[val].status)
      updateDocument('formActive', id, {data:[...mat]});
      if (check[val].status === false ){
        const filter = form.data.filter(item=>(item.id === value))[0]
        setQuestion(filter)
      }else{ setQuestion([])}
    } else if(parseInt(name)>=0 && parseInt(name)<check.length){
      check.map((item)=>(mat.push({...item, status:false})))
      mat[name]={...mat[name], status:true}
      setPosition(parseInt(name))
      updateDocument('formActive', id, {data:[...mat]});
      const filter = form.data[name]
      setQuestion(filter)
    } else  if (parseInt(name) === -1 || parseInt(name) === check.length){
      check.map((item)=>(mat.push({...item, status:false})))
      setPosition(parseInt(name))
      updateDocument('formActive', id, {data:[...mat]});
      setQuestion([])
    }
}

  const getOnSnapshotCollection = async(collectionName, id)=>{
        const col = getIdCollection( collectionName , id)
        const unsubscribe = onSnapshotData(col, (doc) => {
          const collection = doc.data();
          setIdForm(collection._id)
          setCheck([...collection.data])
        });
        return unsubscribe
    }
    useEffect(()=>{
      if(idForm){(getOneCollection('form', idForm)).then(response=>setForm(response))}
      getOnSnapshotCollection('formActive',id)
    }
    ,[idForm])

  // cuando cree el intento se guarda hora de creacion de intento y esto se resta con la hora actual ===> tiempo total q
  // para tiempo por pregunta seria hacer handlerclick cunado se pase el tiempo
  // para que el prfesor presione y cierre pregunta

  return (
    <div className="FormQuestion">
      <div className="FormQuestionButton">
      <button className="FormQuestionButtonHead" type="button" onClick={onClickStatus} name={position-1}>Atras</button>
      <button className="FormQuestionButtonHead" type="button" onClick={onClickStatus} name={position+1}>siguiente</button>
      <div>{(form.name!==undefined)&&form.name.toUpperCase()}</div>
      <div className="FormQuestionButtonRow">
    <div>SHORT ID</div>
    <div>PREGUNTA</div>
    <div>-</div>
    </div>
      {check.map(item=>(
        <div className="FormQuestionButtonRow1">
        <div>{item.id.slice(0,9)}</div>
        <div>{item.name}</div>
        <button type="button" onClick={onClickStatus} value={item.id}>{item.status?"true":"false"}</button>
        </div>
      ))}
      </div>
      <div className="FormQuestionShow">
      <div className="FormQuestionShowTitle">
        {question.name}</div>
        <div className="FormQuestionShowTitle2">
        {(question.id!==undefined)&&`cod. ${question.id.slice(0,9)}`}</div> 
        
      {question.options?.map((item, index)=>(
        
        <div className="FormQuestionShowRow">
        <div>{`${abcd[index]}. ${item.value}`}</div>
        <div>{item.correct&&"CORRECTA"}</div>
        </div>
      ))}
</div>
    </div>
  );
}
export default FormTeacher;
