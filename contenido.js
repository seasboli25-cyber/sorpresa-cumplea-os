/*
  Todo lo que dice la página vive aquí.
  Cambia los textos, las fechas y las fotos a tu gusto: no hace falta tocar nada más.

  - Las fechas van como "AAAA-MM-DD" (por ejemplo "1999-03-14"), salvo el cumpleaños,
    que va como "MM-DD". Si las dejas en null, la página se adapta sola.
  - Las fotos van en la carpeta fotos/ y se escriben como "fotos/nombre.jpg".
    Si un recuerdo no tiene foto, se muestra un dibujito hecho a mano.
*/
window.CONTENIDO = {
  para: "Fiorella",
  de: "Josimar",

  // Su cumpleaños, como "MM-DD". Antes de ese día la página cuenta lo que falta;
  // ese día, cuenta lo que queda del día.
  cumpleanos: "11-03",

  // Su fecha de nacimiento completa ("AAAA-MM-DD"). Si la pones, aparece su edad.
  fechaNacimiento: null,

  // El día en que empezaron: activa la sección "Nuestro primer año".
  fechaJuntos: "2025-10-17",

  // Momentos de la línea del tiempo. Cámbialos o agrega los tuyos
  // (primera cita, primer viaje…). "foto" es opcional; "cuando" reemplaza a la fecha
  // si no la recuerdas exacta.
  historia: [
    { fecha: "2025-10-17", titulo: "El día que empezamos", texto: "El día en que nos dijimos que sí. No sabía todo lo que venía, pero algo me decía que iba a ser bonito.", foto: null },
    { fecha: "2025-11-03", titulo: "Tu primer cumpleaños conmigo", texto: "Llevábamos apenas diecisiete días, y yo ya quería que fuera especial para ti.", foto: null },
    { fecha: "2025-12-25", titulo: "Nuestra primera Navidad", texto: "La primera de muchas. Eso espero, y eso pido.", foto: null },
    { fecha: "2026-01-01", titulo: "Nuestro primer Año Nuevo", texto: "Empezar un año a tu lado fue el mejor comienzo que pude pedir.", foto: null },
    { fecha: "2026-02-14", titulo: "Nuestro primer San Valentín", texto: "El primero de los nuestros. Ojalá vengan muchísimos más.", foto: null },
    { fecha: null, cuando: "este año", titulo: "Cuando supimos que íbamos a ser tres", texto: "El día en que supimos que ya no íbamos a ser solo dos. La noticia más bonita que me han dado.", foto: null },
    { fecha: "2026-10-17", titulo: "Nuestro primer aniversario", texto: "Un año entero eligiéndonos. Y si me preguntas, volvería a elegirte cada uno de esos días.", foto: null },
    { fecha: "2026-11-03", titulo: "Tu cumpleaños", texto: "El primero con un año entero de nosotros detrás. Por eso esta página.", foto: null, destacado: true },
    { fecha: null, titulo: "Lo que viene", texto: "Conocer a nuestro bebé. Y todo lo demás, contigo.", foto: null }
  ],

  // El embarazo: cuántas semanas tenía en la fecha "alDia". La página calcula
  // las semanas que tendrá el día que ella la abra.
  bebe: {
    semanas: 24,
    alDia: "2026-10-28",
    texto: "Este cumpleaños no lo celebramos solos. Llevas a nuestro bebé contigo, y no hay un día en que no me sorprenda lo fuerte, lo paciente y lo increíble que eres.",
    cierre: "Mientras tanto, yo me encargo de chinearlos a los dos."
  },

  // Cuántas velas lleva el pastel (de 1 a 12).
  velas: 5,

  razones: [
    "Tu risa. Sobre todo esa que se te escapa cuando intentas no reírte.",
    "Que contigo hasta un día cualquiera se siente como un plan.",
    "Cómo me miras cuando crees que no me doy cuenta.",
    "Que eres caprichosa, y que a mí me encanta cumplirte cada capricho.",
    "Lo bonita que te ves cuando te enojas porque te dije que no. Aunque los dos sabemos cómo termina eso.",
    "Que te encante que te chinee. A mí me encanta chinearte todavía más.",
    "Lo mucho que te gusta dormir. Y que yo tenga la suerte de verte dormida.",
    "Despertar a tu lado. Todavía no me acostumbro a lo bonito que es.",
    "Que lo nuestro nunca ha sido de pantallas ni de llamadas. Siempre ha sido de estar juntos.",
    "Que le pones sal a todo, y aun así eres lo más dulce que tengo.",
    "Que me hayas hecho un lugar en tus mundos: Hogwarts, el Grey Sloan y los Vengadores.",
    "Tus abrazos. Tienen algo que no he encontrado en ningún otro lugar.",
    "Lo valiente que eres, aunque a veces tú no lo veas.",
    "Lo increíble que eres llevando a nuestro bebé. Cada semana te admiro más.",
    "Que vas a ser la mejor mamá del mundo. Ya lo eres.",
    "Que eres tú. Así de simple, y así de enorme."
  ],
  razonFinal: "Y la lista sigue. Contigo nunca se termina.",

  // dibujo: estrella, papas, luna, tele, tres, casa, tazas, corazones, musica
  recuerdos: [
    {
      dibujo: "estrella",
      foto: null,
      titulo: "El día en que llegaste",
      detras: "No sabía que ese día me estaba cambiando la vida. Ahora no me imagino una sin ti."
    },
    {
      dibujo: "papas",
      foto: null,
      titulo: "Papas con mucha sal",
      detras: "Y un Tropical de melocotón bien frío. Tu combinación perfecta, y yo feliz de llevártela."
    },
    {
      dibujo: "luna",
      foto: null,
      titulo: "Dormir a tu lado",
      detras: "Quedarme dormido contigo y despertar contigo. Aunque tú siempre pidas cinco minutos más."
    },
    {
      dibujo: "tele",
      foto: null,
      titulo: "Nuestras maratones",
      detras: "Grey's, Marvel o Harry Potter. Da igual qué pongamos: lo mejor es verlo pegaditos."
    },
    {
      dibujo: "tres",
      foto: null,
      titulo: "Ahora somos tres",
      detras: "Tú, yo y quien viene en camino. La noticia más bonita de mi vida."
    },
    {
      dibujo: "casa",
      foto: null,
      titulo: "Mi lugar favorito",
      detras: "No es un sitio. Es estar contigo."
    }
  ],

  vales: [
    { titulo: "Chineo ilimitado", detalle: "Una tarde entera de mimos, sin que tengas que pedirlo dos veces." },
    { titulo: "Un sí", detalle: "A lo que sea, sin discutir y sin poner cara. Úsalo con sabiduría." },
    { titulo: "Maratón de Grey's", detalle: "Tú eliges la temporada. Yo pongo la manta, los pañuelos y la paciencia." },
    { titulo: "Noche de saga", detalle: "Harry Potter o Marvel, tú decides. Yo llevo las papas con extra sal y el Tropical de melocotón bien frío." },
    { titulo: "Dormir hasta que quieras", detalle: "Una mañana sin alarmas ni prisas. Yo me encargo de todo lo demás." },
    { titulo: "Masaje de pies y espalda", detalle: "Que estas semanas se lo han ganado de sobra." },
    { titulo: "Un antojo a cualquier hora", detalle: "Papas, Tropical o lo que el bebé pida. Aunque sean las tres de la mañana." },
    { titulo: "Desayuno en la cama", detalle: "Con todo lo que te gusta y un beso de buenos días." }
  ],

  carta: {
    saludo: "Mi Fiorella:",
    parrafos: [
      "Llevo días pensando cómo hacer algo que estuviera a la altura de lo que siento por ti, y la verdad es que ninguna página alcanza. Pero quería intentarlo, porque te lo mereces todo.",
      "Gracias por cada día que eliges quedarte a mi lado. Por las risas, por la paciencia, por los abrazos que llegan justo cuando los necesito y por todas esas veces que me haces sentir en casa sin estar en ningún lugar en particular.",
      "Hace unos días cumplimos nuestro primer año juntos. Un año de dormirnos uno al lado del otro, de despertar juntos y de compartirlo casi todo, y todavía me sorprende lo rápido que se pasó y lo mucho que cambió todo. El año pasado tu cumpleaños llegó cuando apenas llevábamos diecisiete días. Este año llega con un año entero de nosotros, y eso me hace inmensamente feliz.",
      "Y este año es distinto por algo más: ya no somos solo dos. Verte llevar a nuestro bebé me ha hecho quererte de una forma que no sabía que existía. Vas a ser una mamá increíble. De hecho, ya lo eres.",
      "Hoy es tu día, y quiero decirte algo que a veces no digo en voz alta lo suficiente: eres lo mejor que me ha pasado. Me encanta la persona que eres, la forma en que ves el mundo y la forma en que me ves a mí.",
      "Ojalá este nuevo año te traiga todo lo que sueñas. Y ojalá yo pueda estar ahí para verlo, para aplaudirte y para abrazarte en cada paso.",
      "Feliz cumpleaños, mi amor. Hoy puedes pedirme lo que quieras, que prometo no decirte que no. Hoy, mañana y todos los días que vengan, te elijo a ti."
    ],
    despedida: "Con todo mi corazón,"
  },

  // Lo que dice cada estrella cuando ella la toca.
  susurros: [
    "Pensé en ti hoy. Como todos los días.",
    "Eres mi persona.",
    "Te quiero más que ayer y menos que mañana.",
    "¿Después de todo este tiempo? Siempre.",
    "Todavía me pones nervioso.",
    "Duerme todo lo que quieras. Yo cuido de los dos.",
    "Te amo 3000.",
    "Si fueras una estrella, serías esta.",
    "Vas a ser la mamá más bonita del mundo.",
    "Te debo un beso. Cóbramelo ahora mismo.",
    "Un año contigo, y todavía me sorprendes.",
    "Gracias por existir.",
    "El 17 de octubre es mi fecha favorita del calendario. Bueno, después de hoy.",
    "Contigo hasta el silencio es bonito."
  ],

  final: {
    titulo: "Te amo, Fiorella",
    texto: "Feliz cumpleaños. Por este año y por todos los que vienen, los tres juntos."
  },

  // Aparece si toca la luna cinco veces.
  secretoLuna: "Encontraste el secreto de la luna. Te debo un beso por cada vez que la tocaste."
};
