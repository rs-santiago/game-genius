let order = [];
let clickedOrder = [];
let score = 0;
let high_points = 0;
// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

// cria ordem aleatória de cores
let shuffleOrder = () =>{
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1)
    }
}

// acende a próxima cor
let lightColor = (element, number) =>{
    number = number * 500;
    setTimeout(()=>{
        element.classList.add('selected');
    }, number - 250)
    setTimeout(()=>{
        element.classList.remove('selected');
    }, number)
}

// checa se os botões clicados são os mesmo da ordem gerada no jogo 
let chechOrder = () =>{
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        document.getElementById('points').innerHTML = score;
        alert(`Prontuação: ${score}\nVocê acertou! Iniciando próximo nível`);
        nextLevel();
    }
}

// função para o click do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    setTimeout(()=>{
        createColorElement(color).classList.remove('selected');
        chechOrder();
    }, 250)

}

// função que retorna a cor
let createColorElement = (color) =>{
    if (color == 0) {
        return green;
    }else if(color == 1){
        return red;
    }else if(color == 2){
        return yellow;
    }else{
        return blue;
    }
}

// função para próximo nivel do jogo
let nextLevel = () =>{
    score++;
    shuffleOrder();
}

// função para game over 
let gameOver = () =>{
    if (high_points <= score) {
        document.getElementById('high-points').innerText = score;
        high_points = score;
    }
    alert(`Pontuação: ${score}\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder= [];

    playGame();
}

let playGame = () =>{
    alert('Bem vindo ao Genêgis! Iniciando um novo jogo')
    score = 0;
    document.getElementById('points').innerHTML = score;
    nextLevel();
}

// eventos de click para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// inicio do jogo
playGame();