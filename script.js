// Navigation logic
function nextScene(num) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById(`scene${num}`).classList.add('active');
    
    if (num === 3) startHeartGame();
    if (num === 7) startTyping();
}

// Scene 1: Password logic
function checkPassword() {
    const pass = document.getElementById('passwordInput').value;
    if (pass === "Falak123") {
        nextScene(2);
    } else {
        const input = document.getElementById('passwordInput');
        input.style.border = "2px solid red";
        document.getElementById('errorMsg').style.display = "block";
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 400);
    }
}

// Scene 3: Heart Game
let score = 0;
function startHeartGame() {
    const area = document.getElementById('game-area');
    const interval = setInterval(() => {
        if (score >= 10) {
            clearInterval(interval);
            setTimeout(() => nextScene(4), 1000);
            return;
        }
        const heart = document.createElement('div');
        heart.className = 'heart-drop';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * (window.innerWidth - 40) + 'px';
        heart.style.top = '-50px';
        area.appendChild(heart);

        let pos = -50;
        const fall = setInterval(() => {
            pos += 4;
            heart.style.top = pos + 'px';
            if (pos > window.innerHeight) { clearInterval(fall); heart.remove(); }
        }, 20);

        heart.onclick = () => {
            score++;
            document.getElementById('score').innerText = score;
            heart.remove();
            clearInterval(fall);
        };
    }, 800);
}

// Scene 4: Realistic Cake Cutting
function animateCut() {
    const knife = document.getElementById('knife');
    const flames = document.querySelectorAll('.flame');
    const cake = document.getElementById('cake3d');
    const btn = document.getElementById('cutBtn');

    // Move knife to cake
    knife.classList.add('moving');

    setTimeout(() => {
        // "Blow out" candles
        flames.forEach(f => f.style.display = 'none');
        
        // Visual "Cut" effect - we simulate by splitting the container logic
        cake.style.transition = "1s";
        cake.style.filter = "drop-shadow(0 0 10px gold)";
        
        // Start Celebration
        initConfetti();
        
        btn.innerText = "I have a promise to ask...";
        btn.onclick = () => nextScene(5);
    }, 1200);
}

// Scene 7: Typing Animation
const lines = [
    "Happy Birthday Meri Jaan ❤️",
    "You are the most beautiful part of my life.",
    "Your smile makes my world beautiful.",
    "I pray Allah always keeps you happy.",
    "You are my biggest blessing.",
    "Thank you for being in my life.",
    "I will always respect and care for you.",
    "May all your dreams come true.",
    "I wish every happiness for you.",
    "I love you more every day.",
    "You are my forever.",
    "Happy Birthday My Love ❤️",
    "\nForever Yours ❤️"
];

function startTyping() {
    const box = document.getElementById('letterContent');
    let lineIdx = 0;
    let charIdx = 0;

    function type() {
        if (lineIdx < lines.length) {
            if (charIdx < lines[lineIdx].length) {
                box.innerHTML += lines[lineIdx][charIdx];
                charIdx++;
                setTimeout(type, 50);
            } else {
                box.innerHTML += "<br>";
                lineIdx++;
                charIdx = 0;
                setTimeout(type, 600);
            }
        } else {
            document.getElementById('playAgain').style.display = "block";
            initConfetti();
        }
    }
    type();
}

// Confetti Effect
function initConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let parts = [];
    for(let i=0; i<100; i++) {
        parts.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            r: Math.random()*4+1,
            d: Math.random()*10,
            c: `hsl(${Math.random()*360}, 70%, 60%)`,
            v: Math.random()*3+1
        });
    }
    function draw() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        parts.forEach(p => {
            ctx.beginPath();
            ctx.fillStyle = p.c;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
            ctx.fill();
            p.y += p.v;
            if(p.y > canvas.height) p.y = -10;
        });
        requestAnimationFrame(draw);
    }
    draw();
}
