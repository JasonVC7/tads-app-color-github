document.addEventListener("DOMContentLoaded", () => {
  const rRange = document.getElementById("rRange");
  const gRange = document.getElementById("gRange");
  const bRange = document.getElementById("bRange");

  const rValue = document.getElementById("rValue");
  const gValue = document.getElementById("gValue");
  const bValue = document.getElementById("bValue");

  const rInput = document.getElementById("rInput");
  const gInput = document.getElementById("gInput");
  const bInput = document.getElementById("bInput");

  const colorBox = document.getElementById("colorBox");
  const rgbText = document.getElementById("rgbText");
  const hexText = document.getElementById("hexText");

  // Validación: si algo no existe, avisamos
  const all = [rRange, gRange, bRange, rValue, gValue, bValue, rInput, gInput, bInput, colorBox, rgbText, hexText];
  if (all.some(el => !el)) {
    console.error("❌ Faltan elementos en el HTML. Revisa IDs (rInput, gInput, bInput).");
    return;
  }

  function clamp255(n) {
    if (Number.isNaN(n)) return 0;
    return Math.min(255, Math.max(0, n));
  }

  function toHex(value) {
    const hex = Number(value).toString(16).toUpperCase();
    return hex.length === 1 ? "0" + hex : hex;
  }

  // Esta función actualiza TODO (sliders, inputs, textos y color)
  function setColor(r, g, b) {
    r = clamp255(parseInt(r, 10));
    g = clamp255(parseInt(g, 10));
    b = clamp255(parseInt(b, 10));

    // Sliders
    rRange.value = r;
    gRange.value = g;
    bRange.value = b;

    // Inputs numéricos
    rInput.value = r;
    gInput.value = g;
    bInput.value = b;

    // Badges
    rValue.textContent = r;
    gValue.textContent = g;
    bValue.textContent = b;

    // Texto RGB y color
    const rgb = `rgb(${r}, ${g}, ${b})`;
    colorBox.style.backgroundColor = rgb;
    rgbText.textContent = rgb;

    // HEX
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    hexText.textContent = hex;
  }

  // Cuando mueves los sliders
  function fromRanges() {
    setColor(rRange.value, gRange.value, bRange.value);
  }

  // Cuando escribes en inputs
  function fromInputs() {
    setColor(rInput.value, gInput.value, bInput.value);
  }

  // Eventos sliders (en tiempo real)
  [rRange, gRange, bRange].forEach(el => el.addEventListener("input", fromRanges));

  // Eventos inputs:
  // - input: mientras escribes
  // - blur: cuando sales del campo (por si dejan vacío)
  [rInput, gInput, bInput].forEach(el => {
    el.addEventListener("input", fromInputs);
    el.addEventListener("blur", fromInputs);
  });

  // Estado inicial
  setColor(0, 0, 0);
});
