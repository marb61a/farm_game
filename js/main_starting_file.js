// Single state game
var GameState = {
    // Load game assets prior to game starting
    preload : function(){
        this.load.image('background', 'assets/images/background.png');
        this.load.image('chicken', 'assets/images/chicken.png');
        this.load.image('horse', 'assets/images/horse.png');
        this.load.image('pig', 'assets/images/pig.png');
        this.load.image('sheep', 'assets/images/sheep3.png');
    },
    
    create : function(){
        // Scaling Options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        // Center the game
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        // Set screen size automatically
        this.scale.setScreenSize(true);
        
        // Background Sprite
        this.background = this.game.add.sprite(0, 0, 'background');
        
        // Animal group
        var animalData = [
            {key: 'chicken', text: 'CHICKEN'},
            {key: 'horse', text: 'HORSE'},
            {key: 'pig', text: 'PIG'},
            {key: 'sheep', text: 'SHEEP'}        
        ];
        
        
    },
    
    update : function(){
    },
    
    // Play animal animation
    animateAnimal : function(sprite, event){
        console.log('animate..');
    },
    
    // Switch animal
    switchAnimal : function(sprite, event){
        console.log('move animal');
    }
};

// Initiate Phaser
var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start(GameState);