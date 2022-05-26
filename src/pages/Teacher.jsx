import { getAuth,onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { getCollection, onSnapshotData } from "../utils/crud";

import Footer from '../components/Footer';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import FormTeacher from '../components/FormTeacher';
  

function Teacher(){
    const[ user, setUser] = useState("");
    const [data, setData] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const getOnSnapshotCollection = async (collectionName, email) => {
        const col = getCollection(collectionName, email);
        onSnapshotData(col, (querySnapshot) => {
          const collection = [];
          querySnapshot.forEach((doc) => {
            collection.push(doc.data());
          });
          console.log("data", collection)
          setData(collection);
          
        });
      };

      useEffect(()=>{
        
        onAuthStateChanged(getAuth(), (user)=>setUser(user))
    },[] )

    useEffect(() => {
        if (user.length !== 0){
          getOnSnapshotCollection("form",user.email);
        }   
        }, [user]);
    
 return(
     <div className="ListTest">
      <Header />
    
      <div className="ListTestFLex">
        <SideMenu />
        {id!=="0"?
      <FormTeacher />
      :
        <div >
        <h1>LISTA DE FORMULARIO DISPONIBLES</h1>
        <div className="itemFlexTest">
              <span>codigo</span>
              <span>Nombre de Formulario</span>
              <span>DETALLE</span>
            </div>
          {data.map((item) => (
            <div className="itemFlexTest">
              <span>{item.id}</span>
              <span>{item.name}</span>
              <button onClick={() => navigate(`/teacher/${item.id}/${item.name}`)}>
                Iniciar prueba
              </button>
            </div>
          ))}
        </div>
    }
      </div>
      
      
      <Footer/>
  </div>
 )
}
export default Teacher