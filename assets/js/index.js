$(document).ready(function() {

    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "data/events.csv",
        dataType: "text",
        success: function(data) {processRecentNews(data);}
    });

    //Dynamically load slideshow
    /*$.ajax({
        type: "GET",
        url: "data/slideshow.csv",
        dataType: "text",
        success: function(data) {processSlideshow(data);}
    });*/
});

function processRecentNews(data) {
    arrData = parseCsv(data);

    var appended = 0; //Only append the first four recent events
    var entry='<p style="text-align:left">';

    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];

        if (data.length == 1) {
            continue;
        }

        var news = {date:data[0], text:data[1]};
        if(appended)
        {
            entry=entry+'</br></br>';
        }

        if(appended < 4) { //Only show the most recent entries on the home page
            //$('#recent_news').append(entry);
            entry=entry+'<em><strong>'+news.date+'</strong></em></br>'+news.text;
            appended = appended + 1;
        }
        if(appended == 4) {
                entry=entry+'</br></br><strong><em>See more news <a href="news.html">here</a>.</em></strong>';
                break;
        }
    }
    entry=entry+"</p>";
    $('#recent_news').append(entry);
}

/*function processSlideshow(data) {
    arrData = parseCsv(data);

    sortedArr = arrData.slice(1).sort(function (a, b) {
        return parseInt(a[2]) > parseInt(b[2]) ? 1 : -1});

    var dataAdded = 0;
    var slideshow = '';
    for (var i=0; i<sortedArr.length; i++) {
        var data = sortedArr[i];

        if (data.length != 3 || data[2].length == 0) {
            continue;
        }

        var image = {path:data[0], alt:data[1], position:parseInt(data[2])};

        if (image.position === 0) {
            slideshow += '<div class="item active"><img src="images/slideshow/' + image.path + '" alt="' + image.alt + '"></div>\n';
        } else {
            slideshow += '<div class="item"><img src="images/slideshow/' + image.path + '" alt="' + image.alt + '"></div>\n';
        }
        dataAdded++;
    }

    var indicators = '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>';
    for (var i=1; i<dataAdded; i++) {
        indicators += '<li data-target="#myCarousel" data-slide-to=' + i.toString() + '></li>';
    }

    $('.carousel-indicators').append(indicators);
    $('.carousel-inner').append(slideshow);
}*/
