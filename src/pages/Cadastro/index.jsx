import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import api from "../../../services/api";


function Cadastro() {
  const nomeRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate()

  async function handleSubmit(event) { 
    event.preventDefault();

    try {
      await api.post("/cadastro", {
        nome: nomeRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      });
      alert("Usuário cadastrado com sucesso."); 

      navigate('/login');
       

    } catch (err) {
      alert("Erro ao cadastrar usuário."); 
      console.error(err);
    }
    console.log(nomeRef);
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg"> 
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Cadastro
      </h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}> 
        <input
          ref={nomeRef}
          placeholder="Nome"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <input
          ref={emailRef}
          placeholder="Email"
          type="email" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <input
          ref={passwordRef}
          placeholder="Senha"
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500"> 
          Cadastrar
        </button>
      </form>
      <Link
        to="/login"
        className="text-blue-700 hover:underline mt-4 block text-center">
        Já tem uma conta? Faça login
      </Link>
    </div>
  );
}

export default Cadastro;
