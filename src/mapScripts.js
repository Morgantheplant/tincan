// define(function(require, exports, module) {

//   var EventHandler = require('famous/core/EventHandler');
//   var MapStyleData = require('data/MapStyleData');
//    //alert('yabbbba');

//   var mapScripts = {};

// 	mapScripts.mapInit = function() {
// 		console.log(mapDiv, 'map DIIIIIV')
// 	  var mapDiv= document.getElementById('map-canvas');

// 		mapScripts.map = new google.maps.Map(mapDiv, {
// 		  center: new google.maps.LatLng(37.7785648,-122.3914325),
// 		  zoom: 13,
// 		  mapTypeId: google.maps.MapTypeId.ROADMAP
// 		});

// 		mapScripts.map.setTilt(45)
// 		mapScripts.map.setOptions({styles: MapStyleData});
//     google.maps.event.addListener(mapScripts.map, 'bounds_changed', mapScripts.boundsChanged);

// 	}

// 	 mapScripts.boundsChanged = function() {           
	     
// 	      // find out the map's bounds:
// 	      var bounds = mapScripts.map.getBounds();

// 	      // get the coordinates for the NE and SW corners
// 	      var NE = bounds.getNorthEast();
// 	      var SW = bounds.getSouthWest();

// 	      // figure out the latitudes and the longitudes
// 	      var lat1 =  NE.lat();
// 	      var lat2 =  SW.lat();

// 	      var lng1 =  NE.lng();
// 	      var lng2 =  SW.lng();

// 	      // construct new LatLngs using the coordinates for the horizontal distance between lng1 and lng2
// 	      var horizontalLatLng1 = new google.maps.LatLng(lat1,lng1);
// 	      var horizontalLatLng2 = new google.maps.LatLng(lat1,lng2);

// 	      // construct new LatLngs using the coordinates for the vertical distance between lat1 and lat2
// 	      var verticalLatLng1 = new google.maps.LatLng(lat1,lng1);
// 	      var verticalLatLng2 = new google.maps.LatLng(lat2,lng1);
// 	      console.log(verticalLatLng1, verticalLatLng2)
	      
// 	      // work out the distance horizontally
// 	      var horizontal = google.maps.geometry.spherical.computeDistanceBetween(horizontalLatLng1,horizontalLatLng2);

// 	      // work out the distance vertically
// 	      var vertical = google.maps.geometry.spherical.computeDistanceBetween(verticalLatLng1,verticalLatLng2);

// 	      // round to kilometres to 1dp
// 	      var horizontalkm = convertMetersToKm(horizontal);
// 	      var verticalkm = convertMetersToKm(vertical);

// 	      var horizontalMilesToEdge = convertMeterstoMiles(horizontal)/2;
	      
// 	      // var milesAway = 5;
// 	      // var mapWidth = mapDiv.clientWidth;
// 	      // var distanceRatio = milesAway/horizontalMilesToEdge
// 	      // console.log(distanceRatio, "distance ratio");
// 	      // pixelRadius = mapWidth/2 * distanceRatio;
	     
// 	      console.log(this.pixelRadius, "pixelRadius")
// 	      console.log(horizontalkm + ' km horizontal, ' + verticalkm + ' km vertical,'+ convertMeterstoMiles(horizontal)+ " miles across");
	 


// 	}

// 	function convertMetersToKm(metres)  {
// 	  return Math.round(metres / 1000 *10)/10;    // distance in km rounded to 1dp
// 	}

// 	function convertMeterstoMiles(meters){
// 	  return Math.round((convertMetersToKm(meters) * 621371) / 100000)/10
// 	}
   
	  
//   //console.log('asfafsdfasdfasdf', google.maps.event, init())

 
//   module.exports = mapScripts
// 	// google.maps.event.addListener(map, 'bounds_changed', function() {           
	     
// 	//       // find out the map's bounds:
// 	//       var bounds = map.getBounds();

// 	//       // get the coordinates for the NE and SW corners
// 	//       var NE = bounds.getNorthEast();
// 	//       var SW = bounds.getSouthWest();

// 	//       // figure out the latitudes and the longitudes
// 	//       var lat1 =  NE.lat();
// 	//       var lat2 =  SW.lat();

// 	//       var lng1 =  NE.lng();
// 	//       var lng2 =  SW.lng();

// 	//       // construct new LatLngs using the coordinates for the horizontal distance between lng1 and lng2
// 	//       var horizontalLatLng1 = new google.maps.LatLng(lat1,lng1);
// 	//       var horizontalLatLng2 = new google.maps.LatLng(lat1,lng2);

// 	//       // construct new LatLngs using the coordinates for the vertical distance between lat1 and lat2
// 	//       var verticalLatLng1 = new google.maps.LatLng(lat1,lng1);
// 	//       var verticalLatLng2 = new google.maps.LatLng(lat2,lng1);
// 	//       console.log(verticalLatLng1, verticalLatLng2)
	      
// 	//       // work out the distance horizontally
// 	//       var horizontal = google.maps.geometry.spherical.computeDistanceBetween(horizontalLatLng1,horizontalLatLng2);

// 	//       // work out the distance vertically
// 	//       var vertical = google.maps.geometry.spherical.computeDistanceBetween(verticalLatLng1,verticalLatLng2);

// 	//       // round to kilometres to 1dp
// 	//       var horizontalkm = convertMetersToKm(horizontal);
// 	//       var verticalkm = convertMetersToKm(vertical);

// 	//       var horizontalMilesToEdge = convertMeterstoMiles(horizontal)/2;
	      
// 	//       var milesAway = 5;
// 	//       var mapWidth = mapDiv.clientWidth;
// 	//       var distanceRatio = milesAway/horizontalMilesToEdge
// 	//       console.log(distanceRatio, "distance ratio");
// 	//       pixelRadius = mapWidth/2 * distanceRatio;
	     
// 	//       console.log(this.pixelRadius, "pixelRadius")
// 	//       console.log(horizontalkm + ' km horizontal, ' + verticalkm + ' km vertical,'+ convertMeterstoMiles(horizontal)+ " miles across");
// 	//   });


// 	// }

// 	// function convertMetersToKm(metres)  {
// 	//   return Math.round(metres / 1000 *10)/10;    // distance in km rounded to 1dp
// 	// }

// 	// function convertMeterstoMiles(meters){
// 	//   return Math.round((convertMetersToKm(meters) * 621371) / 100000)/10
// 	// }
// 	// }


//   //module.exports = mapEvents

// });
