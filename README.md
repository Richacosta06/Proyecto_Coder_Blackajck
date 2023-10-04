# Blackjack Game

## Descripción

Este proyecto es la entrega final del curso de Javascript de Coder House, una implementación del clásico juego de cartas, Blackjack (también conocido como 21). Es un juego donde los jugadores compiten contra la "casa" o la computadora para obtener una mano que sume 21 o lo más cerca posible sin excederlo.

## Cómo jugar

- Cada jugador, incluyendo la computadora, comienza sin cartas.
- El As vale 11 puntos, las cartas con figuras (Jota, Reina, Rey) valen 10 puntos y las cartas numéricas valen su valor nominal.
- En tu turno, puedes "Pedir" otra carta o "Detener" tu mano actual.
- Si tu mano excede los 21 puntos, pierdes automáticamente.
- Una vez que te detienes, es el turno de la computadora.
- El objetivo es obtener una mano que sume 21 o lo más cerca posible sin excederlo. Si ambos, tú y la computadora, tienen la misma suma, es un empate. Si uno tiene 21 y el otro no, el que tenga 21 gana. Si el jugador excede 21 en su turno pierde automaticamente.

## Características

- El juego utiliza `sessionStorage` para llevar un registro del número de juegos ganados, perdidos y empatados. Los numeros de empates no se muestran en el  resultado ya que no generan partidas perdidas ni ganadas.
- Se utiliza la biblioteca `SweetAlert2` para mostrar alertas estilizadas y dar feedback al usuario sobre los resultados del juego.

## Instalación y ejecución

1. Clona este repositorio.
   ```
   git clone https://github.com/Richacosta06/Proyecto_Coder_Blackjack.git
   ```
2. Navega al directorio del proyecto.
   ```
   cd ../Proyecto_Coder_Blackjack
   ```
3. Abre el archivo `index.html` en tu navegador favorito y ¡comienza a jugar!

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- SweetAlert2

## Contribuciones

Las contribuciones son bienvenidas. Para cualquier mejora o característica adicional, por favor, abre un 'issue' para discutirlo o directamente un 'pull request'.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.

---
