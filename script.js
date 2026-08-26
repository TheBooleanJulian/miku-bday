// Miku's birthday: August 30, 2026 at 3:00 PM SGT
const BIRTHDAY_DATE = new Date('2026-08-30T15:00:00+08:00').getTime();

// ==================== 7-SEGMENT DIGIT RENDERING ====================

const SVG_NS = 'http://www.w3.org/2000/svg';
const SEGMENTS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const SEGMENT_ON = {
    '0': 'abcdef',
    '1': 'bc',
    '2': 'abged',
    '3': 'abgcd',
    '4': 'fgbc',
    '5': 'afgcd',
    '6': 'afgecd',
    '7': 'abc',
    '8': 'abcdefg',
    '9': 'abcfgd',
};

// [segment, x, y, width, height] within a 40x70 viewBox
const SEGMENT_RECTS = [
    ['a', 8, 2, 24, 6],
    ['g', 8, 32, 24, 6],
    ['d', 8, 62, 24, 6],
    ['f', 2, 8, 6, 24],
    ['b', 32, 8, 6, 24],
    ['e', 2, 38, 6, 24],
    ['c', 32, 38, 6, 24],
];

function buildDigitSvg() {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 40 70');
    svg.setAttribute('class', 'seg-digit');
    SEGMENT_RECTS.forEach(([seg, x, y, w, h]) => {
        const rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', w);
        rect.setAttribute('height', h);
        rect.setAttribute('rx', Math.min(w, h) / 2);
        rect.setAttribute('class', 'seg seg-' + seg);
        svg.appendChild(rect);
    });
    return svg;
}

function setDigitValue(svg, char) {
    const on = SEGMENT_ON[char] || '';
    SEGMENTS.forEach((seg) => {
        const el = svg.querySelector('.seg-' + seg);
        if (el) el.classList.toggle('on', on.includes(seg));
    });
}

function renderDigitGroup(container, valueStr) {
    while (container.children.length < valueStr.length) {
        container.appendChild(buildDigitSvg());
    }
    while (container.children.length > valueStr.length) {
        container.removeChild(container.lastChild);
    }
    Array.from(container.children).forEach((svg, i) => setDigitValue(svg, valueStr[i]));
}

const digitGroups = {
    days: document.querySelector('.digit-group[data-unit="days"]'),
    hours: document.querySelector('.digit-group[data-unit="hours"]'),
    minutes: document.querySelector('.digit-group[data-unit="minutes"]'),
    seconds: document.querySelector('.digit-group[data-unit="seconds"]'),
};

// ==================== COUNTDOWN ====================

function updateCountdown() {
    const now = new Date().getTime();
    const distance = BIRTHDAY_DATE - now;

    if (distance <= 0) {
        window.location.href = 'schedule.html?unlocked=true';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    renderDigitGroup(digitGroups.days, String(days).padStart(2, '0'));
    renderDigitGroup(digitGroups.hours, String(hours).padStart(2, '0'));
    renderDigitGroup(digitGroups.minutes, String(minutes).padStart(2, '0'));
    renderDigitGroup(digitGroups.seconds, String(seconds).padStart(2, '0'));

    const countdownElement = document.getElementById('countdown');
    if (distance < 60000) {
        countdownElement.classList.add('critical');
    } else {
        countdownElement.classList.remove('critical');
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ==================== DECORATIVE TELEMETRY (purely cosmetic) ====================

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
    const vfaders = document.querySelectorAll('.vfader-fill');
    const knobs = document.querySelectorAll('.knob');
    const syncVal = document.getElementById('sync-val');
    const syncBar = document.getElementById('sync-bar');
    const activationVal = document.getElementById('activation-val');
    const activationBar = document.getElementById('activation-bar');

    setInterval(() => {
        vfaders.forEach((el) => {
            const current = parseFloat(el.style.height) || 50;
            const next = Math.max(12, Math.min(95, current + (Math.random() * 12 - 6)));
            el.style.height = next + '%';
        });

        knobs.forEach((el) => {
            const current = parseFloat(el.style.getPropertyValue('--rot')) || 0;
            const next = Math.max(-70, Math.min(70, current + (Math.random() * 14 - 7)));
            el.style.setProperty('--rot', next + 'deg');
        });

        if (syncVal && syncBar) {
            const sync = 95 + Math.round(Math.random() * 4);
            syncVal.textContent = sync + '%';
            syncBar.style.width = sync + '%';
        }

        if (activationVal && activationBar) {
            const activation = 37 + Math.round(Math.random() * 4);
            activationVal.textContent = activation + '%';
            activationBar.style.width = activation + '%';
        }
    }, 2600);
}

console.log('🎂 Countdown to Miku\'s 19th Birthday 🎂');
console.log('Target: August 30, 2026 at 3:00 PM SGT');
console.log('Psst... try checking schedule.html 👀');
