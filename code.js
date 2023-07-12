// スプライトの変数
var penguin;
var fish;
var tekipenguin;

// 画像の変数
var penguinImage;
var fishImage;
var tekipenguinImage;

// サウンドの変数
var pickupSound;
var levelUpSound;
var bakuhatsu2;
var GameoverSound;
var boukenn;

// 数字の変数
var frame = 0;
var timer = 10;
var counter = 0;
var tekipenguinVelocityX;
var tekipenguinVelocityY;

// データの準備（読み込み）
function preload() {
  // 画像の読み込み
  penguinImage = loadImage('data/penguin.png');
  fishImage = loadImage('data/fish.png');
  tekipenguinImage = loadImage('data/tekipenguin.png');

  // サウンドを読み込む
  pickupSound = loadSound('data/pickup.mp3');
  levelUpSound = loadSound('data/levelup.mp3');
  bakuhatsu2 = loadSound('data/bakuhatsu2.mp3'); 
  GameoverSound = loadSound('data/GameoverSound.mp3');
  boukenn = loadSound('data/boukenn.mp3');
}



// １回だけ呼ばれる（初期化）
function setup() {
  // キャンバスを作る
  createCanvas(800, 600);

  boukenn.loop();
  
  // ペンギンのスプライトを作る
  penguin = createSprite();
  penguin.addImage(penguinImage);
  tekipenguin = createSprite(floor(random(width)), floor(random(height)), 50, 50);
  tekipenguin.addImage(tekipenguinImage);
  tekipenguinVelocityX =  10;
  tekipenguinVelocityY = -10;
  tekipenguin.velocity.x = tekipenguinVelocityY;
  tekipenguin.velocity.y = tekipenguinVelocityX;

  // 魚のスプライトを作る
  fishGroup = createGroup();
  for (var i = 0; i < 200; i++) {
    fish = createSprite(random(450), random(height));
    fish.addImage(fishImage);
    fishGroup.add(fish);
    fish.velocity.x = 5;
  }
  
}


// 何回も呼ばれる（描画と計算）
function draw()  {
  // 背景をぬる
  background(0, 0, 30);
  

  // ペンギンの位置をマウスの位置にする
  penguin.position.x = mouseX;
  penguin.position.y = mouseY;

  //敵ペンギンをはしにあたったらはねかえれらせる
  if (tekipenguin.position.y > height) {
       tekipenguin.velocity.y *= -1;
  }
  if (tekipenguin.position.y < 0) {
       tekipenguin.velocity.y *= -1;
  }
  if (tekipenguin.position.x < 0) {
       tekipenguin.velocity.x *= -1;
  }
  if (tekipenguin.position.x > width) {
       tekipenguin.velocity.x *= -1;
  }

  if (penguin.overlap(tekipenguin)) {
      penguin.remove();
      textSize(60);
      textStyle(BOLD);
      textAlign(CENTER);
      fill(255, 250);
      text('GAME OVER', width / 2, height / 2);
      GameoverSound.play();
      noLoop();
      boukenn.stop();
  }
    // ペンギンが魚に重なったらpickup関数を呼び出す
  penguin.overlap(fishGroup, pickup);
  for (var i = 0; i < fishGroup.length; i++) {
    var fish = fishGroup[i];

    if (fish.position.x > width + fish.width / 2) {
      fish.position.x = -fish.width / 2;
    }
  }

  // 全てのスプライトを描く
  drawSprites();

  
  // テキストを表示する
  fill(255);
  textSize(25);
  textStyle(BOLD);
  textAlign(CENTER);
  text('FISH ' + counter, 70, 50);
  textSize(300);
  fill(255, 50);
  textAlign(CENTER, CENTER);
  text(timer, width / 2, height / 2);
  fill(255);

  // もし魚を全部ひろったら
  if (counter == 200) {
    // 背景をぬる
    background(0, 255, 200, 150);

    // テキストを表示する
    textSize(60);
    text('GAME COMPLETED!', width / 2, height / 2);
    levelUpSound.play();
    boukenn.stop();

    // 描画を止める
    noLoop();
  }
  // もし時間が０以下になったら
  else if (timer <= 0) {
    // テキストを表示する
    textSize(60);
    text('GAME OVER', width / 2, height / 2);
    bakuhatsu2.play();
    boukenn.stop();

    // 描画を止める
    noLoop();
  }

  // タイマーの処理
  frame++;
  if (frame % 60 == 0) {
    timer--;
  }
}


// 魚をひろう関数
function pickup(penguin, fish) {
  // 音を鳴らす
  pickupSound.play();

  // 拾った魚を消す
  fish.remove();

  // カウンターを増やす
   counter += 1;
}


// グループを作る関数
function createGroup() {
  return new Group();
}
