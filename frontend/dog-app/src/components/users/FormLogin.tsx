import axios from "axios";
import React, { useContext, useState  } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces/users/users";
import { axiosCustom } from "../../utils/axiosCustom";
import { AuthContext } from "../../utils/userContext";


export default function FormLogin() {
  const navigate=useNavigate();
  const {signin} = useContext(AuthContext)
  const blankUser = {username: "", password:"" };
  const [state, setState] = useState<User>(blankUser);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setState({ ...state, [id]: value });
    console.log(state);
  };
  
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(state);
    axiosCustom.post(process.env.REACT_APP_API_URL+"/api/login",state)
    .then(response=>{console.log(JSON.stringify(response.data.token));
    signin(response.data.token);
    navigate("/dog/find")
    })};

  return (
    <>
    <h2>Iniciar Sesión</h2>
    <form onSubmit={handleSubmit}> 
      <div className="form-group">
        <label>Nombre de usuario</label>
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control"
          id="username"
          placeholder="Ingresa tu nombre de usuario"
        />
      </div>
      <div className="form-group">
        <label>Contraseña</label>
        <input
          onChange={handleInputChange}
          type="password"
          className="form-control"
          id="password"
          placeholder="Ingresa tu contraseña"
        />
      </div>
      <button type="submit" className="btn btn-primary mr-2">
        Iniciar Sesión
      </button>
      <a href="/register" className="btn btn-secondary ml-1">Registrarse</a>
    </form>
    </>
  );
}