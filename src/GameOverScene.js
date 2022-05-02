class GameOverScene extends Phaser.Scene{
    constructor(){
        super('game-over-scene')
    }
    init(data)
    {
        this.score = data.score
        this.replayButton = undefined
    }
    preload(){
        this.load.setPath('./assets/images')
        this.load.image('bg-gameover', 'ui/gameover-bg.jpg')
        this.load.image('player', 'player/player_NFT_01.png');

        // GUI
        this.load.image('retryBtn', 'ui/retry.png'); 
    }

    create(){
        this.add.image(WIDTH/2, HEIGHT/2, 'bg-gameover')
        // this.add.image(240, 230, 'gameOver')
        this.retryBtn = this.add.image(WIDTH/2, HEIGHT/2+200, 'retryBtn').setInteractive()

        this.retryBtn.once('pointerup', () => { 
            this.scene.start('game-scene') 
        }, this)

        this.add.text(WIDTH/2-40, HEIGHT/2-120,'SCORE',{ fonFamily:'Arial', fontSize:'32px', fill: '#000'})
        this.add.text(WIDTH/2-80, HEIGHT/2-60, this.score,{ fonFamily:'Arial', fontSize:'90px', fill: '#000'})
    }
}