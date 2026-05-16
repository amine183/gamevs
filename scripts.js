// ===== LOADING SCREEN =====
const loadingTips = [
    "⚔️ Preparing the battlefield...",
    "🎮 Loading game database...",
    "🏆 Calibrating the scoring system...",
    "💥 Charging battle engines...",
    "🌟 Almost ready for combat...",
    "🔥 Igniting the arena..."
];

function initLoader() {
    const loaderParticles = document.getElementById('loaderParticles');
    const colors = ['#7b2fff', '#ff2d55', '#00ff88'];

    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'loader-particle';
        const size = Math.random() * 5 + 2;
        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration: ${Math.random() * 10 + 8}s;
            animation-delay: ${Math.random() * 5}s;
            opacity: 0.7;
        `;
        loaderParticles.appendChild(p);
    }

    const bar = document.getElementById('loaderBar');
    const percent = document.getElementById('loaderPercent');
    const tip = document.getElementById('loaderTip');
    let progress = 0;
    let tipIndex = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 4 + 1;
        if (progress > 100) progress = 100;

        bar.style.width = progress + '%';
        percent.textContent = Math.floor(progress) + '%';

        const newTipIndex = Math.floor(progress / 20);
        if (newTipIndex !== tipIndex && newTipIndex < loadingTips.length) {
            tipIndex = newTipIndex;
            tip.style.opacity = '0';
            setTimeout(() => {
                tip.textContent = loadingTips[tipIndex];
                tip.style.opacity = '1';
            }, 300);
        }

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                const loader = document.getElementById('loaderScreen');
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 800);
            }, 500);
        }
    }, 60);
}

document.addEventListener('DOMContentLoaded', initLoader);
// ===== END LOADING SCREEN =====

// ===== SOUND EFFECTS =====
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudioCtx() {
    if (!audioCtx) audioCtx = new AudioCtx();
    return audioCtx;
}

function playBattleSound() {
    const ctx = getAudioCtx();

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(80, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.5);
    gain1.gain.setValueAtTime(0.4, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.5);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(200, ctx.currentTime + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.4);
    gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc2.start(ctx.currentTime + 0.1);
    osc2.stop(ctx.currentTime + 0.4);

    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.connect(gain3);
    gain3.connect(ctx.destination);
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(600, ctx.currentTime + 0.2);
    osc3.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.6);
    gain3.gain.setValueAtTime(0.2, ctx.currentTime + 0.2);
    gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc3.start(ctx.currentTime + 0.2);
    osc3.stop(ctx.currentTime + 0.6);
}

function playWinnerSound() {
    const ctx = getAudioCtx();
    const notes = [300, 400, 500, 700];
    notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
        gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.3);
        osc.start(ctx.currentTime + i * 0.15);
        osc.stop(ctx.currentTime + i * 0.15 + 0.3);
    });
}

function playHoverSound() {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
}
// ===== END SOUND EFFECTS =====


const gameDatabase = [
    { name: "God of War", graphics: 97, gameplay: 95, story: 96, price: 60, multiplayer: 20, performance: 92, sound: 95, replayability: 80 },
    { name: "God of War Ragnarok", graphics: 98, gameplay: 96, story: 97, price: 70, multiplayer: 20, performance: 94, sound: 97, replayability: 82 },
    { name: "Red Dead Redemption 2", graphics: 98, gameplay: 90, story: 99, price: 40, multiplayer: 75, performance: 88, sound: 97, replayability: 85 },
    { name: "The Witcher 3", graphics: 90, gameplay: 92, story: 99, price: 30, multiplayer: 10, performance: 85, sound: 93, replayability: 95 },
    { name: "Cyberpunk 2077", graphics: 97, gameplay: 85, story: 90, price: 50, multiplayer: 10, performance: 80, sound: 91, replayability: 78 },
    { name: "Elden Ring", graphics: 92, gameplay: 97, story: 88, price: 60, multiplayer: 60, performance: 83, sound: 90, replayability: 90 },
    { name: "Grand Theft Auto V", graphics: 88, gameplay: 93, story: 88, price: 30, multiplayer: 95, performance: 90, sound: 92, replayability: 95 },
    { name: "The Last of Us Part 2", graphics: 97, gameplay: 91, story: 96, price: 40, multiplayer: 15, performance: 93, sound: 98, replayability: 70 },
    { name: "Halo Infinite", graphics: 88, gameplay: 92, story: 78, price: 60, multiplayer: 90, performance: 87, sound: 88, replayability: 85 },
    { name: "Call of Duty: Modern Warfare 2", graphics: 92, gameplay: 88, story: 75, price: 70, multiplayer: 95, performance: 88, sound: 90, replayability: 80 },
    { name: "Minecraft", graphics: 60, gameplay: 95, story: 40, price: 25, multiplayer: 98, performance: 99, sound: 75, replayability: 99 },
    { name: "FIFA 23", graphics: 88, gameplay: 82, story: 30, price: 70, multiplayer: 95, performance: 90, sound: 80, replayability: 85 },
    { name: "Fortnite", graphics: 85, gameplay: 88, story: 40, price: 0, multiplayer: 99, performance: 92, sound: 82, replayability: 88 },
    { name: "Apex Legends", graphics: 88, gameplay: 92, story: 45, price: 0, multiplayer: 98, performance: 91, sound: 87, replayability: 88 },
    { name: "Spider-Man Miles Morales", graphics: 96, gameplay: 91, story: 90, price: 50, multiplayer: 10, performance: 94, sound: 92, replayability: 72 },
    { name: "Horizon Forbidden West", graphics: 97, gameplay: 90, story: 88, price: 60, multiplayer: 10, performance: 93, sound: 90, replayability: 78 },
    { name: "Ghost of Tsushima", graphics: 95, gameplay: 88, story: 87, price: 40, multiplayer: 30, performance: 90, sound: 91, replayability: 75 },
    { name: "Dark Souls 3", graphics: 85, gameplay: 94, story: 82, price: 30, multiplayer: 55, performance: 82, sound: 88, replayability: 88 },
    { name: "Sekiro", graphics: 88, gameplay: 96, story: 84, price: 40, multiplayer: 10, performance: 85, sound: 89, replayability: 82 },
    { name: "Doom Eternal", graphics: 92, gameplay: 96, story: 72, price: 40, multiplayer: 40, performance: 95, sound: 93, replayability: 82 },
    { name: "Battlefield 2042", graphics: 90, gameplay: 78, story: 50, price: 30, multiplayer: 88, performance: 80, sound: 87, replayability: 72 },
    { name: "Resident Evil Village", graphics: 93, gameplay: 88, story: 84, price: 40, multiplayer: 20, performance: 90, sound: 90, replayability: 72 },
    { name: "Assassin's Creed Valhalla", graphics: 91, gameplay: 84, story: 82, price: 40, multiplayer: 20, performance: 85, sound: 87, replayability: 80 },
    { name: "League of Legends", graphics: 80, gameplay: 90, story: 60, price: 0, multiplayer: 99, performance: 95, sound: 82, replayability: 95 },
    { name: "Valorant", graphics: 82, gameplay: 91, story: 40, price: 0, multiplayer: 98, performance: 96, sound: 84, replayability: 88 },
    // ===== NEW & RECENT GAMES =====
    { name: "Baldur's Gate 3", graphics: 94, gameplay: 98, story: 99, price: 60, multiplayer: 70, performance: 85, sound: 95, replayability: 99 },
    { name: "Alan Wake 2", graphics: 97, gameplay: 88, story: 95, price: 60, multiplayer: 10, performance: 82, sound: 94, replayability: 70 },
    { name: "Spider-Man 2", graphics: 98, gameplay: 94, story: 91, price: 70, multiplayer: 10, performance: 96, sound: 93, replayability: 75 },
    { name: "Starfield", graphics: 91, gameplay: 82, story: 80, price: 70, multiplayer: 10, performance: 78, sound: 86, replayability: 85 },
    { name: "Lies of P", graphics: 90, gameplay: 92, story: 86, price: 60, multiplayer: 10, performance: 88, sound: 87, replayability: 80 },
    { name: "Armored Core 6", graphics: 89, gameplay: 94, story: 82, price: 60, multiplayer: 50, performance: 90, sound: 88, replayability: 85 },
    { name: "Mortal Kombat 1", graphics: 95, gameplay: 90, story: 82, price: 70, multiplayer: 88, performance: 91, sound: 89, replayability: 82 },
    { name: "Street Fighter 6", graphics: 92, gameplay: 93, story: 75, price: 60, multiplayer: 92, performance: 93, sound: 87, replayability: 88 },
    { name: "Diablo 4", graphics: 93, gameplay: 85, story: 78, price: 70, multiplayer: 80, performance: 87, sound: 91, replayability: 82 },
    { name: "Hogwarts Legacy", graphics: 94, gameplay: 83, story: 82, price: 60, multiplayer: 10, performance: 80, sound: 88, replayability: 72 },

    // ===== ACTION & ADVENTURE =====
    { name: "Batman Arkham Knight", graphics: 92, gameplay: 93, story: 90, price: 20, multiplayer: 10, performance: 87, sound: 91, replayability: 78 },
    { name: "Batman Arkham City", graphics: 85, gameplay: 94, story: 92, price: 15, multiplayer: 10, performance: 90, sound: 89, replayability: 80 },
    { name: "Devil May Cry 5", graphics: 93, gameplay: 97, story: 80, price: 30, multiplayer: 10, performance: 95, sound: 93, replayability: 88 },
    { name: "Metal Gear Solid V", graphics: 91, gameplay: 95, story: 85, price: 20, multiplayer: 40, performance: 92, sound: 90, replayability: 88 },
    { name: "Death Stranding", graphics: 95, gameplay: 78, story: 88, price: 30, multiplayer: 30, performance: 90, sound: 93, replayability: 65 },
    { name: "Control", graphics: 90, gameplay: 86, story: 88, price: 25, multiplayer: 10, performance: 82, sound: 89, replayability: 70 },
    { name: "Returnal", graphics: 93, gameplay: 92, story: 82, price: 50, multiplayer: 20, performance: 91, sound: 90, replayability: 88 },
    { name: "Deathloop", graphics: 89, gameplay: 88, story: 84, price: 30, multiplayer: 40, performance: 87, sound: 88, replayability: 85 },

    // ===== RPG =====
    { name: "Dark Souls 1", graphics: 75, gameplay: 93, story: 85, price: 20, multiplayer: 55, performance: 78, sound: 87, replayability: 88 },
    { name: "Dark Souls 2", graphics: 78, gameplay: 88, story: 80, price: 20, multiplayer: 55, performance: 80, sound: 84, replayability: 82 },
    { name: "Bloodborne", graphics: 88, gameplay: 95, story: 88, price: 20, multiplayer: 40, performance: 80, sound: 92, replayability: 88 },
    { name: "Monster Hunter World", graphics: 90, gameplay: 93, story: 72, price: 30, multiplayer: 85, performance: 85, sound: 88, replayability: 92 },
    { name: "Dragon Age Inquisition", graphics: 82, gameplay: 84, story: 90, price: 15, multiplayer: 20, performance: 80, sound: 87, replayability: 85 },
    { name: "Mass Effect Legendary", graphics: 88, gameplay: 86, story: 97, price: 40, multiplayer: 10, performance: 87, sound: 92, replayability: 90 },
    { name: "Final Fantasy XVI", graphics: 95, gameplay: 88, story: 88, price: 60, multiplayer: 10, performance: 88, sound: 96, replayability: 70 },
    { name: "Final Fantasy VII Remake", graphics: 95, gameplay: 90, story: 90, price: 50, multiplayer: 10, performance: 91, sound: 97, replayability: 72 },
    { name: "Persona 5 Royal", graphics: 88, gameplay: 90, story: 96, price: 30, multiplayer: 10, performance: 92, sound: 97, replayability: 88 },

    // ===== SHOOTER =====
    { name: "Overwatch 2", graphics: 87, gameplay: 88, story: 45, price: 0, multiplayer: 96, performance: 94, sound: 85, replayability: 88 },
    { name: "Destiny 2", graphics: 90, gameplay: 88, story: 72, price: 0, multiplayer: 92, performance: 90, sound: 88, replayability: 85 },
    { name: "Rainbow Six Siege", graphics: 85, gameplay: 90, story: 30, price: 15, multiplayer: 96, performance: 90, sound: 86, replayability: 92 },
    { name: "Titanfall 2", graphics: 86, gameplay: 96, story: 82, price: 10, multiplayer: 85, performance: 93, sound: 88, replayability: 82 },
    { name: "Bioshock Infinite", graphics: 88, gameplay: 85, story: 96, price: 15, multiplayer: 10, performance: 87, sound: 92, replayability: 72 },
    { name: "Borderlands 3", graphics: 85, gameplay: 87, story: 72, price: 20, multiplayer: 85, performance: 88, sound: 84, replayability: 85 },

    // ===== CLASSIC & OLD GAMES =====
    { name: "GTA San Andreas", graphics: 55, gameplay: 92, story: 90, price: 10, multiplayer: 60, performance: 99, sound: 88, replayability: 95 },
    { name: "GTA Vice City", graphics: 50, gameplay: 88, story: 88, price: 10, multiplayer: 30, performance: 99, sound: 90, replayability: 88 },
    { name: "GTA III", graphics: 45, gameplay: 82, story: 80, price: 10, multiplayer: 20, performance: 99, sound: 82, replayability: 80 },
    { name: "Red Dead Redemption 1", graphics: 80, gameplay: 88, story: 95, price: 20, multiplayer: 55, performance: 85, sound: 93, replayability: 82 },
    { name: "The Last of Us Part 1", graphics: 95, gameplay: 88, story: 98, price: 50, multiplayer: 10, performance: 92, sound: 97, replayability: 72 },
    { name: "Uncharted 4", graphics: 95, gameplay: 88, story: 92, price: 20, multiplayer: 55, performance: 93, sound: 91, replayability: 72 },
    { name: "Uncharted 2", graphics: 82, gameplay: 90, story: 92, price: 15, multiplayer: 50, performance: 90, sound: 89, replayability: 75 },
    { name: "Halo 3", graphics: 78, gameplay: 93, story: 88, price: 10, multiplayer: 95, performance: 92, sound: 90, replayability: 90 },
    { name: "Halo 2", graphics: 72, gameplay: 91, story: 85, price: 10, multiplayer: 93, performance: 90, sound: 87, replayability: 88 },
    { name: "Call of Duty 4 Modern Warfare", graphics: 75, gameplay: 90, story: 88, price: 10, multiplayer: 93, performance: 95, sound: 88, replayability: 82 },
    { name: "Call of Duty Black Ops 2", graphics: 80, gameplay: 88, story: 85, price: 10, multiplayer: 93, performance: 93, sound: 86, replayability: 85 },
    { name: "Max Payne 3", graphics: 85, gameplay: 88, story: 88, price: 15, multiplayer: 55, performance: 88, sound: 90, replayability: 72 },
    { name: "Silent Hill 2", graphics: 60, gameplay: 80, story: 98, price: 15, multiplayer: 10, performance: 85, sound: 96, replayability: 75 },
    { name: "Resident Evil 4", graphics: 85, gameplay: 93, story: 82, price: 20, multiplayer: 10, performance: 92, sound: 88, replayability: 85 },
    { name: "Resident Evil 2 Remake", graphics: 92, gameplay: 90, story: 85, price: 25, multiplayer: 10, performance: 91, sound: 90, replayability: 80 },

    // ===== SPORTS & RACING =====
    { name: "FIFA 22", graphics: 86, gameplay: 81, story: 28, price: 30, multiplayer: 93, performance: 89, sound: 78, replayability: 83 },
    { name: "FIFA 21", graphics: 84, gameplay: 80, story: 25, price: 20, multiplayer: 91, performance: 88, sound: 76, replayability: 81 },
    { name: "NBA 2K23", graphics: 90, gameplay: 85, story: 60, price: 60, multiplayer: 88, performance: 87, sound: 82, replayability: 82 },
    { name: "Gran Turismo 7", graphics: 97, gameplay: 88, story: 55, price: 60, multiplayer: 75, performance: 92, sound: 90, replayability: 85 },
    { name: "Forza Horizon 5", graphics: 96, gameplay: 90, story: 55, price: 60, multiplayer: 85, performance: 90, sound: 88, replayability: 88 },
    { name: "Need for Speed Heat", graphics: 88, gameplay: 82, story: 65, price: 25, multiplayer: 75, performance: 85, sound: 82, replayability: 72 },

    // ===== INDIE & UNIQUE =====
    { name: "Hollow Knight", graphics: 82, gameplay: 93, story: 85, price: 15, multiplayer: 10, performance: 98, sound: 92, replayability: 88 },
    { name: "Celeste", graphics: 78, gameplay: 94, story: 88, price: 20, multiplayer: 10, performance: 99, sound: 90, replayability: 85 },
    { name: "Hades", graphics: 88, gameplay: 95, story: 88, price: 25, multiplayer: 10, performance: 99, sound: 93, replayability: 96 },
    { name: "Among Us", graphics: 55, gameplay: 82, story: 20, price: 5, multiplayer: 99, performance: 99, sound: 65, replayability: 88 },
    { name: "Fall Guys", graphics: 82, gameplay: 80, story: 20, price: 0, multiplayer: 96, performance: 92, sound: 78, replayability: 82 },
    { name: "It Takes Two", graphics: 88, gameplay: 92, story: 88, price: 25, multiplayer: 80, performance: 93, sound: 88, replayability: 72 },

    // ===== NINTENDO GAMES =====
    { name: "The Legend of Zelda Breath of the Wild", graphics: 93, gameplay: 98, story: 88, price: 60, multiplayer: 10, performance: 95, sound: 95, replayability: 92 },
    { name: "The Legend of Zelda Tears of the Kingdom", graphics: 94, gameplay: 99, story: 90, price: 70, multiplayer: 10, performance: 94, sound: 96, replayability: 95 },
    { name: "Super Mario Odyssey", graphics: 92, gameplay: 97, story: 75, price: 60, multiplayer: 30, performance: 99, sound: 93, replayability: 88 },
    { name: "Super Mario Bros Wonder", graphics: 93, gameplay: 95, story: 70, price: 60, multiplayer: 85, performance: 99, sound: 91, replayability: 85 },
    { name: "Mario Kart 8 Deluxe", graphics: 90, gameplay: 93, story: 30, price: 60, multiplayer: 98, performance: 99, sound: 89, replayability: 95 },
    { name: "Super Smash Bros Ultimate", graphics: 88, gameplay: 95, story: 60, price: 60, multiplayer: 99, performance: 99, sound: 93, replayability: 97 },
    { name: "Pokemon Legends Arceus", graphics: 78, gameplay: 88, story: 82, price: 60, multiplayer: 30, performance: 82, sound: 87, replayability: 85 },
    { name: "Pokemon Scarlet Violet", graphics: 80, gameplay: 85, story: 80, price: 60, multiplayer: 75, performance: 70, sound: 88, replayability: 82 },
    { name: "Metroid Dread", graphics: 88, gameplay: 93, story: 82, price: 60, multiplayer: 10, performance: 98, sound: 90, replayability: 82 },
    { name: "Kirby and the Forgotten Land", graphics: 88, gameplay: 88, story: 72, price: 60, multiplayer: 55, performance: 99, sound: 88, replayability: 75 },
    { name: "Splatoon 3", graphics: 88, gameplay: 88, story: 70, price: 60, multiplayer: 92, performance: 97, sound: 87, replayability: 85 },
    { name: "Fire Emblem Engage", graphics: 85, gameplay: 90, story: 78, price: 60, multiplayer: 10, performance: 97, sound: 88, replayability: 82 },
    { name: "Animal Crossing New Horizons", graphics: 88, gameplay: 82, story: 55, price: 60, multiplayer: 75, performance: 99, sound: 88, replayability: 88 },

    // ===== ASSASSIN'S CREED SERIES =====
    { name: "Assassin's Creed Origins", graphics: 92, gameplay: 86, story: 85, price: 20, multiplayer: 10, performance: 87, sound: 88, replayability: 78 },
    { name: "Assassin's Creed Odyssey", graphics: 93, gameplay: 87, story: 84, price: 20, multiplayer: 10, performance: 86, sound: 87, replayability: 82 },
    { name: "Assassin's Creed Black Flag", graphics: 82, gameplay: 88, story: 86, price: 15, multiplayer: 45, performance: 88, sound: 88, replayability: 82 },
    { name: "Assassin's Creed 2", graphics: 72, gameplay: 87, story: 88, price: 10, multiplayer: 10, performance: 90, sound: 85, replayability: 78 },
    { name: "Assassin's Creed Mirage", graphics: 90, gameplay: 82, story: 80, price: 50, multiplayer: 10, performance: 88, sound: 85, replayability: 68 },

    // ===== CALL OF DUTY SERIES =====
    { name: "Call of Duty Black Ops", graphics: 78, gameplay: 87, story: 85, price: 10, multiplayer: 92, performance: 93, sound: 86, replayability: 83 },
    { name: "Call of Duty Black Ops 3", graphics: 85, gameplay: 86, story: 78, price: 15, multiplayer: 90, performance: 91, sound: 86, replayability: 82 },
    { name: "Call of Duty Black Ops Cold War", graphics: 88, gameplay: 85, story: 80, price: 40, multiplayer: 88, performance: 89, sound: 86, replayability: 78 },
    { name: "Call of Duty Warzone", graphics: 88, gameplay: 85, story: 20, price: 0, multiplayer: 96, performance: 85, sound: 85, replayability: 85 },
    { name: "Call of Duty Infinite Warfare", graphics: 86, gameplay: 84, story: 82, price: 15, multiplayer: 82, performance: 89, sound: 85, replayability: 72 },
    { name: "Call of Duty WW2", graphics: 87, gameplay: 84, story: 82, price: 20, multiplayer: 86, performance: 89, sound: 87, replayability: 72 },
    { name: "Call of Duty Ghosts", graphics: 82, gameplay: 82, story: 72, price: 10, multiplayer: 83, performance: 90, sound: 83, replayability: 68 },

    // ===== BATTLEFIELD SERIES =====
    { name: "Battlefield 1", graphics: 93, gameplay: 87, story: 82, price: 15, multiplayer: 92, performance: 86, sound: 95, replayability: 82 },
    { name: "Battlefield 4", graphics: 87, gameplay: 88, story: 72, price: 10, multiplayer: 93, performance: 88, sound: 90, replayability: 85 },
    { name: "Battlefield V", graphics: 91, gameplay: 85, story: 78, price: 15, multiplayer: 88, performance: 86, sound: 92, replayability: 78 },
    { name: "Battlefield 3", graphics: 82, gameplay: 87, story: 75, price: 10, multiplayer: 92, performance: 88, sound: 89, replayability: 82 },

    // ===== HORROR GAMES =====
    { name: "Resident Evil 3 Remake", graphics: 91, gameplay: 86, story: 78, price: 25, multiplayer: 20, performance: 91, sound: 88, replayability: 68 },
    { name: "Resident Evil 7", graphics: 88, gameplay: 88, story: 85, price: 20, multiplayer: 10, performance: 90, sound: 90, replayability: 72 },
    { name: "Silent Hill Remake", graphics: 90, gameplay: 82, story: 92, price: 50, multiplayer: 10, performance: 85, sound: 94, replayability: 72 },
    { name: "Dead Space Remake", graphics: 93, gameplay: 90, story: 88, price: 60, multiplayer: 10, performance: 89, sound: 93, replayability: 75 },
    { name: "Dead Space 2", graphics: 80, gameplay: 90, story: 85, price: 15, multiplayer: 30, performance: 88, sound: 90, replayability: 75 },
    { name: "Outlast", graphics: 78, gameplay: 80, story: 82, price: 10, multiplayer: 10, performance: 92, sound: 90, replayability: 65 },
    { name: "Amnesia The Dark Descent", graphics: 72, gameplay: 82, story: 88, price: 10, multiplayer: 10, performance: 93, sound: 92, replayability: 65 },
    { name: "Little Nightmares 2", graphics: 88, gameplay: 82, story: 85, price: 25, multiplayer: 10, performance: 93, sound: 90, replayability: 68 },
    { name: "Five Nights at Freddys", graphics: 65, gameplay: 78, story: 80, price: 10, multiplayer: 10, performance: 97, sound: 85, replayability: 72 },

    // ===== FIGHTING GAMES =====
    { name: "Mortal Kombat 11", graphics: 94, gameplay: 90, story: 85, price: 30, multiplayer: 88, performance: 92, sound: 88, replayability: 82 },
    { name: "Mortal Kombat X", graphics: 88, gameplay: 88, story: 82, price: 15, multiplayer: 85, performance: 90, sound: 86, replayability: 80 },
    { name: "Tekken 7", graphics: 88, gameplay: 90, story: 78, price: 20, multiplayer: 88, performance: 91, sound: 85, replayability: 85 },
    { name: "Tekken 8", graphics: 95, gameplay: 93, story: 82, price: 60, multiplayer: 90, performance: 92, sound: 88, replayability: 87 },
    { name: "Street Fighter 5", graphics: 85, gameplay: 88, story: 68, price: 15, multiplayer: 88, performance: 91, sound: 83, replayability: 82 },
    { name: "Dragon Ball FighterZ", graphics: 92, gameplay: 88, story: 78, price: 20, multiplayer: 85, performance: 93, sound: 88, replayability: 80 },
    { name: "Guilty Gear Strive", graphics: 93, gameplay: 90, story: 75, price: 40, multiplayer: 85, performance: 93, sound: 90, replayability: 82 },

    // ===== OPEN WORLD =====
    { name: "Days Gone", graphics: 90, gameplay: 85, story: 85, price: 20, multiplayer: 10, performance: 85, sound: 87, replayability: 72 },
    { name: "Watch Dogs 2", graphics: 87, gameplay: 84, story: 80, price: 15, multiplayer: 65, performance: 84, sound: 82, replayability: 75 },
    { name: "Just Cause 4", graphics: 85, gameplay: 80, story: 65, price: 15, multiplayer: 10, performance: 82, sound: 78, replayability: 70 },
    { name: "Far Cry 5", graphics: 88, gameplay: 84, story: 80, price: 20, multiplayer: 55, performance: 86, sound: 83, replayability: 75 },
    { name: "Far Cry 6", graphics: 90, gameplay: 83, story: 78, price: 30, multiplayer: 55, performance: 85, sound: 83, replayability: 72 },
    { name: "Mafia Definitive Edition", graphics: 88, gameplay: 82, story: 90, price: 25, multiplayer: 10, performance: 85, sound: 87, replayability: 72 },
    { name: "Sleeping Dogs", graphics: 78, gameplay: 86, story: 85, price: 10, multiplayer: 10, performance: 88, sound: 83, replayability: 75 },
    { name: "Saints Row 4", graphics: 75, gameplay: 85, story: 78, price: 10, multiplayer: 55, performance: 90, sound: 78, replayability: 75 },
    { name: "Rage 2", graphics: 87, gameplay: 82, story: 65, price: 15, multiplayer: 10, performance: 88, sound: 80, replayability: 65 },

    // ===== STRATEGY =====
    { name: "Civilization VI", graphics: 80, gameplay: 92, story: 55, price: 30, multiplayer: 75, performance: 88, sound: 82, replayability: 97 },
    { name: "XCOM 2", graphics: 82, gameplay: 92, story: 80, price: 20, multiplayer: 10, performance: 84, sound: 83, replayability: 92 },
    { name: "Total War Warhammer 3", graphics: 88, gameplay: 90, story: 72, price: 60, multiplayer: 65, performance: 78, sound: 85, replayability: 92 },
    { name: "Age of Empires 4", graphics: 83, gameplay: 88, story: 70, price: 40, multiplayer: 80, performance: 85, sound: 82, replayability: 90 },
    { name: "Starcraft 2", graphics: 80, gameplay: 93, story: 80, price: 0, multiplayer: 95, performance: 93, sound: 86, replayability: 92 },

    // ===== SURVIVAL =====
    { name: "Subnautica", graphics: 88, gameplay: 90, story: 85, price: 25, multiplayer: 10, performance: 82, sound: 90, replayability: 80 },
    { name: "The Forest", graphics: 82, gameplay: 86, story: 78, price: 15, multiplayer: 70, performance: 84, sound: 80, replayability: 78 },
    { name: "Valheim", graphics: 78, gameplay: 88, story: 65, price: 20, multiplayer: 85, performance: 88, sound: 82, replayability: 85 },
    { name: "Rust", graphics: 80, gameplay: 82, story: 20, price: 35, multiplayer: 95, performance: 75, sound: 75, replayability: 88 },
    { name: "DayZ", graphics: 78, gameplay: 78, story: 20, price: 35, multiplayer: 92, performance: 72, sound: 72, replayability: 82 },
    { name: "ARK Survival Evolved", graphics: 82, gameplay: 80, story: 55, price: 20, multiplayer: 88, performance: 68, sound: 78, replayability: 85 },
    { name: "Green Hell", graphics: 82, gameplay: 84, story: 78, price: 25, multiplayer: 65, performance: 82, sound: 82, replayability: 75 },

    // ===== PLATFORMER =====
    { name: "Crash Bandicoot 4", graphics: 90, gameplay: 88, story: 72, price: 40, multiplayer: 30, performance: 96, sound: 87, replayability: 78 },
    { name: "Ratchet and Clank Rift Apart", graphics: 98, gameplay: 90, story: 82, price: 60, multiplayer: 10, performance: 97, sound: 90, replayability: 72 },
    { name: "Ori and the Will of the Wisps", graphics: 93, gameplay: 90, story: 85, price: 30, multiplayer: 10, performance: 97, sound: 95, replayability: 78 },
    { name: "Cuphead", graphics: 95, gameplay: 88, story: 70, price: 20, multiplayer: 50, performance: 99, sound: 93, replayability: 80 },
    { name: "A Hat in Time", graphics: 82, gameplay: 88, story: 75, price: 30, multiplayer: 40, performance: 97, sound: 87, replayability: 78 },

    // ===== SIMULATION =====
    { name: "Cities Skylines", graphics: 82, gameplay: 88, story: 20, price: 30, multiplayer: 10, performance: 78, sound: 75, replayability: 95 },
    { name: "The Sims 4", graphics: 80, gameplay: 82, story: 30, price: 0, multiplayer: 30, performance: 85, sound: 75, replayability: 92 },
    { name: "Planet Zoo", graphics: 88, gameplay: 86, story: 30, price: 45, multiplayer: 10, performance: 78, sound: 80, replayability: 90 },
    { name: "Two Point Hospital", graphics: 82, gameplay: 86, story: 55, price: 35, multiplayer: 10, performance: 88, sound: 80, replayability: 88 },

    // ===== CLASSIC PS2 ERA =====
    { name: "Shadow of the Colossus", graphics: 70, gameplay: 88, story: 92, price: 20, multiplayer: 10, performance: 85, sound: 93, replayability: 78 },
    { name: "God of War 1", graphics: 65, gameplay: 90, story: 88, price: 15, multiplayer: 10, performance: 90, sound: 87, replayability: 78 },
    { name: "God of War 2", graphics: 68, gameplay: 92, story: 88, price: 15, multiplayer: 10, performance: 90, sound: 88, replayability: 80 },
    { name: "Devil May Cry 3", graphics: 65, gameplay: 93, story: 82, price: 15, multiplayer: 10, performance: 92, sound: 88, replayability: 85 },
    { name: "Kingdom Hearts 2", graphics: 68, gameplay: 90, story: 85, price: 20, multiplayer: 10, performance: 92, sound: 90, replayability: 82 },
    { name: "Ico", graphics: 62, gameplay: 82, story: 88, price: 15, multiplayer: 10, performance: 90, sound: 88, replayability: 70 },

    // ===== ANIME GAMES =====
    { name: "Dragon Ball Z Kakarot", graphics: 88, gameplay: 80, story: 82, price: 30, multiplayer: 10, performance: 87, sound: 87, replayability: 70 },
    { name: "Naruto Ultimate Ninja Storm 4", graphics: 88, gameplay: 85, story: 85, price: 20, multiplayer: 82, performance: 88, sound: 86, replayability: 78 },
    { name: "One Piece Odyssey", graphics: 85, gameplay: 78, story: 82, price: 60, multiplayer: 10, performance: 85, sound: 85, replayability: 65 },
    { name: "Attack on Titan 2", graphics: 82, gameplay: 82, story: 80, price: 25, multiplayer: 50, performance: 85, sound: 83, replayability: 72 },
    { name: "Demon Slayer Hinokami Chronicles", graphics: 90, gameplay: 80, story: 78, price: 40, multiplayer: 75, performance: 88, sound: 87, replayability: 70 },
    { name: "Blue Protocol", graphics: 88, gameplay: 80, story: 72, price: 0, multiplayer: 88, performance: 82, sound: 85, replayability: 75 },
];

// ============ TRANSLATIONS ============
const translations = {
    en: {
        tagline: "The Ultimate Game Battle Arena",
        uploadOrSearch: "Upload image or search",
        searchPlaceholder: "Type game name...",
        compareBtn: "⚔️ START BATTLE",
        winnerTitle: "WINNER",
        statsTitle: "📊 BATTLE STATS",
        verdictTitle: "🏆 FINAL VERDICT",
        categories: {
            graphics: "Graphics",
            gameplay: "Gameplay",
            story: "Story",
            price: "Value/Price",
            multiplayer: "Multiplayer",
            performance: "Performance",
            sound: "Sound",
            replayability: "Replayability"
        },
        verdict: (w, l) => `${w} dominates ${l} in this epic battle. With superior scores across multiple categories, ${w} proves itself as the ultimate gaming experience. The combination of outstanding performance and player satisfaction makes ${w} the clear champion.`,
        winnerReason: (w, cat) => `${w} wins with exceptional ${cat} and overall superior gaming experience!`
    },
    fr: {
        tagline: "L'Arène Ultime des Jeux Vidéo",
        uploadOrSearch: "Télécharger une image ou rechercher",
        searchPlaceholder: "Tapez le nom du jeu...",
        compareBtn: "⚔️ LANCER LA BATAILLE",
        winnerTitle: "GAGNANT",
        statsTitle: "📊 STATISTIQUES",
        verdictTitle: "🏆 VERDICT FINAL",
        categories: {
            graphics: "Graphismes",
            gameplay: "Gameplay",
            story: "Histoire",
            price: "Prix/Valeur",
            multiplayer: "Multijoueur",
            performance: "Performance",
            sound: "Son",
            replayability: "Rejouabilité"
        },
        verdict: (w, l) => `${w} domine ${l} dans cette bataille épique. Avec des scores supérieurs dans plusieurs catégories, ${w} se révèle être l'expérience de jeu ultime. La combinaison de performances exceptionnelles fait de ${w} le champion incontesté.`,
        winnerReason: (w, cat) => `${w} gagne grâce à un ${cat} exceptionnel et une expérience de jeu globalement supérieure!`
    },
    ar: {
        tagline: "الساحة الملحمية لمقارنة الألعاب",
        uploadOrSearch: "ارفع صورة أو ابحث",
        searchPlaceholder: "اكتب اسم اللعبة...",
        compareBtn: "⚔️ ابدأ المعركة",
        winnerTitle: "الفائز",
        statsTitle: "📊 إحصائيات المعركة",
        verdictTitle: "🏆 الحكم النهائي",
        categories: {
            graphics: "الرسومات",
            gameplay: "طريقة اللعب",
            story: "القصة",
            price: "السعر/القيمة",
            multiplayer: "اللعب الجماعي",
            performance: "الأداء",
            sound: "الصوت",
            replayability: "قابلية الإعادة"
        },
        verdict: (w, l) => `${w} تتفوق على ${l} في هذه المعركة الملحمية. بتحقيق درجات متفوقة في فئات متعددة، تثبت ${w} أنها تجربة الألعاب المثالية. الجمع بين الأداء المتميز ورضا اللاعبين يجعل ${w} البطل الواضح.`,
        winnerReason: (w, cat) => `${w} تفوز بفضل ${cat} الاستثنائي وتجربة اللعب المتفوقة بشكل عام!`
    }
};

// ============ STATE ============
let currentLang = 'en';
let selectedGame1 = null;
let selectedGame2 = null;
let radarChartInstance = null;

// ============ LANGUAGE ============
function setLang(lang) {
    currentLang = lang;

    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.lang-btn').forEach(b => {
        if (b.textContent.trim() === lang.toUpperCase()) {
            b.classList.add('active');
        }
    });

    if (lang === 'ar') {
        document.body.classList.add('rtl');
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
    } else {
        document.body.classList.remove('rtl');
        document.documentElement.lang = lang;
        document.documentElement.dir = 'ltr';
    }

    const t = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] && typeof t[key] === 'string') {
            el.textContent = t[key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key] && typeof t[key] === 'string') {
            el.placeholder = t[key];
        }
    });
}

// ============ SUGGESTIONS ============
function showSuggestions(input, boxId) {
    const val = input.value.trim().toLowerCase();
    const box = document.getElementById(boxId);
    const isGame1 = boxId === 'suggestions1';

    if (val.length === 0) { box.style.display = 'none'; return; }

    const matches = gameDatabase.filter(g => g.name.toLowerCase().startsWith(val));

    if (matches.length === 0) { box.style.display = 'none'; return; }

    box.innerHTML = matches.map(g =>
        `<div class="suggestion-item" onmousedown="selectGame('${g.name}', ${isGame1 ? 1 : 2})">${g.name}</div>`
    ).join('');
    box.style.display = 'block';
}

function hideSuggestions(boxId) {
    setTimeout(() => {
        const box = document.getElementById(boxId);
        if (box) box.style.display = 'none';
    }, 200);
}

function selectGame(name, num) {
    const game = gameDatabase.find(g => g.name === name);
    if (num === 1) {
        selectedGame1 = game;
        document.getElementById('search1').value = name;
    } else {
        selectedGame2 = game;
        document.getElementById('search2').value = name;
    }
}

// ============ IMAGE PREVIEW ============
function previewImage(input, previewId) {
    const preview = document.getElementById(previewId);
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
            preview.src = e.target.result;
            preview.classList.add('show');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// ============ COMPARE ============
function compareGames() {
    playBattleSound();
    const name1 = document.getElementById('search1').value.trim();
    const name2 = document.getElementById('search2').value.trim();

    let game1 = selectedGame1 || gameDatabase.find(g => g.name.toLowerCase() === name1.toLowerCase());
    let game2 = selectedGame2 || gameDatabase.find(g => g.name.toLowerCase() === name2.toLowerCase());

    if (!game1 && name1) game1 = generateGameData(name1);
    if (!game2 && name2) game2 = generateGameData(name2);

    if (!game1 || !game2) {
        alert(currentLang === 'ar' ? 'يرجى إدخال اسمي اللعبتين!' :
              currentLang === 'fr' ? 'Veuillez entrer les deux noms de jeux!' :
              'Please enter both game names!');
        return;
    }

    const btn = document.getElementById('compareBtn');
    btn.querySelector('.btn-text').textContent = currentLang === 'ar' ? '⚡ جاري التحليل...' :
                                                  currentLang === 'fr' ? '⚡ Analyse...' : '⚡ ANALYZING...';
    btn.disabled = true;

    setTimeout(() => {
        showResults(game1, game2);
        btn.querySelector('.btn-text').textContent = translations[currentLang].compareBtn;
        btn.disabled = false;
    }, 1500);
}

function generateGameData(name) {
    const seed = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const r = (min, max) => min + (seed % (max - min));
    return {
        name,
        graphics: r(65, 98), gameplay: r(65, 97),
        story: r(55, 97), price: r(0, 70),
        multiplayer: r(20, 95), performance: r(70, 97),
        sound: r(65, 95), replayability: r(55, 95)
    };
}

// ============ SHOW RESULTS ============
async function showResults(game1, game2) {
    const t = translations[currentLang];
    const cats = ['graphics', 'gameplay', 'story', 'multiplayer', 'performance', 'sound', 'replayability'];

    const score1 = cats.reduce((s, c) => s + game1[c], 0);
    const score2 = cats.reduce((s, c) => s + game2[c], 0);
    const winner = score1 >= score2 ? game1 : game2;
    const loser = score1 >= score2 ? game2 : game1;

    const bestCat = cats.reduce((best, c) =>
        (winner[c] - loser[c]) > (winner[best] - loser[best]) ? c : best, cats[0]);

    document.getElementById('winnerName').textContent = winner.name;
    document.getElementById('winnerReason').textContent = t.winnerReason(winner.name, t.categories[bestCat]);

    const grid = document.getElementById('comparisonGrid');
    grid.innerHTML = cats.map(cat => `
        <div class="compare-row">
            <div class="compare-category">${t.categories[cat]}</div>
            <div class="compare-bars">
                <div class="bar-row">
                    <span class="bar-label" style="color:#ff2d55">${game1.name.split(' ')[0]}</span>
                    <div class="bar-track">
                        <div class="bar-fill red" style="width:${game1[cat]}%"></div>
                    </div>
                    <span class="bar-score" style="color:#ff2d55">${game1[cat]}</span>
                </div>
                <div class="bar-row">
                    <span class="bar-label" style="color:#00ff88">${game2.name.split(' ')[0]}</span>
                    <div class="bar-track">
                        <div class="bar-fill green" style="width:${game2[cat]}%"></div>
                    </div>
                    <span class="bar-score" style="color:#00ff88">${game2[cat]}</span>
                </div>
            </div>
        </div>
    `).join('');

    if (radarChartInstance) radarChartInstance.destroy();
    const ctx = document.getElementById('radarChart').getContext('2d');
    radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: cats.map(c => t.categories[c]),
            datasets: [
                {
                    label: game1.name,
                    data: cats.map(c => game1[c]),
                    borderColor: '#ff2d55',
                    backgroundColor: 'rgba(255,45,85,0.15)',
                    pointBackgroundColor: '#ff2d55',
                    borderWidth: 2
                },
                {
                    label: game2.name,
                    data: cats.map(c => game2[c]),
                    borderColor: '#00ff88',
                    backgroundColor: 'rgba(0,255,136,0.15)',
                    pointBackgroundColor: '#00ff88',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#fff', font: { family: 'Rajdhani', size: 14 } } } },
            scales: {
                r: {
                    min: 0, max: 100,
                    ticks: { color: 'rgba(255,255,255,0.3)', backdropColor: 'transparent' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    pointLabels: { color: '#a855f7', font: { family: 'Rajdhani', size: 13 } }
                }
            }
        }
    });

    currentBattle = `${game1.name} vs ${game2.name}`;

    playWinnerSound();
    const results = document.getElementById('results');
    results.style.display = 'block';
    results.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('resetBtn').style.display = 'block';

    const aiLoading = document.getElementById('aiLoading');
    const verdictText = document.getElementById('verdictText');
    aiLoading.style.display = 'flex';
    verdictText.textContent = '';

    try {
        const aiVerdict = await getAIVerdict(game1, game2, winner, cats, currentLang);
        aiLoading.style.display = 'none';
        typeWriterEffect(verdictText, aiVerdict);
    } catch (err) {
        aiLoading.style.display = 'none';
        verdictText.textContent = t.verdict(winner.name, loser.name);
    }
}

// ============ AI VERDICT ============
async function getAIVerdict(game1, game2, winner, cats, lang) {
    const statsText = cats.map(cat =>
        `${cat}: ${game1.name}=${game1[cat]} vs ${game2.name}=${game2[cat]}`
    ).join(', ');

    const langInstruction = lang === 'ar' ? 'Respond in Arabic.' :
                            lang === 'fr' ? 'Respond in French.' :
                            'Respond in English.';

    const prompt = `You are an expert game critic. Compare these two games and write an intelligent verdict.
Game 1: ${game1.name}
Game 2: ${game2.name}
Winner: ${winner.name}
Scores: ${statsText}
Write 3-4 sentences: declare winner, explain why based on scores, mention what loser does better, give recommendation.
${langInstruction}
Be enthusiastic, use gaming language, under 100 words, no markdown, no bullet points.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [{ role: 'user', content: prompt }]
        })
    });

    const data = await response.json();
    return data.content[0].text;
}

// ============ TYPEWRITER EFFECT ============
function typeWriterEffect(element, text) {
    element.textContent = '';
    element.classList.add('typing');
    let i = 0;
    const interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            element.classList.remove('typing');
        }
    }, 18);
}

// ============ PARTICLES ============
function createParticles() {
    const container = document.getElementById('particles');
    const colors = ['#7b2fff', '#ff2d55', '#00ff88', '#a855f7'];
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4 + 1;
        p.style.cssText = `
            width:${size}px; height:${size}px;
            left:${Math.random() * 100}%;
            background:${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration:${Math.random() * 15 + 10}s;
            animation-delay:${Math.random() * 10}s;
            opacity:0.6;
        `;
        container.appendChild(p);
    }
}

// ===== RESET BATTLE =====
function resetBattle() {
    const btn = document.getElementById('resetBtn');
    btn.textContent = '🔄 RESETTING...';
    btn.disabled = true;

    setTimeout(() => {
        document.getElementById('search1').value = '';
        document.getElementById('search2').value = '';
        selectedGame1 = null;
        selectedGame2 = null;

        const prev1 = document.getElementById('preview1');
        const prev2 = document.getElementById('preview2');
        prev1.src = ''; prev1.classList.remove('show');
        prev2.src = ''; prev2.classList.remove('show');

        document.getElementById('img1').value = '';
        document.getElementById('img2').value = '';
        document.getElementById('results').style.display = 'none';

        comments = [];
        renderComments();
        currentBattle = '';

        btn.style.display = 'none';
        btn.textContent = '🔄 RESET BATTLE';
        btn.disabled = false;

        window.scrollTo({ top: 0, behavior: 'smooth' });
        playHoverSound();

    }, 600);
}
// ===== END RESET BATTLE =====

// ===== COMMENT SECTION =====
let comments = [];
let selectedStars = 0;
let currentBattle = '';

document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star-opt');
    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const val = parseInt(star.dataset.val);
            stars.forEach(s => {
                s.classList.toggle('active', parseInt(s.dataset.val) <= val);
            });
        });
        star.addEventListener('mouseleave', () => {
            stars.forEach(s => {
                s.classList.toggle('active', parseInt(s.dataset.val) <= selectedStars);
            });
        });
        star.addEventListener('click', () => {
            selectedStars = parseInt(star.dataset.val);
            stars.forEach(s => {
                s.classList.toggle('active', parseInt(s.dataset.val) <= selectedStars);
            });
        });
    });

    const textarea = document.getElementById('commentText');
    if (textarea) {
        textarea.addEventListener('input', () => {
            document.getElementById('commentChars').textContent =
                textarea.value.length + '/300';
        });
    }
});

function submitComment() {
    const name = document.getElementById('commentName').value.trim();
    const text = document.getElementById('commentText').value.trim();

    if (!name) { alert('Please enter your name!'); return; }
    if (!text) { alert('Please write a comment!'); return; }
    if (selectedStars === 0) { alert('Please rate the battle!'); return; }

    const comment = {
        id: Date.now(),
        name,
        text,
        stars: selectedStars,
        battle: currentBattle || 'General',
        time: new Date().toLocaleDateString('en-US', {
            month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }),
        likes: 0,
        liked: false
    };

    comments.unshift(comment);
    renderComments();

    document.getElementById('commentName').value = '';
    document.getElementById('commentText').value = '';
    document.getElementById('commentChars').textContent = '0/300';
    selectedStars = 0;
    document.querySelectorAll('.star-opt').forEach(s => s.classList.remove('active'));

    document.getElementById('commentsList').scrollIntoView({ behavior: 'smooth' });
}

function renderComments() {
    const list = document.getElementById('commentsList');
    const count = document.getElementById('commentsCount');

    count.textContent = comments.length + (comments.length === 1 ? ' comment' : ' comments');

    if (comments.length === 0) {
        list.innerHTML = '<div class="no-comments" id="noComments"><p>🎮 Be the first to comment on this battle!</p></div>';
        return;
    }

    list.innerHTML = comments.map(c => `
        <div class="comment-card" id="comment-${c.id}">
            <div class="comment-card-top">
                <div class="comment-author">
                    <div class="comment-avatar">${c.name.charAt(0).toUpperCase()}</div>
                    <div>
                        <div class="comment-name">${c.name}</div>
                        <div class="comment-time">${c.time}</div>
                    </div>
                </div>
                <div class="comment-stars">${'⭐'.repeat(c.stars)}</div>
            </div>
            <div class="comment-text">${c.text}</div>
            <div class="comment-battle-tag">⚔️ ${c.battle}</div>
            <div class="comment-actions">
                <button class="comment-like-btn ${c.liked ? 'liked' : ''}"
                    onclick="likeComment(${c.id})">
                    👍 ${c.likes}
                </button>
                <button class="comment-delete-btn"
                    onclick="deleteComment(${c.id})">
                    🗑️ Delete
                </button>
            </div>
        </div>
    `).join('');
}

function likeComment(id) {
    const c = comments.find(c => c.id === id);
    if (!c) return;
    if (c.liked) {
        c.likes--;
        c.liked = false;
    } else {
        c.likes++;
        c.liked = true;
    }
    renderComments();
}

function deleteComment(id) {
    comments = comments.filter(c => c.id !== id);
    renderComments();
}
// ===== END COMMENT SECTION =====

// ===== GAME OF THE DAY =====
const gameImages = {
    "God of War": "https://shared.akamai.steamstatic.com/steam/apps/1593500/header.jpg",
    "God of War Ragnarok": "https://shared.akamai.steamstatic.com/steam/apps/2322010/header.jpg",
    "Red Dead Redemption 2": "https://shared.akamai.steamstatic.com/steam/apps/1174180/header.jpg",
    "The Witcher 3": "https://shared.akamai.steamstatic.com/steam/apps/292030/header.jpg",
    "Cyberpunk 2077": "https://shared.akamai.steamstatic.com/steam/apps/1091500/header.jpg",
    "Elden Ring": "https://shared.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
    "Grand Theft Auto V": "https://shared.akamai.steamstatic.com/steam/apps/271590/header.jpg",
    "The Last of Us Part 2": "https://shared.akamai.steamstatic.com/steam/apps/2531310/header.jpg",
    "Halo Infinite": "https://shared.akamai.steamstatic.com/steam/apps/1240440/header.jpg",
    "Call of Duty: Modern Warfare 2": "https://shared.akamai.steamstatic.com/steam/apps/1938090/header.jpg",
    "Minecraft": "https://shared.akamai.steamstatic.com/steam/apps/1672970/header.jpg",
    "FIFA 23": "https://shared.akamai.steamstatic.com/steam/apps/1811260/header.jpg",
    "Apex Legends": "https://shared.akamai.steamstatic.com/steam/apps/1172470/header.jpg",
    "Spider-Man Miles Morales": "https://shared.akamai.steamstatic.com/steam/apps/1817190/header.jpg",
    "Horizon Forbidden West": "https://shared.akamai.steamstatic.com/steam/apps/2420110/header.jpg",
    "Ghost of Tsushima": "https://shared.akamai.steamstatic.com/steam/apps/2215430/header.jpg",
    "Dark Souls 3": "https://shared.akamai.steamstatic.com/steam/apps/374320/header.jpg",
    "Sekiro": "https://shared.akamai.steamstatic.com/steam/apps/814380/header.jpg",
    "Doom Eternal": "https://shared.akamai.steamstatic.com/steam/apps/782330/header.jpg",
    "Battlefield 2042": "https://shared.akamai.steamstatic.com/steam/apps/1517290/header.jpg",
    "Resident Evil Village": "https://shared.akamai.steamstatic.com/steam/apps/1196590/header.jpg",
    "Assassin's Creed Valhalla": "https://shared.akamai.steamstatic.com/steam/apps/2208920/header.jpg",
    "Valorant": "https://shared.akamai.steamstatic.com/steam/apps/2694490/header.jpg",
    "Baldur's Gate 3": "https://shared.akamai.steamstatic.com/steam/apps/1086940/header.jpg",
    "Starfield": "https://shared.akamai.steamstatic.com/steam/apps/1716740/header.jpg",
    "Lies of P": "https://shared.akamai.steamstatic.com/steam/apps/1627720/header.jpg",
    "Armored Core 6": "https://shared.akamai.steamstatic.com/steam/apps/1888160/header.jpg",
    "Mortal Kombat 1": "https://shared.akamai.steamstatic.com/steam/apps/1971870/header.jpg",
    "Street Fighter 6": "https://shared.akamai.steamstatic.com/steam/apps/1364780/header.jpg",
    "Hogwarts Legacy": "https://shared.akamai.steamstatic.com/steam/apps/990080/header.jpg",
    "Batman Arkham Knight": "https://shared.akamai.steamstatic.com/steam/apps/208650/header.jpg",
    "Batman Arkham City": "https://shared.akamai.steamstatic.com/steam/apps/200260/header.jpg",
    "Devil May Cry 5": "https://shared.akamai.steamstatic.com/steam/apps/601150/header.jpg",
    "Metal Gear Solid V": "https://shared.akamai.steamstatic.com/steam/apps/287700/header.jpg",
    "Death Stranding": "https://shared.akamai.steamstatic.com/steam/apps/1190460/header.jpg",
    "Control": "https://shared.akamai.steamstatic.com/steam/apps/870780/header.jpg",
    "Returnal": "https://shared.akamai.steamstatic.com/steam/apps/1649240/header.jpg",
    "Deathloop": "https://shared.akamai.steamstatic.com/steam/apps/1252330/header.jpg",
    "Dark Souls 1": "https://shared.akamai.steamstatic.com/steam/apps/570940/header.jpg",
    "Dark Souls 2": "https://shared.akamai.steamstatic.com/steam/apps/335300/header.jpg",
    "Bloodborne": "https://image.api.playstation.com/vulcan/ap/rnd/202010/0616/aGaXDuSCm8PH8RFUCh1NWRR3.png",
    "Monster Hunter World": "https://shared.akamai.steamstatic.com/steam/apps/582010/header.jpg",
    "Dragon Age Inquisition": "https://shared.akamai.steamstatic.com/steam/apps/1222690/header.jpg",
    "Mass Effect Legendary": "https://shared.akamai.steamstatic.com/steam/apps/1328670/header.jpg",
    "Final Fantasy XVI": "https://shared.akamai.steamstatic.com/steam/apps/2515020/header.jpg",
    "Final Fantasy VII Remake": "https://shared.akamai.steamstatic.com/steam/apps/1462040/header.jpg",
    "Persona 5 Royal": "https://shared.akamai.steamstatic.com/steam/apps/1687950/header.jpg",
    "Overwatch 2": "https://shared.akamai.steamstatic.com/steam/apps/2357570/header.jpg",
    "Destiny 2": "https://shared.akamai.steamstatic.com/steam/apps/1085660/header.jpg",
    "Rainbow Six Siege": "https://shared.akamai.steamstatic.com/steam/apps/359550/header.jpg",
    "Titanfall 2": "https://shared.akamai.steamstatic.com/steam/apps/1237970/header.jpg",
    "Bioshock Infinite": "https://shared.akamai.steamstatic.com/steam/apps/8870/header.jpg",
    "Borderlands 3": "https://shared.akamai.steamstatic.com/steam/apps/397540/header.jpg",
    "GTA San Andreas": "https://shared.akamai.steamstatic.com/steam/apps/12120/header.jpg",
    "GTA Vice City": "https://shared.akamai.steamstatic.com/steam/apps/12110/header.jpg",
    "GTA III": "https://shared.akamai.steamstatic.com/steam/apps/12100/header.jpg",
    "Red Dead Redemption 1": "https://shared.akamai.steamstatic.com/steam/apps/1843870/header.jpg",
    "The Last of Us Part 1": "https://shared.akamai.steamstatic.com/steam/apps/1888930/header.jpg",
    "Uncharted 4": "https://shared.akamai.steamstatic.com/steam/apps/1659420/header.jpg",
    "Uncharted 2": "https://shared.akamai.steamstatic.com/steam/apps/2161580/header.jpg",
    "Halo 3": "https://shared.akamai.steamstatic.com/steam/apps/1064273/header.jpg",
    "Halo 2": "https://shared.akamai.steamstatic.com/steam/apps/1064272/header.jpg",
    "Call of Duty 4 Modern Warfare": "https://shared.akamai.steamstatic.com/steam/apps/7940/header.jpg",
    "Call of Duty Black Ops 2": "https://shared.akamai.steamstatic.com/steam/apps/202970/header.jpg",
    "Max Payne 3": "https://shared.akamai.steamstatic.com/steam/apps/204100/header.jpg",
    "Silent Hill 2": "https://shared.akamai.steamstatic.com/steam/apps/2358970/header.jpg",
    "Resident Evil 4": "https://shared.akamai.steamstatic.com/steam/apps/2050650/header.jpg",
    "Resident Evil 2 Remake": "https://shared.akamai.steamstatic.com/steam/apps/883710/header.jpg",
    "FIFA 22": "https://shared.akamai.steamstatic.com/steam/apps/1506830/header.jpg",
    "FIFA 21": "https://shared.akamai.steamstatic.com/steam/apps/1229490/header.jpg",
    "NBA 2K23": "https://shared.akamai.steamstatic.com/steam/apps/2229950/header.jpg",
    "Forza Horizon 5": "https://shared.akamai.steamstatic.com/steam/apps/1551360/header.jpg",
    "Need for Speed Heat": "https://shared.akamai.steamstatic.com/steam/apps/1222680/header.jpg",
    "Hollow Knight": "https://shared.akamai.steamstatic.com/steam/apps/367520/header.jpg",
    "Celeste": "https://shared.akamai.steamstatic.com/steam/apps/504230/header.jpg",
    "Hades": "https://shared.akamai.steamstatic.com/steam/apps/1145360/header.jpg",
    "Among Us": "https://shared.akamai.steamstatic.com/steam/apps/945360/header.jpg",
    "Fall Guys": "https://shared.akamai.steamstatic.com/steam/apps/1097150/header.jpg",
    "It Takes Two": "https://shared.akamai.steamstatic.com/steam/apps/1426210/header.jpg",
    "Assassin's Creed Origins": "https://shared.akamai.steamstatic.com/steam/apps/582160/header.jpg",
    "Assassin's Creed Odyssey": "https://shared.akamai.steamstatic.com/steam/apps/812140/header.jpg",
    "Assassin's Creed Black Flag": "https://shared.akamai.steamstatic.com/steam/apps/242050/header.jpg",
    "Assassin's Creed 2": "https://shared.akamai.steamstatic.com/steam/apps/33230/header.jpg",
    "Assassin's Creed Mirage": "https://shared.akamai.steamstatic.com/steam/apps/2538720/header.jpg",
    "Call of Duty Black Ops": "https://shared.akamai.steamstatic.com/steam/apps/42700/header.jpg",
    "Call of Duty Black Ops 3": "https://shared.akamai.steamstatic.com/steam/apps/311210/header.jpg",
    "Call of Duty Black Ops Cold War": "https://shared.akamai.steamstatic.com/steam/apps/1938090/header.jpg",
    "Call of Duty Warzone": "https://shared.akamai.steamstatic.com/steam/apps/1962660/header.jpg",
    "Call of Duty WW2": "https://shared.akamai.steamstatic.com/steam/apps/476600/header.jpg",
    "Call of Duty Ghosts": "https://shared.akamai.steamstatic.com/steam/apps/209160/header.jpg",
    "Battlefield 1": "https://shared.akamai.steamstatic.com/steam/apps/1238840/header.jpg",
    "Battlefield 4": "https://shared.akamai.steamstatic.com/steam/apps/1238820/header.jpg",
    "Battlefield V": "https://shared.akamai.steamstatic.com/steam/apps/1238810/header.jpg",
    "Battlefield 3": "https://shared.akamai.steamstatic.com/steam/apps/1238800/header.jpg",
    "Resident Evil 3 Remake": "https://shared.akamai.steamstatic.com/steam/apps/952060/header.jpg",
    "Resident Evil 7": "https://shared.akamai.steamstatic.com/steam/apps/418370/header.jpg",
    "Dead Space Remake": "https://shared.akamai.steamstatic.com/steam/apps/1693980/header.jpg",
    "Dead Space 2": "https://shared.akamai.steamstatic.com/steam/apps/47780/header.jpg",
    "Outlast": "https://shared.akamai.steamstatic.com/steam/apps/238320/header.jpg",
    "Little Nightmares 2": "https://shared.akamai.steamstatic.com/steam/apps/860510/header.jpg",
    "Mortal Kombat 11": "https://shared.akamai.steamstatic.com/steam/apps/976310/header.jpg",
    "Mortal Kombat X": "https://shared.akamai.steamstatic.com/steam/apps/307780/header.jpg",
    "Tekken 7": "https://shared.akamai.steamstatic.com/steam/apps/389730/header.jpg",
    "Tekken 8": "https://shared.akamai.steamstatic.com/steam/apps/1778820/header.jpg",
    "Street Fighter 5": "https://shared.akamai.steamstatic.com/steam/apps/310950/header.jpg",
    "Dragon Ball FighterZ": "https://shared.akamai.steamstatic.com/steam/apps/678950/header.jpg",
    "Guilty Gear Strive": "https://shared.akamai.steamstatic.com/steam/apps/1384160/header.jpg",
    "Days Gone": "https://shared.akamai.steamstatic.com/steam/apps/1259420/header.jpg",
    "Far Cry 5": "https://shared.akamai.steamstatic.com/steam/apps/552520/header.jpg",
    "Far Cry 6": "https://shared.akamai.steamstatic.com/steam/apps/2369390/header.jpg",
    "Mafia Definitive Edition": "https://shared.akamai.steamstatic.com/steam/apps/1030840/header.jpg",
    "Sleeping Dogs": "https://shared.akamai.steamstatic.com/steam/apps/202170/header.jpg",
    "Civilization VI": "https://shared.akamai.steamstatic.com/steam/apps/289070/header.jpg",
    "XCOM 2": "https://shared.akamai.steamstatic.com/steam/apps/268500/header.jpg",
    "Age of Empires 4": "https://shared.akamai.steamstatic.com/steam/apps/1466860/header.jpg",
    "Subnautica": "https://shared.akamai.steamstatic.com/steam/apps/264710/header.jpg",
    "The Forest": "https://shared.akamai.steamstatic.com/steam/apps/242760/header.jpg",
    "Valheim": "https://shared.akamai.steamstatic.com/steam/apps/892970/header.jpg",
    "Rust": "https://shared.akamai.steamstatic.com/steam/apps/252490/header.jpg",
    "ARK Survival Evolved": "https://shared.akamai.steamstatic.com/steam/apps/346110/header.jpg",
    "Crash Bandicoot 4": "https://shared.akamai.steamstatic.com/steam/apps/1374190/header.jpg",
    "Ratchet and Clank Rift Apart": "https://shared.akamai.steamstatic.com/steam/apps/1895840/header.jpg",
    "Ori and the Will of the Wisps": "https://shared.akamai.steamstatic.com/steam/apps/1057090/header.jpg",
    "Cuphead": "https://shared.akamai.steamstatic.com/steam/apps/268910/header.jpg",
    "Cities Skylines": "https://shared.akamai.steamstatic.com/steam/apps/255710/header.jpg",
    "The Sims 4": "https://shared.akamai.steamstatic.com/steam/apps/1222670/header.jpg",
    "Shadow of the Colossus": "https://image.api.playstation.com/vulcan/ap/rnd/202010/0222/niMUubkwQ7TzMWFDGpXCOSjP.png",
    "Kingdom Hearts 2": "https://shared.akamai.steamstatic.com/steam/apps/2552430/header.jpg",
    "Dragon Ball Z Kakarot": "https://shared.akamai.steamstatic.com/steam/apps/1040500/header.jpg",
    "Naruto Ultimate Ninja Storm 4": "https://shared.akamai.steamstatic.com/steam/apps/349040/header.jpg",
    "Attack on Titan 2": "https://shared.akamai.steamstatic.com/steam/apps/691020/header.jpg",
    "Demon Slayer Hinokami Chronicles": "https://shared.akamai.steamstatic.com/steam/apps/1490400/header.jpg",
};

// ✅ SINGLE getGameImage function — no duplicate
function getGameImage(gameName) {
    if (gameImages[gameName]) return gameImages[gameName];
    const colors = ['7b2fff', 'ff2d55', '00ff88', 'a855f7', 'ff6b35'];
    const color = colors[gameName.length % colors.length];
    const encodedName = encodeURIComponent(gameName);
    return `https://placehold.co/400x300/${color}/ffffff?text=${encodedName}&font=orbitron`;
}

function getGameOfTheDay() {
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const seed = dateStr.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const index = seed % gameDatabase.length;
    return gameDatabase[index];
}

function initGameOfTheDay() {
    const game = getGameOfTheDay();

    const today = new Date();
    document.getElementById('gotdDate').textContent = today.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric',
        month: 'long', day: 'numeric'
    });

    document.getElementById('gotdTitle').textContent = game.name;

    const img = document.getElementById('gotdImage');
    const imageSrc = getGameImage(game.name);
    img.src = imageSrc;
    img.onerror = () => {
        img.src = `https://placehold.co/400x300/7b2fff/ffffff?text=${encodeURIComponent(game.name)}&font=orbitron`;
    };

    const statsEl = document.getElementById('gotdStats');
    statsEl.innerHTML = `
        <div class="gotd-stat">🎨 Graphics <span>${game.graphics}</span></div>
        <div class="gotd-stat">🕹️ Gameplay <span>${game.gameplay}</span></div>
        <div class="gotd-stat">📖 Story <span>${game.story}</span></div>
        <div class="gotd-stat">🔊 Sound <span>${game.sound}</span></div>
        <div class="gotd-stat">💰 Price <span>$${game.price}</span></div>
        <div class="gotd-stat">🔄 Replay <span>${game.replayability}</span></div>
    `;

    document.getElementById('gotdBattleBtn').onclick = () => {
        selectedGame1 = game;
        document.getElementById('search1').value = game.name;
        document.querySelector('.main-container').scrollIntoView({ behavior: 'smooth' });
        playHoverSound();
    };
}
// ===== END GAME OF THE DAY =====

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setLang('en');
    initGameOfTheDay();
});