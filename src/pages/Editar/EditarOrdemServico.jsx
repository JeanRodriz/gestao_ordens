import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import api from "../../../services/api";

function EditarOrdemServico({ ordem, onOrdensUpdated, onClose }) {
  const [loading, setLoading] = useState(true);
  const [descricao, setDescricao] = useState(ordem.descricao || "");
  const [placaVeiculo, setPlacaVeiculo] = useState(ordem.placaVeiculo || "");
  const [setorOs, setSetorOs] = useState(ordem.setorOs || "");
  const [prioridade, setPrioridade] = useState(ordem.prioridade || "");
  const [status, setStatus] = useState(ordem.status || "");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ordem) {
      setDescricao(ordem.descricao);
      setPlacaVeiculo(ordem.placaVeiculo);
      setSetorOs(ordem.setorOs);
      setPrioridade(ordem.prioridade);
      setStatus(ordem.status);
      setLoading(false);
    }
  }, [ordem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await api.put(
        `/ordem-servico/${ordem.id}`,
        {
          descricao,
          placaVeiculo,
          setorOs,
          prioridade,
          status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onOrdensUpdated();
      console.log("Resposta da API:", response.data);
    } catch (err) {
      console.error("Erro ao editar a ordem de serviço:", err);
      setError("Erro ao editar a ordem de serviço.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Editar Ordem de Serviço
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">Descrição:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Placa do Veículo:</label>
          <input
            type="text"
            value={placaVeiculo}
            onChange={(e) => setPlacaVeiculo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Setor:</label>
          <select
          type="text"
            value={setorOs}
            onChange={(e) => setSetorOs(e.target.value)}
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
        </div>
        <div>
          <label className="block text-gray-700">Prioridade:</label>
          <select
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            required
          >
            <option value="" disabled hidden>
              Selecione a prioridade
            </option>
            <option value="Baixa">Baixa</option>
            <option value="Media">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <label className="block text-gray-700">Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          required
        >
          <option value="Aguardando">Aguardando</option>
          <option value="Em Andamento">Em Andamento</option>
          <option value="Concluído">Concluído</option>
        </select>
        <div className="space-y-2">
          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500"
            type="submit"
          >
            Salvar
          </button>
          <button
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500"
            type="button"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

// Define PropTypes for the component
EditarOrdemServico.propTypes = {
  ordem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    descricao: PropTypes.string.isRequired,
    placaVeiculo: PropTypes.string.isRequired,
    setorOs: PropTypes.string,
    prioridade: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onOrdensUpdated: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditarOrdemServico;
