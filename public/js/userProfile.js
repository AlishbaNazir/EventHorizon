$(document).ready(function() {
    // Function to handle profile picture upload
    $('.account-settings-fileinput').on('change', function() {
        var input = this.files[0];
        if (input) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#profile-img').attr('src', e.target.result);
            };
            reader.readAsDataURL(input);
        }
    });

    // Function to reset profile picture
    $('.btn-default').on('click', function() {
        $('#profile-img').attr('src', 'https://bootdey.com/img/Content/avatar/avatar1.png');
    });

});
