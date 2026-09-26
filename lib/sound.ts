// Sonido de teclado mecánico sintetizado con Web Audio (sin archivos de audio).

let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;
let muted = false;

export function setMuted(value: boolean) {
  muted = value;
}

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    noise = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Un "clack" de tecla. `heavy` suena como barra espaciadora / enter. */
export function keyClick(heavy = false) {
  if (muted) return;
  const ac = getCtx();
  if (!ac || !noise) return;
  const t = ac.currentTime;
  const out = ac.createGain();
  out.gain.value = heavy ? 0.5 : 0.35;
  out.connect(ac.destination);

  // 1) chasquido: ruido filtrado muy corto
  const src = ac.createBufferSource();
  src.buffer = noise;
  src.playbackRate.value = 0.9 + Math.random() * 0.3;
  const bp = ac.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = (heavy ? 1800 : 3200) + Math.random() * 900;
  bp.Q.value = 0.9;
  const g1 = ac.createGain();
  g1.gain.setValueAtTime(1, t);
  g1.gain.exponentialRampToValueAtTime(0.001, t + (heavy ? 0.06 : 0.035));
  src.connect(bp).connect(g1).connect(out);
  src.start(t);
  src.stop(t + 0.08);

  // 2) golpe grave del "bottom out"
  const osc = ac.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime((heavy ? 140 : 210) + Math.random() * 40, t);
  osc.frequency.exponentialRampToValueAtTime(60, t + 0.05);
  const g2 = ac.createGain();
  g2.gain.setValueAtTime(heavy ? 0.6 : 0.35, t);
  g2.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
  osc.connect(g2).connect(out);
  osc.start(t);
  osc.stop(t + 0.07);

  // 3) retorno de la tecla, un poco después
  const src2 = ac.createBufferSource();
  src2.buffer = noise;
  const hp = ac.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 4000;
  const g3 = ac.createGain();
  const t2 = t + 0.045 + Math.random() * 0.02;
  g3.gain.setValueAtTime(0.0001, t);
  g3.gain.setValueAtTime(0.25, t2);
  g3.gain.exponentialRampToValueAtTime(0.001, t2 + 0.02);
  src2.connect(hp).connect(g3).connect(out);
  src2.start(t);
  src2.stop(t2 + 0.03);
}

/** Ráfaga de teclas para acompañar la transición entre páginas. */
export function typingBurst(count = 6, spacing = 55) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => keyClick(i === count - 1), i * spacing + Math.random() * 25);
  }
}
