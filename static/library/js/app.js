$(document).ready(function () {
    $.ajax('/file_list').done(function (data) {
        let items = [];
        $.each(data, function (i, image_path) {
            items.push('<li><img src="' + image_path + '" alt="' + image_path + '" height="100" width="100"></li>');
        });
        // items.push('<button id="clear_images" class="clr_btn" type="button" value="Clear Images!" onclick="clear_images()">Clear Images!</button>');
        $('.uploaded_file_list').append(items.join(''));
    });

    $('#fetch_emotion').click(function () {
        $.ajax('/fetch_emotion').done(function (data) {
            let items = [];
            $.each(data, function (i, item) {
                items.push('<li><img src="' + item.image_path + '" alt="Smiley face" height="100" width="100"></li>');
                items.push('<li><span class="emotion">' + item.emotion + '</span></li>');
            });
            $('.uploaded_file_list').empty();
            $('.emotions_list').append(items.join(''));
        }).fail(function (response) {
            let err = JSON.parse(response.responseText);
            alert(err.Message);
        });
    });
});

function clear_images() {
    $.ajax('/clear_files').done(function (data) {
        alert(data);
        location.reload();
    }).fail(function (response) {
        let err = JSON.parse(response.responseText);
        alert(err.Message);
    });
}