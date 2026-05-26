function createGlowSprite(inner, mid, outer) {
    const glowSprite = document.createElement('canvas');
    glowSprite.width = 32;
    glowSprite.height = 32;
    const gctx = glowSprite.getContext('2d');
    const grad = gctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, inner);
    grad.addColorStop(0.35, mid);
    grad.addColorStop(1, outer);
    gctx.fillStyle = grad;
    gctx.fillRect(0, 0, 32, 32);
    return glowSprite;
}

function createParticleLayer(host, container, preset) {
    const canvas = document.createElement('canvas');
    canvas.className = preset.canvasClass;
    canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    const glowSprite = createGlowSprite(preset.inner, preset.mid, preset.outer);

    const particles = Array.from({ length: preset.particleCount }, () => spawnParticle(preset));

    let width = 0;
    let height = 0;
    let running = true;
    let inView = true;

    function resize() {
        const rect = host.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = rect.width;
        height = rect.height;
        canvas.width = Math.max(1, Math.floor(width * dpr));
        canvas.height = Math.max(1, Math.floor(height * dpr));
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function tick() {
        if (!running) return;
        requestAnimationFrame(tick);
        if (!inView || width === 0) return;

        ctx.clearRect(0, 0, width, height);

        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            p.twinkle += p.twinkleSpeed;

            if (preset.movement === 'rise' && p.y < -0.08) {
                Object.assign(p, spawnParticle(preset));
            } else if (preset.movement === 'driftLeft' && p.x < -0.08) {
                Object.assign(p, spawnParticle(preset));
            }

            const flicker = 0.65 + 0.35 * Math.sin(p.twinkle);
            const drawSize = p.size * flicker;
            const px = p.x * width;
            const py = p.y * height;

            ctx.globalAlpha = p.alpha * flicker;
            ctx.drawImage(glowSprite, px - drawSize / 2, py - drawSize / 2, drawSize, drawSize);
        }

        ctx.globalAlpha = 1;
    }

    const visibilityObserver = new IntersectionObserver(
        ([entry]) => { inView = entry.isIntersecting; },
        { threshold: 0 }
    );
    visibilityObserver.observe(host);

    resize();
    window.addEventListener('resize', resize, { passive: true });
    requestAnimationFrame(tick);

    return {
        onVisibilityChange(visible) {
            running = visible;
            if (running) requestAnimationFrame(tick);
        }
    };
}

function spawnParticle(preset) {
    if (preset.movement === 'rise') {
        return {
            x: Math.random(),
            y: Math.random(),
            vx: (Math.random() - 0.5) * 0.00028,
            vy: -(0.00045 + Math.random() * 0.00055),
            size: 6 + Math.random() * 14,
            alpha: preset.alphaMin + Math.random() * (preset.alphaMax - preset.alphaMin),
            twinkle: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.008 + Math.random() * 0.02
        };
    }

    return {
        x: 1.05 + Math.random() * 0.1,
        y: Math.random(),
        vx: -(0.0005 + Math.random() * 0.0006),
        vy: (Math.random() - 0.5) * 0.0002,
        size: 5 + Math.random() * 12,
        alpha: preset.alphaMin + Math.random() * (preset.alphaMax - preset.alphaMin),
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.01 + Math.random() * 0.025
    };
}

const HERO_PRESET = {
    movement: 'rise',
    particleCount: 110,
    canvasClass: 'hero-particles-canvas',
    inner: 'rgba(220, 195, 255, 0.95)',
    mid: 'rgba(155, 109, 255, 0.55)',
    outer: 'rgba(108, 60, 224, 0)',
    alphaMin: 0.25,
    alphaMax: 0.45
};

const SECTION_PRESET = {
    movement: 'driftLeft',
    particleCount: 60,
    canvasClass: 'section-particles-canvas',
    inner: 'rgba(175, 120, 255, 1)',
    mid: 'rgba(95, 45, 190, 0.92)',
    outer: 'rgba(45, 18, 95, 0)',
    alphaMin: 0.4,
    alphaMax: 0.75
};

export function initParticles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const layers = [];

    const heroContainer = document.querySelector('.hero-particles');
    const header = document.querySelector('header');
    if (heroContainer && header) {
        layers.push(createParticleLayer(header, heroContainer, HERO_PRESET));
    }

    document.querySelectorAll('.section').forEach(section => {
        const container = document.createElement('div');
        container.className = 'section-particles';
        container.setAttribute('aria-hidden', 'true');
        section.prepend(container);
        layers.push(createParticleLayer(section, container, SECTION_PRESET));
    });

    document.addEventListener('visibilitychange', () => {
        const visible = document.visibilityState === 'visible';
        layers.forEach(layer => layer.onVisibilityChange(visible));
    });
}
