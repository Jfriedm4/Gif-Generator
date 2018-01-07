$(function() {

    var gifCategories = ["scooby-doo", "rick grimes", "ramen noodles"];

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
        var chosenGif = $(this).id;
        console.log($(this).id);
        
        
        var queryURL = urlBase + chosenGif + apiKey + gifNumber;

        $(".gifTitle").html(chosenGif);

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $(".gifResult");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(gifImage);
                $("#gifs-appear-here").prepend(gifDiv);
            } 
        });
    })

});