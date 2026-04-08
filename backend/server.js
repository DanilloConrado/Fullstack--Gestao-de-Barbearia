import express from "express";
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

app.post('/usuarios', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });
        res.status(201).json({ message: "Gestor criado com sucesso", user: { id: user.id, name: user.name, email: user.email }});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        res.status(200).json({ message: "Login efetuado com sucesso!", user: { id: user.id, name: user.name }});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno no Login" });
    }
});

app.get('/clientes', async (req, res) => {
    try {
        const clientes = await prisma.client.findMany();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar clientes" });
    }
});

app.post('/clientes', async (req, res) => {
    try {
        const { name, phone } = req.body;
        const constCliente = await prisma.client.create({
            data: { name, phone }
        });
        res.status(201).json(constCliente);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar cliente" });
    }
});

app.put('/clientes/:id', async (req, res) => {
    try {
        const { name, phone } = req.body;
        const cliente = await prisma.client.update({
            where: { id: req.params.id },
            data: { name, phone }
        });
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar cliente" });
    }
});

app.delete('/clientes/:id', async (req, res) => {
    try {
        await prisma.client.delete({ where: { id: req.params.id } });
        res.status(200).json({ message: "Cliente deletado" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar cliente" });
    }
});

app.get('/produtos', async (req, res) => {
    try {
        const produtos = await prisma.product.findMany();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar estoque" });
    }
});

app.post('/produtos', async (req, res) => {
    try {
        const { name, qtd, status } = req.body;
        const produto = await prisma.product.create({
            data: { name, qtd: parseInt(qtd), status }
        });
        res.status(201).json(produto);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar produto" });
    }
});

app.put('/produtos/:id', async (req, res) => {
    try {
        const { name, qtd, status } = req.body;
        const produto = await prisma.product.update({
            where: { id: req.params.id },
            data: { name, qtd: parseInt(qtd), status }
        });
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar produto" });
    }
});

app.delete('/produtos/:id', async (req, res) => {
    try {
        await prisma.product.delete({ where: { id: req.params.id } });
        res.status(200).json({ message: "Produto deletado" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar produto" });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});