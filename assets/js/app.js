(() => {
    'use strict'

    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let baraja = [],
        puntosJugadores = [];

    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small'),
        mensaje = document.querySelector('#mensaje');

    const crearBaraja = () => {
        const baraja = [];
        for (let i = 2; i <= 10; i++) {
            tipos.forEach(tipo => baraja.push(i + tipo));
        }
        tipos.forEach(tipo => especiales.forEach(esp => baraja.push(esp + tipo)));
        return _.shuffle(baraja);
    }

    const inicializarJuego = (numJugadores = 2) => {
        baraja = crearBaraja();
        puntosJugadores = Array(numJugadores).fill(0);
        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        mensaje.innerText = '';
    }

    const pedirCarta = () => {
        if (!baraja.length) throw 'La baraja está vacía. No se puede pedir más cartas.';
        return baraja.shift();
    }

    const valorCarta = carta => {
        const valor = carta.slice(0, -1);
        return isNaN(valor) ? (valor === 'A' ? 11 : 10) : parseInt(valor);
    }

    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.className = 'carta';
        divCartasJugadores[turno].append(imgCarta);
    }

    function esperar(milisegundos) {
        return new Promise(resolve => setTimeout(resolve, milisegundos));
    }

    const turnoComputadora = async puntosMinimos => {
        try {
            const intervalo = 700;
            const realizarTurno = async () => {
                const carta = pedirCarta();
                const puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
                crearCarta(carta, puntosJugadores.length - 1);

                if (puntosMinimos > 21 || puntosComputadora > puntosMinimos) {
                    contarPuntos(puntosMinimos, puntosComputadora);
                    setTimeout(() => {
                        mostrarMensaje(puntosMinimos, puntosComputadora);
                    }, 500);
                    return;
                }
                await esperar(intervalo);
                await realizarTurno();
            };
            await realizarTurno();
        } catch (error) {
            console.error("Error durante el turno de la computadora:", error);
        }
    }

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

        if (puntosJugador >= 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    })

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
        mensaje.classList.remove('background');
    });

    //Conteo de Puntuaciones
    function contarPuntos(puntosMinimos, puntosComputadora) {
        let empatecontador = parseInt(sessionStorage.getItem('empatecontador')) || 0;
        let perdistecontador = parseInt(sessionStorage.getItem('perdistecontador')) || 0;
        let ganastecontador = parseInt(sessionStorage.getItem('ganastecontador')) || 0;
    
        if (puntosComputadora === puntosMinimos) {
            empatecontador++;
            sessionStorage.setItem('empatecontador', empatecontador);
        } else if (puntosMinimos > 21) {
            perdistecontador++;
            sessionStorage.setItem('perdistecontador', perdistecontador);
        } else if (puntosComputadora > 21 || puntosMinimos === 21) {
            ganastecontador++;
            sessionStorage.setItem('ganastecontador', ganastecontador);
        } else {
            perdistecontador++;
            sessionStorage.setItem('perdistecontador', perdistecontador);
        }
    }

    function mostrarMensaje(puntosMinimos, puntosComputadora) {
        let empatecontador = parseInt(sessionStorage.getItem('empatecontador')) || 0;
        let perdistecontador = parseInt(sessionStorage.getItem('perdistecontador')) || 0;
        let ganastecontador = parseInt(sessionStorage.getItem('ganastecontador')) || 0;
    
        if (puntosComputadora === puntosMinimos) {
            Swal.fire('EMPATE!! &#128529;', `Computadora: ${perdistecontador} - Jugador: ${ganastecontador}`, 'info');
        } else if (puntosMinimos > 21) {
            Swal.fire('PERDISTE!! &#128557;', `Computadora: ${perdistecontador} - Jugador: ${ganastecontador}`, 'error');
        } else if (puntosComputadora > 21 || puntosMinimos === 21) {
            Swal.fire('¡¡GANASTE¡¡ &#127881;', `Computadora: ${perdistecontador} - Jugador: ${ganastecontador}`, 'success');
        } else {
            Swal.fire('¡¡PERDISTE¡¡ &#128557;', `Computadora: ${perdistecontador} - Jugador: ${ganastecontador}`, 'error');
        }
    }
    

})();

