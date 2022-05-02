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

        this.add.image(WIDTH/2, HEIGHT/2, 'bg-start')

        // Character Image
        // this.add.image(WIDTH/2, HEIGHT/2-100, 'profile-bg').setScale(0.8)
        this.add.image(WIDTH/2-120, HEIGHT/2-60, 'player').setScale(0.25)

        this.add.text(WIDTH/2-50, HEIGHT/2-80, 'Id : ', {fontSize:15})
        this.add.text(WIDTH/2+20, HEIGHT/2-80, 'wassue33fdlknfi2', {fontSize:15})

        this.add.text(WIDTH/2-50, HEIGHT/2-60, 'Rank : ', {fontSize:15})
        this.add.text(WIDTH/2+20, HEIGHT/2-60, '51535', {fontSize:15})

        this.add.text(WIDTH/2-50, HEIGHT/2-40, 'Grade : ', {fontSize:15})
        this.add.text(WIDTH/2+20, HEIGHT/2-40, '1', {fontSize:15})
        
        this.startBtn = this.add.image(WIDTH/2, HEIGHT/2+200, 'startBtn').setInteractive()

        this.startBtn.once('pointerup', () => { 
            this.scene.start('game-scene') 
        }, this)
    }
}