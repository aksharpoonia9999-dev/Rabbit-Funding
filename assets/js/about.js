if (window.AOS) {
  AOS.init({
    duration: 900,
    easing: "ease-out-cubic",
    offset: 80,
    once: true,
    disable: function () {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
  });

  window.addEventListener("load", function () {
    AOS.refresh();
  });
} else {
  document.querySelectorAll("[data-aos]").forEach(function (el) {
    el.removeAttribute("data-aos");
  });
}

// NAVBAR

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const sidebarList = document.getElementById("sidebarList");
const bars = menuBtn.querySelectorAll(".bar");

const sidebarBase =
  "block w-full py-4 border-b border-gray-100 text-base leading-100 transition-colors";
const sidebarInactive = `${sidebarBase} font-normal text-custom-gray hover:text-custom-black hover:[-webkit-text-stroke:1.2px_currentColor]`;
const sidebarActive = `${sidebarBase} font-semibold text-custom-black`;

const desktopLinks = document.querySelectorAll("#navLinks .nav-link");

function normalize(path) {
  return path.replace(/\/index\.html$/, "/").replace(/\.html$/, "") || "/";
}

function isCurrentPage(link) {
  const raw = link.getAttribute("href");
  if (!raw || raw.includes("#")) return false;
  const url = new URL(raw, location.href);
  return normalize(url.pathname) === normalize(location.pathname);
}

desktopLinks.forEach(function (link) {
  if (isCurrentPage(link)) {
    link.classList.remove(
      "font-normal",
      "leading-150",
      "text-custom-gray",
      "hover:text-custom-black",
      "hover:[-webkit-text-stroke:1.2px_currentColor]",
    );
    link.classList.add("font-semibold", "leading-100", "text-custom-black");
    link.setAttribute("aria-current", "page");
  }
});

desktopLinks.forEach(function (link) {
  const active = link.getAttribute("aria-current") === "page";
  sidebarList.innerHTML += `
    <li>
      <a href="${link.getAttribute("href")}"
         class="${active ? sidebarActive : sidebarInactive}"
         ${active ? 'aria-current="page"' : ""}>
        ${link.textContent.trim()}
      </a>
    </li>
  `;
});

sidebarList.innerHTML += `
  <li class="pt-4">
    <button class="group xs:px-8 w-full h-10 sm:h-14 px-5 border-2 border-solid border-custom-black rounded-full cursor-pointer overflow-hidden relative transition-all duration-500 hover:border-transparent">
      <span class="relative z-10 text-custom-black group-hover:text-white font-semibold text-base text-nowrap leading-100 transition-colors duration-300">Contact Us</span>
      <span class="absolute inset-0 bg-custom-green scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
    </button>
  </li>
`;

function openMenu() {
  sidebar.classList.remove("translate-x-full");
  sidebar.classList.add("translate-x-0");

  sidebar.setAttribute("aria-hidden", "false");
  sidebar.removeAttribute("inert");

  overlay.classList.remove("opacity-0", "pointer-events-none");
  overlay.classList.add("opacity-100");

  document.documentElement.classList.add("overflow-hidden");
  document.body.classList.add("overflow-hidden");

  bars[0].classList.add("translate-y-[9px]", "rotate-45");
  bars[1].classList.add("opacity-0", "scale-x-0");
  bars[2].classList.add("-translate-y-[9px]", "-rotate-45");
}

function closeMenu() {
  sidebar.classList.add("translate-x-full");
  sidebar.classList.remove("translate-x-0");

  sidebar.setAttribute("aria-hidden", "true");
  sidebar.setAttribute("inert", "");

  overlay.classList.add("opacity-0", "pointer-events-none");
  overlay.classList.remove("opacity-100");

  document.documentElement.classList.remove("overflow-hidden");
  document.body.classList.remove("overflow-hidden");

  bars[0].classList.remove("translate-y-[9px]", "rotate-45");
  bars[1].classList.remove("opacity-0", "scale-x-0");
  bars[2].classList.remove("-translate-y-[9px]", "-rotate-45");
}

menuBtn.addEventListener("click", function () {
  if (sidebar.classList.contains("translate-x-0")) {
    closeMenu();
  } else {
    openMenu();
  }
});

overlay.addEventListener("click", closeMenu);

sidebarList.addEventListener("click", function (event) {
  if (event.target.closest("a")) {
    closeMenu();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth >= 992) {
    closeMenu();
  }
});

// SLIDER

new Swiper(".rating-swiper", {
  loop: false,
  slidesPerView: "auto",
  spaceBetween: 24,
  speed: 600,
  grabCursor: true,
  watchOverflow: true,
  navigation: {
    prevEl: ".rating-prev",
    nextEl: ".rating-next",
    disabledClass: "is-disabled",
    lockClass: "is-locked",
  },
});

// Year Function

const yearElement = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;
