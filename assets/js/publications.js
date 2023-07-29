//global variables
var years = []; //each year has a name (ie. 2016) and a list of publications
var categories = [];
allSections = ['two','two','two','three','three','three','four','four','four','three','three','three']
//$.cookie('categorySet',0);
var categorySet = ($.cookie('categorySet') != null)
    ? $.cookie('categorySet')
    : 0;
var category = ($.cookie('category') != null)
    ? $.cookie('category')
    : 'nothing';

$(document).ready(function() {

    //Dynamically load publications
     $.ajax({
        type: "GET",
        url: "data/publications.csv",
        dataType: "text",
        success: function(data) {processPublications(data);}
    });
});

function processPublications(data) {
    arrData = parseCsv(data);

    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];

		var publication = {id:i, title:data[1], authors:data[2], publication:data[3], image: data[4], link:data[5], category:data[6], demo:data[7], data:data[8], software:data[9], bibtex:data[10], abstract:data[11], poster:data[12]};

        if(!publication.title) {
            continue;
        }
        if(publication.title) { //don't include if it's just a download and doesn't have a publication title
            var allCats = publication.category.split(',');
            //Is this category already in the array?
            for(var j=0; j<allCats.length; j++) {
                if(allCats[j][0]==' ') {
                    allCats[j] = allCats[j].substr(1);
                }
                var found = 0;
                for(var k=0; k<categories.length; k++) {
                    if(categories[k]==allCats[j]) {
                        found = 1;
                        break;
                    }
                }
                if(found == 0) {
                    categories.push(allCats[j]);
                }
            }

            //Is this year already in the array?
            var found = false;
            for(var j=0; j<years.length; j++) {
                if(years[j].name==data[0]) {
                    found = true;
                    years[j].publications.push(publication);
                    break;
                }
            }
            if(!found) {
                var year = {name:data[0], publications:[publication]};
                years.push(year);
            }
        }
    }

    var currdiv,notfirst;
    showCategories();
    if(categorySet==1) {
        $('#categories').append('</br><p><a onclick="allPublications()" href="">Go back to all publications</a></p>');
        $('#main').append('<section class="three"><div id="category" class="container"><header><h3>'+category+'</h3></header></div></section>')
        currdiv=$('#category');
        notfirst=0;
    }

    for(var i=0; i<years.length; ++i) {
        if(categorySet==0) {
            $('#main').append('<section class="'+allSections[((i+1)*3)%12]+'"><div id="'+years[i].name+'" class="container"><header><h3>'+years[i].name+'</h3></header></div></section>');
            currdiv=$('#'+years[i].name);
            notfirst=0;
        }
        for(var j=0; j<years[i].publications.length; ++j) {
            publication = years[i].publications[j];

            if(categorySet==0) { //show all publications
                entry = showPublication(publication);
                if(notfirst) entry='<br>'+entry;
                else notfirst=1;
                currdiv.append(entry);
            } else { //only show publication if it's in the proper category
                var pubCategories = publication.category.split(', ');
                for(var k=0; k<pubCategories.length; ++k) {
                    if(pubCategories[k]==category) {
                        entry = showPublication(publication);
                        if(notfirst) entry='<br>'+entry;
                        else notfirst=1;
                        currdiv.append(entry);
                    }
                }
            }
        }
    }
}

function allPublications() {
    $.cookie('categorySet',0);
    location.reload();
}

function loadCategory(category) {
    $.cookie('categorySet', 1);
    $.cookie('category',category);
    location.reload();
}

//Template:
//<p class="lead">View publications by category: <a href="">Word Sense Disambiguation</a>, <a
//href="">Semantic Similarity</a>, <a href="">Romanian Texts</a></p>
function showCategories() {
    categories.sort(compareCategories);
    entry = "";
    for(var i=0; i<categories.length; ++i) {
        if(categorySet==1 && category==categories[i]) {
            entry = entry + '<p><a onclick="loadCategory(\'' + categories[i] + '\')" href="#"><b>' + categories[i] + "</b></a></p>";
        } else {
            entry = entry + '<p><a onclick="loadCategory(\'' + categories[i] + '\')" href="#">' + categories[i] + "</a></p>";
        }
    }
    $('#categories').append(entry);
}

function compareCategories(a, b) {
    if(a == "Other") { //Other should always be the last category
        return 1;
    }
    if(b == "Other") {
        return -1;
    }
    if(a > b) {
        return 1;
    } else if(a < b) {
        return -1;
    } else {
        return 0;
    }
}
