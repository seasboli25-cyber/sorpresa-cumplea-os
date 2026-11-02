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
    { fecha: "2025-10-17", titulo: "Empezamos tú y yo", texto: "Ese día empezamos a ser novios. Me gusta tener una fecha tan nuestra.", foto: null },
    { fecha: "2025-11-03", titulo: "Tu primer cumple conmigo", texto: "Llevábamos apenas diecisiete días. Ya desde ahí quería verte feliz.", foto: null },
    { fecha: "2025-12-25", titulo: "La primera Navidad", texto: "La primera siendo novios. Nos quedan un montón.", foto: null },
    { fecha: "2026-01-01", titulo: "Nuestro primer Año Nuevo", texto: "El primero de novios. Me gustó empezar el año sabiendo que estabas conmigo.", foto: null },
    { fecha: "2026-02-14", titulo: "Nuestro primer San Valentín", texto: "El primero de los nuestros. Quiero muchos más contigo.", foto: null },
    { fecha: null, cuando: "este año", titulo: "Vamos a ser papás", texto: "Este año supimos que venía nuestro bebé. Todavía me emociona escribir eso.", foto: null },
    { fecha: "2026-10-17", titulo: "Un año juntos", texto: "Entre dormir juntos y compartir casi todo, a mí se me pasó rapidísimo.", foto: null },
    { fecha: "2026-11-03", titulo: "Hoy te celebro", texto: "Tu segundo cumpleaños conmigo, esta vez esperando a nuestro bebé. Hoy me toca chinearte todavía más.", foto: null, destacado: true },
    { fecha: null, titulo: "Lo que viene", texto: "Conocer a nuestro bebé y aprender juntos a ser papás. Lo demás, contigo.", foto: null }
  ],

  // El embarazo: cuántas semanas tenía en la fecha "alDia". La página calcula
  // las semanas que tendrá el día que ella la abra.
  bebe: {
    semanas: 24,
    alDia: "2026-10-28",
    texto: "Qué loco pensar que nuestro bebé está hecho de lo mismo que las estrellas, con un poquito tuyo y otro poquito mío. Tengo unas ganas tremendas de verle la carita contigo.",
    cierre: "Mientras tanto, yo me encargo de chinearlos a los dos."
  },

  // El sobre no se abre antes de esta fecha y hora. El "-06:00" fija la hora de
  // Costa Rica, sin depender de la hora del teléfono. null = sin candado.
  // Para verla tú antes, agrega #vista al final del link.
  abrirDesde: "2026-11-03T00:00-06:00",

  // Tu número de WhatsApp con código de país y sin espacios ni "+" (por ejemplo
  // "50688887777"). Con él, al canjear un vale le abre WhatsApp con el mensaje listo.
  whatsapp: "50670855300",

  // El secreto de la luz: un mensaje escondido en la oscuridad que se busca con el dedo.
  lumos: {
    mensaje: "Te escondí esto aquí, a oscuras, para que lo encontraras tú. Te amo.",
    hallado: "Lo encontraste."
  },

  // Cuántas velas lleva el pastel (de 1 a 12).
  velas: 5,

  razones: [
    "Tu risa. Ojalá me toque escucharla toda la vida.",
    "Despertarme y encontrarte a la par mía.",
    "Cómo me miras cuando crees que no me doy cuenta. Sí me doy cuenta.",
    "Tus caprichos. Me quejo, pero me encanta cumplirlos.",
    "Que hasta cuando te enojas conmigo me sigues gustando.",
    "Que te encante que te chinee. A mí me encanta más.",
    "Lo en serio que te tomas dormir. Y que me toque verte dormida.",
    "Pasar un martes cualquiera contigo.",
    "Que casi nunca tenemos que llamarnos porque ya estamos juntos.",
    "Que le echas sal a todo. Hasta a lo que ya trae sal.",
    "Que ya veo un Tropical de melocotón y pienso en ti.",
    "Una película, unas palomitas y tú a la par mía. No necesito más plan.",
    "Poder estar contigo en silencio, sin tener que llenar el rato hablando.",
    "Verte con esa pancita. Cada semana me pareces más bonita.",
    "Imaginarte con nuestro bebé en brazos. Ya quiero que llegue ese día.",
    "Que de todo el tiempo que tiene el universo, nos tocó coincidir en el mismo ratito."
  ],
  razonFinal: "Me faltaron cosas. Ven y te digo las demás.",

  // dibujo: estrella, papas, luna, palomitas, tres, casa, tele, tazas, corazones, musica
  recuerdos: [
    {
      dibujo: "estrella",
      foto: null,
      titulo: "Desde aquel octubre",
      detras: "El 17 de octubre empezamos. Ese día no supe que me estaba cambiando la vida. Lo supe después."
    },
    {
      dibujo: "papas",
      foto: null,
      titulo: "Papas y Tropical",
      detras: "Papas bien saladas y un Tropical de melocotón bien frío. Ya me sé el pedido de memoria."
    },
    {
      dibujo: "luna",
      foto: null,
      titulo: "Dormir a tu lado",
      detras: "Tú durmiendo tranquila y yo sin ninguna gana de levantarme."
    },
    {
      dibujo: "palomitas",
      foto: null,
      titulo: "Noche de película",
      detras: "Palomitas, una película y tú pegadita a mí. Ese es mi plan favorito."
    },
    {
      dibujo: "tres",
      foto: null,
      titulo: "Ahora somos tres",
      detras: "Todavía falta para verle la carita y yo ya cuento los días."
    },
    {
      dibujo: "casa",
      foto: null,
      titulo: "Contigo estoy a gusto",
      detras: "Cualquier lugar me sirve si estás tú. Hasta cuando el plan es no hacer nada."
    }
  ],

  vales: [
    { titulo: "Chineo ilimitado", detalle: "Una tarde entera de mimos, sin estar viendo la hora. Tú me dices qué se te antoja." },
    { titulo: "Un sí", detalle: "A lo que sea, sin peros y sin poner cara. Ya sé que este te va a gustar." },
    { titulo: "Noche de película", detalle: "Tú escoges la película y yo hago las palomitas. Después nos acomodamos bien juntitos." },
    { titulo: "McDonald's hasta la cama", detalle: "Pides lo que quieras y te lo llevo hasta la cama. Sin salir de las cobijas." },
    { titulo: "Dormir sin alarma", detalle: "Una mañana para dormir todo lo que quieras. Si hay algo pendiente, me encargo yo." },
    { titulo: "Masaje sin apuro", detalle: "De pies y espalda, con calma. Tú me vas diciendo dónde." },
    { titulo: "Antojo a cualquier hora", detalle: "Papas, Tropical o lo que pida el bebé. Sí, también si ya me había acostado." },
    { titulo: "Desayuno en la cama", detalle: "Me dices qué quieres y yo te lo llevo. Tú te quedas un rato más acostadita." }
  ],

  carta: {
    saludo: "Mi Fiorella:",
    parrafos: [
      "Le di mil vueltas a cómo hacerte esto. Escribí y borré un montón de veces, porque todo me sonaba a tarjeta de farmacia. Al final decidí escribirte como te hablo, y ya.",
      "El año pasado tu cumpleaños nos agarró con apenas diecisiete días de novios. Ahora sé hasta cuánta sal le echas a las papas (demasiada). Llevamos un año compartiendo casi todo y durmiendo juntos casi todas las noches, y aun así me dan ganas de pasar más rato a la par tuya.",
      "El otro día leí que el hierro de tu sangre y el calcio de tus huesos se formaron dentro de estrellas y en sus explosiones, hace miles de millones de años. Me quedé pensando en eso un buen rato. Algo de eso anduvo flotando por el espacio todo ese tiempo para terminar en tu risa. Y de todos los lugares y todos los siglos, nos tocó coincidir aquí. Qué dicha.",
      "Ya vas por las 24 semanas y todavía me quedo pensando en que vamos a ser papás. Me da curiosidad pensar qué va a sacar tuyo y qué mío. Ojalá tu risa. Te veo con esa pancita y me sigues pareciendo preciosa, cada semana un poquito más. Nos va a tocar aprender un montón. Quiero aprender contigo y que puedas apoyarte en mí también en los días que cuesten.",
      "Hoy la Tierra terminó otra vuelta al sol desde que naciste. Son como 940 millones de kilómetros. Yo me subí a esta vuelta hace poquito, pero ya te aviso que pienso estar en todas las que vienen.",
      "Hoy pide lo que quieras, que no te voy a decir que no (bueno, casi nada). Y si después te da sueño, dormimos. Feliz cumpleaños, mi amor. Te amo."
    ],
    despedida: "Tuyo,"
  },

  // Lo que dice cada estrella cuando ella la toca.
  susurros: [
    "Ven, te quiero cerquita.",
    "Me encantas, ¿sabías?",
    "Hay estrellas cuya luz tarda siglos en llegar. Yo llegué hace un año y aquí me quedo.",
    "Contigo, siempre.",
    "Todavía me pones nervioso.",
    "Duerme. Yo los cuido a los dos.",
    "Te amo más de lo que te digo.",
    "Te debo un chineo.",
    "Ya quiero conocer a nuestro bebé.",
    "Ven por tu beso.",
    "Un año y todavía me sorprendes.",
    "Quédate un ratito más.",
    "Desde aquel 17 de octubre.",
    "Me gusta estar así contigo."
  ],

  final: {
    titulo: "Te amo, Fiorella",
    texto: "Feliz cumpleaños, mi amor. Por esta vuelta al sol y por todas las que vienen, los tres juntos.",
    // Aparece cuando nace la estrellita del bebé dentro del corazón.
    bebe: "Y ya viene una estrellita más."
  },

  // Aparece si toca la luna cinco veces.
  secretoLuna: "Por tocar tanto la luna te ganaste cinco besos. Ven a cobrarlos."
};
