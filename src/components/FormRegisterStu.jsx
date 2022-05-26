import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./scss/FormRegisterStu.scss";
import FormRegisterStu1 from "./FormRegisterStu1"

import {
  updateDocument,
  getIdCollection,
  addOneDocument,
  randomString,
  onSnapshotData,
} from "../utils/crud";

function FormRegisterStu({email}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState([]);
  const [addTest,setAddTest]= useState(false);
  const [change, setChange] = useState("");
  const [allstudents, setAllstudents] = useState([]);
  const [error, setError] = useState();
  const [student, setStudent] = useState({
    email: "",
    password: "",
    cedula: "",
  });
  const [edit, setEdit] = useState({ email: "", password: "", cedula: "", id:"" });

  const getOnSnapshotCollection = async (collectionName, id) => {
    const col = getIdCollection(collectionName, id);
    const unsubscribe = onSnapshotData(col, (doc) => {
      const collection = doc.data();
      console.log("collection", collection)
      setForm(collection);
    });
    return unsubscribe;
  };

  const getOnSnapshotCollection1 = async (collectionName, id) => {
    const col = getIdCollection(collectionName, id);
    const unsubscribe = onSnapshotData(col, (doc) => {
      const collection = doc.data();
      console.log("setAllstudents", collection.data);
      setAllstudents(collection.data);
      
    });
    return unsubscribe;
  };

  async function HandlerCreateDocument(e) {
    e.preventDefault();
    if (change.length === 0) {
      return setError("Campo requerido");
    }
    if (change.length <= 4) {
      return setError("El curso debe tener al menos 5 letras");
    }
    const name = randomString(20);
    await addOneDocument("formRegister", name, {
      name: change,
      email: email,
      id: name,
      data: [],
      form:[]
    });
    navigate(`/teachercurse/${name}`);
    setError()
  }

  function HandlerOnChange(e) {
    const { value, name } = e.target;
    setError();
    setChange(value);
    setStudent({ ...student, [name]: value });
  }
  async function HandlerCreateStudent(e) {
    e.preventDefault();
    let mat = false;
    form.data.map((item) =>
      item.cedula === student.cedula && (mat = true)
    );

    if (
      student.cedula.length === 0 ||
      student.password.length === 0 ||
      student.email.length === 0
    ) {
      return setError("Por favor digite todos los campos");
    }

    
    if (mat === false || edit.id.length > 0) {
    if (edit.id.length > 0){
        let editFilter = []
        form.data.map(item=>(item.id===student.id)?editFilter.push(student):editFilter.push(item))
        updateDocument("formRegister", id, { data:editFilter});
        setError("Usuario editado");
    }else{
      updateDocument("formRegister", id, {
        data: [...form.data, { ...student, id: randomString(20) }],
      })
      setError("Usuario creado");
      
    };
    
    let createallstudent = true 
    let cota
    allstudents.map((item)=>(item.email === student.email)?createallstudent=false:cota="true")
    
    if (createallstudent){
      updateDocument("formRegister", "allstudents",
       {data:[...allstudents, {...student, course:[{id:form.id, name:form.name}]  }]})
    } else {
      const mat = []
      allstudents.map((item)=>(item.cedula === student.cedula)?
      mat.push({...item, course:[...item.course, {id:form.id, name:form.name}]}):
      mat.push(item)
      )
      updateDocument("formRegister", "allstudents",{data:mat})
    }
    

      document.getElementById("cedula").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      setEdit({ email: "", password: "", cedula: "", id:"" });
    } else {
      setError("Ya existe un usuario con esa cedula");
    }

  }

  function HandlerSubir(e) {
    const { name } = e.target;
    const filter = form.data.filter((item) => item.id === name)
    setEdit(filter[0]);
    setStudent(filter[0])
  }

  useEffect(() => {
      getOnSnapshotCollection("formRegister", id);
      getOnSnapshotCollection1("formRegister", "allstudents");
  }, []);

  return (
    <div className="FormRegisterStu">
      {addTest?
      <FormRegisterStu1 setAddTest={setAddTest}/>
      :
      <>
      {id === "1" ? (
        <form className="RegisterStuHeadCreate" onSubmit={HandlerCreateDocument}>  
          <h2>AGREGAR NUEVO CURSO</h2>
          <input type="text" name="" id="" onChange={HandlerOnChange} placeholder="Ingrese aqui nombre de nuevo curso"/>
          <button type="submit">Agregar</button>
          <div>{error}</div>
        </form>
      ) : (
        <>
          <div className="FormRegisterStuHead">
          <form className="FormRegisterStuForm" onSubmit={HandlerCreateStudent}>
          <div className="questiontittle1">EXAMENES DEL CURSO</div>
          <div className="RegisterStuEdit1">
          <div className="RegisterStuEditRow1">
              <div>SHORT ID</div>
              <div>NOMBRE</div>
          </div>
          <div className="RegisterStuEditScroll">
          {form.form?.map((item) => (
            <div className="RegisterStuEditRow1">
              <div>{item.id.slice(0,10)}</div>
              <div>{item.name}</div>
            </div>
          ))}
          </div>
          <button type="button" onClick={()=>(setAddTest(true))}>
                Agregar examen
              </button>
          </div>
          <div className="questiontittle">{(edit.email.length===0)?"Agregar estudiante":"Editar estudiante"}</div>
            <label htmlFor="cedula">Cedula</label>
            <input
              type="text"
              name="cedula"
              id="cedula"
              onChange={HandlerOnChange}
              placeholder={(edit.cedula.length === 0)?"Ingresa la cedula aqui":edit.cedula}
            />
            <label htmlFor="cedula">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={HandlerOnChange}
              placeholder={(edit.email.length === 0)?"Ingresa el email aqui":edit.email}
            />
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              onChange={HandlerOnChange}
              placeholder={(edit.password.length === 0)?"Igual a la cedula":edit.password}
            />
            <button type="submit">{(edit.email.length===0)?"Agregar":"Editar"}</button>
            <div>{error}</div>
          </form>
          <div className="RegisterStuEditleft">
          <div className="RegisterStuHeadTitle">{form.name}</div>
          <div className="RegisterStuHeadText">{`# ${form.id}`}</div>
          <div className="RegisterStuEdit">
          <div className="RegisterStuEditRow">
              <div>CEDULA</div>
              <div>EMAIL</div>
              <div>PASSWORD</div>
              <div>-</div>
          </div>
          <div className="RegisterStuEditBox">
          {form.data?.map((item) => (
            <div className="RegisterStuEditRow1">
              <div>{item.cedula}</div>
              <div>{item.email}</div>
              <div>{item.password}</div>
              <button type="button" name={item.id} onClick={HandlerSubir}>
                Editar
              </button>
              <br />
            </div>
          ))}
          </div>
          </div>
          </div>
        </div>
        </>
      )}
      </>
}
    </div>
  );
}

export default FormRegisterStu;




