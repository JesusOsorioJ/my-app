import { useState, useEffect } from 'react';
import { getAuth,onAuthStateChanged } from "firebase/auth";
import './scss/Header.scss';
import { useNavigate } from "react-router-dom";
import {logOutAccount} from "../utils/login"

function Header() {
  
const navigate = useNavigate();
  const[ user, setUser] = useState("");
      useEffect(()=>{
          onAuthStateChanged(getAuth(), (user)=>user&&setUser(user))
      },[] )
  

  return (
    <div className="Header">
      <div className="Headerleft">
        <li><button className="HeaderleftLiTitle" onClick={()=>(navigate('/'))}>MI APP</button></li>
        <li><button onClick={()=>(navigate('/'))}>HOME</button></li>
      </div>
      <div className="HeaderRight">
          {user.length===0?
        <>
            <li><button onClick={()=>(navigate('/payments'))}>PAGO</button></li>
            <li><button onClick={()=>(navigate('/validate/signup'))}>REGISTRARSE</button></li>
            <li><button onClick={()=>(navigate('/validate/login'))}>INICIAR SESION</button></li>
        </> 
        : 
          <li><button>{(user.email).toUpperCase()}</button>
        <ul>
            <li><button onClick={()=>(logOutAccount(user.uid))}>CERRAR SESION</button></li>
        </ul>  
        </li>
        }
            
      </div>

    
    </div>

  );
}

export default Header;