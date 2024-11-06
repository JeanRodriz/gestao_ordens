// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Bem-vindo à Gestão de Ordens de Serviço</h1>
      <p className="text-lg mb-6 text-center">
        Este aplicativo permite que você gerencie suas ordens de serviço de forma simples e eficiente.
      </p>
      <p className="text-lg mb-6 text-center">
        Utilize o menu para navegar entre as diferentes funcionalidades, como cadastro de ordens e gerenciamento de usuários.
      </p>
      <div className="space-x-4">
        <button 
          onClick={() => navigate("/login")} 
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-transform duration-300 hover:scale-95"
        >
          Login
        </button>
        <button 
          onClick={() => navigate("/")} 
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 transition-transform duration-300 hover:scale-95"
        >
          Cadastrar
        </button>
        <button 
          onClick={() => navigate("/lista-usuario")} 
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-500 transition-transform duration-300 hover:scale-95"
        >
          Início
        </button>
      </div>
    </div>
  );
}

export default HomePage;
