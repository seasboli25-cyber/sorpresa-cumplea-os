(() => {
  'use strict';

  const C = window.CONTENIDO || {};
  const PARA = C.para || 'Fiorella';
  const DE = C.de || 'Josimar';
  const doc = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const azar = (a, b) => a + Math.random() * (b - a);
  const elegir = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const COLORES = ['#f5c46e', '#f2998c', '#b8a9e0', '#fff4e6', '#ff7a90', '#9fd6c8'];
  const CORAZON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.5c2.2 0 3.6 1.2 5.4 3.2 1.8-2 3.2-3.2 5.4-3.2 3.7 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21z"/></svg>';

  const guardado = {
    leer(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    escribir(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento: no pasa nada */ } }
  };

  let abierto = false;
  const pendientes = [];
  const obs = 'IntersectionObserver' in window
    ? new IntersectionObserver((entradas) => {
        entradas.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add('visible');
          en.target.dispatchEvent(new CustomEvent('visible'));
          obs.unobserve(en.target);
        });
      }, { threshold: 0, rootMargin: '0px 0px -14% 0px' })
    : null;
  function observar(el) {
    if (!abierto) { pendientes.push(el); return; }
    if (!obs) { el.classList.add('visible'); el.dispatchEvent(new CustomEvent('visible')); return; }
    obs.observe(el);
  }

  let tAviso = 0;
  function avisar(texto, ms = 3800) {
    const a = $('#aviso');
    a.textContent = texto;
    a.classList.add('ver');
    clearTimeout(tAviso);
    tAviso = setTimeout(() => a.classList.remove('ver'), ms);
  }

  /* ───────────── Música: una cajita musical hecha con Web Audio ───────────── */
  const Musica = (() => {
    let ctx = null, maestro = null, bus = null, sonando = false, reloj = 0, cola = [], finCola = 0, aviso = () => {};
    let pausadaPorOcultar = false;
    const NOTAS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    const frec = (n) => {
      const m = /^([A-G])(#|b)?(\d)$/.exec(n);
      const midi = 12 * (+m[3] + 1) + NOTAS[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
      return 440 * Math.pow(2, (midi - 69) / 12);
    };

    function iniciar() {
      if (ctx) return true;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      try { ctx = new AC(); } catch (e) { return false; }
      maestro = ctx.createGain();
      maestro.gain.value = 0;
      maestro.connect(ctx.destination);
      const comp = ctx.createDynamicsCompressor();
      comp.connect(maestro);
      const seco = ctx.createGain();
      seco.gain.value = 0.85;
      seco.connect(comp);
      const sala = ctx.createConvolver();
      sala.buffer = impulso(3);
      const mojado = ctx.createGain();
      mojado.gain.value = 0.42;
      sala.connect(mojado);
      mojado.connect(comp);
      bus = ctx.createGain();
      bus.connect(seco);
      bus.connect(sala);
      return true;
    }

    function impulso(seg) {
      const n = Math.floor(ctx.sampleRate * seg);
      const b = ctx.createBuffer(2, n, ctx.sampleRate);
      for (let c = 0; c < 2; c++) {
        const d = b.getChannelData(c);
        for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3.2);
      }
      return b;
    }

    function campana(f, t, vol = 0.3, dur = 1.8) {
      const env = ctx.createGain();
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(vol, t + 0.005);
      env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      env.connect(bus);
      [[1, 1], [2, 0.2], [3.01, 0.07], [4.2, 0.035]].forEach(([m, g]) => {
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = f * m;
        const og = ctx.createGain();
        og.gain.value = g;
        o.connect(og);
        og.connect(env);
        o.start(t);
        o.stop(t + dur + 0.05);
      });
    }

    const ACORDES = { C: ['C3', 'G3', 'E4'], G: ['G2', 'D3', 'B3'], F: ['F2', 'C3', 'A3'] };

    function agregarCancion(base) {
      const b = 0.62;
      const mel = [
        ['G4', 0.75], ['G4', 0.25],
        ['A4', 1, 'C'], ['G4', 1], ['C5', 1],
        ['B4', 2, 'G'], ['G4', 0.75], ['G4', 0.25],
        ['A4', 1, 'G'], ['G4', 1], ['D5', 1],
        ['C5', 2, 'C'], ['G4', 0.75], ['G4', 0.25],
        ['G5', 1, 'C'], ['E5', 1], ['C5', 1],
        ['B4', 1, 'F'], ['A4', 1.7], ['F5', 0.6], ['F5', 0.25],
        ['E5', 1, 'C'], ['C5', 1], ['D5', 1, 'G'],
        ['C5', 3.5, 'C']
      ];
      let t = base;
      mel.forEach(([n, d, acorde]) => {
        cola.push({ t, f: frec(n), v: 0.3, d: Math.max(1.4, d * b * 1.6) });
        if (acorde) {
          const [bajo, a1, a2] = ACORDES[acorde];
          cola.push({ t, f: frec(bajo), v: 0.2, d: 2.6 });
          cola.push({ t: t + b, f: frec(a1), v: 0.07, d: 1.6 });
          cola.push({ t: t + b * 2, f: frec(a2), v: 0.06, d: 1.6 });
        }
        t += d * b;
      });
      finCola = t + 1.2;
      cola.sort((x, y) => x.t - y.t);
    }

    const ARPEGIOS = [
      ['C3', ['C4', 'G4', 'C5', 'E5', 'C5', 'G4'], ['C6', 'E6', 'G6']],
      ['A2', ['A3', 'E4', 'A4', 'C5', 'A4', 'E4'], ['A5', 'C6', 'E6']],
      ['F2', ['F3', 'C4', 'F4', 'A4', 'F4', 'C4'], ['F5', 'A5', 'C6']],
      ['G2', ['G3', 'D4', 'G4', 'B4', 'G4', 'D4'], ['G5', 'B5', 'D6']]
    ];
    function agregarAmbiente(base) {
      const corchea = 0.36;
      let t = base;
      ARPEGIOS.forEach(([bajo, patron, brillos]) => {
        for (let compas = 0; compas < 2; compas++) {
          cola.push({ t, f: frec(bajo), v: 0.13, d: 2.8 });
          patron.forEach((n, i) => cola.push({ t: t + i * corchea, f: frec(n), v: i === 0 ? 0.12 : 0.09, d: 1.6 }));
          if (Math.random() < 0.6) cola.push({ t: t + Math.floor(azar(1, 6)) * corchea, f: frec(elegir(brillos)), v: 0.05, d: 2.2 });
          t += patron.length * corchea;
        }
      });
      finCola = t;
      cola.sort((x, y) => x.t - y.t);
    }

    function programar() {
      const ahora = ctx.currentTime;
      while (cola.length && cola[0].t < ahora + 0.3) {
        const e = cola.shift();
        if (e.t >= ahora - 0.05) campana(e.f, Math.max(e.t, ahora + 0.01), e.v, e.d);
      }
      if (cola.length < 6) agregarAmbiente(Math.max(finCola, ahora + 0.1));
    }

    function tocar() {
      if (!iniciar()) return;
      if (ctx.state === 'suspended') ctx.resume();
      if (!cola.length) agregarCancion(ctx.currentTime + 0.25);
      sonando = true;
      maestro.gain.cancelScheduledValues(ctx.currentTime);
      maestro.gain.setTargetAtTime(0.9, ctx.currentTime, 0.3);
      clearInterval(reloj);
      reloj = setInterval(programar, 90);
      programar();
      aviso(true);
    }

    function pausar() {
      if (!ctx) return;
      sonando = false;
      clearInterval(reloj);
      maestro.gain.cancelScheduledValues(ctx.currentTime);
      maestro.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
      setTimeout(() => { if (!sonando && ctx.state === 'running') ctx.suspend(); }, 700);
      aviso(false);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && sonando) { pausar(); pausadaPorOcultar = true; }
      else if (!document.hidden && pausadaPorOcultar) { pausadaPorOcultar = false; tocar(); }
    });

    function nota(n, cuando = 0, vol = 0.14, dur = 1.4) {
      if (!ctx || !sonando) return;
      campana(frec(n), ctx.currentTime + 0.01 + cuando, vol, dur);
    }

    return {
      disponible: () => !!(window.AudioContext || window.webkitAudioContext),
      tocar,
      pausar,
      alternar() { sonando ? pausar() : tocar(); },
      otraVez() {
        if (!iniciar()) return;
        cola = [];
        agregarCancion(ctx.currentTime + 0.4);
        if (!sonando) tocar();
      },
      alCambiar(fn) { aviso = fn; },
      tintineo() { nota(elegir(['C6', 'D6', 'E6', 'G6', 'A6']), 0, 0.1, 1.3); },
      fanfarria() { ['C5', 'E5', 'G5', 'C6', 'E6', 'G6'].forEach((n, i) => nota(n, i * 0.085, 0.16, 1.8)); },
      soplido() {
        if (!ctx || !sonando) return;
        const t = ctx.currentTime;
        const ruido = ctx.createBufferSource();
        const b = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.6), ctx.sampleRate);
        const d = b.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        ruido.buffer = b;
        const filtro = ctx.createBiquadFilter();
        filtro.type = 'bandpass';
        filtro.frequency.value = 900;
        filtro.Q.value = 0.7;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.22, t + 0.06);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
        ruido.connect(filtro);
        filtro.connect(g);
        g.connect(maestro);
        ruido.start(t);
        ruido.stop(t + 0.6);
      }
    };
  })();

  /* ───────────── Efectos: confeti, corazones y fuegos artificiales ───────────── */
  const FX = (() => {
    const cv = $('#fx');
    const cx = cv.getContext('2d');
    let W = 0, H = 0, parts = [], vivo = false;
    const MAX = 1400;
    const escala = reducido ? 0.3 : 1;

    function medir() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    medir();
    window.addEventListener('resize', medir);

    function corazon(x, y, s) {
      cx.beginPath();
      cx.moveTo(x, y + s * 0.3);
      cx.bezierCurveTo(x, y, x - s * 0.5, y, x - s * 0.5, y + s * 0.3);
      cx.bezierCurveTo(x - s * 0.5, y + s * 0.6, x, y + s * 0.8, x, y + s);
      cx.bezierCurveTo(x, y + s * 0.8, x + s * 0.5, y + s * 0.6, x + s * 0.5, y + s * 0.3);
      cx.bezierCurveTo(x + s * 0.5, y, x, y, x, y + s * 0.3);
      cx.fill();
    }

    function agregar(p) {
      if (parts.length >= MAX) return;
      parts.push(Object.assign({ vx: 0, vy: 0, g: 0, roce: 1, vida: 1, ritmo: 0.01, giro: 0, vgiro: 0, color: '#fff' }, p));
      if (!vivo) { vivo = true; requestAnimationFrame(paso); }
    }

    function estallar(x, y, color, en) {
      const forma = Math.random() < 0.4 ? 'corazon' : 'circulo';
      const n = Math.round(70 * escala) + 10;
      for (let i = 0; i < n; i++) {
        let vx, vy;
        if (forma === 'corazon') {
          const t = (i / n) * Math.PI * 2;
          vx = 16 * Math.pow(Math.sin(t), 3) * 0.27;
          vy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.27;
        } else {
          const a = (i / n) * Math.PI * 2 + azar(-0.05, 0.05);
          const v = azar(2.2, 5.6);
          vx = Math.cos(a) * v;
          vy = Math.sin(a) * v;
        }
        en.push({ tipo: 'chispa', x, y, vx, vy, g: 0.045, roce: 0.97, vida: 1, ritmo: azar(0.011, 0.018), r: azar(1.4, 2.6), color: Math.random() < 0.25 ? '#fff4e6' : color, giro: 0, vgiro: 0 });
      }
    }

    function paso() {
      cx.clearRect(0, 0, W, H);
      const siguen = [];
      for (const p of parts) {
        p.vida -= p.ritmo;
        p.vx *= p.roce;
        p.vy = p.vy * p.roce + p.g;
        p.x += p.vx;
        p.y += p.vy;
        p.giro += p.vgiro;
        if (p.tipo === 'cohete' && (p.vy > -1.5 || p.vida <= 0)) { estallar(p.x, p.y, p.color, siguen); continue; }
        if (p.vida <= 0 || p.y > H + 80 || p.y < -400) continue;
        dibujar(p);
        siguen.push(p);
      }
      parts = siguen;
      if (parts.length) requestAnimationFrame(paso);
      else { vivo = false; cx.clearRect(0, 0, W, H); }
    }

    function dibujar(p) {
      const a = Math.min(1, p.vida * 2.2);
      cx.globalAlpha = a;
      cx.fillStyle = p.color;
      if (p.tipo === 'confeti') {
        cx.save();
        cx.translate(p.x, p.y);
        cx.rotate(p.giro);
        cx.scale(1, Math.cos(p.giro * 1.7));
        cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        cx.restore();
      } else if (p.tipo === 'corazon') {
        cx.save();
        cx.translate(p.x, p.y);
        cx.rotate(Math.sin(p.giro) * 0.35);
        corazon(0, -p.s / 2, p.s);
        cx.restore();
      } else if (p.tipo === 'chispa' || p.tipo === 'cohete') {
        cx.globalCompositeOperation = 'lighter';
        cx.strokeStyle = p.color;
        cx.lineWidth = p.r;
        cx.lineCap = 'round';
        cx.beginPath();
        cx.moveTo(p.x - p.vx * 3, p.y - p.vy * 3);
        cx.lineTo(p.x, p.y);
        cx.stroke();
        cx.globalCompositeOperation = 'source-over';
      }
      cx.globalAlpha = 1;
    }

    return {
      confeti(x, y, n = 120, fuerza = 1) {
        n = Math.round(n * escala);
        for (let i = 0; i < n; i++) {
          const ang = -Math.PI / 2 + azar(-1.15, 1.15);
          const v = azar(4, 12) * fuerza;
          agregar({ tipo: 'confeti', x, y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, g: 0.17, roce: 0.982, ritmo: azar(0.004, 0.008), w: azar(6, 11), h: azar(4, 7), giro: azar(0, 6), vgiro: azar(-0.22, 0.22), color: elegir(COLORES) });
        }
      },
      lluvia(n = 120) {
        n = Math.round(n * escala);
        for (let i = 0; i < n; i++) {
          agregar({ tipo: 'confeti', x: azar(0, W), y: azar(-H * 0.6, -10), vx: azar(-1, 1), vy: azar(1.5, 3.5), g: 0.02, roce: 0.996, ritmo: azar(0.0025, 0.004), w: azar(6, 11), h: azar(4, 7), giro: azar(0, 6), vgiro: azar(-0.15, 0.15), color: elegir(COLORES) });
        }
      },
      corazones(x, y, n = 12) {
        n = Math.max(2, Math.round(n * escala));
        for (let i = 0; i < n; i++) {
          agregar({ tipo: 'corazon', x: x + azar(-10, 10), y: y + azar(-6, 6), vx: azar(-2.6, 2.6), vy: azar(-4.6, -1.4), g: -0.015, roce: 0.975, ritmo: azar(0.009, 0.016), s: azar(10, 22), giro: azar(0, 6), vgiro: azar(0.04, 0.09), color: elegir(['#f2998c', '#ff7a90', '#f5c46e', '#fbe1da']) });
        }
      },
      lluviaCorazones(n = 50) {
        n = Math.round(n * escala);
        for (let i = 0; i < n; i++) {
          agregar({ tipo: 'corazon', x: azar(0, W), y: H + azar(10, H * 0.5), vx: azar(-0.6, 0.6), vy: azar(-3.4, -1.4), g: -0.004, roce: 0.999, ritmo: azar(0.003, 0.006), s: azar(12, 28), giro: azar(0, 6), vgiro: azar(0.02, 0.05), color: elegir(['#f2998c', '#ff7a90', '#f5c46e', '#fbe1da', '#b8a9e0']) });
        }
      },
      fuegos(n = 5) {
        n = Math.max(1, Math.round(n * escala));
        for (let i = 0; i < n; i++) {
          setTimeout(() => {
            agregar({ tipo: 'cohete', x: azar(W * 0.15, W * 0.85), y: H + 10, vx: azar(-1.2, 1.2), vy: -azar(10, 14) * Math.min(1.25, Math.sqrt(H / 760)), g: 0.17, roce: 0.995, ritmo: 0.004, r: 2.4, color: elegir(COLORES) });
          }, i * 380 + azar(0, 200));
        }
      }
    };
  })();

  /* ───────────── El cielo de fondo ───────────── */
  (function cielo() {
    const cv = $('#cielo');
    const cx = cv.getContext('2d');
    let W = 0, H = 0, estrellas = [], motas = [], fondo = null, horizonte = null, fugaz = null, proxFugaz = 3500;

    function medir() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(380, Math.round((W * H) / 2600));
      estrellas = Array.from({ length: n }, () => {
        const t = Math.random();
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.pow(Math.random(), 3) * 1.7 + 0.3,
          base: azar(0.25, 0.85),
          fase: azar(0, 6.28),
          vel: azar(0.5, 2),
          z: azar(0.2, 1),
          tono: t < 0.12 ? '255,214,170' : t < 0.3 ? '205,195,255' : '255,255,255'
        };
      });
      motas = Array.from({ length: 12 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: azar(30, 90), vy: azar(-0.25, -0.08), a: azar(0.025, 0.06) }));
      fondo = cx.createLinearGradient(0, 0, 0, H);
      fondo.addColorStop(0, '#0c0919');
      fondo.addColorStop(0.55, '#171130');
      fondo.addColorStop(1, '#241838');
      horizonte = cx.createRadialGradient(W / 2, H * 1.15, 0, W / 2, H * 1.15, Math.max(W, H) * 0.8);
      horizonte.addColorStop(0, 'rgba(242,153,140,0.16)');
      horizonte.addColorStop(1, 'rgba(242,153,140,0)');
      if (reducido) cuadro(0);
    }

    function cuadro(ts) {
      cx.fillStyle = fondo;
      cx.fillRect(0, 0, W, H);
      cx.fillStyle = horizonte;
      cx.fillRect(0, 0, W, H);

      for (const m of motas) {
        if (!reducido) { m.y += m.vy; if (m.y < -m.r) { m.y = H + m.r; m.x = Math.random() * W; } }
        const g = cx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r);
        g.addColorStop(0, `rgba(245,196,110,${m.a})`);
        g.addColorStop(1, 'rgba(245,196,110,0)');
        cx.fillStyle = g;
        cx.fillRect(m.x - m.r, m.y - m.r, m.r * 2, m.r * 2);
      }

      const sy = window.scrollY || 0;
      const t = ts / 1000;
      for (const s of estrellas) {
        const y = (((s.y - sy * s.z * 0.12) % H) + H) % H;
        const a = Math.max(0, s.base + Math.sin(t * s.vel + s.fase) * 0.35 * s.base);
        cx.fillStyle = `rgba(${s.tono},${a})`;
        cx.beginPath();
        cx.arc(s.x, y, s.r, 0, Math.PI * 2);
        cx.fill();
        if (s.r > 1.5) {
          cx.strokeStyle = `rgba(${s.tono},${a * 0.35})`;
          cx.lineWidth = 0.8;
          cx.beginPath();
          cx.moveTo(s.x - s.r * 4, y); cx.lineTo(s.x + s.r * 4, y);
          cx.moveTo(s.x, y - s.r * 4); cx.lineTo(s.x, y + s.r * 4);
          cx.stroke();
        }
      }

      if (!reducido) {
        if (!fugaz && ts > proxFugaz) {
          const dir = Math.random() < 0.5 ? -1 : 1;
          fugaz = { x: dir < 0 ? azar(W * 0.4, W) : azar(0, W * 0.6), y: azar(0, H * 0.35), vx: dir * azar(7, 11), vy: azar(2.4, 4), vida: 1 };
        }
        if (fugaz) {
          fugaz.x += fugaz.vx;
          fugaz.y += fugaz.vy;
          fugaz.vida -= 0.014;
          const largo = 14;
          const g = cx.createLinearGradient(fugaz.x, fugaz.y, fugaz.x - fugaz.vx * largo, fugaz.y - fugaz.vy * largo);
          g.addColorStop(0, `rgba(255,244,230,${Math.max(0, fugaz.vida)})`);
          g.addColorStop(1, 'rgba(255,244,230,0)');
          cx.strokeStyle = g;
          cx.lineWidth = 1.6;
          cx.lineCap = 'round';
          cx.beginPath();
          cx.moveTo(fugaz.x, fugaz.y);
          cx.lineTo(fugaz.x - fugaz.vx * largo, fugaz.y - fugaz.vy * largo);
          cx.stroke();
          if (fugaz.vida <= 0 || fugaz.x < -200 || fugaz.x > W + 200 || fugaz.y > H) {
            fugaz = null;
            proxFugaz = ts + azar(5000, 11000);
          }
        }
        requestAnimationFrame(cuadro);
      }
    }

    medir();
    window.addEventListener('resize', medir);
    if (!reducido) requestAnimationFrame(cuadro);
    else window.addEventListener('scroll', () => cuadro(0), { passive: true });
  })();

  /* ───────────── Nombres ───────────── */
  $$('[data-c]').forEach((el) => { const v = C[el.dataset.c]; if (typeof v === 'string' && v) el.textContent = v; });
  $$('[data-inicial]').forEach((el) => { const v = C[el.dataset.inicial]; if (typeof v === 'string' && v) el.textContent = v.charAt(0).toUpperCase(); });
  document.title = `Feliz cumpleaños, ${PARA}`;

  function partirLetras(el) {
    const texto = el.textContent.trim();
    el.textContent = '';
    const lector = document.createElement('span');
    lector.className = 'sr';
    lector.textContent = texto;
    el.appendChild(lector);
    let i = 0;
    texto.split(/\s+/).forEach((pal, k, todas) => {
      const w = document.createElement('span');
      w.className = 'palabra';
      w.setAttribute('aria-hidden', 'true');
      for (const ch of pal) {
        const s = document.createElement('span');
        s.className = 'letra';
        s.textContent = ch;
        s.style.setProperty('--i', i++);
        w.appendChild(s);
      }
      el.appendChild(w);
      if (k < todas.length - 1) { el.appendChild(document.createTextNode(' ')); i++; }
    });
  }
  $$('[data-letras]').forEach(partirLetras);

  /* ───────────── El sobre ───────────── */
  const btnMusica = $('#musica');
  Musica.alCambiar((s) => {
    btnMusica.setAttribute('aria-pressed', String(s));
    btnMusica.setAttribute('aria-label', s ? 'Pausar la música' : 'Poner la música');
    btnMusica.title = s ? 'Pausar la música' : 'Poner la música';
  });
  btnMusica.addEventListener('click', () => Musica.alternar());

  $('#sobre').addEventListener('click', function abrirSobre() {
    if (abierto) return;
    abierto = true;
    const pantalla = $('#pantalla-sobre');
    const sobre = $('#sobre');
    if (Musica.disponible()) { Musica.tocar(); btnMusica.hidden = false; }
    pantalla.classList.add('abriendo');
    const r = sobre.getBoundingClientRect();
    setTimeout(() => FX.corazones(r.left + r.width / 2, r.top + r.height * 0.15, 16), reducido ? 0 : 900);
    setTimeout(() => {
      pantalla.classList.add('saliendo');
      doc.classList.remove('bloqueado');
      doc.classList.add('abierto');
      window.scrollTo(0, 0);
      FX.confeti(window.innerWidth / 2, window.innerHeight * 0.62, 170, 1.1);
      pendientes.splice(0).forEach(observar);
    }, reducido ? 200 : 2000);
    setTimeout(() => { pantalla.hidden = true; }, reducido ? 500 : 3200);
    setTimeout(() => FX.fuegos(3), reducido ? 600 : 4600);
  });

  /* ───────────── La luna ───────────── */
  (function luna() {
    const el = $('#luna');
    let toques = 0;
    el.addEventListener('click', () => {
      toques++;
      el.classList.remove('toque');
      void el.offsetWidth;
      el.classList.add('toque');
      const r = el.getBoundingClientRect();
      FX.corazones(r.left + r.width / 2, r.top + r.height / 2, 2 + toques);
      Musica.tintineo();
      if (toques === 5) {
        avisar(C.secretoLuna || 'Encontraste el secreto de la luna.', 6500);
        FX.lluviaCorazones(60);
        Musica.fanfarria();
      }
    });
  })();

  $$('.revela').forEach(observar);

  /* ───────────── El reloj ───────────── */
  (function reloj() {
    const fecha = (s) => {
      const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || ''));
      if (!m) return null;
      const d = new Date(+m[1], +m[2] - 1, +m[3]);
      return isNaN(d) ? null : d;
    };
    const nac = fecha(C.fechaNacimiento);
    const jun = fecha(C.fechaJuntos);
    const hoy = new Date();
    const esHoy = !nac || (hoy.getMonth() === nac.getMonth() && hoy.getDate() === nac.getDate());
    const cont = $('#reloj');
    const nota = $('#reloj-nota');
    let unidades, calcular;

    if (esHoy) {
      const fin = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 1);
      $('#reloj-intro').textContent = 'Hoy es tu cumpleaños, y esto es lo que queda de tu día oficial:';
      nota.textContent = 'Cuando llegue a cero te voy a seguir celebrando igual.';
      unidades = ['horas', 'minutos', 'segundos'];
      calcular = () => {
        const s = Math.max(0, Math.floor((fin - Date.now()) / 1000));
        return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60];
      };
      if (nac) {
        const edad = document.createElement('p');
        edad.className = 'edad';
        edad.textContent = `¡${hoy.getFullYear() - nac.getFullYear()} años!`;
        cont.before(edad);
      }
    } else {
      $('#reloj-intro').textContent = 'Llevas haciendo más bonito este mundo';
      nota.textContent = 'Y yo agradezco cada uno de esos segundos.';
      unidades = ['días', 'horas', 'minutos', 'segundos'];
      calcular = () => {
        const s = Math.max(0, Math.floor((Date.now() - nac) / 1000));
        return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
      };
    }

    cont.style.setProperty('--n', unidades.length);
    cont.innerHTML = unidades.map((u) => `<div class="unidad"><b>00</b><span>${u}</span></div>`).join('');
    const cifras = $$('.unidad b', cont);
    let antes = [];
    let terminado = false;
    function tic() {
      const v = calcular();
      const textos = v.map((x, i) => (!esHoy && i === 0 ? x.toLocaleString('es') : String(x).padStart(2, '0')));
      textos.forEach((t, i) => {
        if (t === antes[i]) return;
        cifras[i].textContent = t;
        if (antes.length && !reducido) {
          const u = cifras[i].parentElement;
          u.classList.remove('late');
          void u.offsetWidth;
          u.classList.add('late');
        }
      });
      antes = textos;
      if (esHoy && !terminado && v.every((x) => x === 0)) {
        terminado = true;
        nota.textContent = 'Terminó tu día oficial. Yo sigo celebrándote igual.';
      }
    }
    tic();
    setInterval(tic, 1000);

    if (jun) {
      const dias = Math.max(0, Math.floor((hoy - jun) / 86400000));
      $('#juntos').hidden = false;
      $('#juntos-dias').textContent = dias.toLocaleString('es');
      $('#juntos-nota').textContent = `Si te diera tres abrazos al día, ya irían ${(dias * 3).toLocaleString('es')}. Y quiero darte muchísimos más.`;
    }
  })();

  /* ───────────── Cosas que amo de ti ───────────── */
  (function mazo() {
    const zona = $('#mazo');
    const cuenta = $('#mazo-cuenta');
    const lista = Array.isArray(C.razones) ? C.razones : [];
    const total = lista.length;
    const datos = lista.map((texto, i) => ({ texto, num: `Razón ${i + 1}` }));
    if (C.razonFinal) datos.push({ texto: C.razonFinal, num: 'Y además…', final: true });
    if (!datos.length) { $('#razones').hidden = true; return; }

    const tarjetas = datos.map((d, i) => {
      const el = document.createElement('div');
      el.className = 'tarjeta ' + (d.final ? 'tarjeta-final' : 't' + (i % 3));
      el.innerHTML = `<span class="tarjeta-num">${esc(d.num)}</span><p class="tarjeta-texto">${esc(d.texto)}</p><span class="tarjeta-pie"><span>${d.final ? 'te quiero' : ''}</span>${CORAZON}</span>`;
      el.dataset.rot = azar(-5, 5).toFixed(1);
      zona.appendChild(el);
      return el;
    });
    let orden = tarjetas.map((_, i) => i);
    let animando = false;
    let celebrada = false;

    function colocar() {
      orden.forEach((idx, p) => {
        const el = tarjetas[idx];
        el.style.zIndex = String(tarjetas.length - p);
        el.style.opacity = p < 4 ? '1' : '0';
        el.style.transform = p === 0
          ? `rotate(${el.dataset.rot * 0.3}deg)`
          : `translate(${p * 5}px, ${p * 11}px) rotate(${el.dataset.rot}deg) scale(${1 - p * 0.035})`;
        el.setAttribute('aria-hidden', p === 0 ? 'false' : 'true');
      });
      const arriba = orden[0];
      cuenta.textContent = datos[arriba].final ? 'y más…' : `${arriba + 1} de ${total}`;
    }

    function pasar(dir = 1) {
      if (animando) return;
      animando = true;
      const el = tarjetas[orden[0]];
      el.classList.remove('arrastrando');
      el.style.transform = `translate(${dir * 135}%, -8%) rotate(${dir * 26}deg)`;
      el.style.opacity = '0';
      Musica.tintineo();
      const r = zona.getBoundingClientRect();
      FX.corazones(r.left + r.width / 2 + dir * r.width * 0.3, r.top + r.height * 0.35, 4);
      setTimeout(() => {
        orden.push(orden.shift());
        el.style.transition = 'none';
        colocar();
        void el.offsetWidth;
        el.style.transition = '';
        animando = false;
        if (datos[orden[0]].final && !celebrada) {
          celebrada = true;
          FX.lluviaCorazones(36);
        }
      }, 380);
    }

    let activo = null, x0 = 0, y0 = 0, dx = 0, movio = false;
    zona.addEventListener('pointerdown', (e) => {
      const el = tarjetas[orden[0]];
      if (animando || !el.contains(e.target)) return;
      activo = el;
      x0 = e.clientX;
      y0 = e.clientY;
      dx = 0;
      movio = false;
      try { el.setPointerCapture(e.pointerId); } catch (err) { /* sin captura */ }
      el.classList.add('arrastrando');
    });
    zona.addEventListener('pointermove', (e) => {
      if (!activo) return;
      dx = e.clientX - x0;
      const dy = e.clientY - y0;
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) movio = true;
      activo.style.transform = `translate(${dx}px, ${dy * 0.25}px) rotate(${dx / 14}deg)`;
    });
    zona.addEventListener('pointerup', () => {
      if (!activo) return;
      activo.classList.remove('arrastrando');
      activo = null;
      if (Math.abs(dx) > 80) pasar(Math.sign(dx));
      else if (!movio) pasar(1);
      else colocar();
    });
    zona.addEventListener('pointercancel', () => {
      if (!activo) return;
      activo.classList.remove('arrastrando');
      activo = null;
      colocar();
    });
    $('#mazo-sig').addEventListener('click', () => pasar(1));
    colocar();
  })();

  /* ───────────── Polaroids ───────────── */
  (function recuerdos() {
    const lista = Array.isArray(C.recuerdos) ? C.recuerdos : [];
    if (!lista.length) { $('#recuerdos').hidden = true; return; }
    const P = (d) => `<path pathLength="1" d="${d}"/>`;
    const lleno = (x, y, s) => `<path class="relleno" transform="translate(${x} ${y}) scale(${s})" d="M0 6C-6 2-10-1-10-5C-10-8-8-10-5-10C-3-10-1-9 0-7C1-9 3-10 5-10C8-10 10-8 10-5C10-1 6 2 0 6Z"/>`;
    const svg = (dentro) => `<svg class="garabato" viewBox="0 0 100 100" aria-hidden="true">${dentro}</svg>`;
    const DIBUJOS = {
      estrella: svg(P('M50 14L59 38L84 39L64 54L71 79L50 65L29 79L36 54L16 39L41 38Z') + P('M82 12v12M76 18h12') + P('M16 70v9M11.5 74.5h9') + lleno(50, 52, 0.7)),
      tazas: svg(P('M12 46h28v15a12 12 0 0 1-12 12h-4a12 12 0 0 1-12-12Z') + P('M40 50a6 6 0 0 1 0 12') + P('M54 46h28v15a12 12 0 0 1-12 12h-4a12 12 0 0 1-12-12Z') + P('M82 50a6 6 0 0 1 0 12') + P('M22 40q-4-5 0-10t0-10') + P('M64 40q-4-5 0-10t0-10') + P('M6 80h88') + lleno(46, 24, 0.8)),
      luna: svg(P('M60 14A36 36 0 1 0 86 72A28 28 0 0 1 60 14Z') + P('M24 18l2.5 6.5 6.5 2.5-6.5 2.5-2.5 6.5-2.5-6.5-6.5-2.5 6.5-2.5Z') + P('M80 22v8M76 26h8') + P('M84 88v6M81 91h6') + lleno(76, 54, 0.6)),
      corazones: svg(P('M50 84C22 66 10 46 22 30C32 18 46 22 50 34C54 22 68 18 78 30C90 46 78 66 50 84Z') + P('M50 70C34 60 28 50 34 42C39 36 46 38 50 45C54 38 61 36 66 42C72 50 66 60 50 70Z') + lleno(84, 18, 0.55) + lleno(16, 16, 0.45)),
      casa: svg(P('M16 52L50 22L84 52') + P('M26 44V80H74V44') + P('M44 80V62H56V80') + P('M64 34V24H72V41') + P('M6 80H94') + lleno(50, 50, 0.55)),
      musica: svg(`<ellipse pathLength="1" cx="34" cy="72" rx="9" ry="7"/>` + P('M43 72V28L78 20V62') + `<ellipse pathLength="1" cx="69" cy="62" rx="9" ry="7"/>` + P('M43 38L78 30') + P('M10 46q6-8 12 0t12 0') + lleno(20, 24, 0.6))
    };
    const TONOS = ['#fbe6c4', '#d9efe9', '#e6def8', '#f7d9cf', '#f4d4e0', '#dfe6f7'];
    const GIROS = [-5, 4, -3, 6, -6, 3];
    const ALTURAS = [0, 18, 6, 22, 4, 14];
    const tablero = $('#tablero');

    lista.forEach((r, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pola';
      b.setAttribute('aria-pressed', 'false');
      b.style.setProperty('--r', GIROS[i % GIROS.length] + 'deg');
      b.style.setProperty('--y', ALTURAS[i % ALTURAS.length] + 'px');
      b.style.setProperty('--i', String(i));
      b.style.setProperty('--cinta', azar(-8, 8).toFixed(1) + 'deg');
      b.style.setProperty('--tono', TONOS[i % TONOS.length]);
      const dibujo = DIBUJOS[r.dibujo] || DIBUJOS.corazones;
      const imagen = r.foto ? `<img src="${esc(r.foto)}" alt="${esc(r.titulo)}" loading="lazy">` : dibujo;
      b.innerHTML = `<span class="pola-in"><span class="cara"><span class="cara-img">${imagen}</span><span class="cara-pie">${esc(r.titulo)}</span></span><span class="dorso"><span class="detras">${esc(r.detras)}</span>${CORAZON}</span></span>`;
      const img = $('img', b);
      if (img) img.addEventListener('error', () => { img.outerHTML = dibujo; }, { once: true });
      b.addEventListener('click', () => {
        const v = b.classList.toggle('volteada');
        b.setAttribute('aria-pressed', String(v));
        Musica.tintineo();
        if (v) {
          const rr = b.getBoundingClientRect();
          FX.corazones(rr.left + rr.width / 2, rr.top + rr.height * 0.3, 6);
        }
      });
      tablero.appendChild(b);
      observar(b);
    });
  })();

  /* ───────────── El pastel ───────────── */
  (function pastel() {
    const n = Math.max(1, Math.min(12, parseInt(C.velas, 10) || 5));
    const cont = $('#velas');
    const luz = $('#deseo-luz');
    const mensaje = $('#deseo-mensaje');
    const btnMic = $('#microfono');
    cont.style.setProperty('--hueco', n > 8 ? '4px' : n > 5 ? '7px' : '11px');
    let celebrado = false;
    let detenerMic = null;

    const velas = Array.from({ length: n }, (_, i) => {
      const v = document.createElement('button');
      v.type = 'button';
      v.className = 'vela';
      v.setAttribute('aria-label', `Soplar la vela ${i + 1}`);
      v.innerHTML = `<span class="llama" style="--d:-${azar(0, 1.3).toFixed(2)}s"></span><span class="humo"></span><span class="humo"></span>`;
      v.addEventListener('click', () => apagar(v));
      cont.appendChild(v);
      return v;
    });

    function apagar(v) {
      if (v.classList.contains('apagada')) return;
      v.classList.add('apagada');
      v.classList.remove('inclinada');
      v.setAttribute('aria-label', 'Vela apagada');
      Musica.soplido();
      actualizar();
    }

    function actualizar() {
      const encendidas = velas.filter((v) => !v.classList.contains('apagada')).length;
      luz.style.setProperty('--brillo', String(0.2 + (0.8 * encendidas) / n));
      if (encendidas === 0 && !celebrado) celebrar();
    }

    function celebrar() {
      celebrado = true;
      if (detenerMic) detenerMic();
      setTimeout(() => {
        FX.fuegos(7);
        FX.lluvia(150);
        Musica.fanfarria();
        mensaje.hidden = false;
      }, 550);
    }

    $('#reencender').addEventListener('click', () => {
      velas.forEach((v, i) => { v.classList.remove('apagada'); v.setAttribute('aria-label', `Soplar la vela ${i + 1}`); });
      celebrado = false;
      mensaje.hidden = true;
      actualizar();
    });

    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.isSecureContext) btnMic.hidden = false;
    btnMic.addEventListener('click', async () => {
      if (detenerMic) { detenerMic(); return; }
      let flujo;
      try {
        flujo = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
      } catch (e) {
        avisar('No pude usar el micrófono. Puedes soplar tocando cada vela.');
        btnMic.hidden = true;
        return;
      }
      const ac = new AC();
      const fuente = ac.createMediaStreamSource(flujo);
      const an = ac.createAnalyser();
      an.fftSize = 1024;
      fuente.connect(an);
      const datos = new Float32Array(an.fftSize);
      let fuerte = 0, ultimo = 0, vivo = true;
      btnMic.textContent = 'Te escucho… sopla fuerte';
      detenerMic = () => {
        vivo = false;
        flujo.getTracks().forEach((t) => t.stop());
        ac.close();
        detenerMic = null;
        btnMic.textContent = 'Soplar de verdad, con el micrófono';
        velas.forEach((v) => v.classList.remove('inclinada'));
      };
      (function escuchar(ts) {
        if (!vivo) return;
        an.getFloatTimeDomainData(datos);
        let suma = 0;
        for (let i = 0; i < datos.length; i++) suma += datos[i] * datos[i];
        const nivel = Math.sqrt(suma / datos.length);
        fuerte = nivel > 0.12 ? fuerte + 1 : Math.max(0, fuerte - 1);
        const encendidas = velas.filter((v) => !v.classList.contains('apagada'));
        encendidas.forEach((v) => v.classList.toggle('inclinada', fuerte > 1));
        if (fuerte > 3 && ts - ultimo > 140 && encendidas.length) {
          ultimo = ts;
          apagar(elegir(encendidas));
        }
        requestAnimationFrame(escuchar);
      })(0);
    });

    actualizar();
  })();

  /* ───────────── El regalo ───────────── */
  (function regalo() {
    const caja = $('#caja');
    const zona = caja.parentElement;
    const pista = $('#regalo-pista');
    const cont = $('#vales');
    const frases = ['Uy… parece que pesa', 'Algo se mueve ahí dentro…', '¡Una vez más!'];
    let toques = 0;
    const canjeados = guardado.leer('sorpresa-vales') || {};

    caja.addEventListener('click', () => {
      if (caja.classList.contains('abierta')) return;
      toques++;
      if (toques <= frases.length) {
        caja.style.setProperty('--f', String(toques * 4));
        caja.classList.remove('tiembla');
        void caja.offsetWidth;
        caja.classList.add('tiembla');
        pista.textContent = frases[toques - 1];
        Musica.tintineo();
        return;
      }
      abrir();
    });

    function abrir() {
      caja.classList.remove('tiembla');
      caja.classList.add('abierta');
      caja.setAttribute('aria-label', 'Regalo abierto');
      zona.classList.add('abierta');
      pista.textContent = 'Son para ti. Todos.';
      Musica.fanfarria();
      const r = caja.getBoundingClientRect();
      FX.confeti(r.left + r.width / 2, r.top + r.height * 0.3, 180, 1.15);
      FX.corazones(r.left + r.width / 2, r.top + r.height * 0.3, 14);
      pintarVales();
      cont.hidden = false;
      $('#vales-pista').hidden = false;
    }

    function pintarVales() {
      cont.innerHTML = '';
      (C.vales || []).forEach((v, i) => {
        const el = document.createElement('div');
        el.className = 'vale';
        el.style.setProperty('--i', String(i));
        el.innerHTML = `<div class="vale-txt"><span class="vale-etiqueta">Vale por</span><span class="vale-titulo">${esc(v.titulo)}</span><span class="vale-detalle">${esc(v.detalle)}</span></div><button class="vale-btn" type="button">Canjear</button><span class="vale-sello">Canjeado<small></small></span>`;
        const marcar = (cuando) => { el.classList.add('canjeado'); $('small', el).textContent = cuando; };
        if (canjeados[v.titulo]) marcar(canjeados[v.titulo]);
        $('.vale-btn', el).addEventListener('click', (e) => {
          const cuando = new Date().toLocaleDateString('es', { day: 'numeric', month: 'short' });
          canjeados[v.titulo] = cuando;
          guardado.escribir('sorpresa-vales', canjeados);
          el.classList.add('recien');
          marcar(cuando);
          Musica.fanfarria();
          FX.corazones(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 10);
          avisar(`¡Canjeado! Enséñaselo a ${DE} para cobrarlo.`);
        });
        cont.appendChild(el);
      });
    }
  })();

  /* ───────────── La carta ───────────── */
  (function carta() {
    const papel = $('#papel');
    const k = C.carta || {};
    const PASO = 26;
    let d = 0;
    const palabras = (texto) => String(texto || '').split(/\s+/).filter(Boolean).map((w) => {
      const s = `<span class="p" style="--d:${d}">${esc(w)}</span>`;
      d += PASO;
      return s;
    }).join(' ');

    let html = `<p class="saludo">${palabras(k.saludo || `Mi ${PARA}:`)}</p>`;
    d += 350;
    (k.parrafos || []).forEach((p) => { html += `<p>${palabras(p)}</p>`; d += 420; });
    html += `<p class="despedida">${palabras(k.despedida || 'Con todo mi corazón,')}</p>`;
    html += `<p class="firma"><span>${palabras(DE)}</span><svg viewBox="0 0 40 40" aria-hidden="true"><path pathLength="1" d="M20 33C8 25 3 18 7 11C11 5 18 7 20 13C22 7 29 5 33 11C37 18 32 25 20 33Z"/></svg></p>`;
    papel.innerHTML = html;
    papel.style.setProperty('--fin', d + 'ms');
    papel.addEventListener('visible', () => {
      papel.classList.add('escrita');
      setTimeout(() => {
        const r = papel.getBoundingClientRect();
        if (r.bottom > 0 && r.bottom < window.innerHeight + 40) FX.corazones(r.right - 70, r.bottom - 70, 12);
      }, reducido ? 0 : d + 1100);
    }, { once: true });
    observar(papel);
  })();

  /* ───────────── Nuestro cielo ───────────── */
  (function final() {
    const zona = $('#constelacion');
    const cv = $('#estrellas');
    const cx = cv.getContext('2d');
    const burbuja = $('#susurro');
    const textoFinal = $('#final-texto');
    const btnUltima = $('#ultima');
    const btnOtra = $('#otra-vez');
    const susurros = Array.isArray(C.susurros) && C.susurros.length ? C.susurros : ['Te quiero.'];
    const N = 24;
    let W = 0, H = 0, estrellas = [], polvo = [], modo = 'libre', t0 = 0, iSusurro = 0, tBurbuja = 0, enPantalla = false, corriendo = false;

    $('#final-titulo').textContent = (C.final && C.final.titulo) || `Te amo, ${PARA}`;
    $('#final-sub').textContent = (C.final && C.final.texto) || 'Feliz cumpleaños.';

    function crear() {
      const lista = [];
      let intentos = 0;
      while (lista.length < N && intentos < 3000) {
        intentos++;
        const rx = azar(0.07, 0.93), ry = azar(0.08, 0.92);
        if (lista.every((p) => Math.hypot(p.rx - rx, (p.ry - ry) * 0.8) > 0.13)) {
          lista.push({ rx, ry, r: azar(1.8, 3.2), fase: azar(0, 6.28), pulso: 0, x: 0, y: 0 });
        }
      }
      return lista;
    }

    function medir() {
      const r = zona.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      polvo = Array.from({ length: Math.round((W * H) / 1700) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: azar(0.3, 1.1), fase: azar(0, 6.28), vel: azar(0.6, 2) }));
      if (!estrellas.length) estrellas = crear();
      if (!corriendo) dibujar(performance.now());
    }

    function puntoCorazon(i, latido) {
      const t = (i / N) * Math.PI * 2;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      const s = Math.min((W * 0.86) / 34, (H * 0.8) / 30) * latido;
      return [W / 2 + hx * s, H / 2 + (hy - 2.5) * s];
    }

    const suave = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    function dibujar(ts) {
      cx.clearRect(0, 0, W, H);
      const t = ts / 1000;
      for (const p of polvo) {
        cx.fillStyle = `rgba(255,255,255,${0.25 + Math.sin(t * p.vel + p.fase) * 0.2})`;
        cx.beginPath();
        cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        cx.fill();
      }
      let avance = 0, lineas = 0, latido = 1;
      if (modo === 'corazon') {
        avance = suave(Math.min(1, (ts - t0) / 2600));
        lineas = Math.max(0, Math.min(1, (ts - t0 - 2200) / 1800));
        if (lineas >= 1 && !reducido) latido = 1 + 0.03 * Math.pow(Math.max(0, Math.sin(t * 2.6)), 6);
      }
      estrellas.forEach((p, i) => {
        const bx = p.rx * W + Math.sin(t * 0.6 + p.fase) * 3;
        const by = p.ry * H + Math.cos(t * 0.5 + p.fase) * 3;
        if (modo === 'corazon') {
          const [hx, hy] = puntoCorazon(i, latido);
          p.x = bx + (hx - bx) * avance;
          p.y = by + (hy - by) * avance;
        } else { p.x = bx; p.y = by; }
      });
      if (lineas > 0) {
        const hasta = lineas * N;
        cx.strokeStyle = 'rgba(245,196,110,0.65)';
        cx.lineWidth = 1.3;
        cx.shadowColor = 'rgba(245,196,110,0.8)';
        cx.shadowBlur = 8;
        cx.beginPath();
        cx.moveTo(estrellas[0].x, estrellas[0].y);
        for (let i = 1; i <= Math.floor(hasta) && i <= N; i++) {
          const q = estrellas[i % N];
          cx.lineTo(q.x, q.y);
        }
        const k = Math.floor(hasta);
        if (k < N) {
          const a = estrellas[k % N], b = estrellas[(k + 1) % N], f = hasta - k;
          cx.lineTo(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f);
        }
        cx.stroke();
        cx.shadowBlur = 0;
      }
      for (const p of estrellas) {
        p.pulso *= 0.94;
        const brillo = 0.75 + Math.sin(t * 1.6 + p.fase) * 0.25;
        const r = p.r * (1 + p.pulso);
        const g = cx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 7);
        g.addColorStop(0, `rgba(255,236,200,${0.5 * brillo})`);
        g.addColorStop(1, 'rgba(255,236,200,0)');
        cx.fillStyle = g;
        cx.beginPath();
        cx.arc(p.x, p.y, r * 7, 0, Math.PI * 2);
        cx.fill();
        cx.fillStyle = `rgba(255,248,236,${brillo})`;
        cx.beginPath();
        cx.arc(p.x, p.y, r, 0, Math.PI * 2);
        cx.fill();
      }
    }

    function bucle(ts) {
      dibujar(ts);
      if (enPantalla && !reducido) requestAnimationFrame(bucle);
      else corriendo = false;
    }
    function arrancar() {
      if (corriendo || reducido) return;
      corriendo = true;
      requestAnimationFrame(bucle);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => { enPantalla = en.isIntersecting; if (enPantalla) arrancar(); }).observe(zona);
    } else { enPantalla = true; arrancar(); }

    zona.addEventListener('click', (e) => {
      const r = zona.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      let cerca = null, dist = 38;
      estrellas.forEach((p) => { const dd = Math.hypot(p.x - x, p.y - y); if (dd < dist) { dist = dd; cerca = p; } });
      if (!cerca) {
        polvo.push({ x, y, r: azar(1, 1.6), fase: 0, vel: 1.2 });
        FX.corazones(e.clientX, e.clientY, 3);
        return;
      }
      cerca.pulso = 1.4;
      if (modo === 'libre') {
        burbuja.textContent = susurros[iSusurro++ % susurros.length];
        burbuja.hidden = true;
        void burbuja.offsetWidth;
        burbuja.style.left = Math.max(Math.min(W / 2, 130), Math.min(W - 130, cerca.x)) + 'px';
        burbuja.style.top = cerca.y + 'px';
        burbuja.classList.toggle('abajo', cerca.y < 110);
        burbuja.hidden = false;
        clearTimeout(tBurbuja);
        tBurbuja = setTimeout(() => { burbuja.hidden = true; }, 3400);
      }
      Musica.tintineo();
      FX.corazones(e.clientX, e.clientY, 5);
      if (reducido) dibujar(performance.now());
    });

    btnUltima.addEventListener('click', () => {
      modo = 'corazon';
      t0 = performance.now();
      btnUltima.hidden = true;
      burbuja.hidden = true;
      arrancar();
      if (reducido) dibujar(t0 + 10000);
      setTimeout(() => {
        textoFinal.hidden = false;
        const r = zona.getBoundingClientRect();
        FX.fuegos(8);
        FX.lluviaCorazones(70);
        FX.confeti(r.left + r.width / 2, r.top + r.height / 2, 120, 1);
        Musica.fanfarria();
      }, reducido ? 100 : 3600);
      setTimeout(() => { if (Musica.disponible()) btnOtra.hidden = false; }, reducido ? 200 : 5200);
    });
    btnOtra.addEventListener('click', () => {
      Musica.otraVez();
      FX.corazones(window.innerWidth / 2, window.innerHeight * 0.6, 14);
    });

    medir();
    window.addEventListener('resize', medir);
  })();

  /* ───────────── Pequeños secretos ───────────── */
  let ultimoToque = 0, ux = 0, uy = 0;
  document.addEventListener('pointerup', (e) => {
    if (!abierto || e.target.closest('button, a, .tarjeta, .constelacion, .vale')) return;
    const t = performance.now();
    if (t - ultimoToque < 330 && Math.hypot(e.clientX - ux, e.clientY - uy) < 40) {
      FX.corazones(e.clientX, e.clientY, 10);
      Musica.tintineo();
      ultimoToque = 0;
    } else {
      ultimoToque = t;
      ux = e.clientX;
      uy = e.clientY;
    }
  });

  let tecleado = '';
  window.addEventListener('keydown', (e) => {
    if (!abierto || e.key.length !== 1) return;
    tecleado = (tecleado + e.key.toLowerCase()).slice(-8);
    if (tecleado.endsWith('teamo')) {
      tecleado = '';
      FX.lluviaCorazones(70);
      Musica.fanfarria();
      avisar(`Yo también te amo, ${PARA}.`);
    }
  });
})();
