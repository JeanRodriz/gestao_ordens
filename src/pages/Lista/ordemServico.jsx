import api from "../../../services/api"; 
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import CadastrarOrdemServico from "../Cadastro/cadastroOrdens";
import EditarOrdemServico from '../Editar/EditarOrdemServico';
import editIcon from '../../../public/editar.svg';
import deleteIcon from '../../../public/thrash.svg';
import Modal from '../Lista/modal';


function ListarOrdensServico() {
  const [ordens, setOrdens] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [currentOrder, setCurrentOrder] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const ordensPorPagina = 5;

  const loadUsuarios = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/lista-usuario", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(response.data.users);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
      setError("Erro ao carregar usuários."); 
    }
  };

  const loadOrdens = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const { data: { ordens } } = await api.get("/lista-ordens", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrdens(ordens);
    } catch (error) {
      console.error("Erro ao carregar ordens:", error);
      setError("Erro ao carregar as ordens de serviço.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsuarios(); 
    loadOrdens(); 
  }, []);
  
  if (loading) {
    return <p>Carregando ordens de serviço...</p>; 
  }

  if (error) {
    return <p>{error}</p>; 
  }

  const indexOfLastOrdem = currentPage * ordensPorPagina;
  const indexOfFirstOrdem = indexOfLastOrdem - ordensPorPagina;
  const ordensAtuais = ordens.slice(indexOfFirstOrdem, indexOfLastOrdem);

  const nextPage = () => {
    if (indexOfLastOrdem < ordens.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEditClick = (ordem) => {
    setCurrentOrder(ordem);
    setIsEditing(true); 
  };

  const handleOrdensUpdated = () => {
    loadOrdens(); 
    setIsEditing(false); 
    setCurrentOrder(null); 
  };

  const handleDeleteClick = async (id, status) => {
    const token = localStorage.getItem("token");

    // Verifica se o status da ordem é "Concluído" antes de deletar
    if (status !== "Concluído") {
      window.alert("Você só pode deletar ordens de serviço com status 'Concluído'.");
      return; // Interrompe a exclusão se não for "Concluído"
    }

    if (window.confirm("Você tem certeza que deseja deletar esta ordem?")) {
      try {
        await api.delete(`/ordem-servico/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        loadOrdens(); // Atualiza a lista após a exclusão
      } catch (err) {
        console.error("Erro ao deletar a ordem de serviço:", err);
        setError("Erro ao deletar a ordem de serviço.");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-md shadow-lg space-y-2">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Lista de Ordens de Serviço
      </h2>
      
      <button
        onClick={() => navigate("/lista-usuario")} 
        className="mb-5 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-transform duration-300 hover:scale-95"
      >
        Voltar para Listar Usuários
      </button>

      <button 
        onClick={() => setIsAddingUser(true)} 
        className="mt-5 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-transform duration-300 hover:scale-95"
      >
        Cadastrar ordem serviço
      </button>

      {/* Modal para cadastrar ordem de serviço */}
      <Modal isOpen={isAddingUser} onClose={() => setIsAddingUser(false)}>
        <CadastrarOrdemServico onUserAdded={() => { loadOrdens(); setIsAddingUser(false); }} />
      </Modal>

      {/* Modal para editar ordem de serviço */}
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        {currentOrder && (
          <EditarOrdemServico 
            ordem={currentOrder} 
            onOrdensUpdated={handleOrdensUpdated} 
            onClose={() => setIsEditing(false)} 
          />
        )}
      </Modal>

      <div className="space-y-5 mt-8">
        <ul className="space-y-2">
          {ordensAtuais.length > 0 ? (
            ordensAtuais.map((ordem) => {
              const usuario = usuarios.find(u => u.id === ordem.usuarioId);
              return (
                <li key={ordem.id} className={`p-4 rounded-md flex justify-between items-center ${ordem.status === "Concluído" ? "bg-green-100" : ordem.status === "Em Andamento" ? "bg-yellow-100" : "bg-gray-100"}`}>
                  <div>
                    <p className="font-semibold">Número da Ordem de Serviço: {ordem.id}</p>
                    <p className="font-semibold">Data da Ordem de Serviço: {new Date(ordem.criadoEm).toLocaleDateString("pt-BR")}</p>
                    <p className="font-semibold">Aberto por: {usuario ? usuario.nome : "Usuário não encontrado"}</p>
                    <p className="font-semibold">Descrição: {ordem.descricao}</p>
                    <p className="font-semibold">Placa: {ordem.placaVeiculo}</p>
                    <p className="font-semibold">Setor: {ordem.setor}</p>
                    <p className="font-semibold">Prioridade: {ordem.prioridade}</p>
                  </div>
                  <div className="flex items-center">
                    {/* Ícone de status */}
                    {ordem.status === "Concluído" && <span className="ml-1 h-6 w-10">✔️</span>}
                    {ordem.status === "Em Andamento" && <span className="ml-1 h-6 w-10">🔄</span>}
                    {ordem.status === "Aguardando" && <span className="ml-1 h-6 w-10">⏳</span>}
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEditClick(ordem); }} 
                      className="bg-transparent border-none cursor-pointer flex items-center rounded"
                    >
                      <img src={editIcon} alt="Editar" className="h-5 w-20 mr-1 transition-transform duration-300 hover:scale-90"/>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(ordem.id, ordem.status); }} 
                      className="bg-transparent border-none cursor-pointer flex items-center rounded ml-2"
                      disabled={ordem.status !== "Concluído"} // Desativa o botão se não for "Concluído"
                    >
                      <img src={deleteIcon} alt="Deletar" className="h-5 w-10 transition-transform duration-300 hover:scale-90"/>
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <p>Nenhuma ordem encontrada</p>
          )}
        </ul>
      </div>

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
          disabled={indexOfLastOrdem >= ordens.length}
          className={`transition-transform duratiocity-5hover:scale-95 text-white px-4 py-2 bg-blue-600 rounded-md ${indexOfLastOrdem >= ordens.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'}`}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}

export default ListarOrdensServico;
