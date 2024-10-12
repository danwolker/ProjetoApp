// Redirecionamento para a página de contato
document.getElementById('action-button')?.addEventListener('click', function() {
    window.location.href = '../contatoscreen/contato.html';  // Redireciona para a página de contatos
});

// Função para carregar campos específicos
function carregarCampos(caminho, containerId) {
    fetch(caminho)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os campos: ' + caminho);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = data;  // Substitui o conteúdo do container com os campos carregados
                console.log('Campos carregados com sucesso de:', caminho);
            } else {
                console.error('Elemento container com id', containerId, 'não encontrado.');
            }
        })
        .catch(error => console.error('Erro ao carregar os campos:', error));
}

// Cálculo do custo por unidade
document.addEventListener('input', function() {
    const precoCompra = parseFloat(document.getElementById('precoCompra')?.value);
    const quantidadeComprada = parseFloat(document.getElementById('quantidadeComprada')?.value);

    if (!isNaN(precoCompra) && !isNaN(quantidadeComprada) && quantidadeComprada > 0) {
        const custoUnidade = precoCompra / quantidadeComprada;
        document.getElementById('custoUnidade').value = `R$ ${custoUnidade.toFixed(2)}/kg`;
    } else {
        document.getElementById('custoUnidade').value = "R$ 0,00/kg";
    }
});

// Função para carregar formulário de insumos
function carregarFormulario(categoria) {
    let url = `../produtosscreen/${categoria}.html`;
    console.log('Tentando carregar formulário de', categoria + ':', url);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o formulário: ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('conteudoDinamico').innerHTML = data;
            console.log('Formulário de', categoria, 'carregado com sucesso.');

            // Após carregar insumos.html, carregar os campos de inputFields.html
            if (categoria === 'Insumos') {
                console.log('Carregando campos de inputFields.html para Insumos');
                carregarCampos('http://127.0.0.1:8080/assets/components/inputFields.html', 'inputFieldsContainer');
            }
        })
        .catch(error => console.error('Erro ao carregar o formulário:', error));
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('Script carregado corretamente');
});
