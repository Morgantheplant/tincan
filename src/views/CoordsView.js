define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function CoordsView() {
        View.apply(this, arguments);
        
        this.coordsModifier = new StateModifier({
          origin:[0,0]
        });

      this.mainNode = this.add(this.coordsModifier)

        _createCoordsText.call(this);
    }

    CoordsView.prototype = Object.create(View.prototype);
    CoordsView.prototype.constructor = CoordsView;

    CoordsView.DEFAULT_OPTIONS = {};
    
    function _createCoordsText() {



      this._eventInput.on('center_changed', function(data){
        var latitude = roundCoord(data.center.k);
        var longitude = roundCoord(data.center.D);
         
        var centerText = 'lat: <br>'+ latitude +'<br> long:<br>'+ longitude
        
        coords.setContent(centerText);
      });
      
      var coordsBkgMod = new StateModifier({
        align: [-0.04,-0.03],
        origin: [0,0]
      })
      var coordsBackground = new Surface({
        size:[310,310],
        properties: {
          borderRadius: '155px',
          backgroundColor:'rgb(23,145,171)'//'rgb(6, 37, 57)'
        }
      })
      
      var coords = new Surface({
        content: 'lat: <br>37.7785648<br> long:<br>-122.3914325',
        properties: {
          backgroundColor: 'rgb(39, 40, 41)',//'rgb(23,145,171)',
          borderRadius: '150px',
          textAlign: 'center',
          paddingRight: '110px',
          fontFamily: 'verdana',
          lineHeight: '17px',
          paddingTop: '160px',
          fontSize: '10px',
          fontWeight: 'bold',
          color: 'white'
        }
      })
      
      this.mainNode.add(coordsBkgMod).add(coordsBackground)
      this.mainNode.add(coords);
    }

    function roundCoord(fullnumber) {
      var coord = fullnumber.toString().split(".")
      return coord[0] + '.' + coord[1].slice(0,7)
    }

    module.exports = CoordsView
});
