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
let brick;
let paddle;
let cursors;
let ball;
let game = new Phaser.Game(config);
 function preload() {
     this.load.image('paddle', 'assets/PNG/Webp.net-resizeimage.png');
     this.load.image('ball', 'assets/PNG/Webp.net-resizeimage (1).png');
     this.load.image('brick', 'assets/PNG/Webp.net-resizeimage (2).png');
 }
 function create() {
     this.physics.world.setBoundsCollision(true, true, true, false);
     ball = this.physics.add.image(400, 500,'ball').setCollideWorldBounds(true).setBounce(1);
     ball.setData('onPaddle', true);
     paddle = this.physics.add.image(400, 550, 'paddle').setCollideWorldBounds(true).setImmovable();
     this.physics.add.collider(ball, paddle, hitPaddle, null, this);
     bricks0 = this.physics.add.staticGroup({
         key: 'brick',
         repeat: 7,
         setXY: { x: 150, y: 150, stepX: 78 }
     });
     bricks1 = this.physics.add.staticGroup({
         key: 'brick',
         repeat: 4,
         setXY: { x: 250, y: 200, stepX: 98 }
     });
     bricks2 = this.physics.add.staticGroup({
         key: 'brick',
         repeat: 6,
         setXY: { x: 50, y: 250, stepX: 118 }
     });
     
     this.physics.add.collider(ball, bricks0, hitBrick, null, this);
     this.physics.add.collider(ball, bricks1, hitBrick, null, this)
     this.physics.add.collider(ball, bricks2, hitBrick, null, this)

    //  inputs
     cursors = this.input.keyboard.createCursorKeys();
     
 }
 function update() {
     if (cursors.left.isDown) {
        //  paddle.setVelocityX(-160);
        paddle.x -=3;
     } else if (cursors.right.isDown) {
        //  paddle.setVelocityX(160);
        paddle.x +=3;
     } 
     if (cursors.up.isDown) {
         if (ball.getData('onPaddle')) {
             ball.setVelocity(-75, -300);
             ball.setData('onPaddle', false);
         }
     }
     if (ball.y > 600) {
         resetBall();
     }
 }
 function hitPaddle(ball,paddle) {
     let diff = 0;

     if (ball.x < paddle.x) {
         diff = paddle.x - ball.x;
         ball.setVelocityX(-10 * diff);
     }
     else if (ball.x > paddle.x) {
         diff = ball.x - paddle.x;
         ball.setVelocityX(10 * diff);
     }
     else {
         ball.setVelocityX(2 + Math.random() * 8);
     }
 }

 function hitBrick(ball,bricks) {
     bricks.disableBody(true, true);
 }

function resetBall () {
    ball.setVelocity(0);
    ball.setPosition(paddle.x, 500);
    ball.setData('onPaddle', true);
}
