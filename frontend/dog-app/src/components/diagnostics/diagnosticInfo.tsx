import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dog, DogDiag, Diagnostic } from "../../interfaces/dogs/dog";
import { axiosCustom } from "../../utils/axiosCustom";
import { AuthContext } from "../../utils/userContext";
import DiagnosticForm from "./diagnosticRegister";

export default function DiagnosticTable() {
  const { dni } = useParams();
  const [loading, setLoading] = useState(false);
  const { userType } = useContext(AuthContext);
  const [dog, setDog] = useState<DogDiag>({
    ID:0,
    dni: 0,
    name: "",
    race: "",
    genre: "",
    birth: new Date(),
    pic: "",
    diagnostics: [],
  });
  var dogData: DogDiag;
  useEffect(() => {
    setLoading(true);
    axiosCustom
      .get(process.env.REACT_APP_API_URL + "/api/worker/dog/getDog/" + dni)
      .then((response) => {
        console.log(response.data);
        dogData = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        console.log(dog);
        setDog(dogData);
      });
  }, []);

  if (loading) {
    return <p>Data is loading...</p>;
  }
  return (
    <>
      <h2>Historial de Mascota</h2>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <h4>ID:{dog.ID}</h4>
              <h4>Nombre:{dog.name}</h4>
              <h4>Nacimiento:{new Date(dog.birth).toLocaleDateString()}</h4>
              <h4>Sexo:{dog.genre}</h4>
              <h4>Raza:{dog.race}</h4>
            </div>
            <div className="col-6">
              <h4>
                Foto: <img src={dog.pic} alt="pic" style={{ width: "50%" }} />
              </h4>
            </div>
          </div>
        </div>
      </div>
      <h2>Diagnósticos:</h2>
      {userType == "doctor" ? (
        <button data-target="#diagnosticModal" data-toggle="modal" className="btn btn-primary">
          Agregar diagnóstico
        </button>
      ) : (
        <></>
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Doctor</th>
            <th scope="col">Diagnóstico</th>
            <th scope="col">Medicinas</th>
            <th scope="col">Fecha</th>
            <th scope="col">Prueba de Sangre</th>
            <th scope="col">Rayos X</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>
        <tbody>
          {dog.diagnostics?.map((diagnostic) => (
            <tr>
              <th scope="row">{diagnostic.doctor}</th>
              <td>{diagnostic.diagnostic}</td>
              <td>{diagnostic.medicines}</td>
              <td>{new Date(diagnostic.date).toLocaleDateString()}</td>
              <td>
                <a href={diagnostic.bloodResult}>Ver Resultados</a>
              </td>
              <td>
                <a href={diagnostic.xrayPic}>Ver Rayos X</a>
              </td>
              <td>{diagnostic.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="diagnosticModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Nuevo Diagnóstico
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <DiagnosticForm id={dog.ID}></DiagnosticForm>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
