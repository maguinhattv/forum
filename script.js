// Função para obter as respostas armazenadas no localStorage
function getStoredResponses() {
    var storedResponses = localStorage.getItem('forumResponses');
    if (storedResponses) {
        return JSON.parse(storedResponses);
    }
    return [];
}

// Função para armazenar as respostas no localStorage
function storeResponses(responses) {
    localStorage.setItem('forumResponses', JSON.stringify(responses));
}

// Função para carregar as respostas armazenadas no fórum
function loadStoredResponses() {
    var storedResponses = getStoredResponses();
    displayResponses(storedResponses);
}

// Função para exibir as respostas no fórum
function displayResponses(responses) {
    var postsElement = document.getElementById('posts');
    postsElement.innerHTML = "";

    responses.forEach(function(response) {
        var responseItem = document.createElement('p');
        responseItem.textContent = response;
        postsElement.appendChild(responseItem);
    });
}

// Função para adicionar uma nova resposta
function addResponse(response, index) {
    var responseItem = document.createElement('p');
    responseItem.textContent = "Resposta à pergunta " + index + ": " + response;

    var postsElement = document.getElementById('posts');
    postsElement.appendChild(responseItem);
}

// Função para enviar o formulário
function submitForm(event) {
    event.preventDefault();

    var storedResponses = getStoredResponses();
    var responses = [];

    var specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    for (var i = 1; i <= 5; i++) {
        var responseElement = document.getElementById('response' + i);
        var response = responseElement.value;

        if (specialChars.test(response)) {
            alert("Não é permitido usar caracteres especiais!");
            return;
        }

        responses.push(response);
        responseElement.value = "";
    }

    var allResponses = storedResponses.concat(responses);
    storeResponses(allResponses);
    displayResponses(allResponses);
}

// Carregar as respostas armazenadas ao carregar a página
window.addEventListener('load', function() {
    loadStoredResponses();
});
