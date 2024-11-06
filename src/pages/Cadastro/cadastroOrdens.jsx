import { useState, useEffect } from "react";
import api from "../../../services/api";
import PropTypes from "prop-types";

function CadastrarOrdemServico({ onUserAdded }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    descricao: "",
    placaVeiculo: "",
    setorOs: "",
    prioridade: "",
    status: "Aguardando",
    usuarioId: ""
  });

  useEffect(() => {
    async function fetchUsuarios() {
      const token = localStorage.getItem("token");
      try {
        const response = await api.get("/lista-usuario", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarios(response.data.users);
      } catch (err) {
        setError("Erro ao buscar usuários.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsuarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await api.post("/ordem-servico", {
        ...formData,
        usuarioId: parseInt(formData.usuarioId)
      });
      alert("Ordem de serviço cadastrada com sucesso!");
      onUserAdded();
      setFormData({
        descricao: "",
        placaVeiculo: "",
        setorOs: "",
        prioridade: "",
        status: "Aguardando",
        usuarioId: ""
      });
    } catch (err) {
      setError(err.response?.data.message || "Erro ao cadastrar ordem de serviço.");
      console.error(err);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Cadastrar Ordem de Serviço
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Carregando usuários...</p>
      ) : (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <select
            name="usuarioId"
            value={formData.usuarioId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            required
          >
            <option value="" disabled hidden>
              Selecione o Usuário
            </option>
            {usuarios.map(usuario => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nome}
              </option>
            ))}
          </select>
          <input
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descrição"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            required
          />
          <input
            name="placaVeiculo"
            value={formData.placaVeiculo}
            onChange={handleChange}
            placeholder="Placa do Veículo"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            required
          />
          <select
            name="setorOs"
            value={formData.setorOs}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            required
          >
            <option value="" disabled hidden>
              Selecione o setor
            </option>
            <option value="Mecânica">Mecânica</option>
            <option value="Funilaria">Funilaria</option>
            <option value="Pintura">Pintura</option>
            <option value="Elétrica">Elétrica</option>
            <option value="Estética">Estética</option>
          </select>
          <select
            name="prioridade"
            value={formData.prioridade}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            required
          >
            <option value="" disabled hidden>
              Selecione a prioridade
            </option>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="Aguardando">Aguardando</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Concluído">Concluído</option>
          </select>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500">
            Cadastrar
          </button>
        </form>
      )}
    </div>
  );
}

CadastrarOrdemServico.propTypes = {
  onUserAdded: PropTypes.func.isRequired,
};

export default CadastrarOrdemServico;
