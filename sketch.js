let selectedColor = "white";  
let brushSize = 20;  
let isEraserActive = false; 
let bgMusic; 

function preload() {
  
  bgMusic = loadSound("OMFG - Hello(MP3_160K).mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);  
  background("black");

   
  let playButton = createButton('Clique para começar a música');
  playButton.position(10, height - 50); 
  playButton.mousePressed(startMusic);  
  playButton.style('font-size', '20px');
  playButton.style('padding', '10px');
  playButton.style('background-color', '#4CAF50');
  playButton.style('color', 'white');
  playButton.style('border', 'none');
  playButton.style('cursor', 'pointer');
}

function startMusic() {
  bgMusic.loop();  
  this.remove();  
}

function draw() { 
  drawColorBar();

 
  if (mouseIsPressed && mouseY < height - 50) {  
    if (isEraserActive) {
      fill("black");
      noStroke();
    } else {
      fill(selectedColor);
      noStroke();  
    }
    rect(mouseX, mouseY, brushSize, brushSize);
  }
}

 
function drawColorBar() {
  noStroke();
  for (let i = 0; i < width; i++) {
    let hue = map(i, 0, width, 0, 360); 
    let whiteness = 10; 
    let blackness = 10;  
    let c = hwbColor(hue, whiteness, blackness); 
    fill(c);
    rect(i, height - 50, 1, 50); 
}

 
function hwbColor(h, w, b) {
  colorMode(HSL);  
  let whiteness = w / 100;
  let blackness = b / 100;
  let saturation = 1 - whiteness - blackness; 
  saturation = constrain(saturation, 0, 1);  
  return color(h, saturation * 100, 50);  
}

 
function mousePressed() {
  if (mouseY >= height - 50) { 
    let hue = map(mouseX, 0, width, 0, 360);  
    selectedColor = hwbColor(hue, 10, 10);  
  }
}

 
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background("black");
}
