const container = document.querySelector('.container');
const availableSeats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');

populateUI();

let ticketPrice = +movieSelect.value; // + turns string into number



function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}


// Update number of seats selected and $$$ needed
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Copy selected seats into an array
  // Map through that array
  // Return a new array of indexes
  const seatsIndex = [...selectedSeats].map((seat) => [...availableSeats].indexOf(seat));  // Map returns an arr

  // Local storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.innerHTML = selectedSeats.length;
  total.innerHTML = selectedSeats.length * ticketPrice;
}


// Get data from localstorage and populate UI
function populateUI () {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    availableSeats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Seat Click Event
availableSeats.forEach(seat => {
  seat.addEventListener('click', (e) => {
    seat.classList.toggle('selected'); // You can select and deselect the seat using TOGGLE
    
    updateSelectedCount();
  })
})


// Movie Dropdown Event Listener
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;

  // Local Storage
  setMovieData(e.target.selectedIndex, e.target.value);

  updateSelectedCount();
})

updateSelectedCount();