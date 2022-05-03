class GameStartScene extends Phaser.Scene{
    constructor(){
        super({key: 'game-start-scene'})
    }
    init(data)
    { 
        this.score = data.score
        this.startBtn = undefined
    }
    preload(){
        // json data load
        this.load.json('jsonData', './src/nft-backend-withURI.postman_collection.json');

        // Music
        this.load.audio('intro_music', './assets/music/Intro3.wav');
        
        // Image
        this.load.setPath('./assets/images')
        this.load.image('bg-start', 'ui/gamestart-bg.jpg')
        this.load.image('player', 'player/player_NFT_01.png')
        this.load.image('profile-bg', 'ui/profile-bg.png')

        // GUI
        this.load.image('startBtn', 'ui/start_btn.png'); 
    }

    create(){
        let data = this.cache.json.get('jsonData');
        console.log(data);

        this.music = this.sound.add('intro_music');
        this.music.play();

        this.add.image(WIDTH/2, HEIGHT/2, 'bg-start')

        // Character Image
        this.add.image(WIDTH/2, HEIGHT/2-85, 'player').setScale(0.3).setOrigin(0.5, 0.5)
        this.add.text(WIDTH/2, HEIGHT/2+20, 'ID : TestPlayer', {fonStyle:'Arial', fontWeight:'bold', fontSize:30}).setOrigin(0.5, 0.5)
        this.add.text(WIDTH/2, HEIGHT/2+65, 'RANK : 9', {fonStyle:'Arial', fontWeight:'bold', fontSize:30}).setOrigin(0.5, 0.5)
        this.add.text(WIDTH/2, HEIGHT/2+110, 'GRADE : 1', {fonStyle:'Arial', fontWeight:'bold', fontSize:30}).setOrigin(0.5, 0.5)
        
        this.startBtn = this.add.image(WIDTH/2, HEIGHT/2+200, 'startBtn').setInteractive()

        this.startBtn.once('pointerup', () => { 
            this.scene.start('game-scene') 
        }, this)
    }
}