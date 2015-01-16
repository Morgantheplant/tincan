define(function(require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var ImageSurface = require('famous/surfaces/ImageSurface');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var EventHandler = require('famous/core/EventHandler');
  var Timer = require('famous/utilities/Timer');
  var MapView = require('../../node_modules/famous-map/MapView.js');

  var SideNavView = require('views/SideNavView');
  var RadarView = require('views/RadarView');
  var CoordsView = require('views/CoordsView');

  var MapStyleData = require('data/MapStyleData');
  
  var navEvents = new EventHandler();
  var mapBoundsChanged = new EventHandler();
 
  function AppView() {
    View.apply(this, arguments);
    
    _createMap.call(this);
    
    _createRadar.call(this);
   
    _createSideNav.call(this)
   
    _createCoordsView.call(this)
  }

  AppView.prototype = Object.create(View.prototype);
  AppView.prototype.constructor = AppView;

  AppView.DEFAULT_OPTIONS = {
    data: undefined,
    maHeight: window.innerHeight,
    mapWidth: window.innerWidth
  };
    
  AppView.DEFAULT_OPTIONS.navWidth = 0.8 * AppView.DEFAULT_OPTIONS.cameraWidth;
  AppView.DEFAULT_OPTIONS.navHeight = AppView.DEFAULT_OPTIONS.slideWidth + 40;
  
  function _createRadar(){
    

    var radarView = new RadarView();
    this.add(radarView);
    
    

    this.mapBoundsListener = new EventHandler();
    this.mapBoundsListener.subscribe(mapBoundsChanged);
    this.mapBoundsListener.on('bounds_changed', function(data){
      radarView._eventInput.trigger('bounds_changed', data)

    });


  }

  function _createSideNav(){

      var sideNavView = new SideNavView();

      var sideNavModifier = new StateModifier({
        size: [250, 250],
        origin: [0.5,0.5],
        align: [0,1]
        //transform: Transform.rotate(Math.PI/2, Math.PI/4, 0)
      }); 

      this.add(sideNavModifier).add(sideNavView)

      sideNavView.on('increment', function(){
        console.log('heard inc')
      })

      sideNavView.on('decrement', function(){
        console.log('heard dec')
      })


  }

5
  function _createCoordsView(){
      this.mapCenterListener = new EventHandler();
      this.mapCenterListener.subscribe(mapBoundsChanged);

      this.mapBoundsListener.on('bounds_changed', function(data){
        var center = { center: data.center}
         coordsView._eventInput.trigger('center_changed', center);
      })
      
      var coordsView = new CoordsView();

      var coordsModifier = new StateModifier({
        size: [300, 300],
        origin: [.5,.5],
        align: [1,0]
       //transform: Transform.rotate(Math.PI/2, Math.PI/4, 0)
      }); 

      this.add(coordsModifier).add(coordsView)

  }

  function _createMap() {

    var mapWidth = this.options.mapWidth 
    var mapHeight = this.options.mapHeight

    var mapView = new MapView({
      type: MapView.MapType.GOOGLEMAPS,
      mapOptions: {
        zoom: 13,
        center: {lat:  37.7785648, lng: -122.3914325},
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        scaleControl: false,
        panControl: false,
         mapTypeControl: false
      }
    });

    var mapModifier = new StateModifier({
        size: [undefined, undefined],
        align: [0, 0],

    });

    mapView.on('load', function(){
      

      var map = mapView.getMap();

      //init map style and enable tilt
      map.setOptions({styles: MapStyleData})
      map.setTilt(45); 

      //set up map listener events
      google.maps.event.addListener(map, 'bounds_changed', function(){
        mapSizes(map, mapView.getSize(), map.getTilt());
      });
    
      navEvents.emit('loaded')
    })

    this.add(mapModifier).add(mapView);
  }

  function mapSizes(map, mapSize, tilt, milesAway) {           
    var tilt = tilt > 0 ? Math.PI/4 : 0;
    var milesAway = milesAway || 1;
    
    var center = map.getCenter();

    // find out the map's bounds:
    var bounds = map.getBounds();

    // get the coordinates for the NE and SW corners
    var NE = bounds.getNorthEast();
    var SW = bounds.getSouthWest();

    // figure out the latitudes and the longitudes
    var lat1 =  NE.lat();
    var lat2 =  SW.lat();

    var lng1 =  NE.lng();
    var lng2 =  SW.lng();

    // construct new LatLngs using the coordinates for the horizontal distance between lng1 and lng2
    var horizontalLatLng1 = new google.maps.LatLng(lat1,lng1);
    var horizontalLatLng2 = new google.maps.LatLng(lat1,lng2);

    // work out the distance horizontally
    var horizontal = google.maps.geometry.spherical.computeDistanceBetween(horizontalLatLng1,horizontalLatLng2);

    var horizontalMilesToEdge = convertMeterstoMiles(horizontal)/2;
    //var distanceRatio = milesAway/horizontalMilesToEdge
    var mapBoundsData = {
      pixelsAcross: mapSize[0],
      milesAcross: horizontalMilesToEdge,
      tilt: tilt,
      center: center,
      milesAway: milesAway 
    }
    
    mapBoundsChanged.emit('bounds_changed', mapBoundsData);

  }
  
  function convertMeterstoMiles(meters){
      return Math.round((meters * 621371) / 1E8 )/10
  }

  
  
  // function _createSideNav() {
  //   var sideNavView = new SideNavView({
  //     size:[this.options.navWidth,this.options.navHeight] 
  //   });
  // }


    module.exports = AppView;
});
