import { useRef } from "react"; // Corrigido de usesRef para useRef
import api from "../../../services/api";
import PropTypes from "prop-types";

function CadastroLista({ onUserAdded }) { 
  const nomeRef = useRef(); 
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(event) { 
    event.preventDefault();

    try {
      await api.post("/cadastro", {
        nome: nomeRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      });
      alert("Usuário cadastrado com sucesso."); 
      onUserAdded(); 

    } catch (err) {
      alert("Erro ao cadastrar usuário."); 
      console.error(err);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg"> 
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Cadastrar Usuário
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
    </div>
  );
}

CadastroLista.propTypes = {
  onUserAdded: PropTypes.func.isRequired,
}

export default CadastroLista; 
