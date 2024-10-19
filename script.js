const book = document.getElementById('book');
const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const startButton = document.getElementById('startButton');
const birthdayMessage = document.querySelector('.birthday-message');
const bookContainer = document.querySelector('.book-container');
const controls = document.querySelector('.controls');
const toggleMusic = document.getElementById('toggleMusic');
const bgMusic = document.getElementById('bgMusic');
const closeBtn = document.getElementById('closeBtn');

let currentPage = 0;
let isAnimating = false;

function updateBook() {
  if (isAnimating) return;
  isAnimating = true;

  pages.forEach((page, index) => {
    if (index < currentPage) {
      page.style.transform = 'rotateY(-180deg)';
    } else {
      page.style.transform = 'rotateY(0deg)';
    }
    page.style.zIndex = pages.length - Math.abs(currentPage - index);
  });

  book.style.transform = `rotateY(${currentPage * -3}deg)`; // Ubah nilai -2 atau sesuai keinginan

  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === pages.length - 1;

  setTimeout(() => {
    isAnimating = false;
  }, 500);
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 0 && !isAnimating) {
    currentPage--;
    updateBook();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < pages.length - 1 && !isAnimating) {
    currentPage++;
    updateBook();
  }
});

startButton.addEventListener('click', () => {
  birthdayMessage.style.display = 'none';
  bookContainer.style.display = 'block';
  controls.style.display = 'block';
  bgMusic.play();
  updateBook(); // Tambahkan ini untuk menginisialisasi buku
});

toggleMusic.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    toggleMusic.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1.5-4.5v-7l6 3.5-6 3.5z"/>
      </svg>
    `;
  } else {
    bgMusic.pause();
    toggleMusic.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1.5-4.5v-7l6 3.5-6 3.5z"/>
      </svg>
    `;
  }
});

// Inisialisasi posisi awal halaman
updateBook();

const createConfetti = () => {
  const colors = ['#fce38a', '#f38181', '#eaffd0', '#95e1d3'];
  const confettiCount = 200;

  for (let i = 0; i < confettiCount; i++) {
    let confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDelay = Math.random() * 5 + 's';
    document.querySelector('.confetti').appendChild(confetti);
  }
};

createConfetti();

closeBtn.addEventListener('click', () => {
  bookContainer.style.display = 'none';
  controls.style.display = 'none';
  birthdayMessage.style.display = 'block';
  currentPage = 0;
  updateBook();
});
