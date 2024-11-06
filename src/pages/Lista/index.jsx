import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../../../services/api";
import deleteIcon from '../../../public/thrash.svg';
import CadastroLista from "../Cadastro/cadastroLista";
import Modal from '../Lista/modal'; // Importando o Modal

function ListarUsuarios() {
  const [allUsers, setAllUsers] = useState([]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; 
  const navigate = useNavigate(); 

  async function loadUsers() {
    const token = localStorage.getItem("token");
    const {
      data: { users },
    } = await api.get("/lista-usuario", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setAllUsers(users);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
      try {
        await api.delete(`/usuarios/${userId}`);
        alert("Usuário deletado com sucesso.");
        loadUsers();
      } catch (err) {
        alert("Erro ao deletar usuário.");
        console.error(err);
      }
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    if (indexOfLastUser < allUsers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Lista de Usuários</h2>
      
      <button 
        onClick={() => navigate("/lista-ordens")}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-transform duration-300 hover:scale-95"
      >
       Listas Ordens de Serviços
      </button>

      <button onClick={() => setIsAddingUser(true)} className="space-y2 mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-transform duration-300 hover:scale-95">
        Adicionar Usuário
      </button>

      {/* Modal para adicionar usuário */}
      <Modal isOpen={isAddingUser} onClose={() => setIsAddingUser(false)}>
        <CadastroLista onUserAdded={() => { loadUsers(); setIsAddingUser(false); }} />
      </Modal>

      <ul className="space-y-2 mt-8">
        {currentUsers.length > 0 && currentUsers.map((user) => (
          <li key={user.id} className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
            <div>
              <p className="font-semibold">Codigo Funcionário: {user.id}</p>
              <p className="font-semibold">Nome: {user.nome}</p>
              <p className="font-semibold">Email: {user.email}</p>
            </div>
            <button onClick={() => handleDeleteUser(user.id)} className="bg-transparent border-none cursor-pointer flex items-center rounded">
              <img src={deleteIcon} alt="Delete" className="h-25 w-25 mr-1 transition-transform duration-300 hover:scale-110"/>
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`transition-transform duration-300 hover:scale-95 text-white px-4 py-2 bg-blue-600 rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'}`}
        >
          Anterior
        </button>
        <button
          onClick={nextPage}
          disabled={indexOfLastUser >= allUsers.length}
          className={`transition-transform duration-300 hover:scale-95 text-white px-4 py-2 bg-blue-600 rounded-md ${indexOfLastUser >= allUsers.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'}`}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}

export default ListarUsuarios;
