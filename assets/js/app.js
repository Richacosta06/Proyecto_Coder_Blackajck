(() => {
    'use strict'

    class Baraja {
        constructor() {
            this.tipos = ['C', 'D', 'H', 'S'];
            this.especiales = ['A', 'J', 'Q', 'K'];
            this.cartas = this.crearBaraja();
        }

        crearBaraja() {
            const baraja = [];
            for (let i = 2; i <= 10; i++) {
                this.tipos.forEach(tipo => baraja.push(i + tipo));
            }
            this.tipos.forEach(tipo => 
                this.especiales.forEach(esp => baraja.push(esp + tipo))
            );
            return _.shuffle(baraja);
        }

        pedirCarta() {
            if (!this.cartas.length) {
                throw 'La baraja está vacía. No se puede pedir más cartas.';
            }
            return this.cartas.shift();
        }

        valorCarta(carta) {
            const valor = carta.slice(0, -1);
            return isNaN(valor) ? (valor === 'A' ? 11 : 10) : parseInt(valor);
        }
    }

    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small'),
          mensaje = document.querySelector('#mensaje');

    let baraja = new Baraja();
    let puntosJugadores = [];

    function acumularPuntos(carta, turno) {
        puntosJugadores[turno] += baraja.valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    function crearCarta(carta, turno) {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.className = 'carta';
        divCartasJugadores[turno].append(imgCarta);
    }

    function esperar(milisegundos) {
        return new Promise(resolve => setTimeout(resolve, milisegundos));
    }

    const turnoComputadora = async (puntosMinimos) => {
        const intervalo = 700;

        const realizarTurno = async () => {
            const carta = baraja.pedirCarta();
            const puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

            if (puntosMinimos > 21 || puntosComputadora > puntosMinimos) {
                contarPuntos(puntosMinimos, puntosComputadora);
                setTimeout(() => {
                    mostrarMensaje(puntosMinimos, puntosComputadora);
                }, 1000);
                return;
            }

            await esperar(intervalo);
            await realizarTurno();
        };

        await realizarTurno();
    }

    btnPedir.addEventListener('click', () => {
        const carta = baraja.pedirCarta();
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
    });

    btnNuevo.addEventListener('click', () => {
        baraja = new Baraja();
        puntosJugadores = [0, 0];
        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        mensaje.innerText = '';
    });


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

