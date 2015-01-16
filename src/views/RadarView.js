define(function(require, exports, module) {

  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Modifier = require('famous/core/Modifier');
  var Transitionable = require('famous/transitions/Transitionable');
  var SpringTransition = require('famous/transitions/SpringTransition');
  var Timer = require('famous/utilities/Timer')
  //register and set spring transition
  Transitionable.registerMethod('spring', SpringTransition);

  var spring = {
    method: 'spring',
    period: 150,
    dampingRatio: 0.3
  };
  
  //initial diameter of radar
  var diameter = 250;

  
  function RadarView() {
  	View.apply(this, arguments);
  	
  	this.rootModifier = new Modifier({
      transform: function(){
        return Transform.translate(0,0,0)
      }
    });

    this.mainNode = this.add(this.rootModifier)
    
    _createRadius.call(this);
    
  }


  function _createRadius(){
    var milesAway = 1;  //replace with getter fxn 

    
    
    this._eventInput.on('bounds_changed', function(data){
      milesAway = data.milesAway
    	 var newDiameter = findDiameter(data.milesAcross, data.pixelsAcross, milesAway);
       sizeRadarModifier.setSize([newDiameter,newDiameter], spring);
       miniSpinModifier.setTransform(Transform.translate(newDiameter/2,0,0), spring);
       
       radarArea.setProperties({
       	borderRadius: newDiameter/2 + 'px'
       });
       
      })

    var sizeRadarModifier = new StateModifier({
       size:[diameter, diameter],
       origin:[0.5,0.5]
    });

	  var radarArea = new Surface({
	    size: [undefined, undefined],
	    properties: {
	      borderRadius: (diameter/2) + 'px',
	      border: '2px dashed rgb(250,12,12)',
	      pointerEvents: 'none'      
	    }
	  });
	  
	  //orbiting circle with thumbnail 
	  var orbitNode = new Surface({
	      size: [40, 40],
	      content: '<div class="ballImage"></div>',//<img src="../content/images/famo.jpg"/></div>',
	      properties: {
	          borderRadius: '20px',
	          background: '-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(250, 12, 12)), to(rgb(43, 15, 15)))',
	          height:'25px',
	          width:'25px',
	          color: 'black'
	          
	      }
	  });

	  var initialTime = Date.now();

	  var centerSpinModifier = new Modifier({
	    align:[0.5, 0.5],
	    origin: [0.5, 0.5],
	    transform: function() {
	      return Transform.rotate(0/*Math.PI/4*/, 0, .0001 * (Date.now() - initialTime));
	    }
	  });
	  
	  var miniSpinModifier = new Modifier({
	    align: [.5, 0.5],
	    transform: Transform.translate((diameter/2),0,0)
	  });
	  
	  var orbitNodePosMod = new Modifier({
	    align: [0.5, 0.5],
	    transform: function(){
	      return Transform.rotateZ(.0001 * (initialTime-Date.now()))
	    }
	  });

    var mainC = this.mainNode.add(centerSpinModifier)
	   
    mainC.add(sizeRadarModifier).add(radarArea)
    mainC.add(miniSpinModifier).add(orbitNodePosMod).add(orbitNode)

  }
  
  RadarView.prototype = Object.create(View.prototype);
  RadarView.prototype.constructor = RadarView;

  function findDiameter(milesAcross, pixelsAcross, milesAway){
    return (milesAway*pixelsAcross)/milesAcross; 
  }



  module.exports = RadarView

 });