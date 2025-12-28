let i = 0;
let message = "Happy birthDay, my love! I have prepared something special for you because distance means nothing when someone means everything. I hope you like it... <3"; 
let speed = 70;

// 1. MOUSE SPARKLE TRAIL
document.addEventListener('mousemove', function(e) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.className = 'mouse-sparkle';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
});

// 2. VOICE NOTE CONTROL
function playVoice() {
    const voice = document.getElementById('voiceNote');
    const btn = document.getElementById('v-btn');
    const bgMusic = document.getElementById('monAudio'); // Background Music
    
    if (!voice) return;

    if (voice.paused) {
        // 1. Lower the background music significantly (to 5% volume)
        if (bgMusic) bgMusic.volume = 0.05; 
        
        voice.play();
        btn.innerHTML = "<span>❤️</span> Playing...";
    } else {
        voice.pause();
        
        // 2. Bring background music back to normal (30% volume)
        if (bgMusic) bgMusic.volume = 0.1;
        
        btn.innerHTML = "<span>🔊</span> Listen to my voice";
    }

    // 3. Reset volume automatically when the voice note ends
    voice.onended = () => {
        btn.innerHTML = "<span>🔊</span> Listen to my voice";
        if (bgMusic) bgMusic.volume = 0.1;
    };
}

// 3. START PHASE 1 (Welcome -> Second Page + MUSIC STARTS HERE)
function startExperience() {
    const welcome = document.getElementById('welcome-screen');
    const second = document.getElementById('second-page');
    const audio = document.getElementById('monAudio'); // Background music

    // --- MUSIC STARTS ON SECOND PAGE ---
    if(audio) { 
        audio.volume = 0.3; 
        audio.play().catch(error => console.log("Audio play failed: ", error)); 
    }

    welcome.style.opacity = '0';
    setTimeout(() => {
        welcome.style.display = 'none';
        second.style.display = 'flex';
        
        // Ensure styling for centering (stacks them)
        second.style.flexDirection = 'column';
        second.style.justifyContent = 'center';
        second.style.alignItems = 'center';

        startLovingCounter();

        // BALLOON EXPLOSION (19 Balloons)
        for(let k = 0; k < 19; k++) {
            setTimeout(() => {
                createSingleBalloon();
            }, k * 100); 
        }
        
        setTimeout(() => { second.style.opacity = '1'; }, 50);
    }, 1000);
}

// 4. START PHASE 2 (Second Page -> Envelope/Main Content)
function startMainExperience() {
    const second = document.getElementById('second-page');
    const main = document.getElementById('main-content');
    const voice = document.getElementById('voiceNote');
    const scroll = document.getElementById('emotional-scroll');

    // Stop voice note if playing
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

// 5. TYPEWRITER ANIMATION
function typeWriter() {
    if (i < message.length) {
        document.getElementById("typewriter-text").innerHTML += message.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

// 6. OPENING THE ENVELOPE
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

    // Increase music volume slightly when opening the letter
    let fadeIn = setInterval(() => {
        if (audio && audio.volume < 0.6) {
            audio.volume += 0.05;
        } else {
            clearInterval(fadeIn);
        }
    }, 400);

    if (polaroid) {
        setTimeout(() => { 
            polaroid.classList.add('polaroid-show'); 
        }, 1500);
    }
    createHearts(); 
}

// 7. EXPLOSION OF HEARTS
function createHearts() {
    const container = document.getElementById('hearts');
    const memories = ['❤️', '11/04/25', '✨', 'Hmiiiza', 'Manal', 'HOME', 'Love']; 
    
    for (let i = 0; i < 40; i++) { 
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = memories[Math.floor(Math.random() * memories.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.color = "rgba(255, 255, 255, 0.7)"; 
        heart.style.textShadow = "0 0 10px rgba(255,255,255,0.5)";
        heart.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 8000);
    }
}

// 8. THE ORIGINAL 2028 COUNTDOWN (PAGE 1)
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

// 9. THE LOVING U COUNTER (PAGE 2)
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

// 10. SINGLE BALLOON GENERATOR
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


// TRIGGER ON LOAD
document.addEventListener('DOMContentLoaded', () => {
    startMeetCountdown();
});