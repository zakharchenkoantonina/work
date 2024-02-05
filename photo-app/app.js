$(function() {
    // DOM is now ready
    _500px.init({
        sdk_key: 'c207dbdfff55dfd9ec1eac730ebc6f6221606384'
    });

    // When a successful login to 500px is made, they fire off the 'authorization_obtained' event
    _500px.on('authorization_obtained', function() {
        // Successful OAuth login!
        $(".sign-in-view").hide();
        $(".image-results-view").show();

        // conditions for if you browser supports geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                var radius = "25mi";

                var searchOptions = {
                    geo: lat + "," + long + "," + radius,
                    only: "Landscapes",
                    image_size: 3,
                    rpp: 50,
                    sort: "highest_rating"
                };

                _500px.api('/photos/search', searchOptions, function(response) {
                    console.log(response);
                    if (response.data.photos.length == 0) {
                        alert("No photos! Nothing to see here.");
                    } else {
                        handleResponseSuccess(response);
                    }
                });
            });
        } else {
            alert("Browser navigator is not available.");
        }
    });

    function handleResponseSuccess(response) {
        var allPhotos = response.data.photos;

        $.each(allPhotos, function() {
            var elm = $('<img>').attr('src', this.image_url).addClass('image');
            $('.images').append(elm);
        });
    }

    $('#login').click(function() {
        _500px.login();
    });

    _500px.getAuthorizationStatus();

});
