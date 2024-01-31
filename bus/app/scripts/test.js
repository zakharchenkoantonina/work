var urlBase = "http://webservices.nextbus.com/service/publicXMLFeed";

function GetTimes(routeNumber, stopNumber) {

    var request = $.ajax({
        url: "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=mbta&r=39&s=91391&terse",
        dataType: "xml"
    });

    request.done(function(xmlData){
        var jsonData = $.xmlToJSON(xmlData);

        var base = jsonData.body.predictions.direction;

        var destination = base["@title"];
        var predictions = base.prediction;

        for(var i = 0; i < predictions.length; i++) {
            var time = predictions[i]["@epochTime"];
            console.log("time:" + time)
            var vehicle = predictions[i]["@vehicle"];
            var out = $("<span>").data("time", time).data("vehicle", vehicle).text(time);
        }

    });

    request.fail(function(xmlData){
        alert();
    });

}

GetTimes();