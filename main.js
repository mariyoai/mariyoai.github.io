// DOM Elements
const door = document.querySelector('.door');
const imageForm = document.querySelector('.image-form');
const fileInput = document.getElementById('file-input');
const urlInput = document.getElementById('url-input');
const preview = document.getElementById('preview');

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Active navigation link highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Closet functionality
door.addEventListener('click', () => {
  door.classList.toggle('open');
  setTimeout(() => {
    imageForm.classList.toggle('visible');
  }, door.classList.contains('open') ? 300 : 0);
});

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      preview.style.display = 'block';
      urlInput.value = '';
    };
    reader.readAsDataURL(file);
  }
});

urlInput.addEventListener('input', (e) => {
  const url = e.target.value;
  if (url) {
    preview.src = url;
    preview.style.display = 'block';
    fileInput.value = '';
  } else {
    preview.style.display = 'none';
  }
});

preview.addEventListener('error', () => {
  preview.style.display = 'none';
  if (urlInput.value) {
    console.log('Invalid image URL');
  }
});