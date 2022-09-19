window.onload = (event) => {
    console.clear();
    // console.log('evento onload');
    // console.log(console);
    // mensagem();

    var elemento = document.getElementById("btnPessoa");
    elemento.addEventListener("click", pessoa_clicado, false);
};

function mensagem() {
    // let elementos = document.querySelectorAll('.dropdown-item');

    // elementos = Array.from(elementos);

    // Primeira forma
    // elementos.map(function(...elementos) {
    //     console.log(typeof(elementos));
    //     console.log(elementos);
    // });

    // Segunda forma
    // elementos.map(function (elemento, indice, arrayBase) {
    //     console.log(elemento.textContent);
    //     console.log(elemento.innerHTML);
    //     console.log(indice);
    //     console.log(elemento);
    // });
}

function pessoa_clicado(...params) {
    console.log(params);
}