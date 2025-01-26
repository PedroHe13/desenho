let selectedColor = "white"; // Cor inicial
let brushSize = 20; // Tamanho inicial do pincel
let isEraserActive = false; // Estado inicial da borracha
let bgMusic; // Variável para armazenar a música de fundo

function preload() {
  // Carregar o arquivo de áudio
  bgMusic = loadSound("OMFG - Hello(MP3_160K).mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Canvas ajustado ao tamanho da tela
  background("black");

  // Esperar o clique do usuário para começar a música
  let playButton = createButton('Clique para começar a música');
  playButton.position(10, height - 50); // Posicionar botão na tela
  playButton.mousePressed(startMusic); // Iniciar música quando clicado
  playButton.style('font-size', '20px');
  playButton.style('padding', '10px');
  playButton.style('background-color', '#4CAF50');
  playButton.style('color', 'white');
  playButton.style('border', 'none');
  playButton.style('cursor', 'pointer');
}

function startMusic() {
  bgMusic.loop(); // Toca em loop contínuo
  this.remove(); // Remove o botão após o clique
}

function draw() {
  // Desenhar barra de cores na parte inferior
  drawColorBar();

  // Desenhar formas ao clicar no mouse
  if (mouseIsPressed && mouseY < height - 50) { // Garantir que não desenhe na barra
    if (isEraserActive) {
      fill("black");
      noStroke();
    } else {
      fill(selectedColor);
      noStroke(); // Remove borda
    }
    rect(mouseX, mouseY, brushSize, brushSize);
  }
}

// Função para criar a barra de cores (HWB)
function drawColorBar() {
  noStroke();
  for (let i = 0; i < width; i++) {
    let hue = map(i, 0, width, 0, 360); // Variação de matiz (Hue)
    let whiteness = 10; // Nível fixo de branco
    let blackness = 10; // Nível fixo de preto
    let c = hwbColor(hue, whiteness, blackness); // Gera a cor no modelo HWB
    fill(c);
    rect(i, height - 50, 1, 50); // Desenhar barra de cor
  }
}

// Função para gerar cores no modelo HWB
function hwbColor(h, w, b) {
  colorMode(HSL); // Usamos HSL, já que o p5.js não tem suporte nativo para HWB
  let whiteness = w / 100;
  let blackness = b / 100;
  let saturation = 1 - whiteness - blackness; // Saturação como proporção restante
  saturation = constrain(saturation, 0, 1); // Garantir limites
  return color(h, saturation * 100, 50); // Retorna a cor no modelo HSL
}

// Detectar clique na barra de cores
function mousePressed() {
  if (mouseY >= height - 50) { // Se o clique estiver na barra
    let hue = map(mouseX, 0, width, 0, 360); // Matiz com base na posição do clique
    selectedColor = hwbColor(hue, 10, 10); // Atualizar a cor selecionada
  }
}

// Ajustar canvas ao redimensionar a janela
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background("black");
}
