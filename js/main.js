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
        
        // Place first animal in the middle
        this.currentAnimal = this.animals.next();
        this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);
        
        // Left Arrow
        this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.scale.x = -1;
        this.leftArrow.customParams = {direction : -1};
        
        // Left Arrow User Input
        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.onInputDown.add(this.switchAnimal, this);
        
        // Right Arrow
        this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
        this.rightArrow .anchor.setTo(0.5);
        this.rightArrow.customParams = {direction : 1};
        
        // Right Arrow User Input
        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.onInputDown.add(this.switchAnimal, this);
    },
    
    update : function(){
    },
    
    // Play animal animation
    animateAnimal : function(sprite, event){
        console.log('animate..');
    },
    
    // Switch animal
    switchAnimal : function(sprite, event){
        var newAnimal, endX;
        
        // Animal comes in depending on which arrow is pressed
        if(sprite.customParams.direction > 0){
            newAnimal = this.animals.next();
            newAnimal.x = -newAnimal.width/2;
            endX = 640 + this.currentAnimal.width/2;
        } else{
            newAnimal = this.animals.previous();
            newAnimal.x = 640 + newAnimal.width/2;
            endX = -this.currentAnimal.width/2;
        }
        
        // Between animations, moving on x
        var newAnimalMovement = this.game.add.tween(newAnimal);
        newAnimalMovement.to({x: this.game.world.centerX}, 1000);
        newAnimalMovement.start();
        
        var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
        currentAnimalMovement.to({x: endX}, 1000);
        currentAnimalMovement.start();
        
        this.currentAnimal = newAnimal;
    }
    
};

// Initiate Phaser
var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start(GameState);