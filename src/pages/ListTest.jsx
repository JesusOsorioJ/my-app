import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth,onAuthStateChanged } from "firebase/auth";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SideMenu from "../components/SideMenu";
import { getAllCollection,onSnapshotData, getCollection } from "../utils/crud";
import "./scss/ListTest.scss";
function ListTest() {

  const [data, setData] = useState([]);
  const[ user, setUser] = useState("");
  const navigate = useNavigate();
  
  const getOnSnapshotCollection = async (collectionName, email) => {
    const col = getCollection(collectionName, email);
    console.log("email", email)
    onSnapshotData(col, (querySnapshot) => {
      const collection = [];
      querySnapshot.forEach((doc) => {
        collection.push(doc.data());
      });
      console.log("data", collection)
      setData(collection);
      
    });
  };
useEffect(() => {
  onAuthStateChanged(getAuth(), (user)=>setUser(user))
    
  }, []);

  useEffect(() => {
    if (user.length !== 0){
      getOnSnapshotCollection("form",user.email);
    }   
    }, [user]);
  

  return (
    <div className="ListTest">
      <Header />

      <div className="ListTestFLex">
        <SideMenu />
        <div >
        <h1>LISTA DE FORMULARIO DISPONIBLES</h1>
        <div className="itemFlexTest">
              <span>Codigo</span>
              <span>Nombre de Formulario</span>
              <span>DETALLE</span>
            </div>
          {data.map((item) => (
            <div className="itemFlexTest">
              <span>{item.id}</span>
              <span>{item.name}</span>
              <button onClick={() => navigate(`/testname/${item.id}/${item.name}`)}>
                Ir a detalle
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default ListTest;
