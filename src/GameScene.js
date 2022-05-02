class GameScene extends Phaser.Scene{
    constructor(){
        super({key: 'game-scene'})
    }
    init(data)
    {  
        this.score = data.score
    }
    preload(){
        this.load.setPath('./assets/images');
        this.load.image('bg1', 'background/back_ocean_top.jpg');
        this.load.image('bg2', 'background/back_ocean_bottom.png');
        this.load.image('block', 'background/back_jellyfish.png');
        this.load.image('player1', 'player/player_NFT_01.png');
        this.load.image('player2', 'player/player_NFT_02.png');
        this.load.image('player3', 'player/player_NFT_03.png');
        this.load.image('player4', 'player/player_NFT_04.png');
    }

    create(){
        this.bg1=this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'bg1').setScale(1).setOrigin(0, 0);
        this.bg2=this.add.tileSprite(0, 285, WIDTH, HEIGHT, 'bg2').setScale(1).setOrigin(0, 0);

        this.player=this.physics.add.sprite(200,HEIGHT/2,'player1').setScale(0.2);       
        //this.player=this.physics.add.sprite(200,HEIGHT/2,'player2').setScale(0.3);
        //this.player=this.physics.add.sprite(200,HEIGHT/2,'player3').setScale(0.3);
        //this.player=this.physics.add.sprite(200,HEIGHT/2,'player4').setScale(0.3);

        this.player.setGravityY(500);   //  Y축으로 중력을 450만큼 설정
        this.player.setCollideWorldBounds(true);    //  게임 바깥으로 캐릭터가 나가지 않도록 함

        this.Score = 0; // 점수의 초기값을 0으로 설정함
        this.ScoreText = this.add.text(480,10,"-", {font:"bold 32px Arial"});
        
        this.delay = 300;  //  0.3초마다 새로운 장애물이 나오도록 함
        this.timer = this.time.addEvent({
            delay: this.delay, callback: this.onTimerEvent, callbackScope: this, loop: true 
        });
        
        this.input.on('pointerdown', function (pointer) {
            if(this.player_tweens)this.player_tweens.stop();
            this.player.setVelocity(0,-150);    // 캐릭터가 Y축으로 150만큼 위로 올라감
            this.player_tweens = this.tweens.timeline({
                tweens: [
                    {
                        targets:this.player,
                        angle:-30,
                        duration:300,
                        onComplete:function(tween,targets){
                            this.player.setVelocity(0,0);
                        }.bind(this)
                    },
                    {
                        targets:this.player,
                        angle:30,
                        duration:500,
                    }
                ]
            });
        }.bind(this));
    }
    
    update(){
        this.bg1.tilePositionX -=1;
        this.bg2.tilePositionX +=1.5;
    
        this.ScoreText.text = "Score : " + this.Score;
    }

    onTimerEvent(){
       this.addBlock();
    }

    addBlock(){
        this.blockGroup = this.physics.add.group();

        var randomY = Phaser.Math.Between(500,1000);
        var randomHeight = Phaser.Math.Between(700,750);

        var block1 = this.physics.add.sprite(WIDTH,randomY-randomHeight,'block').setScale(0.5).setFlipY(true);
        var block2 = this.physics.add.sprite(WIDTH,randomY,'block').setScale(0.5)
        
        this.blockGroup.add(block1);
        this.blockGroup.add(block2);

        this.tweens.add({
            targets:block1,
            x:0,    //  장애물은 x축 좌표의 값이 0이 될때까지 이동
            duration:1400,  //  1400ms = 1.4초
            onComplete:function(tween,targets){
                block1.destroy();
                this.Score +=1;
            }.bind(this)
        })

        this.tweens.add({
            targets:block2,
            x:0,    //  장애물은 x축 좌표의 값이 0이 될때까지 이동
            duration:1400,  //  1400ms = 1.4초
            onComplete:function(tween,targets){
                block2.destroy();
                this.Score +=1;
            }.bind(this)
        })

        this.physics.add.overlap(this.blockGroup, this.player, this.hitBlockPlayer, null, this);
    }

    hitBlockPlayer(){
        this.scene.start('game-over-scene', {
            score : this.Score,
        })
    }
}