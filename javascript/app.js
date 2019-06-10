
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCHEAOhLzwmgYdqvuIS9yHJwEbIt9BHjW8",
    authDomain: "project-1-9f8f4.firebaseapp.com",
    databaseURL: "https://project-1-9f8f4.firebaseio.com",
    projectId: "project-1-9f8f4",
    storageBucket: "project-1-9f8f4.appspot.com",
    messagingSenderId: "19657218555",
    appId: "1:19657218555:web:efebe7e27b1fe42f"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();
 
  // button for liquor search
  $("#submit-btn").on("click", function(event){
    event.preventDefault();

    // user's search
    var searchDrink = $("#search-input").val().trim();

    // "temporary" object for holding drink data
    var newDrink = {
        drink: searchDrink,
    };

    // pushes drink data to the database
    database.ref().push(newDrink);

    // console logs the temporary variable
    console.log(newDrink.drink);

    // clears the search box
    $("#search-input").val("");
    
  })

  $("#submit-btn-two").on("click", function(event){
    event.preventDefault();

    // user's search
    var searchIngredient = $("#search-input-two").val().trim();

    // "temporary" object for holding drink data
    var newIngredient = {
        ingredient: searchIngredient,
    };

    // pushes drink data to the database
    database.ref().push(newIngredient);

    // console logs the temporary variable
    console.log(newIngredient.ingredient);

    // clears the search box
    $("#search-input-two").val("");
    
  });

  // creates firebase event for adding drinks and ingredients  
    
    database.ref().limitToLast(10).on("child_added", function(childSnapshot){

      var searchDrink = childSnapshot.val().drink;
      var searchIngredient = childSnapshot.val().ingredient;
  
      // creates new row of past searched drinks & ingredients
      var newRow = $("<tr>").append(
        $("<tr>").text(searchDrink),
        $("<tr>").text(searchIngredient),
      );
  
      // appends the new row to the table/html page
      $("#drink-table > tbody").prepend(newRow);
     
  
    });




      

    
