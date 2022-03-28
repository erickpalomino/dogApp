import { useContext, useEffect, useState } from "react";
import { UserDates } from "../../interfaces/users/users";
import { axiosCustom } from "../../utils/axiosCustom";
import { AuthContext } from "../../utils/userContext";
import FormDate from "../dates/dateRegister";

export default function HomeUser() {
  const [loading, setLoading] = useState(false);
  const {userType} = useContext(AuthContext);
  const [user, setUser] = useState<UserDates>({
    username:"",
    password:"",
    type:"",
    dates:[],
  });
  useEffect(() => {
    setLoading(true);
    axiosCustom
      .get(process.env.REACT_APP_API_URL + "/api/worker/user")
      .then((response) => {
        console.log(response.data);
        setUser(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Data is loading...</p>;
  }
  return (
    <>
      <h2>Home</h2>
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <h4>Nombre:{user.username}</h4>
            </div>
          </div>
        </div>
      </div>
      <h2>Citas:</h2>
      {userType == "patient" ? (
        <button data-target="#diagnosticModal" data-toggle="modal" className="btn btn-primary">
          Agregar Cita
        </button>
      ) : (
        <></>
      )}
      <a className="btn btn-secondary" href="/dog/find">Consultar Perro</a>
      {userType == "doctor" ? (
        <a href="/dog/register" className="btn btn-primary">
          Registrar Perro
        </a>
      ) : (
        <></>
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Doctor</th>
            <th scope="col">Dueño</th>
            <th scope="col">Fecha</th>
            <th scope="col">Perro</th>
          </tr>
        </thead>
        <tbody>
          {user.dates?.map((date) => (
            <tr>
              <th scope="row">{date.doctor}</th>
              <td>{date.owner}</td>
              <td>{new Date(date.date).toLocaleDateString()}</td>
              <td>{date.dog}</td>
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
                Nueva Cita
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
              <FormDate></FormDate>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}