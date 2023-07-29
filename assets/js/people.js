$(document).ready(function() {
    //Dynamically load people
     $.ajax({
        type: "GET",
        url: "data/people.csv",
        dataType: "text",
        success: function(data) {processPeople(data);}
    });
});
// {/* <div class="col-3">
//     <article class="item">
//         <a href="https://gr.xjtu.edu.cn/en/web/minnluo/home" target="_blank"
//             class="image fit"><img src="images/people/minnan_luo.jpg" alt="" /></a>
//         <header>
//             <h3><strong>Minnan Luo</strong><br /><em> Advisor, Professor</em> </br><a href="mailto:minnluo@xjtu.edu.cn">minnluo at xjtu.edu.cn</a></h3>
//         </header>
//     </article>
// </div> */}
function processPeople(allText) {
    arrData = parseCsv(allText);

    current = [];
    alumni = [];

    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];

        if (data.length == 1 && data[0].length == 0) {
          continue;
        }

        var person = {image:data[0], name:data[1], description:data[2], uniqname:data[3], email_domain:data[4], link:data[5], status:data[6],highlight:data[7]};
        if(person.status=="Alumni") {
            alumni.push(person);
        } else if(person.status=="Current") {
            current.push(person);
        }
    }

    var rowNum = -1;
    var entriesAdded = 0;
    for(var i=0; i<current.length; ++i) {
        person = current[i];
        if(!person.image) person.image='profile.png'
        if(person.link) {
            entry = '<div class="col-3"><article class="item profile"><a href="'+person.link+'" target="_blank" class="image fit"><img src=images/people/'+person.image+' alt="'+person.name+'" /></a>';
        } else {
            entry = '<div class="col-3"><article class="item profile"><img src=images/people/'+person.image+' alt="'+person.name+'" />';
        }
        entry=entry+'<header><h3>'+person.name+'</h3><p><em>'+person.description+'</em></p>';

        if(person.uniqname && person.email_domain) {
            entry = entry + '<p><a href="mailto:'+person.uniqname+'@'+person.email_domain+'">'+person.uniqname+' at '+person.email_domain+'</a>';
        }

        entry = entry + '</p></header></article></div>';

        if(!(entriesAdded % 4)) { //append new row
            rowNum = rowNum + 1;
            if(rowNum) $('#current_members').append('</br>');
            $('#current_members').append('<div class="row" id="current_members_row_' + rowNum +'">');
        }

        $('#current_members_row_' + rowNum).append(entry);
        if(person.highlight==2) $($('#current_members article')[entriesAdded]).addClass('advisor');
        if(person.highlight==1) $($('#current_members article')[entriesAdded]).addClass('director');
        articleWidth=$('#current_members p')[entriesAdded*2+1].offsetWidth;
        textWidth=$('#current_members em')[entriesAdded].offsetWidth;
        if(textWidth>articleWidth) $('#current_members em')[entriesAdded].style.fontSize=articleWidth*100/textWidth+'%';
        textWidth=$('#current_members a')[entriesAdded*2+1].offsetWidth;
        if(textWidth>articleWidth) $('#current_members a')[entriesAdded*2+1].style.fontSize=articleWidth*100/textWidth+'%';
        entriesAdded = entriesAdded + 1;
    }

    var rowNum = -1;
    var entriesAdded = 0;
    for(var i=0; i<alumni.length; ++i) {
        person = alumni[i];
        if(!person.image) person.image='profile.png'
        if(person.link) {
            entry = '<div class="col-3"><article class="item"><a href="'+person.link+'" target="_blank" class="image fit"><img src=images/people/'+person.image+' alt="'+person.name+'" /></a>';
        } else {
            entry = '<div class="col-3"><article class="item"><img src=images/people/'+person.image+' alt="'+person.name+'" />';
        }
        entry=entry+'<header><h3>'+person.name+'</h3><p><em>'+person.description+'</em></p>';

        if(person.uniqname && person.email_domain) {
            entry = entry + '<p><a href="mailto:'+person.uniqname+'@'+person.email_domain+'">'+person.uniqname+' at '+person.email_domain+'</a>';
        }

        entry = entry + '</p></header></article></div>';

        if(!(entriesAdded % 4)) { //append new row
            rowNum = rowNum + 1;
            if(rowNum) $('#alumni').append('</br>');
            $('#alumni').append('<div class="row" id="alumni_row_' + rowNum +'">');
        }

        $('#alumni_row_' + rowNum).append(entry);
        if(person.highlight==1) $($('#alumni article')[entriesAdded]).addClass('director');
        articleWidth=$('#alumni p')[entriesAdded*2+1].offsetWidth;
        textWidth=$('#alumni em')[entriesAdded].offsetWidth;
        if(textWidth>articleWidth) $('#alumni em')[entriesAdded].style.fontSize=articleWidth*100/textWidth+'%';
        textWidth=$('#alumni a')[entriesAdded*2+1].offsetWidth;
        if(textWidth>articleWidth) $('#alumni a')[entriesAdded*2+1].style.fontSize=articleWidth*100/textWidth+'%';
        entriesAdded = entriesAdded + 1;
    }
}
