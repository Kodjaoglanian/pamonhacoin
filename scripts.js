document.addEventListener('DOMContentLoaded', function() {
    const cardData = [
        { title: "Identidade brasileira e o apelo cultural", content: "" },
        { title: "Implementada na blockchain Solana", content: "" },
        { title: "Baixas taxas de transação e velocidade", content: "" },
        { title: "Escalabilidade e sustentabilidade", content: "" },
        { title: "Comunidade ativa", content: "" },
        { title: "Criadores do token precisam comprar moedas como todas as outras pessoas", content: "" },
        { title: "Tokenomics protegido pelo sistema da Pump.fun", content: "Os criadores não podem criar tokens novos para eles mesmos, \"no rug pulls\"" },
        { title: "Lançamento há 19 dias", content: "" },
        { title: "Base de holders 220+", content: "" },
        { title: "17% de atingimento na bonding curve da Pump Fun", content: "" },
        { title: "74 transações realizadas com valor maior que 0,05 SOL", content: "" },
        { title: "Volume diário superior a $400", content: "" },
        { title: "Market Cap $8,5k", content: "" },
        { title: "Supply de 1Bi tokens", content: "" },
        { title: "Sem concentração de tokens em 1 holder", content: "" },
        { title: "Comunidade aberta e em crescimento acelerado", content: "Somos mais de 260 PAMONHEIRO$!" }
    ];
    let currentIndex = 0;
    const cardTitle = document.getElementById('card-title');
    const cardContent = document.getElementById('card-content');

    function updateCard() {
        const data = cardData[currentIndex];
        
        // Adicionar classe de fade-out
        cardTitle.classList.add('fade-out');
        cardContent.classList.add('fade-out');
        
        // Remover o conteúdo após a animação de fade-out
        setTimeout(() => {
            cardTitle.textContent = data.title;
            cardContent.textContent = data.content;
            
            // Remover classe de fade-out e adicionar classe de fade-in
            cardTitle.classList.remove('fade-out');
            cardContent.classList.remove('fade-out');
            cardTitle.classList.add('fade-in');
            cardContent.classList.add('fade-in');
        }, 500); // Tempo igual ao da animação de fade-out
        
        // Remover a classe de fade-in após a animação
        setTimeout(() => {
            cardTitle.classList.remove('fade-in');
            cardContent.classList.remove('fade-in');
        }, 1000); // Tempo total que inclui fade-out e fade-in

        currentIndex = (currentIndex + 1) % cardData.length;
    }

    updateCard();
    setInterval(updateCard, 3000);

    // Initialize AOS
    AOS.init({
        duration: 1000, // Animation duration
        easing: 'ease-in-out', // Easing option
        once: true, // Whether animation should happen only once
    });

    // Computer Screen Simulation
    const canvas = document.getElementById('blockchainCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Generate random hash
    function generateHash() {
        const chars = '0123456789abcdef';
        let hash = '';
        for (let i = 0; i < 64; i++) {
            hash += chars[Math.floor(Math.random() * chars.length)];
        }
        return hash;
    }

    // Hash class
    class Hash {
        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height;
            this.text = generateHash();
            this.speed = 2;
        }

        draw() {
            ctx.font = '16px Courier New';
            ctx.fillStyle = '#77DD77';
            ctx.textAlign = 'center';
            ctx.fillText(this.text, this.x, this.y);
        }

        update() {
            this.y -= this.speed;
        }

        isOffScreen() {
            return this.y < 0;
        }
    }

    const hashes = [];
    const hashInterval = 500; // Every 0.5 seconds

    // Generate hashes at intervals
    setInterval(() => {
        const hash = new Hash();
        hashes.push(hash);
    }, hashInterval);

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw hashes
        for (let i = hashes.length - 1; i >= 0; i--) {
            const hash = hashes[i];
            hash.draw();
            hash.update();
            if (hash.isOffScreen()) {
                hashes.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
});