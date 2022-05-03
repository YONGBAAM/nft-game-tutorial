class GameOverScene extends Phaser.Scene{
    constructor(){
        super({key: 'game-over-scene'})
    }

    init(data)
    {
        this.score = data.score
        this.replayButton = undefined
    }
    
    preload(){
        // Music
        this.load.audio('death_music', './assets/music/Death1.wav');

        // Image
        this.load.setPath('./assets/images')
        this.load.image('bg-gameover', 'ui/gameover-bg.jpg')
        this.load.image('player', 'player/player_NFT_01.png');

        // GUI
        this.load.image('retryBtn', 'ui/retry.png'); 
    }

    create(){
        this.music = this.sound.add('death_music');
        this.music.play();

        this.add.image(WIDTH/2, HEIGHT/2, 'bg-gameover')
        this.retryBtn = this.add.image(WIDTH/2, HEIGHT/2+200, 'retryBtn').setInteractive()

        this.retryBtn.once('pointerup', () => { 
            this.scene.start('game-start-scene') 
        }, this)

        this.add.text(WIDTH/2, HEIGHT/2-120,'SCORE',{ fonFamily:'Arial', fontSize:'100px', fill: '#000'}).setOrigin(0.5, 0.5)
        this.add.text(WIDTH/2, HEIGHT/2+40, this.score,{ fonFamily:'Arial', fontSize:'140px', fill: '#000'}).setOrigin(0.5, 0.5)
        this.add.text(WIDTH/2, HEIGHT/2+130, 'BONUS POINT : 0',{ fonFamily:'Arial', fontSize:'20px', fill: '#000'}).setOrigin(0.5, 0.5)
    }
}