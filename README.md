# Sorpresa para Fiorella

Página de cumpleaños hecha por Josimar para Fiorella, para el 3 de noviembre de 2026: su primer cumpleaños con un año entero de novios.

## Qué tiene

1. **Un sobre sellado** que se abre al tocarlo y hace sonar una cajita musical con el «Cumpleaños feliz».
2. **Su nombre** apareciendo letra por letra bajo una luna (tócala cinco veces: tiene un secreto).
3. **Un reloj**: antes del 3 de noviembre cuenta lo que falta; ese día, lo que queda del día. Si la página está abierta a medianoche, lo celebra sola.
5. **Nuestro primer año**: contador en vivo desde el 17 de octubre de 2025, cifras del año (noches juntos, lunas llenas) y una línea del tiempo que se ilumina al bajar.
5. **Cosas que amo de ti**: un mazo de tarjetas que se pasan deslizando.
6. **Nuestros pequeños momentos**: polaroids que se voltean y muestran una nota detrás.
7. **Un pastel** con velas que se soplan tocándolas (o con el micrófono, de verdad).
8. **Un regalo** que tiembla antes de abrirse y trae vales canjeables.
9. **Una carta** que se escribe sola, palabra por palabra.
10. **Nuestro cielo**: estrellas que dicen cosas bonitas y que al final forman un corazón.

Escondidos: tocar dos veces en cualquier parte suelta corazones, y escribir «teamo» en el teclado hace llover corazones.

## Cómo personalizarla

Todo el texto vive en **`contenido.js`**: nombres, razones, recuerdos, vales, la carta y los mensajes de las estrellas.

- `cumpleanos` va como `"MM-DD"`; `fechaNacimiento` (para mostrar su edad) y `fechaJuntos`, como `"AAAA-MM-DD"`.
- `historia` son los momentos de la línea del tiempo: cámbialos o agrega los vuestros.
- Las fotos van en la carpeta `fotos/` y se enlazan desde `recuerdos` con `foto: "fotos/nombre.jpg"`.

## Cómo publicarla

En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
En uno o dos minutos queda en `https://seasboli25-cyber.github.io/sorpresa-cumplea-os/`.

Para verla en tu computadora sin publicarla: abre `index.html` en el navegador.
