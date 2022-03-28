import { dog } from "@cloudinary/url-gen/qualifiers/focusOn";
import { useContext, useEffect, useState } from "react";
import { Dog, FinDogRequest } from "../../interfaces/dogs/dog";
import { axiosCustom } from "../../utils/axiosCustom";
import { AuthContext } from "../../utils/userContext";

export default function DogFind() {
  const blankFindDog = {
    name: "",
  };
  const [state, setState] = useState<FinDogRequest>(blankFindDog);
  const [result,setResult]=useState<Dog[]>([]);
  const {userType} = useContext(AuthContext)

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setState({ ...state, [id]: value });
    console.log(state);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);
    axiosCustom
      .get(process.env.REACT_APP_API_URL + "/api/worker/dog/"+state.name+"/getByName")
      .then((response) => {
        console.log(JSON.stringify(response));
        setResult(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
    <h2>Consulta de Mascota</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de Perro</label>
          <input
            onChange={handleInputChange}
            type="text"
            className="form-control"
            id="name"
            placeholder="Ingresa el nombre del Perro"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mr-2">
          Consultar Perro
        </button>
        {userType=="doctor"?<a href="/dog/register" className="btn btn-secondary ml-1">
          Registrar Perro
        </a>:<></>}
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">DNI</th>
            <th scope="col">Nombre de la Mascota</th>
            <th scope="col">Raza</th>
            <th scope="col">Género</th>
            <th scope="col">Nacimiento</th>
            <th scope="col">Foto</th>
            <th scope="col">Opcion</th>
          </tr>
        </thead>
        <tbody>
          {result.map((resultItem) => (
            <tr>
              <th scope="row">{resultItem.dni}</th>
              <td>{resultItem.name}</td>
              <td>{resultItem.race}</td>
              <td>{resultItem.genre}</td>
              <td>{new Date(resultItem.birth).toLocaleDateString()}</td>
              <td><img style={{height:"50px"}} src={resultItem.pic} alt="image" />
              </td>
              <td><a href={"/dog/"+resultItem.dni+"/info"}>Ver Diagnósticos</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
