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
let bricks0;
let bricks1;
let bricks2;
let paddle;
let cursors;
let ball;
let scoreText;
let gameOverText;
let score=0;
let over=0;
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
    //  understand physics.add properties like static,dynamic,image,sprite
    let createBricks = ()=> {
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
    }
    createBricks();
     
     
     this.physics.add.collider(ball, bricks0, hitBrick, null, this);
     this.physics.add.collider(ball, bricks1, hitBrick, null, this)
     this.physics.add.collider(ball, bricks2, hitBrick, null, this)

    //  inputs
     cursors = this.input.keyboard.createCursorKeys();
     scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
     
     
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
         over++;
         if (over > 1) {
             over = 0;
             console.log(over + "inside if");
             this.add.text(400, 250, 'GAMEOVER', { fontSize: '32px', fill: '#fff' });
             this.physics.pause();
         }else {
             paddle.x = 400;
             paddle.y = 550;
             resetBall();
         }
         
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

 function hitBrick(ball,brick) {
     brick.disableBody(true, true);
     score += 10;
     scoreText.setText('Score: ' + score);
    //  if (bricks0.countActive(true) && bricks1.countActive(true) && bricks2.countActive(true) === 0) {
    //     //  resetLevel();
    //     console.log('helloworld');
    //      this.physics.pause();
    //  }
    if (bricks0.countActive(true)===0) {
        if(bricks1.countActive(true)===0){
            if (bricks2.countActive(true)===0) {
                console.log('helloworld');
                this.physics.pause(); 
                
            }
        }
    }
 }

function resetBall () {
    ball.setVelocity(0);
    ball.setPosition(paddle.x, 500);
    ball.setData('onPaddle', true);
}
//  function resetLevel() {
//      resetBall();
//     //  bricks.children.each(function (brick) {
//     //     brick.enableBody(false, 0, 0, true, true);
//     // });
//     Console.log('helloworld');
//      createBricks();
//  }
