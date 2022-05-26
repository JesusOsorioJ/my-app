import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuth,onAuthStateChanged } from "firebase/auth";

import FormName from "./FormName";
import Header from "./Header";
import Footer from "./Footer";
import Form1 from "./Form1";
import SideMenu from "./SideMenu";
import "./scss/TestName.scss";

function TestName() {
  const { id, name } = useParams();
  const [titleName, setTitleName] = useState(id === "0");
  const[ user, setUser] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
  onAuthStateChanged(getAuth(),(user) => (user?.photoURL==="teacher")?setUser(user): navigate('/validate/signup'))
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
