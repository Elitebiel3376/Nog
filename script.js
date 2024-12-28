// Função para gerar uma senha aleatória
function gerarSenhaAleatoria() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let senha = '';
    for (let i = 0; i < 10; i++) {
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return senha;
}

// Função para manipular o envio do cadastro
document.getElementById("formCadastro").addEventListener("submit", function(event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = gerarSenhaAleatoria();  // Gerar a senha aleatória

    // Aqui, você pode enviar os dados para o backend usando fetch ou AJAX
    // Exemplo:
    fetch('backend_url/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
    })
    .then(response => response.json())
    .then(data => {
        alert('Cadastro realizado com sucesso!');
        console.log(data);  // Exemplo de resposta
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

// Função para manipular o envio do login
document.getElementById("formLogin").addEventListener("submit", function(event) {
    event.preventDefault();
    const emailLogin = document.getElementById("emailLogin").value;
    const senhaLogin = document.getElementById("senhaLogin").value;

    // Enviar os dados de login para o backend
    fetch('backend_url/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailLogin, senha: senhaLogin })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("login").style.display = "none";
            document.getElementById("m3u").style.display = "block";
            document.getElementById("m3uLink").innerText = `Seu M3U: ${data.m3uLink}`;
        } else {
            alert('Credenciais inválidas');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});