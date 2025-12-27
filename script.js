let i = 0;
let message = "Happy Birthday! I have prepared something special for you, I HOPE U LIKE IT ..."; 
let speed = 70;

// 1. Trace de paillettes avec la souris
document.addEventListener('mousemove', function(e) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.className = 'mouse-sparkle';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
});

// 2. Lancement de l'expérience (Cliquer sur le bouton d'accueil)
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
            updateCounter(); 
            // Affiche le texte fixe sur l'enveloppe dès le début
            if (scroll) scroll.style.opacity = "1";
        }, 50);
    }, 1000);
}

// 3. Animation machine à écrire
function typeWriter() {
    if (i < message.length) {
        document.getElementById("typewriter-text").innerHTML += message.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

// 4. Ouverture de l'enveloppe
function toggleEnvelope() {
    const env = document.getElementById('envelope');
    const typewriter = document.getElementById('typewriter-text');
    const polaroid = document.getElementById('polaroid');
    const scroll = document.getElementById('emotional-scroll');
    const audio = document.getElementById('monAudio');
    const bgMemory = document.getElementById('bg-memory');
    const vignette = document.querySelector('.vignette');

    // Ouvre l'enveloppe
    env.classList.add('open');
    
    // Affiche la photo de fond et le contour sombre
    if (bgMemory) bgMemory.classList.add('show-memory');
    if (vignette) vignette.classList.add('vignette-show');
    
    // Cache le texte typewriter pour laisser place à la lettre
    if (typewriter) typewriter.style.opacity = '0';
    
    // Cache le petit texte de l'enveloppe quand elle est ouverte
    if (scroll) scroll.style.opacity = '0';

    // Augmentation progressive du volume de la musique
    let fadeIn = setInterval(() => {
        if (audio && audio.volume < 0.8) {
            audio.volume += 0.05;
        } else {
            clearInterval(fadeIn);
        }
    }, 400);

    // APPARITION DU POLAROID (Fixe et visible longtemps)
    if (polaroid) {
    // Le Polaroid se déclenche 2 secondes après l'ouverture
    setTimeout(() => { 
    polaroid.classList.add('polaroid-show'); 
}, 1500); // 1.5 seconde après l'ouverture
}

    createHearts(); 
}

// 5. Explosion de cœurs et de mots doux
function createHearts() {
    const container = document.getElementById('hearts');
    const memories = ['❤️', '11/04/25', '✨', 'HMIIIZA', 'MANAL', 'Forever']; 
    
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

// 6. Le compteur de jours
function updateCounter() {
    const startDate = new Date("2025-04-11"); // Date de votre rencontre
    const counterElement = document.getElementById('counter');
    const now = new Date();
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (counterElement) {
        counterElement.innerHTML = days + " days of loving you";
        counterElement.style.opacity = "1";
    }
}

// 7. Message secret final au clic sur le petit coeur
function showFinalSecret() {
    alert("In every lifetime, I would choose you. Happy Birthday, my soulmate. ❤️");
}