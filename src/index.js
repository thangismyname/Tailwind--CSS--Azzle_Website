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
      var relocateSubmenu = window.matchMedia("(max-width: 1300px)")
      if (!relocateSubmenu.matches) {
        utilitiesSubmenu.style.top = `580px`;
        utilitiesSubmenu.style.left = `300px`;
      }
      else {
        utilitiesSubmenu.style.top = `740px`;
        utilitiesSubmenu.style.left = `40px`;
        
      }
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
    const mobileProductButtons = mobileMenu.querySelectorAll('button[aria-controls^="disclosure-"]');
    const subMobileProductButtons = mobileMenu.querySelectorAll('button[aria-controls^="sub-disclosure-"]');
  
    function toggleMobileProductMenu(event) {
      const button = event.currentTarget;
      const menuId = button.getAttribute('aria-controls');
      const menu = document.getElementById(menuId);
  
      if (!menu) return;
  
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !isExpanded);
      menu.classList.toggle('hidden');
  
      // Rotate the dropdown icon
      const dropdownIcon = button.querySelector('svg');
      if (dropdownIcon) {
        dropdownIcon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
      }
  
      // Close other open menus
      mobileProductButtons.forEach(otherButton => {
        if (otherButton !== button) {
          const otherMenuId = otherButton.getAttribute('aria-controls');
          const otherMenu = document.getElementById(otherMenuId);
          if (otherMenu && !otherMenu.classList.contains('hidden')) {
            otherButton.setAttribute('aria-expanded', 'false');
            otherMenu.classList.add('hidden');
            const otherIcon = otherButton.querySelector('svg');
            if (otherIcon) {
              otherIcon.style.transform = 'rotate(0deg)';
            }
          }
        }
      });
    }
  
    function toggleMobileProductSubmenu(event) {
      const button = event.currentTarget;
      const submenuId = button.getAttribute('aria-controls');
      const submenu = document.getElementById(submenuId);
  
      if (!submenu) return;
  
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !isExpanded);
      submenu.classList.toggle('hidden');
  
      // Rotate the dropdown icon
      const dropdownIcon = button.querySelector('svg');
      if (dropdownIcon) {
        dropdownIcon.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
      }
  
      // Close other open submenus
      subMobileProductButtons.forEach(otherSubButton => {
        if (otherSubButton !== button) {
          const otherSubmenuId = otherSubButton.getAttribute('aria-controls');
          const otherSubmenu = document.getElementById(otherSubmenuId);
          if (otherSubmenu && !otherSubmenu.classList.contains('hidden')) {
            otherSubButton.setAttribute('aria-expanded', 'false');
            otherSubmenu.classList.add('hidden');
            const otherIcon = otherSubButton.querySelector('svg');
            if (otherIcon) {
              otherIcon.style.transform = 'rotate(180deg)';
            }
          }
        }
      });
    }
  
    mobileProductButtons.forEach(button => {
      button.addEventListener('click', toggleMobileProductMenu);
    });
  
    subMobileProductButtons.forEach(button => {
      button.addEventListener('click', toggleMobileProductSubmenu);
    });

  // Additional mobile menu functionality
  const mobileMenuNavigator = document.getElementById('mobile-menu');
  const closeMobileMenuNavigatorButton = document.getElementById('close-mobile-menu');
  const mobileMenuTriggers = document.querySelectorAll('.dropdown-trigger');

  function toggleMobileMenuNavigator() {
    mobileMenuNavigator.classList.toggle('active');
  }

  if (closeMobileMenuNavigatorButton) {
    closeMobileMenuNavigatorButton.addEventListener('click', toggleMobileMenuNavigator);
  }

  mobileMenuTriggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const subMenu = trigger.nextElementSibling;
      if (subMenu) {
        subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
        trigger.classList.toggle('open');
      }
    });
  });
  });