import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import ClienteForm from '../ClienteForm';
import './ClienteList.css';

function ClienteList({ setAtualizar, atualizar }) {
  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [mostrarTodos, setMostrarTodos] = useState(false);

  useEffect(() => {
    api.get('/clientes')
      .then(response => setClientes(response.data))
      .catch(error => console.error('Erro ao carregar clientes:', error));
  }, [atualizar]);

  const excluirCliente = async (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este cliente?');
    if (!confirmar) return;

    try {
      await api.delete(`/clientes/${id}`);
      setAtualizar(prev => !prev);
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      alert('Erro ao excluir cliente. Veja o console para mais detalhes.');
    }
  };

  const filtroLower = filtro.toLowerCase();
  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(filtroLower) ||
    cliente.cpf.toLowerCase().includes(filtroLower)
  );

  const clientesParaMostrar = mostrarTodos
    ? clientes
    : filtro.trim() !== ''
      ? clientesFiltrados
      : [];

  return (
    <div className={`cliente-container ${clienteEditando ? '' : 'centralizado'}`}>
      <div className="cliente-lista">
        <h2>Clientes Cadastrados</h2>

        <div className="filtro-container">
          <input
            type="text"
            placeholder="🔍 Pesquisar por nome ou CPF..."
            value={filtro}
            onChange={e => {
              setFiltro(e.target.value);
              setMostrarTodos(false);
            }}
            className="campo-pesquisa"
          />
          <button
            onClick={() => {
              setMostrarTodos(prev => !prev);
              setFiltro('');
            }}
            className="btn-listar-todos"
          >
            {mostrarTodos ? 'Ocultar Todos os Clientes' : 'Listar Todos os Clientes'}
          </button>
        </div>

        {clientesParaMostrar.length === 0 ? (
          <p className="mensagem-vazia">
            {filtro.trim() === '' && !mostrarTodos
              ? 'Digite um nome ou CPF ou clique em "Listar Todos os Clientes".'
              : 'Nenhum cliente encontrado.'}
          </p>
        ) : (
          <div className="cliente-grid">
            {clientesParaMostrar.map(cliente => (
              <div className="cliente-card" key={cliente.id}>
                <div className="cliente-info">
                  <p><strong>Nome:</strong> {cliente.nome}</p>
                  <p><strong>CPF:</strong> {cliente.cpf}</p>
                  <p><strong>Email:</strong> {cliente.email}</p>
                  <p><strong>Data de Nascimento:</strong> {cliente.dataNascimento}</p>
                  <ul>
                    {cliente.telefones?.map(tel => (
                      <li key={tel.id}><strong>Telefone: </strong>{tel.numero}</li>
                    ))}
                  </ul>
                </div>
                <div className="botoes-acao">
                  <button onClick={() => setClienteEditando(cliente)} className="btn-editar">Editar</button>
                  <button onClick={() => excluirCliente(cliente.id)} className="btn-excluir">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {clienteEditando && (
        <div className="cliente-form-edicao">
          <h3>Editar Cliente</h3>
          <ClienteForm
            clienteEditando={clienteEditando}
            setClienteEditando={setClienteEditando}
            setAtualizar={() => setAtualizar(prev => !prev)}
          />
        </div>
      )}
    </div>
  );
}

export default ClienteList;
