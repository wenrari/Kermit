// ==============================
// $KERMIT — update the CA here once launched
// ==============================
const CONTRACT_ADDRESS = '0x000000000000000000000000000000000000dEaD';

document.addEventListener('DOMContentLoaded', () => {
    const tokenEl = document.getElementById('token');
    if (tokenEl) tokenEl.textContent = CONTRACT_ADDRESS;

    const dexIframe = document.getElementById('iframe-chart');
    if (dexIframe) {
        dexIframe.src = `https://dexscreener.com/ethereum/${CONTRACT_ADDRESS}?embed=1&theme=dark&trades=0&info=0`;
    }
});

// Noise canvas
(function () {
    const canvas = document.getElementById('noise');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 220;
    canvas.height = 220;
    function drawNoise() {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const v = Math.random() * 255;
            data[i] = v;
            data[i + 1] = v;
            data[i + 2] = v;
            data[i + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
    }
    function loop() {
        drawNoise();
        requestAnimationFrame(loop);
    }
    loop();
})();

// Copy CA
const copyBtn = document.getElementById('copy');
if (copyBtn) {
    copyBtn.addEventListener('click', function () {
        const restore = (el, original) => setTimeout(() => {
            el.textContent = original;
            el.style.color = '';
        }, 1500);

        navigator.clipboard.writeText(CONTRACT_ADDRESS).then(() => {
            const original = this.textContent;
            this.textContent = 'COPIED!';
            this.style.color = '#FFF8E3';
            restore(this, original);
        }).catch(() => {
            const t = document.createElement('textarea');
            t.value = CONTRACT_ADDRESS;
            document.body.appendChild(t);
            t.select();
            document.execCommand('copy');
            document.body.removeChild(t);
            const original = this.textContent;
            this.textContent = 'COPIED!';
            this.style.color = '#FFF8E3';
            restore(this, original);
        });
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(l => {
    l.addEventListener('click', function (e) {
        const h = this.getAttribute('href');
        if (h === '#') return;
        const target = document.querySelector(h);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Parallax tilt on hero stickers on mouse move
(function () {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const stickers = hero.querySelectorAll('.sticker');
    const char = hero.querySelector('.hero-char');
    hero.addEventListener('mousemove', (e) => {
        const { innerWidth: w, innerHeight: h } = window;
        const x = (e.clientX / w - 0.5) * 2;
        const y = (e.clientY / h - 0.5) * 2;
        stickers.forEach((s, i) => {
            const depth = (i + 1) * 4;
            s.style.translate = `${x * depth}px ${y * depth}px`;
        });
        if (char) {
            char.style.translate = `${x * -8}px ${y * -6}px`;
        }
    });
    hero.addEventListener('mouseleave', () => {
        stickers.forEach(s => s.style.translate = '');
        if (char) char.style.translate = '';
    });
})();
