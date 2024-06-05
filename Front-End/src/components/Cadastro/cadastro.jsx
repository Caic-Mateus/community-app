import React, {useState} from 'react';
import './cadastro.css'

function CadastroForm() {
  const [form, setForm] = useState({
    nome: {
      hasChanged: false,
      value: ""
    },
    usuario:{
      hasChanged: false,
      value: ""
    },
    email:{
      hasChanged: false,
      value: ""
    },
    telefone:{
      hasChanged: false,
      value: ""
    },
    data:{
      hasChanged: false,
      value: ""
    },
    curso:{
      hasChanged: false,
      value: ""
    },
    senha:{
      hasChanged: false,
      value: ""
    },
    confirmarSenha:{
      hasChanged: false,
      value: ""
    }
  })
  const isEmailValid = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  return (
   <div className="Cadastro-container">
         <form action="#">
          <div className='Input-Text'>
          <input type="text" className='TextBlock1 ' placeholder='Nome completo' value={form.nome.value} 
            onChange={event => setForm({...form, nome:{
              hasChanged:true, value:event.target.value
            }})}
          required/>
          <input type="text" className='TextBlock1 ' placeholder='Usuario' value={form.usuario.value}
            onChange={event => setForm({...form, usuario:{
              hasChanged:true, value:event.target.value
            }})}
          required/>
          </div>
          {
          form.nome.hasChanged && !form.nome.value
            && <div className='inputvalidation'>Nome é obrigatório</div>
          }
          {
          form.usuario.hasChanged && !form.usuario.value
            && <div className='inputvalidation'>Usuário é obrigatório</div>
          }
          <div className='Input-Text'>
          <input type="text" className='TextBlock2 ' placeholder="E-mail" value={form.email.value}
            onChange={event => setForm({...form, email:{
              hasChanged: true, value: event.target.value
          }})}
          required />
          <input type="tel" className='TextBlock2 ' placeholder='(11)99999-9999' value={form.telefone.value}
            onChange={event => setForm({...form, telefone:{
              hasChanged: true, value: event.target.value
          }})}
          required/>
          </div>
          {
          form.email.hasChanged && !form.email.value
            && <div className='inputvalidation'>Email é obrigatório</div>
          }
          {
          form.telefone.hasChanged && !form.telefone.value
            && <div className='inputvalidation'>Telefone é obrigatório</div>
          }
          <div className='Input-Text'>
          <input type="date" className='TextBlock2 ' required/>
          <input type="text" className='TextBlock2 '  placeholder='Curso' required/>
          </div>
          <div className='Input-Text'>
          <input type="password" className='TextBlock2 ' placeholder="Senha" required />
          <input type="password" className='TextBlock2 ' placeholder="Confirmar senha" required />
          </div>
          <input type="submit" className="Button-Cadastro" value="Cadastrar" />
    </form>
    <div className="signup-text">
    Não tem uma conta? <a href="#">Inscreva-se</a>
    </div>
   </div>

  );
}

export default CadastroForm;
