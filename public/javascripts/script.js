window.onload = function() {
    $('#submit').click(function(event) {
        event.preventDefault();
        $.post('/', { city: $('#city').val()}, function(res) {
            // $('#weather').html(res);
            console.log(res);
        });
    });
}