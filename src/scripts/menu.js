document.querySelector('.hamburger').addEventListener('click', () => {
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');

  // Toggle the 'expanded' class to show or hide the menu
  navLinks.classList.toggle('expanded');
  
  // Toggle the 'active' class for the hamburger icon
  hamburger.classList.toggle('active');
});


document.querySelector('#moreProjects').addEventListener('click', () => {
  const contenedor = document.querySelector('#containerProjects');
  const moreprojects = document.querySelector('#moreProjects');

  // Toggle the 'expanded' class to show or hide the menu
  contenedor.classList.remove('h-[150vh]');
  contenedor.classList.remove('h-auto');
  // Toggle the 'active' class for the hamburger icon
  moreprojects.classList.add('hidden');
});

