import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuth,onAuthStateChanged } from "firebase/auth";

import FormName from "./FormName";
import Header from "./Header";
import Footer from "./Footer";
import Form1 from "./Form1";
import SideMenu from "./SideMenu";
import "./scss/TestName.scss";

function TestName() {
  // const [idformActive, SetIdFormActive] = useState();
  const { id, name } = useParams();
  const [titleName, setTitleName] = useState(id === "0");
  const[ user, setUser] = useState("");


  useEffect(() => {
  onAuthStateChanged(getAuth(), (user)=>setUser(user))
    
  }, []);


  return (
    <div className="TestName">
      <Header />
      <div className="TestNameFlex">
        <SideMenu />
      <div className="TestNameForm">
        {titleName ? (
          <FormName setTitleName={setTitleName} name={name} id={id} user={user} />
        ) : (
          <>
            <div className="Head_flex">
              <div className="Head_titleFlex">{`Cuestionario: ${name}  `}</div>
              <button type="button" onClick={() => setTitleName(true)}>
                Cambiar
              </button>
            </div>
            {/* <Form1 id={id} idformActive={idformActive} /> */}
            <Form1 id={id} />
          </>
        )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default TestName;
