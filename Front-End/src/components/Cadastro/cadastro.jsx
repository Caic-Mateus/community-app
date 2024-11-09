import React, { useState } from "react";
import axios from "axios";
import "./cadastro.css";
import { useNavigate } from "react-router-dom";

function CadastroForm() {
  const [form, setForm] = useState({
    nome: { hasChanged: false, value: "" },
    usuario: { hasChanged: false, value: "" },
    email: { hasChanged: false, value: "" },
    telefone: { hasChanged: false, value: "" },
    data: { hasChanged: false, value: "" },
    curso: { hasChanged: false, value: "" },
    senha: { hasChanged: false, value: "" },
    confirmarSenha: { hasChanged: false, value: "" },
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      email: form.email.value,
      password: form.senha.value,
      name: form.nome.value,
      avatarUrl: "https://example.com/avatar.png",
      curso: form.curso.value,
      date_Nasc: form.data.value,
      registrationDate: new Date().toISOString().split("T")[0],
      telefone: form.telefone.value,
      user: form.usuario.value,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/users/create",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Usuário cadastrado com sucesso:", response.data);

      navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Erro ao cadastrar usuário:", error.response.data);
        setError(error.response.data);
      } else {
        console.error("Erro ao cadastrar usuário:", error.message);
        setError(error.message);
      }
    }
  };

  return (
    <div className="Cadastro-container">
      <form onSubmit={handleSubmit}>
        <div className="Input-Text-cadastro">
          <input
            type="text"
            className="TextBlock1-cadastro"
            placeholder="Nome completo"
            value={form.nome.value}
            onChange={(event) =>
              setForm({
                ...form,
                nome: { hasChanged: true, value: event.target.value },
              })
            }
            required
          />
          <input
            type="text"
            className="TextBlock1-cadastro"
            placeholder="Usuario"
            value={form.usuario.value}
            onChange={(event) =>
              setForm({
                ...form,
                usuario: { hasChanged: true, value: event.target.value },
              })
            }
            required
          />
        </div>
        {form.nome.hasChanged && !form.nome.value && (
          <div className="inputvalidation-cadastro">Nome é obrigatório</div>
        )}
        {form.usuario.hasChanged && !form.usuario.value && (
          <div className="inputvalidation-cadastro">Usuário é obrigatório</div>
        )}
        <div className="Input-Text-cadastro">
          <input
            type="text"
            className="TextBlock2-cadastro"
            placeholder="E-mail"
            value={form.email.value}
            onChange={(event) =>
              setForm({
                ...form,
                email: { hasChanged: true, value: event.target.value },
              })
            }
            required
          />
          <input
            type="tel"
            className="TextBlock2-cadastro"
            placeholder="(11)99999-9999"
            value={form.telefone.value}
            onChange={(event) =>
              setForm({
                ...form,
                telefone: { hasChanged: true, value: event.target.value },
              })
            }
            required
          />
        </div>
        {form.email.hasChanged && !form.email.value && (
          <div className="inputvalidation-cadastro">Email é obrigatório</div>
        )}
        {form.telefone.hasChanged && !form.telefone.value && (
          <div className="inputvalidation-cadastro">Telefone é obrigatório</div>
        )}
        <div className="Input-Text-cadastro">
          <input
            type="date"
            className="TextBlock2-cadastro"
            value={form.data.value}
            onChange={(event) =>
              setForm({
                ...form,
                data: { hasChanged: true, value: event.target.value },
              })
            }
            required
          />
          <input
            type="text"
            className="TextBlock2-cadastro"
            placeholder="Curso"
            value={form.curso.value}
            onChange={(event) =>
              setForm({
                ...form,
                curso: { hasChanged: true, value: event.target.value },
              })
            }
            required
          />
        </div>
        <div className="Input-Text-cadastro">
          <input
            type="password"
            className="TextBlock2-cadastro"
            placeholder="Senha"
            value={form.senha.value}
            onChange={(event) =>
              setForm({
                ...form,
                senha: { hasChanged: true, value: event.target.value },
              })
            }
            required
          />
          <input
            type="password"
            className="TextBlock2-cadastro"
            placeholder="Confirmar senha"
            value={form.confirmarSenha.value}
            onChange={(event) =>
              setForm({
                ...form,
                confirmarSenha: { hasChanged: true, value: event.target.value },
              })
            }
            required
          />
        </div>
        <input type="submit" className="Button-Cadastro" value="Cadastrar" />
      </form>
      {error && <div className="inputvalidation-cadastro">{error}</div>}
      <div className="signup-text-cadastro">
        <p>Já tem uma conta?</p>
        <a href="/">Logue na sua conta</a>
      </div>
    </div>
  );
}

export default CadastroForm;
