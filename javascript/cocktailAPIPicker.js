function findDrinks(x){
    var search = x;
    $("#add-info-div").empty();
    $.ajax({
        url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + search + "&apikey=1",
        method: "GET"
    }).then(function(response) {
        //so.... for drinks, response would be response.drinks[index] for a specific drink
        //let's test getting the array length.
        $("#singleDrink").hide();
        if(response.drinks === null){
            $("#add-info-div").text("Sorry! No results found! :(");
        } else if(response.drinks.length === 1){
        drinkUsed = response.drinks[0];
        $("#heading").text(drinkUsed.strDrink);
        $("#drinkImage").attr("src", drinkUsed.strDrinkThumb);
        $("#drinkImage").attr("style", "width: 100%; height: auto");
        var ingredientsArray = gatherIngredients(drinkUsed);
        for(var i = 0;i < ingredientsArray.length;i++){
            var newThingy = $("<li>");
            newThingy.text(ingredientsArray[i]);
            $("#ingredientsList").append(newThingy);
        }
        $("#instructions").text(drinkUsed.strInstructions);
        $("#singleDrink").show();
        } else {
            var limit = Math.min((response.drinks.length), 7);
            for(var i = 0;i < limit;i++){
                /*var newText = $("<p>",{"class":"clickTrigger"});
                newText.text("   " + response.drinks[i].strDrink);
                newText.attr("drink", response.drinks[i].strDrink);
                $("#add-info-div").append(newText);
                var newImage = $("<img>");
                newImage.attr("src", response.drinks[i].strDrinkThumb);
                newImage.css({"width":"300px", "height":"auto"});
                newImage.attr("drink", response.drinks[i].strDrink);
                newText = newText.prepend(newImage);*/
                var newStuff = $("<div id='popup" + response.drinks[i].idDrink + "' style='background-color:yellow; color:black'>" + response.drinks[i].strDrink + "</div>" +
                "<img src='" + response.drinks[i].strDrinkThumb + "' drink='" + response.drinks[i].strDrink + "'style='width:300px; height:auto' popTo='popup" + response.drinks[i].idDrink + "' class='clickTrigger' alt='drink image didn't appear...'>");
                $("#add-info-div").append(newStuff);
                $("#popup" + response.drinks[i].idDrink).hide();
            }
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
            $("#add-info-div").text("Sorry! No results found! :(");
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
                    /*var newText = $("<p>",{"class":"clickTrigger"});
                    newText.text("   " + response.drinks[i].strDrink);
                    newText.attr("drink", response.drinks[i].strDrink);
                    $("#add-info-div").append(newText);
                    var newImage = $("<img>");
                    newImage.attr("src", response.drinks[i].strDrinkThumb);
                    newImage.css({"width":"300px", "height":"auto"});
                    newImage.attr("drink", response.drinks[i].strDrink);
                    newText = newText.prepend(newImage);*/
                    var newStuff = $("<div id='popup" + response.drinks[i].idDrink + "' style='background-color:yellow; color:black'>" + response.drinks[i].strDrink + "</div>" +
                "<img src='" + response.drinks[i].strDrinkThumb + "' drink='" + response.drinks[i].strDrink + "'style='width:300px; height:auto' popTo='popup" + response.drinks[i].idDrink + "' class='clickTrigger' alt='drink image didn't appear...'>");
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

if((drink.strIngredient15 != null)&&(drink.strIngredient15 != "")){ingredients.push(drink.strIngredient15+ " " + drink.strMeasure15)}
    return ingredients;
}

function nullChecker(x){
    if(x === null){
        return "None Provided";
    } else {
        return x;
    }
}

$("#singleDrink").hide();

/*for(var i = 1;i <= 15;i++){
    var text = $("<p>");
    textAdd = "ingredients.push(drink.strIngredient" + i + "+ \" \" + drink.strMeasure" + i + ")";
    text.html("if((drink.strIngredient" + i + " != null)&&" + "(drink.strIngredient" + i + " != \"\")){" + textAdd + "};");
    $("#add-info-div").append(text);
}*/

$(document).on("click", ".clickTrigger", function(clicked){
    var drinkToGet = $(clicked.target).attr("drink");
    findDrinks(drinkToGet);
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
    if($("#search-input2").val() != ""){
        var ingredientInput = $("#search-input2").val();
    $("#add-info-div").empty();
    findIngredients(ingredientInput);
    $("#search-input2").val("");
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