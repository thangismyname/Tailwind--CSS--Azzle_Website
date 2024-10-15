document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('button[type="button"]');
    const mobileMenu = document.querySelector('.lg\\:hidden[role="dialog"]');
    const closeMobileMenuButton = mobileMenu.querySelector('button[type="button"]');
  
    function toggleMobileMenu() {
      mobileMenu.classList.toggle('hidden');
      document.body.classList.toggle('overflow-hidden');
    }
  
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    closeMobileMenuButton.addEventListener('click', toggleMobileMenu);
  
    // Service dropdowns functionality
    const serviceButtons = document.querySelectorAll('.flex.items-center.gap-x-1');
    const serviceDropdowns = document.querySelectorAll('.absolute.-left-8');
  
    function toggleServiceDropdown(index) {
      const isExpanded = serviceButtons[index].getAttribute('aria-expanded') === 'true';
      
      // Close all dropdowns
      serviceButtons.forEach((button, i) => {
        button.setAttribute('aria-expanded', 'false');
        serviceDropdowns[i].classList.add('hidden');
      });
  
      // Open the clicked dropdown
      if (!isExpanded) {
        serviceButtons[index].setAttribute('aria-expanded', 'true');
        serviceDropdowns[index].classList.remove('hidden');
        
        // Animation for opening the dropdown
        serviceDropdowns[index].animate(
          [
            { opacity: 0, transform: 'translateY(1px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          { duration: 200, easing: 'ease-out', fill: 'forwards' }
        );
      }
    }

    // Utilities submenu functionality
  const utilitiesMenuItem = document.getElementById('utilities-menu-item');
  const utilitiesSubmenu = document.getElementById('utilities-submenu');
  let isUtilitiesSubmenuOpen = false;

  function toggleUtilitiesSubmenu(event) {
    event.stopPropagation(); // Prevent the event from bubbling up to parent elements
    isUtilitiesSubmenuOpen = !isUtilitiesSubmenuOpen;
    utilitiesSubmenu.classList.toggle('hidden', !isUtilitiesSubmenuOpen);

    // Position the submenu
    if (isUtilitiesSubmenuOpen) {
      const rect = utilitiesMenuItem.getBoundingClientRect();
      utilitiesSubmenu.style.top = `${rect.top}px`;
      utilitiesSubmenu.style.left = `${rect.right}px`;
    }
  }

  utilitiesMenuItem.addEventListener('click', toggleUtilitiesSubmenu);

  // Close utilities submenu when clicking outside
  document.addEventListener('click', (event) => {
    if (isUtilitiesSubmenuOpen && !utilitiesSubmenu.contains(event.target) && !utilitiesMenuItem.contains(event.target)) {
      isUtilitiesSubmenuOpen = false;
      utilitiesSubmenu.classList.add('hidden');
    }
  });

  // Modify the existing toggleDropdown function to handle the utilities submenu
  function toggleDropdown(index) {
    const isExpanded = dropdownButtons[index].getAttribute('aria-expanded') === 'true';
    
    // Close all dropdowns
    dropdownButtons.forEach((button, i) => {
      button.setAttribute('aria-expanded', 'false');
      dropdowns[i].classList.add('hidden');
    });

    // Close utilities submenu
    isUtilitiesSubmenuOpen = false;
    utilitiesSubmenu.classList.add('hidden');

    // Open the clicked dropdown
    if (!isExpanded) {
      dropdownButtons[index].setAttribute('aria-expanded', 'true');
      dropdowns[index].classList.remove('hidden');
      
      // Animation for opening the dropdown
      dropdowns[index].animate(
        [
          { opacity: 0, transform: 'translateY(1px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        { duration: 200, easing: 'ease-out', fill: 'forwards' }
      );
    }
  }
  
    serviceButtons.forEach((button, index) => {
      button.addEventListener('click', () => toggleServiceDropdown(index));
    });
  
    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.flex.items-center.gap-x-1') && !event.target.closest('.absolute.-left-8')) {
        serviceButtons.forEach((button, i) => {
          button.setAttribute('aria-expanded', 'false');
          serviceDropdowns[i].classList.add('hidden');
        });
      }
    });
  
    // Mobile submenu functionality
    const mobileProductButton = mobileMenu.querySelector('button[aria-controls="disclosure-1"]');
    const mobileProductSubmenu = document.getElementById('disclosure-1');
  
    function toggleMobileProductSubmenu() {
      const isExpanded = mobileProductButton.getAttribute('aria-expanded') === 'true';
      mobileProductButton.setAttribute('aria-expanded', !isExpanded);
      mobileProductSubmenu.classList.toggle('hidden');
      
      // Rotate the dropdown icon
      const dropdownIcon = mobileProductButton.querySelector('svg');
      dropdownIcon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  
    mobileProductButton.addEventListener('click', toggleMobileProductSubmenu);
  
    // Additional mobile menu functionality
    const mobileMenuNavigator = document.getElementById('mobile-menu');
    const closeMobileMenuNavigatorButton = document.getElementById('close-mobile-menu');
    const mobileMenuTriggers = document.querySelectorAll('.dropdown-trigger');
  
    function toggleMobileMenuNavigator() {
      mobileMenuNavigator.classList.toggle('active');
    }
  
    closeMobileMenuNavigatorButton.addEventListener('click', toggleMobileMenuNavigator);
  
    mobileMenuTriggers.forEach(trigger => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const subMenu = trigger.nextElementSibling;
        subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
        trigger.classList.toggle('open');
      });
    });
  });