import { useState } from "react";
import { toast } from "toast-notification-alert";
import { Diagnostic, Dog } from "../../interfaces/dogs/dog";
import { axiosCustom } from "../../utils/axiosCustom";

export interface diagFormInterface{
  id:number,
}

export default function DiagnosticForm(props:diagFormInterface) {
  const blankDiagnostic = {
    symptom     :"" ,
	medicines   :""  ,
	price       :0, 
	bloodResult :"",  
	xrayPic     :"" , 
	dogID       :0,
  diagnostic:"",
  date:new Date(),
  doctor:"",   
  };
  const [xrayFile, setXrayFile] = useState<File>()
  const [brFile, setBrFile] = useState<File>()
  const [state, setState] = useState<Diagnostic>(blankDiagnostic);
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    setState({ ...state, [target.id]:target.valueAsNumber||target.value  });
    console.log(state);
  };
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    state.dogID=props.id;
    console.log(state);
    axiosCustom
      .post(
        process.env.REACT_APP_API_URL + "/api/worker/dog/diagnostic/newDiagnostic",
        state,
        {}
      )
      .then((response) => {
        console.log(JSON.stringify(response));
        toast.show({
          title: "Registro correcto",
          message: "",
          type: "info",
          newestOnTop: true,
        });
        submitFile(e,response.data.data.ID);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitFile = (e: React.FormEvent<HTMLFormElement>,diagId:number) => {
    e.preventDefault()
    var formData = new FormData();
    if(brFile)
    formData.append("br",brFile);
    if(xrayFile)
    formData.append("xray",xrayFile);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axiosCustom
      .post(
        process.env.REACT_APP_API_URL + "/api/worker/dog/diagnostic/"+diagId+"/uploadFiles",
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
      <h2>Registro de Diagnóstico</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Sintomas</label>
          <textarea
            onChange={handleTextAreaChange}
            className="form-control"
            id="symptom"
            placeholder="Ingresa los sintomas de la mascota"
            required
          />
        </div>
        <div className="form-group">
          <label>Diagnostico</label>
          <textarea
            onChange={handleTextAreaChange}
            className="form-control"
            id="diagnostic"
            placeholder="Ingresa los sintomas de la mascota"
            required
          />
        </div>
        <div className="form-group">
          <label>Medicinas</label>
          <textarea
            onChange={handleTextAreaChange}
            className="form-control"
            id="medicines"
            placeholder="Ingresa los sintomas de la mascota"
            required
          />
        </div>
        <div className="form-group">
          <label>Resultados de Prueba de Sangre</label>
          <input
            onChange={(e)=>{if(e.target.files)
              setBrFile(e.target.files[0]);
              console.log(brFile)
            }}
            type="file"
            className="form-control"
            id="bloodResult"
            placeholder="Ingresa el archivo de la prueba de sangre"
          />
        </div>
        <div className="form-group">
          <label>Resultados de Rayos X</label>
          <input
            onChange={(e)=>{if(e.target.files)
              setXrayFile(e.target.files[0]);
              console.log(xrayFile);
            }}
            type="file"
            className="form-control"
            id="xrayPic"
            placeholder="Ingresa el archivo de los Rayos x"
          />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input
            onChange={handleInputChange}
            type="number"
            step=".01"
            className="form-control"
            id="price"
            placeholder="Ingresa el precio de la"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mr-2">
          Registrar Diagnóstico
        </button>
      </form>
    </>
  );
}