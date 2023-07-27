allMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];
allSections = ['two','two','two','three','three','three','four','four','four','three','three','three']
$(document).ready(function() {
    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "data/events.csv",
        dataType: "text",
        success: function(data) {processRecentNews(data);}
    });
});

//Template:
//<p class="recent-news-date">Sample date0</p>
//<p class="lead">This is a description of what's happening0 (see more <a href="">here</a>)</p>
function processRecentNews(data) {
    arrData = parseCsv(data);
    
    var dates = []; //each date has a month (integer), a year, and a list of news events (news)
        
    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
        
        var news = {date:data[0], text:data[1]};

        if(!news.text) {
            continue;
        }	
        var news_date = news.date.split('/');
        var currentMonth = news_date[0];
        var currentYear = news_date[2];
        
        //is this month and year already in the dates array?
        var dateFound = false;
        for(var j=0; j<dates.length; j++) {
            if(dates[j].month == currentMonth && dates[j].year == currentYear) {
                dates[j].news.push(news);
                dateFound = true;
                break;
            }
        }
        if(!dateFound) {
            var date = {month:currentMonth, year:currentYear, news:[news]};
            dates.push(date);
        }
    }
    
    for(var j=0; j<dates.length; j++) {
        $('#main').append('<section class="'+allSections[j%12]+'"><div id="' + allMonths[dates[j].month-1] + dates[j].year+'" class="container"><header><h3>'+ allMonths[dates[j].month-1] +' '+ dates[j].year+'</h3></header></div></section>');
        for (var k=0,entry='<p style="text-align:left">'; k<dates[j].news.length; k++) {
            news = dates[j].news[k];
            entry=entry+'<em><strong>'+news.date+'</strong></em></br>'+news.text+'</br></br>';
        }
        $('#'+allMonths[dates[j].month-1] + dates[j].year).append(entry);
    }
}
