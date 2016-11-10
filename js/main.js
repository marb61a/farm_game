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
        
        // Background Sprite
        this.background = this.game.add.sprite(0, 0, 'background');
        
        // Animal group
        var animalData = [
            {key: 'chicken', text: 'CHICKEN'},
            {key: 'horse', text: 'HORSE'},
            {key: 'pig', text: 'PIG'},
            {key: 'sheep', text: 'SHEEP'}        
        ];
        
        this.animals = this.game.add.group();
        
        var self = this;
        var animal;
        
        animalData.forEach(function(element) {
            // Create the animals and put in group
            animal = self.animals.create(-1000, self.game.world.centerY, element.key);
            
            // Custom property to save non Phaser related items
            animal.customParams = {text : element.text};
            
            // Set anchor point to sprite center
            animal.anchor.setTo(0.5);
            
            // Enable input
            animal.inputEnabled = true;
            animal.input.pixelPerfectClick = true;
            animal.events.onInputDown.add(self.animateAnimal, self);
        });
        
        // Center of the world
        this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
        
        // Place sprite by center
        this.chicken.anchor.setTo(0.5, 0.5);
        
        // Increase width by 2
        this.chicken.scale.setTo(2, 1);
        
        this.horse = this.game.add.sprite(120, 10, 'horse');
        
        // Decrease dimensions to half
        this.horse.scale.setTo(0.5);
        
        this.pig = this.game.add.sprite(500, 300, 'pig');
        this.pig.anchor.setTo(0.5);
        
        // Flip on X
        this.pig.scale.setTo(-1, 1);
        
        this.sheep = this.game.add.sprite(100, 250, 'sheep');
        this.sheep.scale.setTo(0.5);
        this.sheep.anchor.setTo(0.5);
        
        // Rotate 90 degrees clockwise
        this.sheep.angle = 90;
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