import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Form from "./components/users/FormRegister";
import FormLogin from "./components/users/FormLogin";
import FormRegister from "./components/users/FormRegister";
import PublicRoutes from "./utils/publicRoutes";
import ProtectedRoutes from "./utils/protectedRoutes";
import DogRegister from "./components/dogs/dogRegister";
import DogFind from "./components/dogs/dogFind";
import { AuthContext } from "./utils/userContext";
import { useContext } from "react";

function App() {

  const {authState,logout} = useContext(AuthContext)
  return (
    <>
      <nav className="navbar navbar-light bg-primary text-light">
        <a href="/" className="navbar-brand text-light">
          <h4>Sistema de Registro de Mascotas</h4>
        </a>
        {authState==="authenticated"&& 
        (<button className="btn" onClick={logout} >Cerrar Sesión</button>)}
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3" style={{ marginTop: "10%" }}>
            <BrowserRouter>
              <Routes>
                <Route element={<PublicRoutes/>}>
                  <Route path="/register" element={<FormRegister />} />
                  <Route path="/login" element={<FormLogin />} />
                </Route>
                <Route element={<ProtectedRoutes/>}>
                  <Route path="/"></Route>
                  <Route path="/dog/register" element={<DogRegister />} />
                  <Route path="/dog/find" element={<DogFind />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
