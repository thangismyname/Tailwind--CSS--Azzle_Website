document.addEventListener("DOMContentLoaded", () => {
  initializeMobileMenu();
  initializeServiceDropdowns();
  initializeUtilitiesSubmenu();
  initializeMobileSubmenu();
  initializeSwiper();
  initializeAnimationObserver();
  initializeQnA();
  initializeCountUp();
  initializePricingTabs();
});

// Mobile menu
function initializeMobileMenu() {
  const elements = {
    mobileMenuButton: document.querySelector('button[type="button"]'),
    mobileMenu: document.querySelector('.lg\\:hidden[role="dialog"]'),
    mobileMenuNavigator: document.getElementById("mobile-menu"),
    closeMobileMenuButton: null, // Will be set after getting mobileMenu
    closeMobileMenuNavigator: document.getElementById("close-mobile-menu"),
    mobileMenuTriggers: document.querySelectorAll(".dropdown-trigger")
  };

  elements.closeMobileMenuButton = elements.mobileMenu.querySelector('button[type="button"]');

  function toggleMobileMenu() {
    elements.mobileMenu.classList.toggle("hidden");
    document.body.classList.toggle("overflow-hidden");
  }

  function toggleMobileMenuNavigator() {
    elements.mobileMenuNavigator?.classList.toggle("active");
  }

  elements.mobileMenuButton.addEventListener("click", toggleMobileMenu);
  elements.closeMobileMenuButton.addEventListener("click", toggleMobileMenu);
  elements.closeMobileMenuNavigator?.addEventListener("click", toggleMobileMenuNavigator);

  elements.mobileMenuTriggers.forEach((trigger) => {
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
  const elements = {
    buttons: document.querySelectorAll(".flex.items-center.gap-x-1"),
    dropdowns: document.querySelectorAll(".absolute.-left-8")
  };

  function toggleServiceDropdown(index) {
    const isExpanded = elements.buttons[index].getAttribute("aria-expanded") === "true";

    // Close all dropdowns
    elements.buttons.forEach((button, i) => {
      button.setAttribute("aria-expanded", "false");
      elements.dropdowns[i].classList.add("hidden");
    });

    // Open the clicked dropdown
    if (!isExpanded) {
      elements.buttons[index].setAttribute("aria-expanded", "true");
      elements.dropdowns[index].classList.remove("hidden");
      animateDropdown(elements.dropdowns[index]);
    }
  }

  elements.buttons.forEach((button, index) => {
    button.addEventListener("click", () => toggleServiceDropdown(index));
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".flex.items-center.gap-x-1") && 
        !event.target.closest(".absolute.-left-8")) {
      elements.buttons.forEach((button, i) => {
        button.setAttribute("aria-expanded", "false");
        elements.dropdowns[i].classList.add("hidden");
      });
    }
  });
}

// Utilities submenu
function initializeUtilitiesSubmenu() {
  const elements = {
    menuItem: document.getElementById("utilities-menu-item"),
    submenu: document.getElementById("utilities-submenu")
  };
  let isSubmenuOpen = false;

  function positionSubmenu() {
    const relocateSubmenu = window.matchMedia("(max-width: 1300px)");
    elements.submenu.style.top = relocateSubmenu.matches ? "740px" : "580px";
    elements.submenu.style.left = relocateSubmenu.matches ? "40px" : "300px";
  }

  function toggleSubmenu(event) {
    event.stopPropagation();
    isSubmenuOpen = !isSubmenuOpen;
    elements.submenu.classList.toggle("hidden", !isSubmenuOpen);
    if (isSubmenuOpen) positionSubmenu();
  }

  elements.menuItem.addEventListener("click", toggleSubmenu);

  document.addEventListener("click", (event) => {
    if (isSubmenuOpen && 
        !elements.submenu.contains(event.target) && 
        !elements.menuItem.contains(event.target)) {
      isSubmenuOpen = false;
      elements.submenu.classList.add("hidden");
    }
  });
}

// Mobile submenu
function initializeMobileSubmenu() {
  const elements = {
    mobileMenu: document.querySelector('.lg\\:hidden[role="dialog"]'),
    productButtons: document.querySelectorAll('button[aria-controls^="disclosure-"]'),
    subProductButtons: document.querySelectorAll('button[aria-controls^="sub-disclosure-"]')
  };

  function toggleMenu(button, menuId) {
    const menu = document.getElementById(menuId);
    if (!menu) return;

    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", !isExpanded);
    menu.classList.toggle("hidden");

    const icon = button.querySelector("svg");
    if (icon) {
      icon.style.transform = isExpanded ? "rotate(0deg)" : "rotate(180deg)";
    }
  }

  function closeOtherMenus(currentButton, buttons) {
    buttons.forEach(button => {
      if (button !== currentButton) {
        const menuId = button.getAttribute("aria-controls");
        const menu = document.getElementById(menuId);
        if (menu?.classList.contains("hidden")) return;
        
        button.setAttribute("aria-expanded", "false");
        menu?.classList.add("hidden");
        const icon = button.querySelector("svg");
        if (icon) icon.style.transform = "rotate(0deg)";
      }
    });
  }

  elements.productButtons.forEach(button => {
    button.addEventListener("click", () => {
      toggleMenu(button, button.getAttribute("aria-controls"));
      closeOtherMenus(button, elements.productButtons);
    });
  });

  elements.subProductButtons.forEach(button => {
    button.addEventListener("click", () => {
      toggleMenu(button, button.getAttribute("aria-controls"));
      closeOtherMenus(button, elements.subProductButtons);
    });
  });
}

// Swiper initialization
function initializeSwiper() {
  new Swiper('.brand-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 }
    }
  });
}

// Animation observer
function initializeAnimationObserver() {
  const observer = new IntersectionObserver(
    entries => {
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
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('[data-animation]').forEach(el => observer.observe(el));
}

// Q&A functionality
function initializeQnA() {
  const qnaItems = document.querySelectorAll('.qna-item');
  let openItem = null;

  function openQnAItem(item, answer, icon) {
    answer.classList.remove('hidden');
    answer.style.maxHeight = `${answer.scrollHeight}px`;
    icon.style.transform = 'rotate(45deg)';
    openItem = item;
  }

  function closeQnAItem(item) {
    const elements = {
      question: item.querySelector('.qna-question'),
      answer: item.querySelector('.qna-answer'),
      icon: item.querySelector('.qna-icon img')
    };

    elements.question.classList.remove('active');
    elements.answer.style.maxHeight = null;
    setTimeout(() => elements.answer.classList.add('hidden'), 300);
    elements.icon.style.transform = 'rotate(0deg)';
    openItem = null;
  }

  function toggleQnA(item) {
    const elements = {
      question: item.querySelector('.qna-question'),
      answer: item.querySelector('.qna-answer'),
      icon: item.querySelector('.qna-icon img')
    };

    if (openItem && openItem !== item) {
      closeQnAItem(openItem);
    }

    elements.question.classList.toggle('active');
    if (elements.question.classList.contains('active')) {
      openQnAItem(item, elements.answer, elements.icon);
    } else {
      closeQnAItem(item);
    }
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
    const config = {
      duration: 2000,
      stepTime: 50
    };
    
    const steps = config.duration / config.stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      el.textContent = Math.round(current);
      
      if (current >= target) {
        clearInterval(timer);
        el.textContent = target;
      }
    }, config.stepTime);
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target.querySelector('.start-number');
          const target = parseInt(el.getAttribute('data-countup-number'), 10);
          animateCountUp(el, target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5, rootMargin: '0px 0px -100px 0px' }
  );

  countUpElements.forEach(el => observer.observe(el));
}

// Pricing tabs
function initializePricingTabs() {
  const elements = {
    buttons: document.querySelectorAll('.tab-button'),
    monthlyContent: document.getElementById('monthly'),
    annuallyContent: document.getElementById('annually')
  };

  if (!elements.buttons.length || !elements.monthlyContent || !elements.annuallyContent) {
    console.error('Required pricing tab elements not found');
    return;
  }

  function switchTab(tabToShow) {
    const contents = {
      monthly: elements.monthlyContent,
      annually: elements.annuallyContent
    };

    // Fade out both contents
    contents.monthly.style.opacity = '0';
    contents.annually.style.opacity = '0';

    setTimeout(() => {
      Object.entries(contents).forEach(([key, content]) => {
        if (key === tabToShow) {
          content.classList.remove('hidden');
          setTimeout(() => content.style.opacity = '1', 50);
        } else {
          content.classList.add('hidden');
        }
      });
    }, 300);
  }

  elements.buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      elements.buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      switchTab(button.getAttribute('data-tab'));
    });
  });

  // Initialize with monthly view
  elements.buttons[0].classList.add('active');
  elements.monthlyContent.classList.remove('hidden');
  elements.annuallyContent.classList.add('hidden');
}

// Helper function for dropdown animation
function animateDropdown(dropdown) {
  dropdown.animate(
    [
      { opacity: 0, transform: "translateY(1px)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    { duration: 200, easing: "ease-out", fill: "forwards" }
  );
}