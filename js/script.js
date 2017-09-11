$(document).ready(function() {
    $('.fancybox').fancybox();
})

// searachbar handler
$(function() {
    var searchField = $('.search-field');
    var icon = $("#searchbutton")

    // focus event handler
    $(searchField).on('focus', function() {
        $(this).animate({ width: '100%' }, 400);
        $(icon).animate({ right: '10px' }, 400);

    })

    // blur event handler
    $(searchField).on('blur', function() {
        if (searchField.val() == '') {

        }
    });

    // prevent default submit
    $('#searchform').submit(function(event) {
        event.preventDefault();
    })
});

// search function
function search() {
    // clear results
    $('#results').html('');
    $('#buttons').html('');

    // get form input
    var query = $('#query').val();

    // run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: query,
            type: 'video',
            key: 'AIzaSyCYFuME-V1kn24rIjufLns7iYnHTsgYFic'
        },
        function(data) {
            console.log(data);

            // grab next and prev page tokens
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            // loop through each result item
            $.each(data.items, function(i, item) {
                // get output
                var output = getOutput(item);
                // display results
                $('#results').append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken)

            // display buttons
            $('#buttons').append(buttons);
        }
    );
}

// build output
function getOutput(item) {
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    // build output string
    var output = '<li>' +
        '<div class="list-left">' +
        '<img src="' + thumb + '" >' +
        '</div>' +
        '<div class="list-right">' +
        '<h3><a href="http://www.youtube.com/embed/' + videoId + '">' + title + '</a></h3>' +
        '<small>By <span class="cTitle">' + channelTitle + '</span> on ' + videoDate + '</small>' +
        '<p>' + description + '</p>' +
        '</div>' +
        '</li>' +
        '<div class="clearFix"></div>' +
        '';
    return output;

};

function getButtons(prevPageToken, nextPageToken) {
    if (!prevPageToken) {
        var btnOutput =
            '<div class="button-container">' +
            '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + query + '" onclick="nextPage();">Next Page</button>' +
            '</div>';
    } else {
        var btnOutput =
            '<div class="button-container">' +
            '<button id="prev-button" class="paging-button" data-token="' + prevPageToken + '" data-query="' + query + '" onclick="prevPage();">Previous Page</button>' +
            '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + query + '" onclick="nextPage();">Next Page</button>' +
            '</div>';
    }

    return btnOutput;
};

function nextPage() {
    var token = $('#next-button').data('token');
    var query = $('#next-button').data('query');
    // clear results
    $('#results').html('');
    $('#buttons').html('');

    // get form input
    var query = $('#query').val();

    // run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: query,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyCYFuME-V1kn24rIjufLns7iYnHTsgYFic'
        },
        function(data) {
            console.log(data);

            // grab next and prev page tokens
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            // loop through each result item
            $.each(data.items, function(i, item) {
                // get output
                var output = getOutput(item);
                // display results
                $('#results').append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken)

            // display buttons
            $('#buttons').append(buttons);
        }
    );
};

function prevPage(prevPageToken) {
    var token = $('#prev-button').data('token');
    var query = $('#prev-button').data('query');
    // clear results
    $('#results').html('');
    $('#buttons').html('');

    // get form input
    var query = $('#query').val();

    // run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: query,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyCYFuME-V1kn24rIjufLns7iYnHTsgYFic'
        },
        function(data) {
            console.log(data);

            // grab next and prev page tokens
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            // loop through each result item
            $.each(data.items, function(i, item) {
                // get output
                var output = getOutput(item);
                // display results
                $('#results').append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken)

            // display buttons
            $('#buttons').append(buttons);
        }
    );
}