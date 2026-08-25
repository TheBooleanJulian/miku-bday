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

    // Add pulse effect when less than 1 minute remains
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

// Add critical state styling via CSS
const style = document.createElement('style');
style.textContent = `
    #countdown.critical .time-unit {
        animation: critical-pulse 0.5s ease-in-out infinite;
        border-color: var(--primary-magenta);
    }

    #countdown.critical .time-value {
        color: var(--primary-magenta);
        text-shadow: 0 0 20px rgba(255, 0, 110, 0.8);
    }

    @keyframes critical-pulse {
        0%, 100% {
            box-shadow: 
                0 0 20px rgba(255, 0, 110, 0.3),
                inset 0 0 20px rgba(255, 0, 110, 0.1);
        }
        50% {
            box-shadow: 
                0 0 40px rgba(255, 0, 110, 0.6),
                inset 0 0 20px rgba(255, 0, 110, 0.2);
        }
    }
`;
document.head.appendChild(style);

console.log('🎂 Countdown to Miku\'s 19th Birthday 🎂');
console.log('Target: August 30, 2026 at 3:00 PM SGT');
console.log('Psst... try checking schedule.html 👀');
