const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
let platforms;
let paddle;
let cursors;
let ball;
let game = new Phaser.Game(config);
 function preload() {
     this.load.image('paddle', 'assets/PNG/Webp.net-resizeimage.png');
     this.load.image('ball', 'assets/PNG/Webp.net-resizeimage (1).png');
     this.load.image('ground', 'assets/PNG/17-Breakout-Tiles.png');
 }
 function create() {
     this.physics.world.setBoundsCollision(true, true, true, false);
     ball = this.physics.add.image(400, 500,'ball').setCollideWorldBounds(true).setBounce(1);
     ball.setData('onPaddle', true);
     paddle = this.physics.add.image(400, 550, 'paddle').setCollideWorldBounds(true).setImmovable();
     this.physics.add.collider(ball, paddle, hitPaddle, null, this);

    //  inputs
     cursors = this.input.keyboard.createCursorKeys();
 }
 function update() {
     if (cursors.left.isDown) {
         paddle.setVelocityX(-160);
     } else if (cursors.right.isDown) {
         paddle.setVelocityX(160);
     } 
     if (cursors.up.isDown) {
         if (ball.getData('onPaddle')) {
             ball.setVelocity(-75, -300);
             ball.setData('onPaddle', false);
         }
     }
 }
 function hitPaddle(ball,paddle) {
     let diff = 0;

     if (ball.x < paddle.x) {
         //  Ball is on the left-hand side of the paddle
         diff = paddle.x - ball.x;
         ball.setVelocityX(-10 * diff);
     }
     else if (ball.x > paddle.x) {
         //  Ball is on the right-hand side of the paddle
         diff = ball.x - paddle.x;
         ball.setVelocityX(10 * diff);
     }
     else {
         //  Ball is perfectly in the middle
         //  Add a little random X to stop it bouncing straight up!
         ball.setVelocityX(2 + Math.random() * 8);
     }
 }
