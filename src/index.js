document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  initializeMobileMenu();

  // Service dropdowns functionality
  initializeServiceDropdowns();

  // Utilities submenu functionality
  initializeUtilitiesSubmenu();

  // Mobile submenu functionality
  initializeMobileSubmenu();

  // Swiper initialization
  initializeSwiper();

  // Intersection Observer for animations
  initializeAnimationObserver();

  // Q&A functionality
  initializeQnA();

  // Count-up animation
  initializeCountUp();
});

// Mobile menu
function initializeMobileMenu() {
  const mobileMenuButton = document.querySelector('button[type="button"]');
  const mobileMenu = document.querySelector('.lg\\:hidden[role="dialog"]');
  const closeMobileMenuButton = mobileMenu.querySelector('button[type="button"]');

  function toggleMobileMenu() {
    mobileMenu.classList.toggle("hidden");
    document.body.classList.toggle("overflow-hidden");
  }

  mobileMenuButton.addEventListener("click", toggleMobileMenu);
  closeMobileMenuButton.addEventListener("click", toggleMobileMenu);

  // Additional mobile menu functionality
  const mobileMenuNavigator = document.getElementById("mobile-menu");
  const closeMobileMenuNavigatorButton = document.getElementById("close-mobile-menu");
  const mobileMenuTriggers = document.querySelectorAll(".dropdown-trigger");

  function toggleMobileMenuNavigator() {
    mobileMenuNavigator.classList.toggle("active");
  }

  if (closeMobileMenuNavigatorButton) {
    closeMobileMenuNavigatorButton.addEventListener("click", toggleMobileMenuNavigator);
  }

  mobileMenuTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const subMenu = trigger.nextElementSibling;
      if (subMenu) {
        subMenu.style.display = subMenu.style.display === "block" ? "none" : "block";
        trigger.classList.toggle("open");
      }
    });
  });
}

// Service dropdowns
function initializeServiceDropdowns() {
  const serviceButtons = document.querySelectorAll(".flex.items-center.gap-x-1");
  const serviceDropdowns = document.querySelectorAll(".absolute.-left-8");

  function toggleServiceDropdown(index) {
    const isExpanded = serviceButtons[index].getAttribute("aria-expanded") === "true";

    // Close all dropdowns
    serviceButtons.forEach((button, i) => {
      button.setAttribute("aria-expanded", "false");
      serviceDropdowns[i].classList.add("hidden");
    });

    // Open the clicked dropdown
    if (!isExpanded) {
      serviceButtons[index].setAttribute("aria-expanded", "true");
      serviceDropdowns[index].classList.remove("hidden");
      animateDropdown(serviceDropdowns[index]);
    }
  }

  serviceButtons.forEach((button, index) => {
    button.addEventListener("click", () => toggleServiceDropdown(index));
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".flex.items-center.gap-x-1") && !event.target.closest(".absolute.-left-8")) {
      serviceButtons.forEach((button, i) => {
        button.setAttribute("aria-expanded", "false");
        serviceDropdowns[i].classList.add("hidden");
      });
    }
  });
}

// Utilities submenu
function initializeUtilitiesSubmenu() {
  const utilitiesMenuItem = document.getElementById("utilities-menu-item");
  const utilitiesSubmenu = document.getElementById("utilities-submenu");
  let isUtilitiesSubmenuOpen = false;

  function toggleUtilitiesSubmenu(event) {
    event.stopPropagation();
    isUtilitiesSubmenuOpen = !isUtilitiesSubmenuOpen;
    utilitiesSubmenu.classList.toggle("hidden", !isUtilitiesSubmenuOpen);

    if (isUtilitiesSubmenuOpen) {
      positionUtilitiesSubmenu();
    }
  }

  function positionUtilitiesSubmenu() {
    const rect = utilitiesMenuItem.getBoundingClientRect();
    const relocateSubmenu = window.matchMedia("(max-width: 1300px)");
    utilitiesSubmenu.style.top = relocateSubmenu.matches ? "740px" : "580px";
    utilitiesSubmenu.style.left = relocateSubmenu.matches ? "40px" : "300px";
  }

  utilitiesMenuItem.addEventListener("click", toggleUtilitiesSubmenu);

  // Close utilities submenu when clicking outside
  document.addEventListener("click", (event) => {
    if (isUtilitiesSubmenuOpen && !utilitiesSubmenu.contains(event.target) && !utilitiesMenuItem.contains(event.target)) {
      isUtilitiesSubmenuOpen = false;
      utilitiesSubmenu.classList.add("hidden");
    }
  });
}

// Mobile submenu
function initializeMobileSubmenu() {
  const mobileMenu = document.querySelector('.lg\\:hidden[role="dialog"]');
  const mobileProductButtons = mobileMenu.querySelectorAll('button[aria-controls^="disclosure-"]');
  const subMobileProductButtons = mobileMenu.querySelectorAll('button[aria-controls^="sub-disclosure-"]');

  function toggleMobileMenu(button, menuId) {
    const menu = document.getElementById(menuId);
    if (!menu) return;

    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", !isExpanded);
    menu.classList.toggle("hidden");

    const dropdownIcon = button.querySelector("svg");
    if (dropdownIcon) {
      dropdownIcon.style.transform = isExpanded ? "rotate(0deg)" : "rotate(180deg)";
    }
  }

  function closeOtherMenus(currentButton, buttons) {
    buttons.forEach((otherButton) => {
      if (otherButton !== currentButton) {
        const otherMenuId = otherButton.getAttribute("aria-controls");
        const otherMenu = document.getElementById(otherMenuId);
        if (otherMenu && !otherMenu.classList.contains("hidden")) {
          otherButton.setAttribute("aria-expanded", "false");
          otherMenu.classList.add("hidden");
          const otherIcon = otherButton.querySelector("svg");
          if (otherIcon) {
            otherIcon.style.transform = "rotate(0deg)";
          }
        }
      }
    });
  }

  mobileProductButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      toggleMobileMenu(button, button.getAttribute("aria-controls"));
      closeOtherMenus(button, mobileProductButtons);
    });
  });

  subMobileProductButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      toggleMobileMenu(button, button.getAttribute("aria-controls"));
      closeOtherMenus(button, subMobileProductButtons);
    });
  });
}

// Swiper initialization
function initializeSwiper() {
  new Swiper('.brand-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    },
  });
}

// Animation observer
function initializeAnimationObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationClass = element.dataset.animation;
        if (animationClass) {
          element.classList.add(animationClass, 'animation');
        }
        observer.unobserve(element);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-animation]').forEach(el => observer.observe(el));
}

// Q&A functionality
function initializeQnA() {
  const qnaItems = document.querySelectorAll('.qna-item');
  let openItem = null;

  function toggleQnA(item) {
    const question = item.querySelector('.qna-question');
    const answer = item.querySelector('.qna-answer');
    const icon = item.querySelector('.qna-icon img');

    if (openItem && openItem !== item) {
      closeQnAItem(openItem);
    }

    question.classList.toggle('active');
    if (question.classList.contains('active')) {
      openQnAItem(item, answer, icon);
    } else {
      closeQnAItem(item);
    }
  }

  function openQnAItem(item, answer, icon) {
    answer.classList.remove('hidden');
    answer.style.maxHeight = answer.scrollHeight + 'px';
    icon.style.transform = 'rotate(45deg)';
    openItem = item;
  }

  function closeQnAItem(item) {
    const question = item.querySelector('.qna-question');
    const answer = item.querySelector('.qna-answer');
    const icon = item.querySelector('.qna-icon img');

    question.classList.remove('active');
    answer.style.maxHeight = null;
    setTimeout(() => answer.classList.add('hidden'), 300);
    icon.style.transform = 'rotate(0deg)';
    openItem = null;
  }

  qnaItems.forEach(item => {
    const question = item.querySelector('.qna-question');
    question.addEventListener('click', () => toggleQnA(item));
  });
}

// Count-up animation
function initializeCountUp() {
  const countUpElements = document.querySelectorAll('[data-module="countup"]');

  function animateCountUp(el, target) {
    const duration = 2000;
    const stepTime = 50;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      el.textContent = Math.round(current);
      if (current >= target) {
        clearInterval(timer);
        el.textContent = target;
      }
    }, stepTime);
  }

  const looker = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target.querySelector('.start-number');
        const target = parseInt(el.getAttribute('data-countup-number'), 10);
        animateCountUp(el, target);
        looker.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5, rootMargin: '0px 0px -100px 0px' });

  countUpElements.forEach(el => looker.observe(el));
}

// Helper function for dropdown animation
function animateDropdown(dropdown) {
  dropdown.animate(
    [
      { opacity: 0, transform: "translateY(1px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 200, easing: "ease-out", fill: "forwards" }
  );
}