$(function() {

    var gifCategories = ["Rick Grimes", "Death Note", "Tina Burger", "Rick and Morty"];

    var urlBase = "https://api.giphy.com/v1/gifs/search?q=";
    var apiKey = "&api_key=mGWJQ1NN14NC9rTAuGNfiAOJWzTpTM5L";
    var gifNumber = "&limit=10";

    for (i = 0; i < gifCategories.length; i++) {
        $(".gifsList").append('<li class="nav-item"><a class="nav-link gifBtn" id="' + gifCategories[i] + '" href="#">' + gifCategories[i] + '</a></li>'); 
    };

    // function to add category
     $(".btn-primary").on("click", function(event){
        event.preventDefault();
        if ($("#inputText").val().trim() == "") {
            return false;
        } else {
            gifCategories.push($("#inputText").val().trim());
            $(".gifsList").append('<li class="nav-item"><a class="nav-link gifBtn" id="' + $("#inputText").val().trim() + '" href="#">' + $("#inputText").val().trim() + '</a></li>');   
        }
    })

    // function get the Gifs
    $(document).on("click", ".gifBtn", function(){  
        var chosenGif = $(this).attr("id");
        
        $(".gifResult").empty();
        
        var queryURL = urlBase + chosenGif + apiKey + gifNumber;

        $(".gifTitle").html(chosenGif);

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            var results = response.data;
            console.log(response.data);
            

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $('<div class="gif"></div>');
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var gifImage = $('<img class="gifImg still">');
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifDiv.append(gifImage);
                gifDiv.append(p);
                $(".gifResult").append(gifDiv);
            } 
        });
    });

    $(document).on("click", ".gifImg", function(){
        var src = $(this).attr("src");
        if($(this).hasClass('still')){
           //stop
           $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
           $(this).removeClass('still');
        } else {
          //play
          $(this).addClass('still');
          $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        }
        
    });

});