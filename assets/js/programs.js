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

// 6 Card Map

const cardContainer = document.getElementById("card-container-1");

const cardData = [
  {
    src: "assets/img/programs-image/svg/term-loans.svg",
    title: "Term Loans",
    description: "Steady payments. Predictable costs.",
    description2:
      "Fixed terms up to 7 years for long plays, investments, and expansion.",
    alt: "term-loans",
  },
  {
    src: "assets/img/programs-image/svg/line-of-credit.svg",
    title: "Line of credit",
    description: "Draw what you need, when you need it.",
    description2: "Flexible access to capital, only pay on what you use.",
    alt: "Line of Credit",
  },
  {
    src: "assets/img/programs-image/svg/revenue.svg",
    title: "Revenue Based Financing",
    description: "Revenue-based capital, not credit-based.",
    description2:
      "Ideal for fast-moving businesses looking for non dilutive capital.",
    alt: "Revenue Based Financing",
  },
  {
    src: "assets/img/programs-image/svg/invoice.svg",
    title: "Invoice Financing / Factoring",
    description: "Waiting on clients? Don’t.",
    description2: "Turn outstanding invoices into working capital, instantly.",
    alt: "Invoice Financing / Factoring",
  },
  {
    src: "assets/img/programs-image/svg/residential-mortages.svg",
    title: "Residential Mortgages",
    description: "Need capital for real estate? Done.",
    description2: "Primary, secondary, DSCR, or flips — we fund it all, fast.",
    alt: "Residential Mortgages",
  },
  {
    src: "assets/img/programs-image/svg/commercial-mortages.svg",
    title: "Commercial Mortgages",
    description: "Asset-backed capital for scaling operators.",
    description2:
      "From multifamily to industrial, we know how to underwrite momentum.",
    alt: "Commercial Mortgages",
  },
];

cardContainer.innerHTML = cardData
  .map(
    (card, i) => `
  <div data-aos="fade-up" data-aos-delay="${(i % 2) * 150}" class="w-full flex justify-center">
  <div
              class="card max-w-139.5 h-auto cursor-pointer hover:-translate-y-1 transition-all duration-300 ease-in-out xl:h-95 w-full bg-custom-white shadow-gridcard rounded-24"
            >
              <div class="card-content p-4 sm:p-6">
                <img
                  width="510"
                  height="202"
                  class="object-cover"
                  src="${card.src}"
                  alt="${card.alt}"
                />
                <h1
                  class="font-semibold text-custom-black mt-4 leading-122 text-[clamp(16px,1.94vw,28px)] text-nowrap"
                >
                 ${card.title}
                 
                </h1>
                <p
                  class="text-base leading-150 mt-2 text-custom-gray font-normal"
                >
                  ${card.description}
                </p>
                <p class="text-base leading-150 text-custom-gray font-normal">${card.description2}</p>
              </div>
            </div>
  </div>
`,
  )
  .join("");

// Year Function

const yearElement = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;

// AOS
AOS.init({
  duration: 800,
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
