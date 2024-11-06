import { useState, useEffect } from "react"; 
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import ListarUsuarios from "./pages/Lista";
import ListarOrdensServico from "./pages/Lista/ordemServico";
import { AuthProvider, useAuth } from "./AuthContext";
import PrivateRoute from "./RotaPrivada";
import api from "../services/api";
import loginIcon from '../public/login.svg';
import cadastroIcon from '../public/cadastro.svg';
import menuIconC from '../public/menu1.svg';
import menuIconO from '../public/menu2.svg';
import logoutIcon from '../public/logout.svg';
import homeIcon from '../public/home.svg';
import BemVindo from "./pages/PagInicio/inicio";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Verificação do valor de isAuthenticated
  useEffect(() => {
    console.log("Estado de autenticação:", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <header className="bg-blue-600 text-white p-4 shadow flex justify-between items-center">
          <button onClick={toggleMenu} className="text-white p-4 shadow-lg">
            <img src={isMenuOpen ? menuIconC : menuIconO} alt="Menu" className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
          </button>

          <h1 className="text-2xl font-bold text-center flex-grow">
            Gestão de Ordem de Serviços
          </h1>
          <div className="flex items-center ml-auto">
          {isAuthenticated && (
    <Link 
      to="/bem-vindo" // Ou qualquer rota que faça sentido após o logout (aqui estamos usando /login como exemplo)
      onClick={logout} // Lógica de logout ao clicar no link
      className="text-white font-bold hover:underline flex items-center"
    >
      <img src={logoutIcon} alt="Logout" className="h-6 w-6 mr-2" />
      <span className="z-10 ml-1">Logout</span>
    </Link>
  )}
          </div>
        </header>

        {/* Menu animado */}
        <nav className={`bg-blue-500 transition-transform duration-300 ${isMenuOpen ? 'transform translate-x-0' : 'transform -translate-x-full'} absolute top-25 left-0 w-48 h-full`}>
          <ul className="flex flex-col p-4">
            <li className="mb-2 relative flex items-center">
              <Link to="/bem-vindo" className="text-white font-bold hover:underline flex items-center">
                <img src={homeIcon} alt="Inicio" className="h-6 w-15 mr-2 absolute left-0 z-0" />
                <span className="relative z-10 ml-8">Início</span>
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className="mb-2 relative flex items-center">
                  <Link to="/lista-usuario" className="text-white font-bold hover:underline flex items-center">
                    <img src={cadastroIcon} alt="Funcionários" className="h-6 w-15 mr-2 absolute left-0 z-0" />
                    <span className="relative z-10 ml-8">Funcionários</span>
                  </Link>
                </li>
                <li className="mb-2 relative flex items-center">
                  <Link to="/lista-ordens" className="text-white font-bold hover:underline flex items-center">
                    <img src={loginIcon} alt="Ordens de Serviço" className="h-6 w-15 mr-2 absolute left-0 z-0" />
                    <span className="relative z-10 ml-8">Ordens de Serviço</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="mb-2 relative flex items-center">
                  <Link to="/login" className="text-white font-bold hover:underline flex items-center">
                    <img src={loginIcon} alt="Login" className="h-6 w-15 mr-2 absolute left-0 z-0" />
                    <span className="relative z-10 ml-8">Login</span>
                  </Link>
                </li>
                <li className="mb-2 relative flex items-center">
                  <Link to="/" className="text-white font-bold hover:underline flex items-center">
                    <img src={cadastroIcon} alt="Cadastro" className="h-6 w-15 mr-2 absolute left-0 z-0 " />
                    <span className="relative z-10 ml-8">Cadastro</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <main className="p-4">
          <Routes>
            <Route path="/bem-vindo" element={<BemVindo />} />
            <Route path="/" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/lista-usuario" element={<ListarUsuarios />} />
              <Route path="/lista-ordens" element={<ListarOrdensServico />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
