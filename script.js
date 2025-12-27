let i = 0;
let message = "Happy birthDay, my love! I have prepared something special for you because distance means nothing when someone means everything. I hope you like it... <3"; 
let speed = 70;

// 1. Mouse Sparkle Trail
document.addEventListener('mousemove', function(e) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.className = 'mouse-sparkle';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
});

// 2. Start the Experience (When button is clicked)
function startExperience() {
    const welcome = document.getElementById('welcome-screen');
    const main = document.getElementById('main-content');
    const audio = document.getElementById('monAudio');
    const scroll = document.getElementById('emotional-scroll');

    if(audio) { 
        audio.volume = 0.3; 
        audio.play(); 
    }

    welcome.style.opacity = '0';
    setTimeout(() => {
        welcome.style.display = 'none';
        main.style.display = 'flex'; 
        setTimeout(() => { 
            main.style.opacity = '1'; 
            typeWriter(); 
            // Show the fixed text on the envelope immediately
            if (scroll) scroll.style.opacity = "1";
        }, 50);
    }, 1000);
}

// 3. Typewriter Animation
function typeWriter() {
    if (i < message.length) {
        document.getElementById("typewriter-text").innerHTML += message.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

// 4. Opening the Envelope
function toggleEnvelope() {
    const env = document.getElementById('envelope');
    const typewriter = document.getElementById('typewriter-text');
    const polaroid = document.getElementById('polaroid');
    const scroll = document.getElementById('emotional-scroll');
    const audio = document.getElementById('monAudio');
    const bgMemory = document.getElementById('bg-memory');
    const vignette = document.querySelector('.vignette');

    env.classList.add('open');
    if (bgMemory) bgMemory.classList.add('show-memory');
    if (vignette) vignette.classList.add('vignette-show');
    if (typewriter) typewriter.style.opacity = '0';
    if (scroll) scroll.style.opacity = '0';

    let fadeIn = setInterval(() => {
        if (audio && audio.volume < 0.8) {
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

// 5. Explosion of Hearts
function createHearts() {
    const container = document.getElementById('hearts');
    const memories = ['❤️', '11/04/25', '✨', 'Hmiiiza', 'Manal', 'Forever', 'Love']; 
    
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

// 6. THE COUNTDOWN (Starts immediately on Page Load)
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

        // This will update the text every second
        countdownElement.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s left until 2028 ❤️";
    }, 1000);
}

// 7. Final Secret Message Popup
function showFinalSecret() {
    alert("In every lifetime, I would choose you. Happy birthday, my soulmate. I'm counting the days until we finally meet. ❤️");
}

// TRIGGER COUNTDOWN ON LOAD
document.addEventListener('DOMContentLoaded', startMeetCountdown);