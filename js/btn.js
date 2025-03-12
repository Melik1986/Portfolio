document.addEventListener('DOMContentLoaded', function() {
  const contactButton = document.querySelector('[data-target="#contact"]');
  
  contactButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    const contactSection = document.querySelector(this.getAttribute('data-target'));
    
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});