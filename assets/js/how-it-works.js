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

// ACCORDIONS

const accordions = document.querySelectorAll(".accordion");

const plusIcon =
  '<path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="#2B2B2B"/>';
const minusIcon = '<path d="M5 11H19V13H5V11Z" fill="#2B2B2B"/>';

function setAccordion(accordion, isOpen) {
  const content = accordion.querySelector(".accordion-content");
  const icon = accordion.querySelector(".accordion-header svg");

  content.classList.add("overflow-hidden");
  content.classList.toggle("grid-rows-[1fr]", isOpen);
  content.classList.toggle("grid-rows-[0fr]", !isOpen);
  icon.innerHTML = isOpen ? minusIcon : plusIcon;
}

accordions.forEach((accordion, index) => {
  setAccordion(accordion, index === 0);

  accordion.addEventListener("click", () => {
    const content = accordion.querySelector(".accordion-content");
    const isOpen = content.classList.contains("grid-rows-[1fr]");

    accordions.forEach((item) => setAccordion(item, false));
    setAccordion(accordion, !isOpen);
  });
});

// YEAR FUNCTION

const yearElement = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;

// AOS

(function () {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isDesktop = window.matchMedia("(min-width: 992px)").matches;
  const DURATION = 800;

  document.querySelectorAll("[data-aos-lg]").forEach(function (el) {
    el.setAttribute(
      "data-aos",
      isDesktop ? el.dataset.aosLg : el.dataset.aosM || "fade-up",
    );
  });

  const title = document.querySelector("[data-split-words]");
  if (title) {
    if (!prefersReduced) {
      const words = title.textContent.trim().split(/\s+/);
      title.innerHTML = words
        .map(function (word, i) {
          return `<span class="hero-rise" style="animation-delay:${100 + i * 80}ms">${word}</span>`;
        })
        .join(" ");
    }
    title.classList.add("is-split");
  }

  if ("IntersectionObserver" in window) {
    const lineObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            lineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 },
    );
    document.querySelectorAll(".step-line").forEach(function (line) {
      lineObserver.observe(line.parentElement);
    });
  } else {
    document.querySelectorAll(".step-line").forEach(function (line) {
      line.parentElement.classList.add("in-view");
    });
  }

  if (!window.AOS) {
    document.querySelectorAll("[data-aos]").forEach(function (el) {
      el.removeAttribute("data-aos");
    });
    return;
  }

  document.addEventListener("aos:in", function (event) {
    const el = event.detail;
    if (!el || !el.classList) return;
    el.classList.add("in-view");
    const duration =
      parseInt(el.getAttribute("data-aos-duration"), 10) || DURATION;
    const delay = parseInt(el.getAttribute("data-aos-delay"), 10) || 0;
    setTimeout(
      function () {
        el.classList.add("aos-done");
      },
      duration + delay + 100,
    );
  });

  AOS.init({
    duration: DURATION,
    easing: "ease-out-cubic",
    once: true,
    offset: 90,
    disable: function () {
      return prefersReduced;
    },
  });

  window.addEventListener("load", function () {
    AOS.refreshHard();
  });
})();
