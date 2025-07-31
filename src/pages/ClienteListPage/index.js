import { useState } from 'react';
import ClienteList from '../../components/ClienteList';
import ClienteForm from '../../components/ClienteForm';
import './ClienteListPage.css'; 

function ClienteListPage() {
  const [clienteEditando, setClienteEditando] = useState(null);
  const [atualizar, setAtualizar] = useState(false);

  return (
    <div className="cliente-page">
      <div className="cliente-list">
        <ClienteList
          setClienteEditando={setClienteEditando}
          atualizar={atualizar}
          setAtualizar={setAtualizar}
        />
      </div>

      {clienteEditando && (
      <div className="cliente-form">
        {clienteEditando && (
          <>
            <h2>Editar Cliente</h2>
            <ClienteForm
              clienteEditando={clienteEditando}
              setClienteEditando={setClienteEditando}
              setAtualizar={setAtualizar}
            />
          </>
        )}
      </div>
      )}
    </div>
  );
}

export default ClienteListPage;
