import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://check-share.onrender.com'
        : 'http://localhost:3000'
}));

// Caminho para o arquivo JSON
const dataPath = path.join(__dirname, '../data.json');

// Função para ler o arquivo JSON
const readData = () => {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
};

// Função para escrever no arquivo JSON
const writeData = (data: any) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Rota para buscar todos os checklists
app.get('/api/checklists', (req: Request, res: Response) => {
    const data = readData();
    res.json(data.checklists);
});

app.post('/api/checklists', (req: Request, res: Response) => {
    const { title, items } = req.body;

    // Validação dos dados
    if (!title || !items) {
        res.status(400).json({ error: 'Título e itens são obrigatórios!' });
        return; // Retorna aqui para evitar execução adicional
    }

    const data = readData();
    const newChecklist = {
        id: Math.random().toString(36).substring(7), // Gera um ID único
        title,
        items,
    };

    data.checklists.push(newChecklist);
    writeData(data); // Atualiza o arquivo JSON

    res.status(201).json(newChecklist); // Retorna o novo checklist criado
});

app.get('/api/checklists/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const data = readData();
    const checklist = data.checklists.find((c: any) => c.id === id);

    if (!checklist) {
        res.status(404).json({ error: 'Checklist não encontrada' });
        return; // Retorna aqui para evitar execução adicional
    }

    res.json(checklist); // Retorna a checklist encontrada
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

const rootDir = path.resolve(__dirname, '../..');
app.use(express.static(path.join(rootDir, 'client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(rootDir, 'client/dist', 'index.html'));
});