/*
  Todo lo que dice la página vive aquí.
  Cambia los textos, las fechas y las fotos a tu gusto: no hace falta tocar nada más.

  - Las fechas van como "AAAA-MM-DD" (por ejemplo "1999-03-14"). Si las dejas en null,
    la página se adapta sola.
  - Las fotos van en la carpeta fotos/ y se escriben como "fotos/nombre.jpg".
    Si un recuerdo no tiene foto, se muestra un dibujito hecho a mano.
*/
window.CONTENIDO = {
  para: "Fiorella",
  de: "Josimar",

  // Su fecha de nacimiento. Si es hoy, el reloj cuenta lo que queda de su día;
  // si no, cuenta cuánto tiempo lleva haciendo más bonito el mundo.
  fechaNacimiento: null,

  // El día en que empezaron. Si la pones, aparece un contador de días juntos.
  fechaJuntos: null,

  // Cuántas velas lleva el pastel (de 1 a 12).
  velas: 5,

  razones: [
    "Tu risa. Sobre todo esa que se te escapa cuando intentas no reírte.",
    "Que contigo hasta un día cualquiera se siente como un plan.",
    "Cómo me miras cuando crees que no me doy cuenta.",
    "Que me cuidas sin que te lo pida.",
    "Lo mucho que te emocionas con las cosas pequeñas.",
    "Que eres mi lugar tranquilo cuando todo va demasiado rápido.",
    "Lo valiente que eres, aunque a veces tú no lo veas.",
    "Que me haces querer ser mejor sin pedírmelo nunca.",
    "Tus abrazos. Tienen algo que no he encontrado en ningún otro lugar.",
    "Que contigo puedo ser yo, con todas mis tonterías incluidas.",
    "Tu voz cuando me dices buenos días.",
    "La paciencia que me tienes, que no es poca.",
    "Que cuando me pasa algo bueno, tú eres la primera persona a la que quiero contárselo.",
    "Que eres tú. Así de simple, y así de enorme."
  ],
  razonFinal: "Y la lista sigue. Contigo nunca se termina.",

  // dibujo: tazas, luna, corazones, casa, musica, estrella
  recuerdos: [
    {
      dibujo: "estrella",
      foto: null,
      titulo: "El día en que llegaste",
      detras: "No sabía que ese día me estaba cambiando la vida. Ahora no me imagino una sin ti."
    },
    {
      dibujo: "tazas",
      foto: null,
      titulo: "Nuestras charlas eternas",
      detras: "Podemos hablar de todo y de nada, y siempre se me pasa el tiempo volando."
    },
    {
      dibujo: "luna",
      foto: null,
      titulo: "Las noches hasta tarde",
      detras: "Ese sueño que nos gana porque ninguno quiere colgar primero."
    },
    {
      dibujo: "corazones",
      foto: null,
      titulo: "Tu mano en la mía",
      detras: "Es mi forma favorita de caminar por cualquier calle."
    },
    {
      dibujo: "musica",
      foto: null,
      titulo: "Nuestras canciones",
      detras: "Hay canciones que ya no puedo escuchar sin pensar en ti. Y no quiero."
    },
    {
      dibujo: "casa",
      foto: null,
      titulo: "Mi lugar favorito",
      detras: "No es un sitio. Es estar contigo."
    }
  ],

  vales: [
    { titulo: "Un abrazo largo", detalle: "De esos sin reloj. Se puede pedir a cualquier hora." },
    { titulo: "Una cena hecha por mí", detalle: "Yo cocino, yo lavo los platos. Tú solo disfrutas." },
    { titulo: "Una tarde a tu manera", detalle: "Tú decides el plan de principio a fin, sin quejas." },
    { titulo: "Un masaje de verdad", detalle: "De los largos, sin cansarme a los cinco minutos." },
    { titulo: "Noche de película", detalle: "Tú eliges la película, las mantas y lo que comemos." },
    { titulo: "Una cita sorpresa", detalle: "La organizo yo de principio a fin. Solo tienes que venir." },
    { titulo: "Un \"tienes razón\"", detalle: "Sin discutir, sin peros. Úsalo con sabiduría." },
    { titulo: "Desayuno en la cama", detalle: "Con todo lo que te gusta y un beso de buenos días." }
  ],

  carta: {
    saludo: "Mi Fiorella:",
    parrafos: [
      "Llevo días pensando cómo hacer algo que estuviera a la altura de lo que siento por ti, y la verdad es que ninguna página alcanza. Pero quería intentarlo, porque te lo mereces todo.",
      "Gracias por cada día que eliges quedarte a mi lado. Por las risas, por la paciencia, por los abrazos que llegan justo cuando los necesito y por todas esas veces que me haces sentir en casa sin estar en ningún lugar en particular.",
      "Hoy es tu día, y quiero decirte algo que a veces no digo en voz alta lo suficiente: eres lo mejor que me ha pasado. Me encanta la persona que eres, la forma en que ves el mundo y la forma en que me ves a mí.",
      "Ojalá este nuevo año te traiga todo lo que sueñas. Y ojalá yo pueda estar ahí para verlo, para aplaudirte y para abrazarte en cada paso.",
      "Feliz cumpleaños, mi amor. Hoy, mañana y todos los días que vengan, te elijo a ti."
    ],
    despedida: "Con todo mi corazón,"
  },

  // Lo que dice cada estrella cuando ella la toca.
  susurros: [
    "Pensé en ti hoy. Como todos los días.",
    "Eres mi persona favorita.",
    "Te quiero más que ayer y menos que mañana.",
    "Gracias por existir.",
    "Contigo todo es más bonito.",
    "Todavía me pones nervioso.",
    "Si fueras una estrella, serías esta.",
    "Me encanta la vida que tengo contigo.",
    "Eres mi casualidad favorita.",
    "Ojalá te vieras como yo te veo.",
    "Un beso guardado para cuando nos veamos.",
    "Contigo hasta el silencio es bonito."
  ],

  final: {
    titulo: "Te amo, Fiorella",
    texto: "Feliz cumpleaños. Hoy, mañana y siempre."
  },

  // Aparece si toca la luna cinco veces.
  secretoLuna: "Encontraste el secreto de la luna. Te debo un beso por cada vez que la tocaste."
};
