  // var io = require('socket.io');
  var BUSY = 0;
  var DEVLIVERING = 1;
  var FREE = 2;
  var OFFLINE = 3;
  var PICKING_UP = 4;

  var ACTION_STATUS = {
    2: "busy",
    4: "delivering",
    1: "free",
    3: "offline",
    5: "PickingUp",
  }

  var DRIVERS_ICONS = {
    1: "Car",
    2: "Motor",
    3: "Electrical_bike",
    4: "Bike",
    5: "DipnDip",
  }

  markers = [];


  let websocket;

  function init_websocket(map) {
    websocket = map;
    var socket = io.connect('http://94.252.183.80:3000', {
      query: "type=_MAP_CLIENT"
    });

    socket.on('connect', () => {
      socket.emit('init_map', init_map)
    });

    function init_map(data) {
		// console.log(data);
      data.forEach((elem) => {
        generateMarker(elem);
      });
    }

    socket.on('update_map', (data, action = null, status = null) => {

      // Iterate over our current marker and in case the marker exist already
      // we update the data and update the map.
      let oldMarker = false;
      this.markers.forEach((marker) => {
        if (marker.id == data.id) {
			
          oldMarker = true;
          if (status) {
            marker.gps_status = status.gps_status == 1 ? 'on' : 'off';
            marker.screen_status = status.screen_status == 1 ? 'on' : 'off';
          } else if (action) {
            marker.last_action = action;
          } else {
			marker.vehicle_type = data.vehicle_type;
            marker.lat = data.lat;
            marker.lng = data.lng;
            marker.last_seen = data.last_seen;
            marker.gps_status = data.gps_status == 1 ? 'on' : 'off';
            marker.screen_status = data.screen_status == 1 ? 'on' : 'off';
          }

          var latlng = new google.maps.LatLng(marker.lat, marker.lng);
          marker.setPosition(latlng);

          marker.setIcon(generateIcon(marker));

          let popup = generateInfo(marker);
          var infowindow = new google.maps.InfoWindow({
            content: popup,
            maxWidth: 250,
          });


          // Remove all click listeners from marker instance.
          google.maps.event.clearListeners(marker, 'mouseout');
          google.maps.event.clearListeners(marker, 'mouseover');

          marker.addListener('mouseover', function () {
            infowindow.open(websocket, marker);
          });
          marker.addListener('mouseout', function () {
            infowindow.close(websocket, marker);
          });
        }
      });

      // in case the markers doesn't exist already push a new marker.
      if (!oldMarker) {
        generateMarker(data);
      }

    });

    socket.on('gps_closed', (data) => {
      // this.$notify({
      //   duration: 0,
      //   title: 'GPS CLOSED',
      //   message: data.name + ' ' + data.date,
      //   type: 'error'
      // });
      // let audio = new Audio('/static/silence.mp3');
      // audio.play()
      //   .then(() => {})
      //   .catch(err => console.log(err.message));
    });

    socket.on('screen_closed', (data) => {
      // this.$notify({
      //   duration: 0,
      //   title: 'SCREEN CLOSED',
      //   message: data.name + ' ' + data.date,
      //   type: 'error'
      // });
      // let audio = new Audio('/static/silence.mp3');
      // audio.play()
      //   .then(() => {})
      //   .catch(err => console.log(err.message));
    });

    socket.on('offline_driver', (driver_id) => {
      markers.forEach((marker) => {
        if (marker.id === driver_id) {
          this.marker.setMap(null)
        }
      });
    });
  };

  function generateMarker(elem) {
    let icon = generateIcon(elem);

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(elem.lat, elem.lng),
      icon: icon,
      map: websocket,
    });

    let popup = generateInfo(elem)

    var infowindow = new google.maps.InfoWindow({
      content: popup,
      maxWidth: 250,
    });

    marker.addListener('mouseover', function () {
      infowindow.open(websocket, marker);
    });
    marker.addListener('mouseout', function () {
      infowindow.close(websocket, marker);
    });

    marker['id'] = elem.id;
    marker['name'] = elem.name;
    markers.push(marker);

  }

  function generateInfo(elem) {
    return `<b>Info</b>
    <p>Driver Name: ` + elem.name + '</p>' +
      '<p>Last Seen: ' + elem.last_seen + '</p>' +
      '<p>Last Action: ' + ACTION_STATUS[elem.last_action] + '</p>' +
      '<p>GPS/SCREEN: ' + (elem.gps_status == 1 ? 'on' : 'off') + '/' + (elem.screen_status == 1 ? 'on' : 'off') + '</p>';
  }

  function generateIcon(elem) {
	   console.log(elem);
    if(!elem.vehicle_type || ( elem.vehicle_type < 1 || elem.vehicle_type > 4))
    {
      elem.vehicle_type == 1
    }
    else if(elem.vehicle_type == 3) {
      elem.vehicle_type == 4
    }
	
	 if(!elem.last_action || ( elem.last_action < 0))
    {
      elem.last_action == 3
    }
	
    return {
      url: base_url + '/../assets/images/' + DRIVERS_ICONS[elem.vehicle_type] + '_' + ACTION_STATUS[elem.last_action] + '.png',
      scaledSize: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0),
    }

  }