document.addEventListener('DOMContentLoaded', () => {
  const watchlistContainer = document.querySelector('#watchlistContainer');

  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  if (watchlist.length === 0) {
    watchlistContainer.innerHTML = '<p>Your watchlist is empty.</p>';
  } else {
    watchlist.forEach((movie) => {
      const html = `
          <div class="movie-card">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div class="movie-details">
              <h3>${movie.Title}</h3>
              <p><strong>Runtime:</strong> ${movie.Runtime}</p>
              <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
              <p><strong>Genre:</strong> ${movie.Genre}</p>
              <p><strong>Plot:</strong> ${movie.Plot}</p>
            </div>
            <button class="removeBtn" data-imdbid="${movie.imdbID}">Remove</button>
          </div>
        `;

      // Append the movie card to the watchlist container
      watchlistContainer.innerHTML += html;
    });
  }

  // Event listener for the Remove buttons
  watchlistContainer.addEventListener('click', function (event) {
    if (event.target && event.target.classList.contains('removeBtn')) {
      const imdbID = event.target.getAttribute('data-imdbid');
      // Remove the movie from the watchlist array
      watchlist = watchlist.filter((movie) => movie.imdbID !== imdbID);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      // Remove the movie card from the DOM
      event.target.parentElement.remove();
    }
  });
});
