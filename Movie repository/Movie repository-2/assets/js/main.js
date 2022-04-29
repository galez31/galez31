




$(document).ready(function () {
    $('.movie__name').focus();

    /*=============== PARALAX ===============*/
    document.addEventListener('mousemove', function (e) {
        this.querySelector('.main__img-bg').style.transform = `translate(${e.clientX/150}px,${e.clientY/150}px)`;
    });

    /*=============== SHOW TABLES ===============*/
    const tableWrap = $('.table__wrapper'),
        showTableWrap = $('#search'),
        closeTableWrap = $('.close'),
        movieName = $('input').val();

    /*=============== HIDDEN TABLES ===============*/
    function hiddenTab() {
        if (showTableWrap) {
            closeTableWrap.click(function () {
                tableWrap.last().removeClass('show-table');
                $('input').val('');
                $('.movie__name').focus();
                location.reload();
            });
        }
    }


    /*=============== TABLE_WRAPPER SHOW & SEARCH MOVE===============*/
    if (showTableWrap) {
        showTableWrap.click(function (e) {
            let movieName = document.querySelector('input').value;
            if (!movieName) {
                alert('please enter movie title');
            } else {
                tableWrap.last().addClass('show-table');

                createMoveList(movieName);
                hiddenTab();                
            }
        });
    }
});


/*=============== FUNCTIONS ===============*/

/*=============== SHOW MoveList ===============*/
function showMoveList(title, year, poster, ratings, actors, genre) {
    const movieListTD = $('#movieList'),
        ratingListTD = $('#ratingList'),
        actorsListTD = $('#actorsList'),
        posterTD = $('.poster');
    let mDbval, rottenVal, metacVal;

    $.each(ratings, function (index, item) {
        switch (item.Source) {
            case 'Internet Movie Database':
                mDbval = item.Value;
                break;

            case 'Rotten Tomatoes':
                rottenVal = item.Value;
                break;

            case 'Metacritic':
                metacVal = item.Value
                break;
        }

        if (!mDbval) mDbval = '-';
        if (!rottenVal) rottenVal = '-';
        if (!metacVal) metacVal = '-';
    })

    // MOVIE LIST
    rowMovie =
        `<tr>
        <td>${title}</td>
        <td>${year}</td>
        <td>${genre}</td>               
        <td>${mDbval}</td>               
        <td>${rottenVal}</td>               
        <td>${metacVal}</td>
        <td>${actors}</td>               
        <td class="resize"><img class="poster" src="${poster}" alt="poster"></td>               
        </tr>                
        `;
    movieListTD.append(rowMovie);

    resizePoster ();
}


function createMoveList(movieName) {
    getMovies(movieName).then((data) => {
        $.each(data.Search, function (index, item) {
            getMovieInfoById(item.imdbID).then((result) => {

                showMoveList(item.Title, item.Year, item.Poster, result.Ratings, result.Actors, result.Genre);

            });
        });
    })
}

/*=============== GET DATA FROM API BY TITLE===============*/
async function getMovies(movieName) {
    let result;

    try {
        result = await $.ajax({
            url: 'https://omdbapi.com',
            data: {
                apikey: '82bbe017',
                s: movieName
            }
        });

        if(result.Response == 'False'){
            console.log(result.Response);
        }
       
            
        
        return result;

    } catch (error) {
        console.error(error);
    }
}

/*=============== GET DATA FROM API BY ID===============*/
async function getMovieInfoById(id) {
    let result;

    try {
        result = await $.ajax({
            url: 'https://omdbapi.com',
            data: {
                apikey: '82bbe017',
                i: id
            }
        });
        return result;

    } catch (error) {
        console.error(error);
    }
}

/*=============== SCALE POSTER ===============*/
function resizePoster () {
    $(".poster").hover(
        function () {
            $(this).addClass("resize-poster");
        },
        function () {
            $(this).removeClass('resize-poster');
        }
    );
}