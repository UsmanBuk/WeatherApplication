



/**
 * This code initializes a weather application by fetching the current weather data for the user's location using the Weatherstack API.
 * It first checks if the browser supports geolocation. If it does, it retrieves the user's current position coordinates.
 * Then, it makes an AJAX request to the Weatherstack API to get the weather data for the user's location.
 * The response data is logged to the console for debugging purposes.
 */
// Your code goes here
$(document).ready(function() {
  
    $('.short').hide();
    if(navigator.geolocation) {
        var currentPosition = '';
        navigator.geolocation.getCurrentPosition(function(position) {
            currentPosition = position;
            var latitude = currentPosition.coords.latitude;
            var longitude = currentPosition.coords.longitude;
            console.log(latitude, longitude);

            var url = 'http://api.weatherstack.com/current?access_key=8435c1039755588e1df7de72942a2c0c&query=' + latitude + ',' + longitude;
            
            $.getJSON(url, function(json) {
                var country = json.location.country;
                var city = json.location.name;
                var region = json.location.region;

                var temp_c = json.current.temperature;
                var temp_f = (temp_c * 9/5) + 32; // You can calculate Fahrenheit if needed
                var state = json.current.weather_descriptions[0];
                var last_updated = json.current.observation_time.replace('-', ' ');

                var wind = json.current.wind_speed;
                var humidity = json.current.humidity;
                var time = json.location.localtime.split(' ')[1];
                var cloudcover = json.current.cloudcover;
                console.log(json);

                $('#weather').html(city + ', ' + state + ', ' + country + '<br>Temperature: ' + temp_c + '°C');

                if(temp_c < 18){
                    $('.grey-jumbo').css({
                        backgroundImage: 'url("https://cdn.pixabay.com/photo/2020/09/25/19/17/penguins-5602408_1280.jpg")'
                    });
                    $('#temp').html('<h1>Cold Weather</h1>');
                } else {
                    $('.grey-jumbo').css({
                        backgroundImage: 'url("https://cdn.pixabay.com/photo/2012/12/29/21/11/sunrise-73074_1280.jpg")'
                    });
                    $('#temp').html('<h1>Warm Weather</h1>');
                }
                


                
                $('#info1').html('Time: ' + time);
                $('#info2').html('Wind: ' + wind + ' km/h');

                $('#info3').html('Temperature: ' + temp_c + '°C');     

                $('.short').show();
                var yes = true;
                $('#switch').on('click', function() {
                    if(yes){
                        $('#info3').html('Temperature: ' + temp_f + '°F');
                        yes = false;
                        $('#switch').html('Show in Celsius');
                        
                    } else {
                        $('#info3').html('Temperature: ' + temp_c + '°C');
                        yes = true;
                        $('#switch').html('Show in Fahrenheit');
                    }
                    
                });
                //showing sky status
                if(cloudcover <= 30){
                    $('#info5').html('Clear Sky');
                }else{
                    $('#info5').html('Cloudy Sky');
                }
                //showing humidity status
                $('#info6').html('Humidity: ' + humidity + '%');
                
            });

        });
    }
});
