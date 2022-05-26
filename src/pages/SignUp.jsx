import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  updateProfile,
} from "firebase/auth";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { onSnapshotData, getIdCollection } from "../utils/crud";
import "./scss/SignUp.scss";

function SignUp() {
  const { type } = useParams();
  const navigation = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    rol: "student",
    name: "",
    cod: "",
  });
  const [error, setError] = useState("");
  const [form, setForm] = useState([]);
  const [form1, setForm1] = useState([]);
  const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  const getOnSnapshotCollection = async (collectionName, id) => {
    const col = getIdCollection(collectionName, id);
    onSnapshotData(col, (doc) => {
      const collection = doc.data();
      setForm(collection.data);
    });
  };

  const getOnSnapshotCollection1 = async (collectionName, id) => {
    const col = getIdCollection(collectionName, id);
    onSnapshotData(col, (doc) => {
      const collection = doc.data();
      setForm1(collection.data);
    });
  };

  async function HandlerSubmit(e) {
    e.preventDefault();

    if (!regex.test(user.email)) {
      return setError("Correo invalido");
    }

    if (user.password.length < 6) {
      return setError("La contraseña debe tener al menos 5 letras");
    }

    if (user.name.length < 5) {
      return setError("El nombre debe tener al menos 4 letras");
    }

    let mat = [];
    form.map((item) => item.email === user.email && mat.push(item));

    let mat1 = [];
    form1.map((item) => item.id === user.cod && mat1.push(item));

    if (mat.length === 0 && user.rol === "student") {
      return setError(
        "Lo sentimos no se encontro estudiante en la base de datos"
      );
    }

    if (mat1.length === 0 && user.rol === "teacher") {
      return setError("Lo sentimos no encontramos tu codigo de pago");
    }

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, user.email, user.password);
    } catch (error) {
      return setError("Lo sentimos el correo ya esta en uso");
    }

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    navigation("/validate/login");
    setUser({ ...user, email: "", password: "" });
  }

  async function HandlerLogin(e) {
    e.preventDefault();
    if (user.email.length < 1 || user.password.length < 1) {
      return setError("Digite los campos");
    }
    if (user.email.length < 1 || user.password.length < 1) {
      return setError("Digite los campos");
    }
    
    try {
      const auth = getAuth();
      await setPersistence(auth, browserSessionPersistence);
      if (user.name.length !== 0 && user.rol.length !== 0)
        await updateProfile(auth.currentUser, {
          displayName: user.name,
          photoURL: user.rol,
        });
      const roles = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      
      if (roles.user.photoURL === "student") {
        navigation("/student/0/0/0");
      } else {
        navigation("/testname/0/0");
      }
    } catch (error) {
      return setError("Contraseña o correo invalido");
    }
  }

  function HandlerOnChange(e) {
    const { name, value } = e.target;
    setError();
    setUser({ ...user, [name]: value });
  }

  useEffect(() => {
    if (user.length !== 0) {
      getOnSnapshotCollection("formRegister", "allstudents");
      getOnSnapshotCollection1("formTeacher", "allPayments");
    }
  }, [user]);

  return (
    <div className="SignUp">
      <Header />
      <form
        className="SignUpForm"
        onClick={type === "signup" ? HandlerSubmit : HandlerLogin}
      >
        <h2>{type === "signup" ? "  REGISTRARSE" : "INGRESAR"}</h2>
        <h5>
          {type === "signup" ? "Crear una nueva cuenta" : "Login en tu cuenta"}
        </h5>
        {type === "signup" && (
          <>
            <label htmlFor="rol">Rol</label>
            <select name="rol" id="rol" onChange={HandlerOnChange}>
              <option value="student" selected>
                Estudiante
              </option>
              <option value="teacher">Profesor</option>
            </select>
            {user.rol === "teacher" && (
              <>
                <label htmlFor="cod">Codigo</label>
                <input
                  type="text"
                  id="cod"
                  name="cod"
                  onChange={HandlerOnChange}
                  placeholder="Ingrese codigo de referencia"
                />
              </>
            )}

            <label htmlFor="name">name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={HandlerOnChange}
              placeholder="Ingrese nombre"
            />
          </>
        )}
        <label htmlFor="email">email</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={HandlerOnChange}
          placeholder="Ingrese email"
        />
        <label htmlFor="email">password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={HandlerOnChange}
          placeholder="Ingrese password"
        />
        <div>{error}</div>
        <button type="submit">Enviar</button>
      </form>
      <Footer />
    </div>
  );
}

export default SignUp;
