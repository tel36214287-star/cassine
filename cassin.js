const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
  ];
  
  const resultText = document.getElementById('result');
  const spinCountElement = document.getElementById('spin-count');
  let spinCount = 0;
  
  // Suas imagens locais
  const symbols = [
    '09894c95f0708a1122490df324eb4ecf.png',
    'OIP.webp',
    'png-clipart-jack-of-spade-skat-playing-card-jack-standard-52-card-deck-suit-card-king-text-thumbnail.png',
    'png-transparent-queen-of-spades-playing-card-king-queen-game-king-queen.png',
    'pngtree-playing-card-king-risk-shape-spades-png-image_11785150.png'
  ];
  
  function spin() {
    spinCount++;
    spinCountElement.textContent = spinCount;
    resultText.textContent = ''; // limpa resultado
    const spinDuration = 1000; // tempo do giro em ms
  
    // Gira os rolos por 1s
    reels.forEach((reel, index) => {
      let interval = setInterval(() => {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        reel.innerHTML = `<img src="${randomSymbol}" alt="símbolo">`;
      }, 100);
  
      // Para o rolo em momentos diferentes
      setTimeout(() => {
        clearInterval(interval);
        const finalSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        reel.innerHTML = `<img src="${finalSymbol}" alt="símbolo">`;
  
        // Verifica resultado quando todos os rolos pararem
        if (index === reels.length - 1) {
          setTimeout(checkResult, 100); // pequeno delay para garantir que todos pararam
        }
      }, spinDuration + index * 300); // cada rolo para um pouco depois do anterior
    });
  }
  
  function checkResult() {
    const finalSymbols = reels.map(reel => reel.querySelector('img').src);
    const first = finalSymbols[0];
    const win = finalSymbols.every(symbol => symbol === first);
  
    resultText.textContent = win ? '🎉 WIN! 🎉' : '❌ LOSER ❌';
  }
  
  document.getElementById('spin').addEventListener('click', spin);
