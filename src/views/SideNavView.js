define(function(require, exports, module) {
	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
  var EventHandler = require('famous/core/EventHandler');
  
  var navEvents = new EventHandler();

	function SideNavView() {
		View.apply(this, arguments);
    
    this.navModifier = new StateModifier({
      align:[0,0]
    });
    
  this._eventInput.subscribe(navEvents)
  
  this._eventInput.on('decrement', function(){
    this._eventOutput.emit('decrement')
  }.bind(this))

  this._eventInput.on('increment', function(){
    this._eventOutput.emit('increment')
  }.bind(this))

  this.mainNode = this.add(this.navModifier)
		_createSideNav.call(this);
		_createButtonArea.call(this);
	}


	SideNavView.prototype = Object.create(View.prototype);
	SideNavView.prototype.constructor = SideNavView;

	SideNavView.DEFAULT_OPTIONS = {};

	function _createSideNav(){
		var navBackground = new Surface({
			size:[255, 255],
			properties: {
				backgroundColor: 'rgb(23,145,171)',
				zIndex: 10,
				borderRadius: '125px',
				pointerEvents:'none'
			}
		})

		this.mainNode.add(navBackground)
	}

	function _createButtonArea(){

		var radiusCounter = 1;

		this.radiusEvents = new EventHandler();
    this.radiusEvents.subscribe(navEvents);

    this.radiusEvents.on('increment', function(){
       if(radiusCounter < 20){
       	radiusCounter += 0.5;
       }  
      var newContent =  radiusCounter + ' mile<br> radius';
      buttonArea.setContent(newContent)
    })

     this.radiusEvents.on('decrement', function(){
       if(radiusCounter > 0.5){
       	radiusCounter -= 0.5;
       }  
      var newContent =  radiusCounter + ' mile<br> radius';
      buttonArea.setContent(newContent)
    })

		var modButtonArea = new StateModifier({
      align:[0,0]
		});

		var buttonArea = new Surface({
			size:[245,245],
			content: radiusCounter + ' mile<br> radius',
			properties: {
				backgroundColor: 'rgb(39, 40, 41)',//'rgb(6, 37, 57)',
				zIndex: 11,
				borderRadius: '122.5px',
				paddingLeft: '100px',
				paddingTop: '32px',
				color: 'white',
				textAlign: 'center',
				fontFamily: 'verdana',
				fontSize: '14px',
				pointerEvents: 'none'
			}
		})

		var radiusDownMod = new StateModifier({
      transform: Transform.translate(138,90,15)
		});

		var radiusDown = new Surface({
			size:[20,90],
			content: '<button>down</button>',
		});
    
    radiusDown.on('click', function(){
    	console.log('clicked down')
    	navEvents.emit('decrement')
    })

    
		var radiusUpMod = new StateModifier({
      transform: Transform.translate(138,67,15)
		});

    var radiusUp = new Surface({
      size:[20,90],
      content: '<button>up</button>' 
    });
    
    radiusUp.on('click', function(){
    	console.log('clicked up')
    	navEvents.emit('increment')
    })

		this.mainNode.add(modButtonArea).add(buttonArea)
		this.mainNode.add(radiusDownMod).add(radiusDown)
		this.mainNode.add(radiusUpMod).add(radiusUp)
	}

	module.exports = SideNavView
});
