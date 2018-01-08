$(document).ready(function() {
      // global variables
      var buttons = ['Chevy Corvette', 'Chevy Camaro', 'Ford Mustang', 'Aston Martin', 'Koenigsegg', 'Nascar Race Car', 'Le Mans Race Car', 'Land Speed Race Car'];
      var query;
      var returnLimit = 10;
      var gifStatic = [];
      var gifAnimated = [];
      displayButtons();

      function displayButtons() {
        $('#buttons').empty();
        for (var i = 0; i < buttons.length; i++) {
          var btn = $('<button>', {
            'id': buttons[i],
            'type': 'button',
            'class': 'btn btn-info buttons'
          }).text(buttons[i]);
          $('#buttons').append(btn);
        }

        $('.buttons').on('click', function(event) {
          event.preventDefault();
          query = $(this).attr('id');
          console.log(query);
          displayGifs();
        });

      };



      function generateGifs() {
        console.log('begin gif generation');
          $('#main-column').empty();
          for (var i = 0; i < gifStatic.length; i++) {
            var gifUrl_s = gifStatic[i];
            var gifImage = $('<img>');

            gifImage.attr('src', gifUrl_s);
            gifImage.attr('alt', query + ' gif');
            gifImage.attr('class', 'gifs');
            gifImage.attr('id', i);
            gifImage.attr('status', 'pause');
            $('#main-column').append(gifImage);
          }

        $('.gifs').on('click', function(event) {
          event.preventDefault();
          var id = $(this).attr('id');
          console.log('id', id);
          if ($(this).attr('status') === 'pause') {
            $(this).attr('src', gifAnimated[id]);
            $(this).attr('status', 'play');
          }
          else {
            $(this).attr('src', gifStatic[id]);
            $(this).attr('status', 'pause');
          }
        });
      }



      function displayGifs() {
        var q = query.replace(' ', '+');
        console.log('q', q);
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=qkaEriFpJGD4wsNP9Um6v9eqkQd3puIU&q=" + q + '&limit=' +returnLimit;
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
          gifAnimated = [];
          gifStatic = [];
          for (var i = 0; i < response.data.length; i++) {
            var gifUrl_static = response.data[i].images.fixed_height_still.url;
            var gifUrl_animated = response.data[i].images.fixed_height.url;
            gifAnimated.push(gifUrl_animated);
            gifStatic.push(gifUrl_static);
            console.log('response loop complete');
          }
            generateGifs();
        });

      };



          $('#add').on('click', function(event) {
            event.preventDefault();
            var newBtn = $('#newButton').val().trim();
            buttons.push(newBtn);
            displayButtons();
          });

});
