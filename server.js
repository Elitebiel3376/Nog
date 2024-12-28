const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Banco de dados simulado
const clientes = [];

// Rota para cadastro
app.post('/cadastrar', (req, res) => {
    const { nome, email, senha } = req.body;

    // Criar M3U exclusivo
    const m3uLink = `http://iptv-service.com/${email}.m3u`;

    // Salvar o cliente
    clientes.push({ nome, email, senha, m3uLink });
    res.json({ success: true, message: 'Cliente cadastrado com sucesso!' });
});

// Rota para login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    
    // Verificar se o cliente existe
    const cliente = clientes.find(c => c.email === email && c.senha === senha);

    if (cliente) {
        res.json({ success: true, m3uLink: cliente.m3uLink });
    } else {
        res.json({ success: false, message: 'Credenciais inválidas' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});