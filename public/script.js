var nome = localStorage.getItem("nomeUsuario");
var nomeProd;
var descProd;
var precoProd;
var quantProd;
var categProd;
var contato;
var disponivel;
var imagemProd;

if(nome == null) {
    document.body.innerHTML = "<h1>FAÇA UM LOGIN</h1>"
    alert("Você precisa de um login para entrar ver os produtos. redirecionando para a página de login...")
    window.location.replace(`index.html`);
}

document.getElementById('username').value = nome

//Função para reduzir a qualidade da imagem
function reduceImageQuality(base64, quality) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = base64;
    return new Promise((resolve, reject) => {
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.onerror = reject;
    });
}

//Função atualizar imagem
document.getElementById("escolherimg").addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        reduceImageQuality(reader.result, 0.5).then(function (result) {
            document.getElementById("imagem").style.backgroundImage = `url(${result})`;
            lerImagem(result);
        });
    });
    reader.readAsDataURL(file);
});

function lerImagem(imagem) {
    imagemProd = imagem;
    console.log(document.getElementById("imagem").style.backgroundImage)
}
document.querySelector('form').addEventListener('submit', evento => {
    //Previne o envio padrão do formulário para não atualizar a página
    evento.preventDefault();

    nomeProd = document.getElementById('nomeProd').value
    descProd = document.getElementById('descProd').value
    precoProd = document.getElementById('moedaProd').value + document.getElementById('precoProd').value
    quantProd = document.getElementById('quantProd').value
    categProd = document.getElementById('categProd').value
    contato = document.getElementById('contato').value
    disponivel = document.getElementById('disponivel').value

    if (categProd === "Selecione uma Categoria" ||
        disponivel === "Selecione a Disponibilidade" ||
        nomeProd === "" ||
        descProd === "" ||
        document.getElementById('precoProd').value === "" ||
        quantProd === "" ||
        contato === "" ||
        imagemProd === undefined) {
        alert("preencha todos os dados")
    } else {
        console.log(nomeProd + descProd + precoProd + imagemProd + quantProd + categProd + contato + disponivel);
        //console.log(imagemProd);
        alert("Produto Cadastrado")
        enviarDados()
        window.location.replace("produtosexiste.html");
    }
})
//POST
function enviarDados() {
    fetch('produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: nome,
            produto: nomeProd,
            descricao: descProd,
            preco: precoProd,
            quantidade: quantProd,
            categoria: categProd,
            imagem: imagemProd,
            contato: contato,
            disponibilidade: disponivel
        })
    })
        .then(response => response.json())
}