import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import FormName from "../components/FormName";
import Form1 from "../components/Form1";
import "./scss/Head.scss" 


function Head() {
  // const [idformActive, SetIdFormActive] = useState();
  const {id, name} = useParams();
  console.log("idhola", id)
  const [titleName, setTitleName] = useState((id==="0"));

  return (
    <div className="Head">
      {titleName ? 
      (<FormName setTitleName={setTitleName} name={name} id={id} />)
      :
      (
        <>
        <div className="Head_flex">
          <div className="Head_titleFlex">{`Cuestionario:${name}`}</div>
          <button type="button" onClick={()=>(setTitleName(true))}>
            Cambiar
          </button>
        </div>
          {/* <Form1 id={id} idformActive={idformActive} /> */}
          <Form1 id={id} />
        </>
      )
    }
    </div>
  );
}
export default Head;
