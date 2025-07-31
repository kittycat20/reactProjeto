import { useEffect, useState } from 'react';
import api from '../../services/api';
import './ClienteForm.css';

function ClienteForm({ clienteEditando, setClienteEditando, setAtualizar }) {
  const [erros, setErros] = useState({});
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    dataNascimento: '',
    telefones: ['']
  });

  useEffect(() => {
    if (clienteEditando) {
      setFormData({
        nome: clienteEditando.nome || '',
        cpf: clienteEditando.cpf || '',
        email: clienteEditando.email || '',
        dataNascimento: clienteEditando.dataNascimento || '',
        telefones: clienteEditando.telefones?.map(t => t.numero) || ['']
      });
    }
  }, [clienteEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTelefoneChange = (index, value) => {
    const novosTelefones = [...formData.telefones];
    novosTelefones[index] = value;
    setFormData(prev => ({ ...prev, telefones: novosTelefones }));
  };

  const validarFormulario = () => {
  const novosErros = {};

  if (!formData.nome || formData.nome.trim().length < 3) {
    novosErros.nome = 'O nome deve ter pelo menos 3 letras.';
  }

  if (!formData.cpf || !/^\d{11}$/.test(formData.cpf)) {
    novosErros.cpf = 'CPF deve conter exatamente 11 dígitos numéricos.';
  }

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    novosErros.email = 'Email inválido.';
  }

  if (
    formData.dataNascimento &&
    isNaN(new Date(formData.dataNascimento).getTime())
  ) {
    novosErros.dataNascimento = 'Data de nascimento inválida.';
  }

  const telefonesValidos = formData.telefones.filter(tel => tel.trim().length >= 8);
  if (telefonesValidos.length === 0) {
    novosErros.telefones = 'Informe pelo menos 1 telefone com 8 dígitos ou mais.';
  }

  setErros(novosErros);
  return Object.keys(novosErros).length === 0;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!validarFormulario()) return;

    const payload = {
      nome: formData.nome,
      cpf: formData.cpf,
      email: formData.email,
      dataNascimento: formData.dataNascimento,
      telefones: formData.telefones
        .map(numero => numero.trim())
        .filter(numero => numero !== '')
        .map(numero => ({ numero }))
    };

    try {
      if (clienteEditando?.id) {
        await api.put(`/clientes/${clienteEditando.id}`, { id: clienteEditando.id, ...payload });
        } else {
        await api.post('/clientes', payload);
     }

      setAtualizar(prev => !prev);
      setClienteEditando(null);
      setFormData({
        nome: '',
        cpf: '',
        email: '',
        dataNascimento: '',
        telefones: ['']
      });
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      alert('Erro ao salvar cliente. Veja o console.');
    }
  };

  return (
    <div className='form-container'>
      <form className="cliente-form" onSubmit={handleSubmit}>
        <input className='input-group' name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" required />
        {erros.nome && <p className="erro">{erros.nome}</p>}

        <input className='input-group' name="cpf" value={formData.cpf} onChange={handleChange} placeholder="CPF" required />
        {erros.cpf && <p className="erro">{erros.cpf}</p>}

        <input className='input-group' name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        {erros.email && <p className="erro">{erros.email}</p>}

        <input className='input-group' type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} />
        {erros.dataNascimento && <p className="erro">{erros.dataNascimento}</p>}

        {formData.telefones.map((tel, index) => (
        <div key={index} className="telefone-wrapper">
          <input
            placeholder={`Telefone ${index + 1}`}
            value={tel}
            onChange={e => handleTelefoneChange(index, e.target.value)}
          />
          {index > 0 && (
            <button
              type="button"
              className="btn-remover"
              onClick={() => {
                const novos = [...formData.telefones];
                novos.splice(index, 1);
                setFormData(prev => ({ ...prev, telefones: novos }));
              }}
              title="Remover telefone"
            >
              ×
            </button>
          )}
        </div>
      ))}

        {erros.telefones && <p className="erro">{erros.telefones}</p>}

      <div className='btn-container'>

        {/* Botão adicionar telefone */}
        <button
            type="button"
            className="btn btn-adicionarTelefone"
            onClick={() =>
              setFormData(prev => ({
                ...prev,
                telefones: [...prev.telefones, '']
              }))
            }
          >
            + Adicionar Telefone
          </button>
        
        {/* Botão Cancelar edição */}
        {clienteEditando && (
        <button
          type="button"
          className="btn btn-cancelar"
          onClick={() => {
            setClienteEditando(null);
            setFormData({
              nome: '',
              cpf: '',
              email: '',
              dataNascimento: '',
              telefones: ['']
            });
          }}
        >
          Cancelar Edição
        </button>
      )}

      {/* Botão Salvar Alterações */}
      <button className='btn btn-cadastrar' type="submit">{clienteEditando ? 'Salvar Alterações' : 'Cadastrar Cliente'}</button>

      </div>
      </form>
    </div>
  );
}

export default ClienteForm;
