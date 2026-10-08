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

// 4 CARDS

const CardData = [
  {
    src: "assets/img/testimonials-image/svg/star.svg",
    para: "Smarter Systems. Faster Funding.",
  },
  {
    src: "assets/img/testimonials-image/svg/money-bag.svg",
    para: "Approvals That Make Sense",
  },
  {
    src: "assets/img/testimonials-image/svg/scripts.svg",
    para: "No Suits. No Scripts. Just Results.",
  },
  {
    src: "assets/img/testimonials-image/svg/guard.svg",
    para: "Tech that speeds things up",
  },
];

const cardContainer = document.getElementById("card-container");

cardContainer.innerHTML = CardData.map(
  (card, i) => `
<div class="aos-item aos-item--sm" data-aos="flip-up" data-aos-duration="900" data-aos-delay="${i * 100}">
<div class="card max-w-70 w-full">
                <div
                  class="card-content p-4 sm:p-6 flex items-center justify-center flex-col"
                >
                  <img
                    class="fx-bob object-cover size-[clamp(40px,10vw,58px)]"
                    style="animation-delay: ${i * -0.7}s"
                    width="58"
                    height="58"
                    src="${card.src}"
                    alt="card-img"
                  />
                  <p
                    class="max-w-51.5 w-full text-[clamp(16px,1.39vw,20px)] text-center mt-3 leading-120 font-semibold text-custom-black"
                  >
                    ${card.para}
                  </p>
                </div>
              </div>
</div>
`,
).join("");

// RATING CARDS TOP

const cardDataTop = [
  {
    src: "assets/img/testimonials-image/svg/mike.svg",
    para: "They told me not to take the money. That’s when I knew they were the real deal. I came in looking for a quick MCA. Desperate to cover payroll, decent credit, but margins were razor-thin. Rabbit actually looked through my statements — and told me not to take the deal. They didn’t pitch a workaround. They didn’t try to ‘make it fit.’ They just explained the risk, broke down the cash flow, and told me to wait. No one else would’ve done that. That advice alone probably saved my business.",
    name: "Mike T.",
    prof: "Fabrication Shop Owner, TX",
    borderMt: "mt-[clamp(20px,6vw,48px)]",
  },
  {
    src: "assets/img/testimonials-image/svg/reggie.svg",
    para: "We came for a loan. They gave us a strategy. <br /> We were asking for funding. Rabbit told us we didn’t need a loan — we needed to stop waiting 60 days to get paid. They helped us switch to invoice factoring. At first, we were hesitant. Now we get paid the same week the job ends, and payroll's no longer a stress point. They didn’t just fund us — they fixed our cash flow.",
    name: "Reggie D.",
    prof: "Commercial Painting, IL",
    borderMt: "mt-[clamp(20px,6vw,72px)]",
  },
  {
    src: "assets/img/testimonials-image/svg/tameka.svg",
    para: "Out of the blue, Emile asked if I owned any property — and it saved me.I run three salons. Business was booming, but I got tricked into a high-interest MCA by a broker who promised the world. Payments were crushing me. Out of nowhere, Emile asked if I owned any real estate — I said yes, and he begged me to refinance. Rabbit helped me use a DSCR loan to pay off the debt. I saved over $35,000 a month in cash flow. It wasn’t just a loan. It was a way out. They asked the right questions — the kind that actually save people.",
    name: "Tameka R.",
    prof: "Salon Owner, GA",
    borderMt: "mt-[clamp(20px,4vw,24px)]",
  },
  {
    src: "assets/img/testimonials-image/svg/vannesa.svg",
    para: "They built a payment plan around my slow season. I run an event rental company — winter is brutal. Every lender I spoke to offered cookie-cutter terms that didn’t match how my cash flows. Rabbit actually listened. They structured a step-up repayment plan that gave me a cushion during the slow months and scaled when things picked back up. I stayed current, grew the business, and didn’t lose my mind in January. Nobody else is underwriting like this.",
    name: "Vanessa C.",
    prof: "Event Rentals, NJ",
    borderMt: "mt-[clamp(20px,6vw,48px)]",
  },
];

const cardContainerTop = document.getElementById("card-container-2");

cardContainerTop.innerHTML = cardDataTop
  .map(
    (card, i) => `
  <div class="aos-item aos-item--lg" data-aos="${i % 2 === 0 ? "fade-right" : "fade-left"}" data-aos-duration="1000" data-aos-delay="${Math.floor(i / 2) * 100}">
  <div
                class="card max-w-139.5 w-full shadow-gridcard xl:h-98.5 h-auto rounded-24 p-4 sm:p-6 bg-custom-white hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer"
              >
                <div class="content w-full">
                  <img
                    width="124"
                    height="24"
                    class="fx-stars h-4.5 sm:h-6 xs:w-31 w-25 object-contain"
                    src="assets/img/testimonials-image/svg/5-star.svg"
                    alt="5-star"
                  />
                  <p
                    class="leading-150 font-normal text-custom-gray text-sm mt-3 xs:mt-4 xs:text-base"
                  >
                    ${card.para}
                  </p>
                  <div
                    class="border-t border-solid w-full border-custom-black/10 ${card.borderMt}"
                  >
                    <div class="info flex gap-3 items-center pt-4">
                      <img
                        width="50"
                        height="50"
                        class="fx-pop object-cover size-[clamp(36px,10vw,50px)]"
                        src="${card.src}"
                        alt="card-img"
                      />

                      <div class="flex flex-col w-full my-[4.5px]">
                        <h1
                          class="font-semibold leading-125 text-custom-black text-base"
                        >
                          ${card.name}
                        </h1>
                        <p
                          class="text-sm leading-150 text-custom-black font-normal"
                        >
                          ${card.prof}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  </div>
`,
  )
  .join("");

// YEAR FUNCTION

const yearElement = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;

(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const splitEls = document.querySelectorAll("[data-split]");

  splitEls.forEach(function (el) {
    const text = el.textContent.trim().replace(/\s+/g, " ");
    const words = text.split(" ");
    el.setAttribute("aria-label", text);
    el.textContent = "";
    el.style.setProperty("--base", (el.dataset.splitDelay || "0") + "s");

    words.forEach(function (word, i) {
      const outer = document.createElement("span");
      outer.className = "fx-w";
      outer.setAttribute("aria-hidden", "true");
      const inner = document.createElement("span");
      inner.className = "fx-wi";
      inner.style.setProperty("--i", i);
      inner.textContent = word;
      outer.appendChild(inner);
      el.appendChild(outer);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });

    el.classList.add("fx-split");
  });

  if (reduce || !("IntersectionObserver" in window)) {
    splitEls.forEach(function (el) {
      el.classList.add("is-in");
    });
  } else {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );
    splitEls.forEach(function (el) {
      io.observe(el);
    });
  }

  // AOS
  if (window.AOS) {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 90,
      disable: reduce,
    });
    window.addEventListener("load", function () {
      AOS.refresh();
    });
  } else {
    document.querySelectorAll("[data-aos]").forEach(function (el) {
      el.classList.add("aos-animate");
    });
  }

  // Soft parallax
  const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));

  if (!reduce && parallaxEls.length) {
    let ticking = false;

    function updateParallax() {
      const vh = window.innerHeight;
      parallaxEls.forEach(function (el) {
        const box = el.parentElement.getBoundingClientRect();
        if (box.bottom < -300 || box.top > vh + 300) return;
        const speed = parseFloat(el.dataset.parallax) || 0;
        const offset = box.top + box.height / 2 - vh / 2;
        const y = Math.max(-40, Math.min(40, offset * speed * -1));
        el.style.translate = "0 " + y.toFixed(1) + "px";
      });
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    }

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
    updateParallax();
  }
})();
