// Dedicated servers configurator
document.addEventListener('DOMContentLoaded', function () {

  const ramLabels = ['16 GB DDR4 ECC', '32 GB DDR4 ECC', '64 GB DDR4 ECC', '128 GB DDR4 ECC'];
  const ramPrices = [0, 20, 50, 110];
  const ramNames  = ['16 GB DDR4', '32 GB DDR4', '64 GB DDR4', '128 GB DDR4'];

  const ramSlider = document.getElementById('cfg_ram');

  function getVal(name) {
    return parseFloat(document.querySelector(`input[name="${name}"]:checked`)?.value || 0);
  }
  function getLabel(name) {
    return document.querySelector(`input[name="${name}"]:checked`)?.dataset?.label || '';
  }

  function calcPrice() {
    const cpu  = getVal('cpu');
    const ram  = ramPrices[parseInt(ramSlider?.value || 0)];
    const disk = getVal('disk');
    const loc  = getVal('location');
    const bw   = getVal('bw');
    const ddos = document.getElementById('addonDdos')?.checked ? 15 : 0;

    const total = cpu + ram + disk + loc + bw + ddos;

    const priceEl = document.getElementById('dedicatedPrice');
    if (priceEl) priceEl.textContent = total;

    const cpuEl  = document.getElementById('sumCPU');
    const ramEl  = document.getElementById('sumRAM');
    const diskEl = document.getElementById('sumDisk');
    const bwEl   = document.getElementById('sumBW');

    if (cpuEl)  cpuEl.textContent  = getLabel('cpu').split(' (')[0];
    if (ramEl)  ramEl.textContent  = ramNames[parseInt(ramSlider?.value || 0)];
    if (diskEl) diskEl.textContent = getLabel('disk');
    if (bwEl)   bwEl.textContent   = getLabel('bw') || '20 TB / 1 Gbps';
  }

  if (ramSlider) {
    ramSlider.addEventListener('input', () => {
      const idx = parseInt(ramSlider.value);
      const lbl = document.getElementById('ramLabel2');
      if (lbl) lbl.textContent = ramLabels[idx];
      calcPrice();
    });
  }

  document.querySelectorAll('input[name="cpu"], input[name="disk"], input[name="location"], input[name="bw"]')
    .forEach(r => r.addEventListener('change', calcPrice));

  const ddosChk = document.getElementById('addonDdos');
  if (ddosChk) ddosChk.addEventListener('change', calcPrice);
});
