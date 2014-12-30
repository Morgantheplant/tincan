/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Surface = require('famous/core/Surface')
    var View      = require("famous/core/View");


    var getMapHeight = function(){ 
      var map = document.getElementById('map-canvas');
      return map.clientHieght; 
    }

    // create the main context
    var el = document.getElementById('famous-container');
    Engine.setOptions({ appMode: false });
    var mainContext = Engine.createContext(el);
    
   // mainContext.setPerspective(1000);
   
   //var circleView = new View();

    var circleArea = new Surface({
      size: [200, 200],
      properties: {
        borderRadius: '100px',
        border: '3px dashed rgb(0,255,255)',      
        }
    });
    
    var thumb = new Surface({
        size: [30, 30],
        content: '<img src="../content/images/famous_logo.png"/>',
        properties: {
            borderRadius: '15px',
            background: '-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(0, 255, 255)), to(rgb(134, 134, 134)))',
            //background:'-webkit-gradient(linear, 0% 0%, 0% 100%, from(#3B0202), to(#FE0000))',
            //background: '-moz-linear-gradient(top, #3B0202 0%, #FE0000 100%)',
            color: 'black',
            
        }
    });

    var initialTime = Date.now();
    
    var centerAll = new Modifier({
    
        transform: function(){
          return Transform.translate(0,350,0)
        }
    })

    var centerSpinModifier = new Modifier({
        align:[0.5, 0.5],
        origin: [0.5, 0.5],
        transform: function() {
            return Transform.rotate(0/*Math.PI/4*/, 0, .0001 * (Date.now() - initialTime));
        }
    });
    
    var miniSpinModifier = new Modifier({
         align: [.5, 0.5],
        // origin: [0.5, 0.5]
        transform: function() {
            return Transform.translate(100,0,0);
        }
    });
    
      var posMod = new Modifier({
         align: [0.5, 0.5],
        transform: function(){
            return Transform.rotateZ(.0001 * (initialTime-Date.now()))
        }
     });


   
   var mainC = mainContext.add(centerAll).add(centerSpinModifier)

   
    mainC.add(circleArea)
    mainC.add(miniSpinModifier).add(posMod).add(thumb)


});
