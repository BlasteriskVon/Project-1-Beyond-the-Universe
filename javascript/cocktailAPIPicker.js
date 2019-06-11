function findDrinks(x){
    var search = x;
    $("#add-info-div").empty();
    $.ajax({
        url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + search + "&apikey=1",
        method: "GET"
    }).then(function(response) {
        $("#singleDrink").hide();
        if(response.drinks === null){
            var whiteText = $("<p>");
            whiteText.attr("class", "wBoy");
            whiteText.text("Sorry! No results found! :(");
            $("#add-info-div").append(whiteText);
        } else if(response.drinks.length === 1){
        var drinkUsed = response.drinks[0];
        $("#heading").text(drinkUsed.strDrink);
        $("#drinkImage").attr("src", drinkUsed.strDrinkThumb);
        $("#drinkImage").attr("style", "width: 100%; height: auto");
        var ingredientsArray = gatherIngredients(drinkUsed);
        for(var i = 0;i < ingredientsArray.length;i++){
            var newThingy = $("<li>");
            newThingy.attr("style", "list-style-type:disc");
            newThingy.text(ingredientsArray[i]);
            $("#ingredientsList").append(newThingy);
        }
        $("#instructions").text(drinkUsed.strInstructions);
        $("#tips").text("This " + drinkUsed.strAlcoholic.toLowerCase() + " drink is best served in a " + drinkUsed.strGlass + "!");
        $('#descriptionText').text("No information found :(");
        var searchTextA = drinkUsed.strDrink.toLowerCase();
        //Getting all the goods from Wikipedia
        $.ajax({
            type: "GET",
            url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + searchTextA + "&callback=?",
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {

                //Since Wiki displays everything as a png I had to include .split and .join to get the text to display
                var markup = data.parse.text["*"].split('//upload').join('https://upload');
                var blurb = $('<div></div>').html(markup);
                //Console logs the object that is the blurb and what is being returned through the API
                console.log(blurb)

                // remove links as they will not work
                blurb.find('a').each(function () {
                    $(this).replaceWith($(this).html());
                });

                // remove any references
                blurb.find('sup').remove();

                // remove cite error
                blurb.find('.mw-ext-cite-error').remove();
                //Adds the Blurb to the Article div on the HTML page or rather, the description div
                //$('#article').html($(blurb).find('p'));
                $('#descriptionText').html($(blurb).find('p'));

            },
            error: function (errorMessage) {}
        })
        $("#singleDrink").show();
        } else {
            var limit = Math.min((response.drinks.length), 7);
            for(var i = 0;i < limit;i++){
                var newStuff = $("<div id='popup" + response.drinks[i].idDrink + "' style='background-color:lavender; color:black; font-size:60px'>" + response.drinks[i].strDrink + "</div>" +
                "<img src='" + response.drinks[i].strDrinkThumb + "' drink='" + response.drinks[i].idDrink + "'style='width:300px; height:auto' popTo='popup" + response.drinks[i].idDrink + "' class='clickTrigger resizeImageTacoTuesdays' alt='drink image didn't appear...'>");
                $("#add-info-div").append(newStuff);
                $("#popup" + response.drinks[i].idDrink).hide();
            }
        }
    })
}

function findDrinkViaID(x){
    var search = x;
    $("#add-info-div").empty();
    $.ajax({
        url: "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + search + "&apikey=1",
        method: "GET"
    }).then(function(response){
        $("#singleDrink").hide();
        if(response.drinks === null){
            var whiteText = $("<p>");
            whiteText.attr("class", "wBoy");
            whiteText.text("Sorry! No results found! :(");
            $("add-info-div").append(whiteText);
        } else {
        var drinkUsed = response.drinks[0];
        $("#heading").text(drinkUsed.strDrink);
        $("#drinkImage").attr("src", drinkUsed.strDrinkThumb);
        $("#drinkImage").attr("style", "width: 100%; height: auto");
        var ingredientsArray = gatherIngredients(drinkUsed);
        for(var i = 0;i < ingredientsArray.length;i++){
            var newThingy = $("<li>");
            newThingy.attr("style", "list-style-type:disc");
            newThingy.text(ingredientsArray[i]);
            $("#ingredientsList").append(newThingy);
        }
        $("#instructions").text(drinkUsed.strInstructions);
        $("#tips").text("This " + drinkUsed.strAlcoholic.toLowerCase() + " drink is best served in a " + drinkUsed.strGlass + "!");
        $('#descriptionText').text("No information found :(");
        var searchTextB = drinkUsed.strDrink.toLowerCase();
        //Getting all the goods from Wikipedia
        $.ajax({
            type: "GET",
//the API URL with the searchText variable placed inside
            url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + searchTextB + "&callback=?",
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                //Since Wiki displays everything as a png I had to include .split and .join to get the text to dispaly
                var markup = data.parse.text["*"].split('//upload').join('https://upload');
                var blurb = $('<div></div>').html(markup);
                //Console logs the object that is the blurb and what is being returned through the API
                console.log(blurb)
                // remove links as they will not work
                blurb.find('a').each(function () {
                    $(this).replaceWith($(this).html());
                });
                // remove any references
                blurb.find('sup').remove();
                // remove cite error
                blurb.find('.mw-ext-cite-error').remove();
                //Adds the Blurb to the Article div on the HTML page or rather, the description div
                //$('#article').html($(blurb).find('p'));
                $('#descriptionText').html($(blurb).find('p'));
            },
            error: function (errorMessage) {//do this
            }
        })
        $("#singleDrink").show();
        }
    })
}

function findIngredients(x){
    var search = x;
    $("#add-info-div").empty();
    $.ajax({
        url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + search + "&apikey=1",
        method: "GET"
    }).then(function(response){
        $("#singleDrink").hide();
        if(response.ingredients === null){
            var whiteText = $("<p>");
            whiteText.attr("class", "wBoy");
            whiteText.text("Sorry! No results found! :(");
            $("#add-info-div").append(whiteText);
        } else {
            ingredientUsed = response.ingredients[0];
            var newIngredient = $("<div class='card' style='width:100%'>" +
            "<div class='card-body'><h5 class='card-title'Name: >" + ingredientUsed.strIngredient + "</h5>" +
            "<p class='card-text'>Type: " + nullChecker(ingredientUsed.strType) + "</p>" + 
            "<p class='card-text'>Description: " + nullChecker(ingredientUsed.strDescription) + "</p>" + 
            "</div></div>");
            $("#add-info-div").append(newIngredient);
            var resultsHeader = $("<h4>Drinks That Include This Ingredient:</h4>");
            $("#add-info-div").append(resultsHeader);
            $.ajax({
                url: "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + search + "&apikey=1",
                method: "GET"
            }).then(function(response){
                $("#singleDrink").hide();
                var limit = Math.min((response.drinks.length), 7);
                for(var i = 0;i < limit;i++){                    
                    var newStuff = $("<div id='popup" + response.drinks[i].idDrink + "' style='background-color:lavender; color:black; font-size:60px'>" + response.drinks[i].strDrink + "</div>" +
                    "<img src='" + response.drinks[i].strDrinkThumb + "' drink='" + response.drinks[i].idDrink + "'style='width:300px; height:auto' popTo='popup" + response.drinks[i].idDrink + "' class='clickTrigger resizeImageTacoTuesdays' alt='drink image didn't appear...'>");
                    $("#add-info-div").append(newStuff);
                    $("#popup" + response.drinks[i].idDrink).hide();
                }
            })
        }
    })
}

function gatherIngredients(drink){
    var ingredients = [];
    if((drink.strIngredient1 != null)&&(drink.strIngredient1 != "")){ingredients.push(drink.strIngredient1+ " " + drink.strMeasure1)};
    if((drink.strIngredient2 != null)&&(drink.strIngredient2 != "")){ingredients.push(drink.strIngredient2+ " " + drink.strMeasure2)};
    if((drink.strIngredient3 != null)&&(drink.strIngredient3 != "")){ingredients.push(drink.strIngredient3+ " " + drink.strMeasure3)};
    if((drink.strIngredient4 != null)&&(drink.strIngredient4 != "")){ingredients.push(drink.strIngredient4+ " " + drink.strMeasure4)};
    if((drink.strIngredient5 != null)&&(drink.strIngredient5 != "")){ingredients.push(drink.strIngredient5+ " " + drink.strMeasure5)};
    if((drink.strIngredient6 != null)&&(drink.strIngredient6 != "")){ingredients.push(drink.strIngredient6+ " " + drink.strMeasure6)};
    if((drink.strIngredient7 != null)&&(drink.strIngredient7 != "")){ingredients.push(drink.strIngredient7+ " " + drink.strMeasure7)};
    if((drink.strIngredient8 != null)&&(drink.strIngredient8 != "")){ingredients.push(drink.strIngredient8+ " " + drink.strMeasure8)};
    if((drink.strIngredient9 != null)&&(drink.strIngredient9 != "")){ingredients.push(drink.strIngredient9+ " " + drink.strMeasure9)};
    if((drink.strIngredient10 != null)&&(drink.strIngredient10 != "")){ingredients.push(drink.strIngredient10+ " " + drink.strMeasure10)};
    if((drink.strIngredient11 != null)&&(drink.strIngredient11 != "")){ingredients.push(drink.strIngredient11+ " " + drink.strMeasure11)};
    if((drink.strIngredient12 != null)&&(drink.strIngredient12 != "")){ingredients.push(drink.strIngredient12+ " " + drink.strMeasure12)};
    if((drink.strIngredient13 != null)&&(drink.strIngredient13 != "")){ingredients.push(drink.strIngredient13+ " " + drink.strMeasure13)};
    if((drink.strIngredient14 != null)&&(drink.strIngredient14 != "")){ingredients.push(drink.strIngredient14+ " " + drink.strMeasure14)};
    if((drink.strIngredient15 != null)&&(drink.strIngredient15 != "")){ingredients.push(drink.strIngredient15+ " " + drink.strMeasure15)};
    return ingredients;
}

function nullChecker(x){
    if(x === null){
        return "None Provided";
    } else {
        return x;
    }
}

$(document).on("click", ".clickTrigger", function(clicked){
    var drinkToGet = $(clicked.target).attr("drink");
    findDrinkViaID(drinkToGet);
});

$(document).on("click", "#submit-btn", function(event){
    event.preventDefault();
    if($("#search-input").val() != ""){
        var drinkInput = $("#search-input").val();
        $("#add-info-div").empty();
        findDrinks(drinkInput);
        $("#search-input").val("");
    }
});

$(document).on("click", "#submit-btn-two", function(event){
    event.preventDefault();
    if($("#search-input-two").val() != ""){
        var ingredientInput = $("#search-input-two").val();
    $("#add-info-div").empty();
    findIngredients(ingredientInput);
    $("#search-input-two").val("");
    }
});

$(document).on("mouseover", ".clickTrigger", function(picture){
    var clickImage = $(picture.target);
    var popping = $("#" + clickImage.attr("popTo"));
    popping.show();
    var popper = new Popper(clickImage,popping,{
        placement: 'top',
        onCreate: function(data){
                console.log(data);
        },
        modifiers: {
                flip: {
                        behavior: ['left', 'right', 'top','bottom']
                },
                offset: { 
                        enabled: false,
                        offset: '0,0'
                }
        }
    });
});

$(document).on("mouseout", ".clickTrigger", function(picture){
    var clickImage = $(picture.target);
    var popping = $("#" + clickImage.attr("popTo"));
    popping.hide();
});

$("#singleDrink").hide();