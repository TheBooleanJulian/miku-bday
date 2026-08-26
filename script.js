// Miku's birthday: August 30, 2026 at 3:00 PM SGT
const BIRTHDAY_DATE = new Date('2026-08-30T15:00:00+08:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = BIRTHDAY_DATE - now;

    // If the countdown has reached 0, show the schedule
    if (distance <= 0) {
        window.location.href = 'schedule.html?unlocked=true';
        return;
    }

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the DOM with zero-padded values
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // Add critical state styling when less than 1 minute remains
    const countdownElement = document.getElementById('countdown');
    if (distance < 60000) {
        countdownElement.classList.add('critical');
    } else {
        countdownElement.classList.remove('critical');
    }
}

// Initial update
updateCountdown();

// Update every 1 second
setInterval(updateCountdown, 1000);

// Decorative synth-panel telemetry: gentle idle drift, purely cosmetic
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
    const telemetry = [
        { fill: 'osc01-fill', val: 'osc01-val', base: 62 },
        { fill: 'osc02-fill', val: 'osc02-val', base: 44 },
        { fill: 'filter-fill', val: 'filter-val', base: 78 },
        { fill: 'lfo-fill', val: 'lfo-val', base: 31 },
    ];

    setInterval(() => {
        telemetry.forEach(({ fill, val, base }) => {
            const drift = base + (Math.random() * 16 - 8);
            const clamped = Math.max(8, Math.min(96, Math.round(drift)));
            const fillEl = document.getElementById(fill);
            const valEl = document.getElementById(val);
            if (fillEl) fillEl.style.width = clamped + '%';
            if (valEl) valEl.textContent = clamped + '%';
        });

        const syncEl = document.getElementById('sync-val');
        if (syncEl) {
            const sync = 95 + Math.round(Math.random() * 4);
            syncEl.textContent = sync + '%';
        }
    }, 2600);
}

console.log('🎂 Countdown to Miku\'s 19th Birthday 🎂');
console.log('Target: August 30, 2026 at 3:00 PM SGT');
console.log('Psst... try checking schedule.html 👀');
