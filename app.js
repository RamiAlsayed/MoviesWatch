const inp = document.querySelector('#inp');
const btn = document.querySelector('#btn');
const resultArr = document.querySelector('#resultArr');
let movieDataArr = [];

// Event listener for the Search button
btn.addEventListener('click', () => {
  fetch(`https://www.omdbapi.com/?t=${inp.value}&apikey=b30db41c`)
    .then((req) => req.json())
    .then((data) => {
      // Add the movie data to the beginning of the array
      movieDataArr.unshift(data);
      renderMovies(); // Render all movies in the array
    });
});

// Function to render all movies in the array
function renderMovies() {
  // Clear existing content
  resultArr.innerHTML = '';

  // Loop through movieDataArr and render each movie
  movieDataArr.forEach((movie, index) => {
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
        <button class="watchBtn" data-index="${index}">Watchlist</button>
      </div>
    `;

    // Append the movie card to resultArr
    resultArr.innerHTML += html;
  });
}

// Function to show notification
function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.add('show');

  // Hide the notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Event listener for the Watchlist button
resultArr.addEventListener('click', function (event) {
  if (event.target && event.target.classList.contains('watchBtn')) {
    const index = event.target.getAttribute('data-index');

    const movie = movieDataArr[index];

    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    const exists = watchlist.some((item) => item.imdbID === movie.imdbID);
    if (!exists) {
      watchlist.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      showNotification('The film was added to your list!');
    } else {
      showNotification('The film is already in your list!');
    }
  }
});
