const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;


container.addEventListener('click', function (e) {
  if (e.target.className === 'seat' && e.target.className !== 'selected') {
    e.target.classList.add('selected');
    updateSeatCount();
  } else if (e.target.classList.contains('selected')) {
    e.target.classList.remove('selected');
    updateSeatCount();
  }
  
});

function updateSeatCount () {
  let selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  
  const seatsIndex = [...selectedSeats].map(function(seat) {
    return [...seats].indexOf(seat)
  });
  
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}


movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSeatCount();
});

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function populateUI () {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
  if(selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  
  const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));
  
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
updateSeatCount();