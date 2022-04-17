import React, { useState  } from "react";
import { User } from "../../interfaces/users/users";
import { toast } from 'toast-notification-alert';
import axios from "axios";


export default function FormRegister() {
  const blankUser = {username: "", password:"",type:""};
  const [state, setState] = useState<User>(blankUser);
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setState({ ...state, [id]: value });
    console.log(state);
  };
  
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(state)
    //if(validatePassword(state.password))
      axios.post(process.env.REACT_APP_API_URL+"/api/register",state).then(response => {console.log(JSON.stringify(response));
        toast.show({title:'Registro Correcto',newestOnTop:true,message:'Usuario Registrado correctamente',type:'info'});})
        .catch(error=>{console.log(error);
        toast.show({title:'Error al Registrar',newestOnTop:true,message:error,type:'error'})}
        )

  }
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.currentTarget;
    setState({ ...state, [target.id]:parseInt(target.value)||target.value });
    console.log(state);
  };

  const validatePassword=(password:string)=>{
    var regexp=/(?=.*[0-9]{2})(?=.*[A-Z])(?=.{8,})(?=.*[#-/\\?]{2})/;
    if(password.match(regexp)){
      toast.show({title:'Formato Correcto',newestOnTop:true,message:'Contraseña cumple con el formato',type:'info'});
      return true;
    }
    else{
      toast.show({title:'Formato de contraseña Incorrecto',newestOnTop:true,message:'Ingrese una contraseña que cumpla con el formato',type:'error'});
      return false;
    }
  }

  return (
    <>
    <h2>Registro</h2>
    <form onSubmit={handleSubmit}  > 
      <div className="form-group">
        <label>Nombre de usuario</label>
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control"
          id="username"
          placeholder="Ingresa un nombre de Usuario"
          required
        />
      </div>
      <div className="form-group">
        <label>Contraseña</label>
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control"
          id="password"
          placeholder="Ingresa un contraseña"
          required
        />
        <small>La contraseña debe contener: Una Mayuscula, dos números, dos caractéres especiales entre #$%&/? y como mínimo 8 caracteres </small>
      </div>
      <div className="form-group">
          <label>Tipo de Usuario</label>
          <select
            className="custom-select"
            id="type"
            onChange={handleSelectChange}
          >
            <option disabled selected>
              Selecciona el tipo de Usuario
            </option>
            <option value="doctor"> Doctor</option>
            <option value="patient"> Paciente</option>
          </select>
        </div>
      <button type="submit" className="btn btn-primary mr-2">
        Registrarse
      </button>
      <a href="/login" className="btn btn-secondary ml-1">Iniciar Sesión</a>
    </form>
    </>
  );
}
