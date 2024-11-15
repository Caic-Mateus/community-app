import express from 'express';
import { DenunciaController } from './denunciaController.js';

const app = express();
const denunciaController = new DenunciaController();

app.post("/create", denunciaController.createDenuncia);
app.get("/list", denunciaController.findDenuncias);
app.get("/:denunciaId", denunciaController.getDenunciaById);

export const denunciasRouter = app;
