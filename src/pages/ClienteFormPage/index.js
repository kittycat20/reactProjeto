import { useState } from 'react';
import ClienteForm from '../../components/ClienteForm';
import './ClienteFormPage.css';

function ClienteFormPage() {
  const [clienteEditando, setClienteEditando] = useState(null);
  const [, setAtualizar] = useState(false);

  return (
    <ClienteForm
      clienteEditando={clienteEditando}
      setClienteEditando={setClienteEditando}
      setAtualizar={setAtualizar}
    />
  );
}

export default ClienteFormPage;