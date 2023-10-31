const cellElements = document.querySelectorAll("[data-cell]")
const board = document.querySelector("[data-quadro]")
const mensagemVitoria = document.querySelector("[data-mensagem-vitoria]")
const mensagem = document.querySelector("[data-mensagem]")
const botao = document.querySelector("[data-botao]")


let isCircleTurn = false;

const combinacoesGanhadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const inicio = () => {
    isCircleTurn = false
   
    for (const cell of cellElements) {
        cell.classList.remove('circle')
        cell.classList.remove('x')
        cell.style.backgroundImage = ''
        cell.removeEventListener('click', handleClick)
        cell.addEventListener("click", handleClick, {once: true})
    }
    

    simboloResetado()
    mensagem.classList.remove('mostra-mensagem-foda')
}

const verificarVitoria = (jogadorAtual) => {
    return combinacoesGanhadoras.some(combinacao => {
        return combinacao.every((index) =>{
            return cellElements[index].classList.contains(jogadorAtual)
        })
    })
}

const verificaEmpate = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains('x') || cell.classList.contains('circle') 
    })
}

const fimJogo = (empate) => {
    if (empate) {
        mensagemVitoria.innerText = 'Empate!'
    } else {
        mensagemVitoria.innerText = isCircleTurn ? 'Lilia venceu' : 'Kayn venceu!'
    }

    mensagem.classList.add('mostra-mensagem-foda')
} 

const marcador = (cell, classToAdd) => {
    cell.classList.add(classToAdd);

    // Adicione esta parte para trocar a imagem
    if (classToAdd === 'x') {
        cell.style.backgroundImage = 'url("https://ddragon.leagueoflegends.com/cdn/13.20.1/img/profileicon/2087.png")';
    } else if (classToAdd === 'circle') {
        cell.style.backgroundImage = 'url("https://1.bp.blogspot.com/-X5xw2uJ31zE/YTurK7ErvTI/AAAAAAAB_vk/XIc0qb1nuJ8KYNLWiuG8qDmm5NiXmerpQCLcBGAsYHQ/w200-h200/5075.jpg")';
    }
}

const simboloResetado = () => {
    board.classList.remove('circle')
    board.classList.remove('x')

    if (isCircleTurn) {
        board.classList.add("circle")
    } else {
        board.classList.add("x")
    }
}

const mudarSimbolo = () => {
    isCircleTurn = !isCircleTurn

    simboloResetado()
}

const handleClick = (e) => {
    // Coloca x ou bolinha

    const cell = e.target
    const classToAdd = isCircleTurn ? 'circle' : 'x'

    marcador(cell, classToAdd)

    // Verifica se venceu
    const vitoria = verificarVitoria(classToAdd)

    // Verifica se ocorreu empate
    const empate = verificaEmpate()

    if (vitoria) {
        fimJogo(false)
    } else if (empate) {
        fimJogo(true)
    } else{
        // Muda o simbolo
        mudarSimbolo()
    }

}

inicio()

botao.addEventListener('click', inicio)