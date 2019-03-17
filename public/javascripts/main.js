//   var map;
    //   function initMap() {
        // var uluru = {lat: 17.427647, lng: 78.445270};
        // var map = new google.maps.Map(
        //     document.getElementById('map'), {zoom: 18, center: uluru});
        // var marker = new google.maps.Marker({position: uluru, map: map});
        var flag;
        var marker;
        function initMap() {
            var image;
            console.log(document.getElementById("value").innerText);
            flag = document.getElementById("value").innerText;
            if(flag==1){
                image = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            }
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: {lat: 17.427647, lng: 78.445270}
        });
        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">ACCIDENT OCCURED</h1>'+
            '<div id="bodyContent">'+
            '<p>A car crash has occured at this location </p>'+
            '</div>'+
            '</div>';
 
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: {lat: 17.427647, lng: 78.445270},
            icon: image
        });
        marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: {lat: 17.427555, lng: 78.45700}
        });
        marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: {lat: 17.426706, lng: 78.452170}
        });
        marker.addListener('click', function(){
            infowindow.open(map, marker);
        });
        // var flightPlanCoordinates = [
        //     {lat: 17.428453998899, lng: 78.442960493164},
        //     {lat: 17.428376997786, lng: 78.443008986288},
        //     {lat: 17.428299996661, lng: 78.443057479371},
        //     {lat: 17.428222995525, lng: 78.443105972412},
        //     {lat: 17.428145994376, lng: 78.443154465413}
        // ];
        // var flightPath = new google.maps.Polyline({
        //     path: flightPlanCoordinates,
        //     geodesic: true,
        //     strokeColor: '#FF0000',
        //     strokeOpacity: 1.0,
        //     strokeWeight: 6
        // }); 

        // flightPath.setMap(map);

        }
        // function changeMarkerPosition(marker) {
        //     var latlng = new google.maps.LatLng(-24.397, 140.644);
        //     marker.setPosition(latlng);
        // }
        // fetch('./waypoints.json').then(response => {
        //     return response.json();
        //     }).then(data => {
        //     // Work with JSON data here
        //     console.log(data.X,data.Y);
        //     }).catch(err => {
        //     // Do something for an error here
        //     });
        // }

        // function toggleBounce() {
        // if (marker.getAnimation() !== null) {
        //     marker.setAnimation(null);
        // } else {
        //     marker.setAnimation(google.maps.Animation.BOUNCE);
        // }
        // } -->