// =======================
// File: js/main.js
// Vintage Barbershop Project
// ==========================

// ------ DOM Elements ------
const yearEl = document.getElementById("year");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const ctaBtn = document.getElementById("ctaBtn");
const callBtn = document.getElementById("callBtn");
const phoneLink = document.getElementById("phoneLink");
const heading = document.getElementById("heroHeading");
const featureGrid = document.getElementById("featureGrid");
const nav = document.getElementById("nav");
const siteHeader = document.querySelector(".site-header");

// ---------- Services Data (Array of Objects)--------
const services = [
  {
    title: "Classic Haircut",
    text: "Timeless cuts with modern presicion tailored to your style.",
    image: "assets/images/feature-1.jpg",
  },
  {
    title: "Beard Trim",
    text: "Shape and line-up your beard for a clean, sharp finish.",
    image: "assets/images/feature-2.jpg",
  },
  {
    title: "Straight Razor Shave",
    text: "Hot towel treatment with a smooth traditional shave.",
    image: "assets/images/feature-3.jpg",
  },
  {
    title: "Kids Haircuts",
    text: "Patient, gentle cuts for little ones.",
    image: "assets/images/feature-1.jpg",
  },
];

// ---------- Navigation Data (Array of Objects) -----
const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#features" },
  { label: "Book", href: "#cta" },
  { label: "Contact", href: "#footer" },
];

// ------ Helpers/ Functions ---------

// Update footer year automatically
const setCurrentYear = () => {
  const now = new Date();
  yearEl.textContent = now.getFullYear();
};

// Toggle mobile menu/close
let isMenuOpen = false;

const toggleMobileMenu = () => {
  if (!mobileMenu) return;

  if (isMenuOpen === false) {
    mobileMenu.classList.add("is-open");
    isMenuOpen = true;
  } else {
    mobileMenu.classList.remove("is-open");
    isMenuOpen = false;
  }
};

//Close mobile menu (used when link is clicked)
const closeMobileMenu = () => {
  if (!mobileMenu) return;

  mobileMenu.classList.remove("is-open");
  isMenuOpen = false;
};

//Reusable function with parameters
const updateHeadingText = (newText) => {
  if (!heading) return;

  heading.textContent = newText;
};

// Float the header after scrolling down a little
const handleHeaderOnScroll = () => {
  if (!siteHeader) return;

  if (window.scrollY > 10) {
    siteHeader.classList.add("is-scrolled");
  } else {
    siteHeader.classList.remove("is-scrolled");
  }
};

// ------ Render Features using forEach-------
const renderFeatures = () => {
  if (!featureGrid) return;

  services.forEach((service) => {
    const card = document.createElement("article");
    card.classList.add("feature-card");

    card.innerHTML = `
    <img src="${service.image}" alt="${service.title}" class="feature-img" />
    <h3 class="feature-title">${service.title}</h3>
    <p class="feature-text">${service.text}</p>
    `;

    featureGrid.appendChild(card);
  });
};

// ------ Rendr Navigation using map( ) -----
const renderNavigation = () => {
  // Desktop Nav
  if (nav) {
    const navHTML = navLinks
      .map((link) => {
        return `<a href="${link.href}" class="nav-link">${link.label}</a>`;
      })
      .join("");

    nav.innerHTML = navHTML;
  }

  // Mobile Nav
  if (mobileMenu) {
    const mobileHTML = navLinks
      .map((link) => {
        return `<a href="${link.href}" class="mobile-link">${link.label}</a>`;
      })
      .join("");

    mobileMenu.innerHTML = mobileHTML;
  }
};

// ------- Event Listeners -------

// 1) Set your year on page load
setCurrentYear();

// 2) Hamburger menu toggle
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    toggleMobileMenu();
  });
}

// 3) Close mobile menu when a mobile link is clicked
if (mobileMenu) {
  mobileMenu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      closeMobileMenu();
    }
  });
}

// 4) CTA Button: "Book now"
if (ctaBtn) {
  ctaBtn.addEventListener("click", () => {
    updateHeadingText("Booking coming next - great choice!");
  });
}

// 5) Call Button: use the phone number in the footer
if (callBtn) {
  callBtn.addEventListener("click", () => {
    if (phoneLink) {
      updateHeadingText("Call us at " + phoneLink.textContent);
    } else {
      updateHeadingText("Call feature coming next!");
    }
  });
}

// 6) Header changes on scroll
window.addEventListener("scroll", handleHeaderOnScroll);

// Run once on page load in case the page opens already scrolled
handleHeaderOnScroll();

renderFeatures();
renderNavigation();
