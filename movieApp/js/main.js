
$(document).ready(()=>{
    $("#searchForm").on('submit', (e)=>{
        e.preventDefault()
        let searchText = $('#searchText').val()
        getMovies(searchText)
    })
})

function getMovies(Text) {
    $.getJSON('http://www.omdbapi.com/?apikey=8a10e7ce&s='+Text, function(data,err) {
        if(err) {
            console.log(err)
        }
        let movies =data.Search
        console.log(movies)
        let output=''
        $.each(movies, (index, movie)=>{
            output += `
            <div class="col-md-3">
                <div class="well text-center">
                    <img src='${movie.Poster}'>
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primry" href="#">Movie Details</a>
                </div>
            </div>`
        })

        $("#movies").html(output)
    })
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id)
    window.location = 'movie.html'
    return false
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId')
    console.log(movieId)
    $.ajax({
        method:'GET',
        url:'http://www.omdbapi.com/?apikey=8a10e7ce&i='+movieId,
        dataType:'json'
    }).done(function(movie) {
     console.log(movie)
        let output=`
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>`;

        $('#movie').html(output)
    })
}