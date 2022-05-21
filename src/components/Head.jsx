import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import FormName from "../components/FormName";
import FormQuestion from "../components/FormQuestion";
import Form1 from "../components/Form1";
import "./scss/Head.scss" 


function Head() {
  const {id, name} = useParams();
  const [titleName, setTitleName] = useState((id==="0"));

  return (
    <div className="Head">
      {titleName ? 
      (<FormName setTitleName={setTitleName} name={name} id={id}/>)
      :
      (
        <>
        <div className="Head_flex">
          <div className="Head_titleFlex">{`Cuestionario:${name}`}</div>
          <button type="button" onClick={()=>(setTitleName(true))}>
            Cambiar
          </button>
        </div>
          <Form1 id={id} />
          {/* <FormQuestion id={id} /> */}
        </>
      )
    }
    </div>
  );
}
export default Head;
