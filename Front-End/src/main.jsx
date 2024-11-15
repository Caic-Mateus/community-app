import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthService from "./components/services/AuthServices.jsx";

import { Login } from "./pages/login.jsx";
import { Cadastro } from "./pages/cadastro.jsx";
import { Feed } from "./pages/feed.jsx";
import { Perfil } from "./pages/perfil.jsx";
import { Administrador } from "./pages/adm.jsx";
import { Notificacao } from "./pages/notificacao.jsx";
import { Mensagem } from "./pages/mensagem.jsx";
import { ItensSalvos } from "./pages/itensSalvos.jsx";
import { MaisOpcoes } from "./pages/maisOpcoes.jsx";
import { PerfilOther } from "./pages/otherPerfil.jsx";
import { AdministradorRelat } from "./pages/adm-relat.jsx";
const authService = new AuthService();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login authService={authService} />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/feed",
    element: <Feed authService={authService} />,
  },
  {
    path: "/perfil",
    element: <Perfil />,
  },
  {
    path: "/adm",
    element: <Administrador />,
  },
  {
    path: "/admRelat",
    element: <AdministradorRelat />,
  },
  {
    path: "/notificacao",
    element: <Notificacao />,
  },
  {
    path: "/mensagens",
    element: <Mensagem />,
  },
  {
    path: "/itensSalvos",
    element: <ItensSalvos />,
  },
  {
    path: "/maisOpcoes",
    element: <MaisOpcoes />,
  },
  {
    path: "/perfilOther/:otherUserId",
    element: <PerfilOther />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
