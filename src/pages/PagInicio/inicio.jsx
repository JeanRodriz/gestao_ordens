import React from 'react';
import { Link } from 'react-router-dom';

const BemVindo = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Conteúdo principal */}
      <main className="flex justify-center items-center flex-col p-8 bg-blue-50">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-4">
          Bem-vindo à nossa plataforma!
        </h2>
        <p className="text-lg text-center text-gray-700 mb-6">
          Gerencie suas ordens de serviço de forma prática e eficiente. Comece agora a organizar suas tarefas e melhorar seus resultados.
        </p>
        <div className="flex justify-center">
          <Link to='/'>
          <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200">
            Comece Agora
          </button>
          </Link>
        </div>
      </main>

      {/* Seção de Como Funciona */}
      <section className="container mx-auto py-16 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8">
          Como Funciona
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h4 className="font-semibold text-lg text-blue-600 mb-4">Cadastro de Ordens</h4>
            <p className="text-gray-600">Crie ordens de serviço facilmente, com todos os detalhes que você precisa.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h4 className="font-semibold text-lg text-blue-600 mb-4">Gestão de Usuários</h4>
            <p className="text-gray-600">Controle e monitore os usuários da sua plataforma de maneira eficaz.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h4 className="font-semibold text-lg text-blue-600 mb-4">Relatórios em Tempo Real</h4>
            <p className="text-gray-600">Acompanhe as ordens de serviço em tempo real e tome decisões informadas.</p>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Gestão de Ordem de Serviços - Todos os direitos reservados.</p>
          <div className="mt-4">
            <a href="#" className="text-white hover:underline">Política de Privacidade</a> | 
            <a href="#" className="text-white hover:underline"> Termos de Serviço</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BemVindo;
