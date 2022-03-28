import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "toast-notification-alert";
import { uDate, User } from "../../interfaces/users/users";
import { axiosCustom } from "../../utils/axiosCustom";

export default function FormDate() {
  const [state, setState] = useState<uDate>({
    date: new Date(),
    doctor: "",
    owner: "",
    dog: 0,
  });
  const [doctors, setDoctors] = useState<User[]>([])

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    setState({ ...state, [target.id]:target.valueAsDate||target.valueAsNumber||target.value  });
    console.log(state);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);

    axiosCustom
      .post(process.env.REACT_APP_API_URL + "/api/dog/date/register", state)
      .then((response) => {
        console.log(JSON.stringify(response));
        toast.show({
          title: "Registro Correcto",
          newestOnTop: true,
          message: "Cita Registrada",
          type: "info",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.show({
          title: "Error al Registrar",
          newestOnTop: true,
          message: error,
          type: "error",
        });
      });
  };
  useEffect(() => {
    axiosCustom
      .get(process.env.REACT_APP_API_URL + "/api/worker/getDoctors")
      .then((response) => {
        console.log(response.data.data);
        setDoctors(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.currentTarget;
    setState({ ...state, [target.id]: parseInt(target.value) || target.value });
    console.log(state);
  };


  return (
    <>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>DNI del Perro</label>
          <input
            onChange={handleInputChange}
            type="number"
            className="form-control"
            id="dog"
            placeholder="Ingresa el dni de tu perro"
            required
          />
        </div>
        <div className="form-group">
          <label>fecha</label>
          <input
            onChange={handleInputChange}
            type="date"
            className="form-control"
            id="date"
            placeholder="Ingresa la fecha de tu cita"
            required
          />
        </div>
        <div className="form-group">
          <label>Doctor</label>
          <select
            className="custom-select"
            id="doctor"
            onChange={handleSelectChange}
          >
            <option disabled selected>
              Selecciona al doctor
            </option>
            {doctors.map((doctor)=>(<option value={doctor.username}>
              {doctor.username}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Registrar Cita
        </button>
      </form>
    </>
  );
}
