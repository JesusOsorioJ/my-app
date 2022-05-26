import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import {onSnapshotData, getIdCollection, randomString, updateDocument} from "../utils/crud"
import "./scss/SignUp.scss";


function Payments(){
    
    const navigate = useNavigate();
    const [payment, setPayment] = useState("5");
    const [pay, setPay] = useState({name:"",cod:"",number:""});
    const [error, setError] = useState("");
    const [allpayment, setAllpayment] = useState("");
    const [result, setResult] = useState("");

    

    
   const getOnSnapshotCollection1 = async (collectionName, id) => {
    const col = getIdCollection(collectionName, id);
    const unsubscribe = onSnapshotData(col, (doc) => {
      const collection = doc.data();
      console.log("setAllstudents", collection.data);
      setAllpayment(collection.data);
      
    });
    return unsubscribe;
  };

   useEffect(() => {
      getOnSnapshotCollection1("formTeacher", "allPayments");
  }, []);

  
  
  async function HandlerPayment(e){
    e.preventDefault();
    
    if( pay.name.length === 0 || pay.cod.length === 0 || pay.number.length === 0){
        return setError("Por favor digite todos los campo requerido")
    }
    const random = randomString(15)
    updateDocument("formTeacher", "allPayments", {data:[...allpayment, {id:random, time: pay.number}]})
    setResult(random)
}

 
   
    function HandlerOnChange(e){
    const {name, value} = e.target
    setError()
    setPay({...pay, [name]:value })
    if (name === "time"){
        setPayment(value)
    }
    }
   
   

  return (

    <div className="SignUp">
    <Header />
    {result.length>1?
    <form className="SignUpForm">
    <h2>PAGO DE SUSCRIPCION</h2>
        <h5>Este es tu codigo</h5>
        <br/>
        <h3>{result}</h3>
        <br/>
        <button className="buttonrienijfnj" onClick={()=>(navigate('/validate/signup'))} >IR A REGISTRO</button>
    </form>
    :
    <form className="SignUpForm" onClick={HandlerPayment}>
    <h2>PAGO DE SUSCRIPCION</h2>
        <h5>seccion de pago</h5>

        <h5>{`El pago sera de $${payment}`}</h5>
        <label htmlFor="time">Tiempo de suscripcion </label>
        <select name="time" id="time" onChange={HandlerOnChange}>
            <option value="5" selected>3 meses</option>
            <option value="7">6 meses</option>
            <option value="10">1 año</option>
            <option value="20">3 años</option>
        </select>      
        <label htmlFor="name">name</label>
        <input type="text" id="name" name="name" onChange={HandlerOnChange} placeholder="Ingrese su nombre nombre"/>
        <label htmlFor="number">numero de tarjeta</label>
        <input type="text" id="number" name="number" onChange={HandlerOnChange} placeholder="Ingrese el numero de tarjeta"/>
        <label htmlFor="cod">Numero de seguridad</label>
        <input type="password" id="cod" name="cod" onChange={HandlerOnChange} placeholder="Ingrese el numero de seguridad"/>
        <div>{error}</div>
        <button className="buttonrienijfnj">Enviar</button>
    </form>
    }
    <Footer />
    </div>
  )
}

export default Payments