// routes.js
import express from 'express';
import { BugController } from './bugController.js';

const app = express();
const bugController = new BugController();

app.post("/create", bugController.createBug);
app.get("/list", bugController.findBugs);
app.get("/:bugId", bugController.getBugById);

export const bugsRouter = app;
