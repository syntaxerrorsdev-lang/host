// VPN page — billing toggle + configurator
document.addEventListener('DOMContentLoaded', function () {

  // ── Billing toggle ────────────────────────
  let isAnnual = false;
  const toggle    = document.getElementById('billingToggle');
  const dot       = document.getElementById('toggleDot');
  const priceEls  = document.querySelectorAll('[data-price]');

  if (toggle) {
    toggle.addEventListener('click', () => {
      isAnnual = !isAnnual;
      dot.style.transform = isAnnual ? 'translateX(24px)' : 'translateX(0)';
      toggle.style.background = isAnnual ? '#4f7cff' : '#4f7cff';
      priceEls.forEach(el => {
        const val = isAnnual ? el.dataset.annual : el.dataset.monthly;
        el.textContent = '$' + val;
      });
    });
  }

  // ── VPN Configurator ──────────────────────
  const speedLabels = ['100 Mbps', '250 Mbps', '500 Mbps', '1 Gbps'];
  const speedPrices = [0, 2, 5, 10];

  const speedSlider = document.getElementById('vpnSpeed');
  const speedLabel  = document.getElementById('speedLabel');

  if (speedSlider) {
    speedSlider.addEventListener('input', () => {
      speedLabel.textContent = speedLabels[speedSlider.value];
      calcVpnPrice();
    });
  }

  document.querySelectorAll('input[name="protocol"], input[name="duration"]')
    .forEach(r => r.addEventListener('change', calcVpnPrice));

  function calcVpnPrice() {
    const countryAdd  = parseFloat(document.getElementById('vpnCountry')?.value || 1);
    const speedAdd    = speedPrices[parseInt(speedSlider?.value || 0)];
    const protocolAdd = parseFloat(document.querySelector('input[name="protocol"]:checked')?.value || 0);
    const discount    = parseFloat(document.querySelector('input[name="duration"]:checked')?.value || 1);

    const base  = 3.99;
    const total = ((base + speedAdd + protocolAdd) * discount).toFixed(2);
    const el    = document.getElementById('vpnPrice');
    if (el) el.textContent = total;
  }

  if (document.getElementById('vpnCountry')) {
    document.getElementById('vpnCountry').addEventListener('change', calcVpnPrice);
  }

  // Radio box visual feedback
  document.querySelectorAll('.radio-option input').forEach(input => {
    input.addEventListener('change', () => {
      input.closest('.radio-option').querySelectorAll('.radio-box')
        .forEach(box => box.classList.remove('selected'));
    });
  });
});
