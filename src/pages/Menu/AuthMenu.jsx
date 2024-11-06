import { useState } from "react";
import Login from "./Login";
import Cadastro from "./Cadastro";

function AuthMenu() {
  const [showLogin, setShowLogin] = useState(true); // State to toggle between login and cadastro

  const toggleForm = () => {
    setShowLogin(!showLogin); 
  };

  return (
    <div className="auth-container max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <div className="flex justify-center mb-6">
        <button
          onClick={toggleForm}
          className={`mx-2 py-2 px-4 rounded ${showLogin ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Login
        </button>
        <button
          onClick={toggleForm}
          className={`mx-2 py-2 px-4 rounded ${!showLogin ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Cadastro
        </button>
      </div>
      <div className={`form-wrapper transition-all duration-500 ease-in-out transform ${showLogin ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
        {showLogin ? <Login /> : <Cadastro />}
      </div>
    </div>
  );
}

export default AuthMenu;
