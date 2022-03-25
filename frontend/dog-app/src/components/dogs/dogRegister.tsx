import React, { useEffect, useState } from "react";
import { Dog } from "../../interfaces/dogs/dog";
import { axiosCustom } from "../../utils/axiosCustom";
import { toast } from "toast-notification-alert";
import { Cloudinary } from "@cloudinary/url-gen";
import { v2 as cloudinary } from "cloudinary";
import { url } from "inspector";
import { timeStamp } from "console";

export default function DogRegister() {
  const blankDog = {
    dni: 0,
    name: "",
    race: "",
    genre: "",
    birth: new Date() ,
    pic: "",
  };
  const [file, setFile] = useState<File>();
  const [state, setState] = useState<Dog>(blankDog);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    setState({ ...state, [target.id]:target.valueAsDate||target.valueAsNumber||target.value  });
    console.log(state);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);
    axiosCustom
      .post(
        process.env.REACT_APP_API_URL + "/api/worker/dog/register",
        state,
        {}
      )
      .then((response) => {
        console.log(JSON.stringify(response));
        toast.show({
          title: "Retgistro correcto",
          message: "",
          type: "info",
          newestOnTop: true,
        });
        submitFile(e);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.currentTarget;
    setState({ ...state, [target.id]:parseInt(target.value)||target.value });
    console.log(state);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;
    setFile(files[0]);
    console.log(URL.createObjectURL(files[0]));
  };

  const submitFile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    var formData = new FormData();
    if (!file) {
      return;
    }
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axiosCustom
      .post(
        process.env.REACT_APP_API_URL + "/api/worker/dog/"+state.dni+"/upload",
        formData,
        config
      )
      .then((response) => {
        console.log(JSON.stringify(response));
        toast.show({
          title: "Subida de Archivo correcto",
          message: response.data,
          type: "info",
          newestOnTop: true,
        });
      })
      .catch((error) => {
        toast.show({
          title: "Subida de Archivo  incorrecto",
          message: error.data,
          type: "error",
          newestOnTop: true,
        });
      });

  };

  return (
    <>
      <h2>Registro de Mascota</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>DNI de Perro</label>
          <input
            onChange={handleInputChange}
            type="number"
            className="form-control"
            id="dni"
            placeholder="Ingresa el DNI del Perro"
            required
          />
        </div>
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
        <div className="form-group">
          <label>Raza</label>
          <select
            className="custom-select"
            id="race"
            onChange={handleSelectChange}
          >
            <option disabled selected>
              Selecciona la raza
            </option>
            <option value="Pitbull"> Pitbull</option>
            <option value="Bulldog"> Bulldog</option>
            <option value="Shichu"> Shichu</option>
            <option value="Pequines"> Pequines</option>
            <option value="San Bernardo"> San Bernardo</option>
            <option value="Chiguahua"> Chiguahua</option>
          </select>
        </div>
        <div className="form-group">
          <label>Sexo</label>
          <select
            className="custom-select"
            id="genre"
            onChange={handleSelectChange}
          >
            <option disabled selected>
              Selecciona el sexo
            </option>
            <option value="Macho"> Macho</option>
            <option value="Hembra"> Hembra</option>
          </select>
        </div>
        <div className="form-group">
          <label>Nacimiento del Perro</label>
          <input
            onChange={handleInputChange}
            type="date"
            className="form-control"
            id="birth"
            placeholder="Ingresa la fecha de nacimiento del Perro"
            required
          />
        </div>
        <div className="form-group">
          <label>Imagen del Perro</label>
          <input
            onChange={handleFileInputChange}
            type="file"
            className="form-control"
            id="pic"
            placeholder="Ingresa el archivo de la imagen del Perro"
          />
        </div>

        <button type="submit" className="btn btn-primary mr-2">
          Registrar Perro
        </button>
        <a href="/dog/find" className="btn btn-secondary ml-1">
          Consultar Perro
        </a>
      </form>
    </>
  );
}
