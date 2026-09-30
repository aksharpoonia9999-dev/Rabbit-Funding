// NAVBAR

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const sidebarList = document.getElementById("sidebarList");
const bars = menuBtn.querySelectorAll(".bar");

const linkClasses =
  "block w-full py-4 border-b border-gray-100 font-normal text-base leading-100 text-custom-gray hover:text-custom-black hover:[-webkit-text-stroke:1.2px_currentColor] transition-colors";

const desktopLinks = document.querySelectorAll("#navLinks .middle-item a");

desktopLinks.forEach(function (link) {
  sidebarList.innerHTML += `
    <li>
      <a href="${link.getAttribute("href")}" class="${linkClasses}">
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

// 6 CARDS TOP

const cardsContainer = document.getElementById("card-container-1");

const CardData = [
  {
    svg: "assets/img/svg/money.svg",
    title: "320M+ Funded — All From Our Own Capital",
    width: "76",
    height: "45"
  },
  {
    svg: "assets/img/svg/people.svg",
    title: "12000+ Founders Funded Nationwide",
    width: "66",
    height: "56"
  },
  {
    svg: "assets/img/svg/arrow.svg",
    title: "74% Come Back for Round Two",
    width: "43",
    height: "51"
  },
  {
    svg: "assets/img/svg/star.svg",
    title: "4.9 Average <br> on Trustpilot",
    width: "55",
    height: "46"
  },
  {
    svg: "assets/img/svg/rabbit.svg",
    title: "Direct Lender <br> - No Brokers",
    width: "83",
    height: "51"
  },
  {
    svg: "assets/img/svg/unlock.svg",
    title: "No Hard Credit <br> Pulls. Ever.",
    width: "42",
    height: "54"
  },
];

cardsContainer.innerHTML = CardData.map(
  (card, i) => `
<div class="w-[calc(50%-12px)] max-w-91" data-aos="fade-up" data-aos-delay="${i * 80}">
<div class="card cursor-pointer w-full h-full shadow-gridcard p-[clamp(12px,2.5vw,32px)] rounded-24 bg-custom-white transition-all duration-300 ease-in-out hover:-translate-y-1.5">
  <div class="card-content w-full items-center flex flex-col justify-center gap-2">
    <div class="flex items-center h-[clamp(40px,8vw,76px)] w-full justify-center">
      <img width="${card.width}" height="${card.height}" loading="lazy" decoding="async" class="h-12.5 w-12.5 md:w-auto md:h-auto object-contain" src="${card.svg}" alt="card-img">
    </div>
    <h2 class="text-[clamp(12px,2vw,24px)] text-center font-semibold text-custom-black leading-121">
      ${card.title}
    </h2>
  </div>
</div>
</div>`,
).join("");

// 6 CARDS BOTTOM

const cardsContainer2 = document.getElementById("card-container-2");

const CardData2 = [
  {
    title: "Term Loans",
    src: "assets/img/webp/loan.webp",
  },
  {
    title: "Line of credit",
    src: "assets/img/webp/credit.webp",
  },
  {
    title: "MCA",
    src: "assets/img/webp/mca.webp",
  },
  {
    title: "Invoice Financing",
    src: "assets/img/webp/invoice.webp",
  },
  {
    title: "Residential Mortgages",
    src: "assets/img/webp/residential.webp",
  },
  {
    title: "Commercial Mortgages",
    src: "assets/img/webp/commercial.webp",
  },
];

cardsContainer2.innerHTML = CardData2.map(
  (card, i) => `
<div class="max-w-91 w-full" data-aos="zoom-in-up" data-aos-delay="${(i % 3) * 120}">
<div
              class="card group h-full cursor-pointer w-full p-6 rounded-24 border shadow-card bg-custom-white border-solid transition-all duration-300 ease-in-out border-transparent hover:border-custom-green hover:-translate-y-1.5"
            >
              <div class="card-header flex items-center justify-between">
                <h2
                  class="text-[clamp(16px,2vw,24px)] font-semibold text-custom-black leading-121 max-w-45 w-full"
                >
                  ${card.title}
                </h2>
                <div
                  class="size-14 sm:size-16 rounded-full bg-accent-gray flex items-center justify-center group-hover:bg-custom-green transition-all duration-300 ease-in-out"
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      class="transition-all duration-300 ease-in-out group-hover:fill-white"
                      d="M15.0315 5.12099L2.12099 18.0315L-5.72205e-06 15.9105L12.9105 2.99999H1.53149V-5.72205e-06H18.0315V16.5H15.0315V5.12249V5.12099Z"
                      fill="#010101"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <img loading="lazy" decoding="async" width="316" height="234" class="mt-6 object-cover" src="${card.src}" alt="card-img">
              </div>
            </div>
</div>`,
).join("");

// Color Change Effect

const total = 9;
let current = 0;

function tick() {
  for (let i = 0; i < total; i++) {
    const elements = document.querySelectorAll('[data-flow="' + i + '"]');

    elements.forEach(function (el) {
      if (i === current) {
        el.classList.add("is-active");
      } else {
        el.classList.remove("is-active");
      }
    });
  }

  current = current + 1;

  if (current === total) {
    current = 0;
  }
}

tick();
setInterval(tick, 500);

// SWIPER

new Swiper(".testimonials .swiper", {
  loop: true,
  loopAdditionalSlides: 3,
  speed: 1000,
  grabCursor: true,
  navigation: { prevEl: ".arrow.prev", nextEl: ".arrow.next" },
  slidesPerView: "auto",
  spaceBetween: 16,
  breakpoints: {
    641: { slidesPerView: "auto", spaceBetween: 24 },
  },
});

document.querySelectorAll(".arrow").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 500);
  });
});

// Logo Cards

const LogoContainer = document.getElementById("logo-container");

const LogoData = [
  {
    src: "assets/img/svg/command.svg",
  },
  {
    src: "assets/img/svg/hourglass.svg",
  },
  {
    src: "assets/img/svg/capsule.svg",
  },
  {
    src: "assets/img/svg/layer.svg",
  },
  {
    src: "assets/img/svg/catalog.svg",
  },
  {
    src: "assets/img/svg/lightbox.svg",
  },
  {
    src: "assets/img/svg/luminous.svg",
  },
  {
    src: "assets/img/svg/global-bank.svg",
  },
  {
    src: "assets/img/svg/alt-shift.svg",
  },
  {
    src: "assets/img/svg/featherdev.svg",
  },
  {
    src: "assets/img/svg/polymath.svg",
  },
  {
    src: "assets/img/svg/acme-corp.svg",
  },
];

LogoContainer.innerHTML = LogoData.map(
  (logo, i) => `
  <div data-aos="zoom-in" data-aos-delay="${(i % 4) * 80}" class="logo-card cursor-pointer max-w-60 sm:max-w-74.25 w-full px-5 custom-sm:px-8.75 h-12.5 xs:h-16 md:h-23.5 bg-custom-white rounded-12 flex items-center justify-center">
    <img
      loading="lazy"
      decoding="async"
      style="--float-delay: ${-(i * 0.7) % 6}s; --float-duration: ${5 + (i % 3)}s;"
      class="logo-float max-w-51.75 w-full lg:w-auto h-auto"
      src="${logo.src}"
      alt="logo"
    >
  </div>
`,
).join("");

// Year Function

const yearElement = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;

AOS.init({
  duration: 700,
  easing: "ease-out-cubic",
  offset: 80,
  once: true,
  disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});

window.addEventListener("load", () => AOS.refresh());
