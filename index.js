const calculadora = document.querySelector('.calculadora')
const teclas = document.querySelector('.teclas')
const numero_atual = document.querySelector('.numero_atual')
const numero_antigo = document.querySelector('.numero_antigo')
const operacao = document.querySelector('.operacao')

/**
 * addEventListener adiciona um "ouvidor" de um evento, nesse caso o
 * 	evento 'click'
 * 
 * e é o evento que ocorreu
 * 
 * e.target é o alvo daquele evento
 * 
 * dentro do if é verificado se o mais próximo do evento não é um botão,
 * 	pois dentro de teclas também há o espaçamento entre os botões (que
 * 	não queremos usar)
 * 
 * .textContent pega o conteúdo de texto do elemento
 * 
 * */
teclas.addEventListener('click', (e) => {
	if (!e.target.closest('button')) return

	const tecla = e.target
	const valorTecla = tecla.textContent
	const {tipoTecla} = tecla.dataset /* recupera o dataset data-tipo-tecla e guarda na variável tipoTecla (essa variável está dentro de chaves para indicar que o dataset a ser recuperado possui o mesmo nome, se não fosse usado chaves: const tipoTecla = tecla.dataset.tipoTecla); em javascript os datasets não possuem traço no nome, em seu lugar a próxima palavra terá a primeira letra maiuscúla*/
	const {tipoTeclaAnterior, memoria} = calculadora.dataset /* recupera duas variaveis ao mesmo tempo*/
	const valorNumAtual = numero_atual.textContent

	if (tipoTecla === 'numero') {
		if (valorNumAtual === '0' || tipoTeclaAnterior === 'operador') {
			if (valorTecla === '00') {
				numero_atual.textContent = '0'
			}
			else {
				numero_atual.textContent = valorTecla
				numero_antigo.textContent = calculadora.dataset.primeiroNumero
			}
		}
		else if (tipoTeclaAnterior === 'igual') {
			if (valorTecla === '00') {
				numero_atual.textContent = '0'
			}
			else {
				numero_atual.textContent = valorTecla
				numero_antigo.textContent = valorNumAtual
			}
		}
		else {
			numero_atual.textContent = valorNumAtual + valorTecla /* concatena o texto*/
		}
	}

	if (tipoTecla === 'operador') {
		/* seleciona todos seletores com aquele dataset que estão dentro de teclas*/
		const operadores = teclas.querySelectorAll('[data-tipo-tecla="operador"]')
		/* passa por todos operadores executando a função dentro de chaves*/
		operadores.forEach((operador) => {
			operador.dataset.estado = ''
		})
		tecla.dataset.estado = 'selecionado'
		
		calculadora.dataset.primeiroNumero = valorNumAtual
		calculadora.dataset.operador = tecla.dataset.tecla

		operacao.textContent = tecla.textContent
	}

	if (tipoTecla === 'igual') {
		const primeiroNumero = parseFloat(calculadora.dataset.primeiroNumero)
		const operador = calculadora.dataset.operador
		const segundoNumero = parseFloat(valorNumAtual)

		let resultado = ''
		if (operador == 'somar') {
			resultado = primeiroNumero + segundoNumero
		}
		if (operador == 'subtrair') {
			resultado = primeiroNumero - segundoNumero
		}
		if (operador == 'multiplicar') {
			resultado = primeiroNumero * segundoNumero
		}
		if (operador == 'dividir') {
			resultado = primeiroNumero / segundoNumero
		}
		numero_atual.textContent = resultado
	}

	if (tipoTecla === 'limpar') {
		numero_atual.textContent = '0'
		numero_antigo.textContent = ''
		operacao.textContent = ''
		calculadora.dataset.primeiroNumero = ''
	}
	if (tipoTecla === 'salvar') {
		calculadora.dataset.memoria = valorNumAtual
	}
	if (tipoTecla === 'recuperar') {
		if (memoria === undefined) {
			numero_atual.textContent = '0'
		}
		else {
			numero_atual.textContent = memoria
			if (calculadora.dataset.tipoTeclaAnterior === 'igual') {
				numero_antigo.textContent = valorNumAtual
				calculadora.dataset.primeiroNumero = valorNumAtual
			}
		}
	}

	/* estamos criando um novo tipo*/
	calculadora.dataset.tipoTeclaAnterior = tipoTecla
})

function backspace() {
	if (numero_atual.textContent.length > 1)
		numero_atual.textContent = numero_atual.textContent.slice(0, -1);
	else
		numero_atual.textContent = '0'
	calculadora.dataset.tipoTeclaAnterior = 'backspace'
}

function mudarTema() {
	document.body.classList.toggle('light')
}

function mostrarAjuda() {
	const manual = document.querySelector('.manual_expandido');
	if (manual.style.display == 'block') {
		manual.style.animation = 'manual_animacao_esconder 0.4s forwards'
		setTimeout(()=> {manual.style.display = 'none'}, 400);
	}
	else {
		manual.style.display = 'block'
		manual.style.animation = null
	}
}
