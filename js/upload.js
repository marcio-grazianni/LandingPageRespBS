window.onload = (event) => {
    console.clear();

    // Aguarda o evento de mudança no input do arquivo
    document.getElementById('fileInput').addEventListener('change', handleFileInputChange);
};

function escapeHTML(html) {
    var text = document.createTextNode(html);
    var div = document.createElement('div');
    div.appendChild(text);
    return div.innerHTML;
}

async function handleFileInputChange(event) {
    console.clear();

    const file = event.target.files[0];
    if (!file) {
        console.log('Nenhum arquivo selecionado.');
        return;
    }

    try {
        await processFileLineByLine(file);
    } catch (error) {
        console.error('Erro ao processar o arquivo:', error);
    }
}

async function processFileLineByLine(file) {
    const decoder = new TextDecoderStream();
    const lineStream = file.stream().pipeThrough(decoder).pipeThrough(new TransformStream(new LineBreakTransformer()));
    const reader = lineStream.getReader();
    const contentFileText = document.getElementById('contentFileText');
    const contentFile = document.getElementById('contentFile');
    contentFileText.textContent = '';
    contentFile.innerHTML = '';

    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            break;
        }
        // Aqui você tem cada linha disponível como `value`
        if (value.trim() !== '') {
            contentFileText.innerHTML += escapeHTML(value) + '<br>';
            contentFile.innerHTML += `${value}<br>`;
            // console.log(value);
        }
    }
}

// Esta classe deve ir para o arquivo js/funcoes.js
class LineBreakTransformer {
    constructor() {
        this.container = '';
    }

    transform(chunk, controller) {
        this.container += chunk;
        const lines = this.container.split('\n');
        this.container = lines.pop(); // A última linha pode estar incompleta
        lines.forEach(line => controller.enqueue(line));
    }

    flush(controller) {
        // Quando o stream é fechado, envia qualquer valor remanescente
        if (this.container) {
            controller.enqueue(this.container);
        }
    }
}
