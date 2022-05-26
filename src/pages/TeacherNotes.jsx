import FormNote from "../components/FormNote";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";

import TeacherNotesTest from "./TeacherNotes1/TeacherNotesTest";
import TeacherNotesStudent from "./TeacherNotes1/TeacherNotesStudent";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SideMenu from "../components/SideMenu";
import {  onSnapshotData  } from "../utils/crud";
import "./scss/TeacherNotes.scss";

function Teacher() {
  const { type, filter } = useParams();

  const [data, setData] = useState([]);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const getOnSnapshotCollection = async (collectionName, type, filter) => {
    const col = query(
      collection(db, collectionName),
      where(type, "==", filter)
    );
    console.log("filter", filter);
    onSnapshotData(col, (querySnapshot) => {
      const collection = [];
      querySnapshot.forEach((doc) => {
        collection.push(doc.data());
      });
      console.log("data", collection);
      setData(collection);
    });
  };

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => (user.photoURL==="teacher")?setUser(user):navigate('/validate/signup'));
  }, []);

  useEffect(() => {
    if (user.length !== 0) {
      getOnSnapshotCollection("formStudent", type, filter);
    }
  }, [user]);

  return (
    <div className="ListTest">
      <Header />

      <div className="ListTestFLex1">
        <SideMenu />
        <div>
          {type === "idstudent" ? (
            <FormNote id={filter} />
          ) : (
            <>
              {type === "0" ? (
                <div className="idstudentGrid">
                <div className="idstudentabcd"><TeacherNotesTest /></div>
                <div className="idstudentabcd"><TeacherNotesStudent /></div>
                </div>
              ) : (
                <div>
                  <h1>{`LISTA DE ALUMNOS EN ${type==="curse"?"CURSO":"EXAMEN"} ID ${filter}`}</h1>
                  <div className="itemFlexTest">
                    <span>codigo</span>
                    <span>Nombre de Formulario</span>
                    <span>DETALLE</span>
                  </div>
                  {data.map((item) => (
                    <div className="itemFlexTest">
                      <span>{item.id}</span>
                      <span>{item.name}</span>
                      <button
                        onClick={() =>
                          navigate(`/teachernotes/idstudent/${item.id}`)
                        }
                      >
                        Ir a detalle
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Teacher;
