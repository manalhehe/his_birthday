let i = 0;
let message = "Happy birthDay, HAMZAAAAAA! I have prepared something special for you because distance means nothing when someone means everything. I hope you like it... <3"; 
let speed = 70;
let failCount = 0;
let realPassword = ""; // This stores the actual "JOZI"

// 1. LOCK SCREEN LOGIC
function handleHeartTyping(e) {
    const input = e.target;
    const hearts = "💖";
    
    // Logic to capture real characters while displaying hearts
    if (input.value.length > realPassword.length) {
        realPassword += input.value.slice(-1);
    } else {
        realPassword = realPassword.slice(0, input.value.length);
    }
    input.value = hearts.repeat(realPassword.length);
}

function verifyPassword() {
    // IMPORTANT: Check realPassword, not the input value!
    if (realPassword.trim().toUpperCase() === "JOZI") {
        unlockNow();
    } else {
        triggerFailure();
        realPassword = ""; // Reset the secret string on failure
    }
}

function triggerFailure() {
    const error = document.getElementById('error-msg');
    const hint = document.getElementById('hint-msg');
    const lockBox = document.querySelector('.lock-box');
    const passInput = document.getElementById('entry-pass');

    failCount++;
    if (error) error.style.display = 'block';
    if (lockBox) lockBox.classList.add('shake-anim');

    if (failCount >= 2 && hint) { hint.style.display = 'block'; }

    setTimeout(() => {
        if (error) error.style.display = 'none';
        if (lockBox) lockBox.classList.remove('shake-anim');
        if (passInput) passInput.value = "";
    }, 2000);
}

function unlockNow() {
    const lockScreen = document.getElementById('lock-screen');
    const welcome = document.getElementById('welcome-screen');
    lockScreen.classList.add('unlock-slide'); 
    
    setTimeout(() => {
        lockScreen.style.display = 'none';
        welcome.style.display = 'flex';
        setTimeout(() => { welcome.style.opacity = '1'; }, 50);
    }, 800);
}

// 2. INITIALIZATION (The "Brain" of the script)
document.addEventListener('DOMContentLoaded', () => {
    const passInput = document.getElementById('entry-pass');
    
    if (passInput) {
        // Listen for typing to turn letters into hearts
        passInput.addEventListener('input', handleHeartTyping);
        
        // Listen for "Enter" key
        passInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                verifyPassword();
            }
        });
    }
    
    startMeetCountdown();
});

// ... (Rest of your functions: mouse-trail, audio, transitions, counters etc. stay the same)

// 2. MOUSE TRAIL
document.addEventListener('mousemove', function(e) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.className = 'mouse-sparkle';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
});

// 3. AUDIO CONTROLS
function playVoice() {
    const voice = document.getElementById('voiceNote');
    const btn = document.getElementById('v-btn');
    const bgMusic = document.getElementById('monAudio'); 
    
    if (!voice) return;

    if (voice.paused) {
        // Lower background music so he can hear you clearly
        if (bgMusic) bgMusic.volume = 0.1; 
        
        voice.play().catch(error => console.log("Playback failed:", error));
        btn.innerHTML = "<span>❤️</span> Playing...";
        
        // When your voice note ends, reset everything
        voice.onended = () => {
            btn.innerHTML = "<span>🔊</span> Listen to my voice";
            if (bgMusic) bgMusic.volume = 1.0; // Max volume is 1.0
        };

    } else {
        // If he clicks again, it pauses and music returns to normal
        voice.pause();
        if (bgMusic) bgMusic.volume = 1.0;
        btn.innerHTML = "<span>🔊</span> Listen to my voice";
    }
}

// 4. TRANSITIONS BETWEEN PAGES
function startExperience() {
    const welcome = document.getElementById('welcome-screen');
    const second = document.getElementById('second-page');
    const audio = document.getElementById('monAudio');

    if(audio) { 
        audio.volume = 0.3; 
        audio.play().catch(err => console.log("Audio play failed")); 
    }

    welcome.style.opacity = '0';
    setTimeout(() => {
        welcome.style.display = 'none';
        second.style.display = 'flex';
        second.style.flexDirection = 'column';
        second.style.justifyContent = 'center';
        second.style.alignItems = 'center';

        startLovingCounter();

        for(let k = 0; k < 19; k++) {
            setTimeout(() => { createSingleBalloon(); }, k * 100); 
        }
        
        setTimeout(() => { second.style.opacity = '1'; }, 50);
    }, 1000);
}

function startMainExperience() {
    const second = document.getElementById('second-page');
    const main = document.getElementById('main-content');
    const voice = document.getElementById('voiceNote');
    const scroll = document.getElementById('emotional-scroll');

    if (voice) voice.pause();

    second.style.opacity = '0';
    setTimeout(() => {
        second.style.display = 'none';
        main.style.display = 'flex'; 
        setTimeout(() => { 
            main.style.opacity = '1'; 
            typeWriter(); 
            if (scroll) scroll.style.opacity = "1";
        }, 50);
    }, 1000);
}

// 5. ANIMATIONS & EFFECTS
function typeWriter() {
    if (i < message.length) {
        document.getElementById("typewriter-text").innerHTML += message.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

function toggleEnvelope() {
    const env = document.getElementById('envelope');
    const typewriter = document.getElementById('typewriter-text');
    const polaroid = document.getElementById('polaroid');
    const scroll = document.getElementById('emotional-scroll');
    const audio = document.getElementById('monAudio');
    const bgMemory = document.getElementById('bg-memgitory'); 
    const vignette = document.querySelector('.vignette');

    env.classList.add('open');
    if (bgMemory) bgMemory.classList.add('show-memory');
    if (vignette) vignette.classList.add('vignette-show');
    if (typewriter) typewriter.style.opacity = '0';
    if (scroll) scroll.style.opacity = '0';

    let fadeIn = setInterval(() => {
        if (audio && audio.volume < 0.6) {
            audio.volume += 0.05;
        } else {
            clearInterval(fadeIn);
        }
    }, 400);

    if (polaroid) {
        setTimeout(() => { polaroid.classList.add('polaroid-show'); }, 1500);
    }
    createHearts(); 
}

function createHearts() {
    const container = document.getElementById('hearts');
    const memories = ['❤️', '11/04/25', '✨', 'Hmiiiza', 'Manal', 'HOME', 'Love']; 
    
    for (let j = 0; j < 40; j++) { 
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = memories[Math.floor(Math.random() * memories.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 8000);
    }
}

// 6. COUNTDOWNS
function startMeetCountdown() {
    const meetDate = new Date("January 1, 2028 00:00:00").getTime();
    const countdownElement = document.getElementById('meet-countdown');

    if (!countdownElement) return;

    setInterval(function() {
        const now = new Date().getTime();
        const distance = meetDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s left until 2028 ";
    }, 1000);
}

function startLovingCounter() {
    const lovingElement = document.getElementById('loving-u-counter');
    const startDate = new Date("April 16, 2025 00:00:00").getTime();

    if (!lovingElement) return;

    setInterval(function() {
        const now = new Date().getTime();
        const diff = now - startDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        lovingElement.innerHTML = days + " DAYS OF LOVING U";
    }, 1000);
}

function createSingleBalloon() {
    const container = document.getElementById('balloon-container');
    if (!container) return;

    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.innerText = '19'; 
    const startPos = Math.random() * 100;
    const duration = 8 + Math.random() * 7;
    balloon.style.left = startPos + 'vw';
    balloon.style.animationDuration = duration + 's';
    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#fb6f92', '#ff85a1'];
    balloon.style.background = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(balloon);
    setTimeout(() => { balloon.remove(); }, duration * 1000);
}

function showFinalSecret() {
    alert("In every lifetime, I would choose you. Happy birthday, my soulmate. I'm counting the days until we finally meet. ❤️");
}

document.addEventListener('DOMContentLoaded', () => {
    startMeetCountdown();
});