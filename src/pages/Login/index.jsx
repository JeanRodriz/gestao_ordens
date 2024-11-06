import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useAuth } from "../../AuthContext"


function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth(); 
  

  async function handleSubmit(event) {
    event.preventDefault();

    const success = await login(emailRef.current.value, passwordRef.current.value);

    if (success) {
      // Somente navegue se o login for bem-sucedido
      navigate('/lista-usuario');
      alert("Usuário logado com sucesso.");
    } else {
      alert("Senha ou email incorretos. Por favor, tente novamente.");
    }
  }
  

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Login
      </h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          ref={emailRef}
          placeholder="E-mail"
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
          Logar
        </button>
      </form>
      
      
      <Link
        to="/"
        className="text-blue-700 hover:underline mt-4 block text-center"
      >
        Não tem uma conta? Cadastre-se.
      </Link>
    </div>
  );
}

export default Login;
