// GLOBAL VARIABLES
const durationBase = 0.7;
const durationFast = 0.4;
const durationSlow = 1.2;
const easeBase = "power2.inOut";
const easeOut = "power4.out";
const easeBack = "back.inOut(2.5)";
const easeBackBig = "back.inOut(4)";

//
// FUNCTION DECLARATIONS
//

function smoothScroll() {
    let lenis;
    if (Webflow.env("editor") === undefined) {
    lenis = new Lenis({
        lerp: 0.3,
        wheelMultiplier: 0.7,
        gestureOrientation: "vertical",
        normalizeWheel: false,
        smoothTouch: false
    });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    }
    $("[data-lenis-start]").on("click", function () {
    lenis.start();
    });
    $("[data-lenis-stop]").on("click", function () {
    lenis.stop();
    });
    $("[data-lenis-toggle]").on("click", function () {
    $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
        lenis.stop();
    } else {
        lenis.start();
    }
    });
    
    lenis.on('scroll', (e) => {
    const menu = document.querySelector(".nav_content");
    if (menu.classList.contains("is-open")) {
        e.preventDefault = false; 
    } else {
        e.preventDefault = true; 
    }
    });
}

function disableScrolling() {
  document.body.classList.add("no-scroll");
  lenis.stop();
}

function enableScrolling() {
  document.body.classList.remove("no-scroll");
  lenis.start();
}

function navLink() {
  const links = document.querySelectorAll(".nav_link-dropdown");

  if (!links.length) {
    return;
  }

  links.forEach((link) => {
    const text = link.querySelectorAll(".nav_link-text");

    const splits = text.forEach((textElement) => {
      new SplitType(textElement, { types: "chars" });
    });

    const first = text[0].querySelectorAll(".char");
    const second = text[1].querySelectorAll(".char");

    let navLinkHover = gsap.timeline({
      paused: true,
      defaults: {
        duration: durationFast,
        ease: easeBase,
      },
    });

    navLinkHover
      .to(second, {
        yPercent: -100,
        stagger: {
          each: 0.02,
          from: "start",
        },
      })
      .to(
        first,
        {
          yPercent: -110,
          stagger: {
            each: 0.02,
            from: "start",
          },
        },
        "<"
      );

    link.addEventListener("mouseenter", () => {
      navLinkHover.restart().play();
    });

    link.addEventListener("mouseleave", () => {
      if (navLinkHover.progress() === 1) {
        navLinkHover.kill();
      }
    });
  });
}

function mobileMenu() {
  const nav = document.querySelector('[data-menu="nav"]');
  const menu = nav.querySelector(".nav_content");
  const button = nav.querySelector('[data-menu="hamburger"]');
  const btnWrap = nav.querySelector(".nav_button-wrap.is-mobile");
  const download = btnWrap.querySelector(".btn_primary");
  const overlay = nav.querySelector(".nav_overlay");

  const lineTop = button.children[0];
  const lineMiddle = button.children[1];
  const lineBottom = button.children[2];

  let overlayAnim = gsap.to(overlay, {
    opacity: 0.7,
    duration: 0.4,
    ease: easeBase,
    paused: true,
  });

  let hamburgerAnim = gsap.timeline({
    paused: true,
    defaults: {
      duration: durationBase,
      ease: easeBack,
    },
  });

  hamburgerAnim
    .to(lineTop, {
      y: 10,
      rotate: -45,
    })
    .to(
      lineMiddle,
      {
        x: 24,
        opacity: 0,
      },
      "<"
    )
    .fromTo(
      lineBottom,
      {
        y: 0,
        rotate: 0,
        width: "72%",
      },
      {
        y: -10,
        rotate: 45,
        width: "100%",
      },
      "<"
    );

  button.addEventListener("click", () => {
    if (!menu.classList.contains("is-open")) {
      menu.style.display = "flex";
      requestAnimationFrame(() => {
        menu.classList.add("is-open");
        hamburgerAnim.play();
        overlay.style.display = "block";
        overlayAnim.play();
        disableScrolling();
      });
    } else {
      menu.classList.remove("is-open");
      hamburgerAnim.reverse();
      overlayAnim.reverse().eventCallback("onReverseComplete", () => {
        overlay.style.display = "none";
      });
      enableScrolling();
      menu.addEventListener(
        "transitionend",
        () => {
          menu.style.display = "none";
        },
        { once: true }
      );
    }
  });

  overlay.addEventListener("click", () => {
    if (menu.classList.contains("is-open")) {
      menu.classList.remove("is-open");
      hamburgerAnim.reverse();
      overlayAnim.reverse().eventCallback("onReverseComplete", () => {
        overlay.style.display = "none";
      });
      enableScrolling();
      menu.addEventListener(
        "transitionend",
        () => {
          menu.style.display = "none";
        },
        { once: true }
      );
    }
  });

  download.addEventListener("click", () => {
    if (menu.classList.contains("is-open")) {
      menu.classList.remove("is-open");
      hamburgerAnim.reverse();
      overlayAnim.reverse().eventCallback("onReverseComplete", () => {
        overlay.style.display = "none";
      });
      enableScrolling();
      menu.addEventListener(
        "transitionend",
        () => {
          menu.style.display = "none";
        },
        { once: true }
      );
    }
  });
}

function navDropdown() {
  const nav = document.querySelector('[data-menu="nav"]');
  const items = nav.querySelectorAll('[data-menu="link"]');

  const isTouchDevice = () => window.matchMedia("(pointer: coarse)").matches;

  items.forEach((item) => {
    const link = item.querySelector(".nav_link");
    const menu = item.querySelector('[data-menu="menu"]');
    const arrow = link.querySelector(".nav_link-arrow");
    let timeout;

    let menuOpen = gsap.timeline({
      paused: true,
      defaults: {
        duration: durationBase,
        ease: easeBack,
      },
    });

    menuOpen.to(menu, {
      opacity: 1,
      y: "0rem",
    });

    const closeMenu = () => {
      menuOpen.reverse();
      arrow.classList.remove("is-open");
      menu.style.display = "none";
    };

    const openMenu = () => {
      clearTimeout(timeout);
      menu.style.display = "block";
      arrow.classList.add("is-open");
      menuOpen.play();
    };

    link.addEventListener("click", (event) => {
      if (isTouchDevice()) {
        event.preventDefault();

        items.forEach((otherItem) => {
          const otherMenu = otherItem.querySelector('[data-menu="menu"]');
          const otherArrow = otherItem.querySelector(".nav_link-arrow");

          if (otherMenu !== menu) {
            menuOpen.reverse();
            otherArrow.classList.remove("is-open");
            otherMenu.style.display = "none";
          }
        });

        menuOpen.restart();

        if (menu.style.display === "block") {
          menuOpen.reverse();
          arrow.classList.remove("is-open");
          menu.style.display = "none";
        } else {
          menu.style.display = "block";
          arrow.classList.add("is-open");
          menuOpen.play();
        }
      }
    });

    if (!isTouchDevice()) {
      item.addEventListener("mouseenter", openMenu);
      menu.addEventListener("mouseenter", openMenu);

      item.addEventListener("mouseleave", (e) => {
        if (!e.relatedTarget?.closest('[data-menu="menu"]')) {
          timeout = setTimeout(closeMenu, 50);
        }
      });

      menu.addEventListener("mouseleave", (e) => {
        if (!e.relatedTarget?.closest('[data-menu="link"]')) {
          timeout = setTimeout(closeMenu, 50);
        }
      });
    }
  });
}

function btnHover() {
  const btns = document.querySelectorAll(".btn_primary");

  if (!btns) {
    return;
  }

  btns.forEach((btn) => {
    const text = btn.querySelectorAll(".btn_text");

    const splits = text.forEach((textElement) => {
      new SplitType(textElement, { types: "chars" });
    });

    const first = text[0].querySelectorAll(".char");
    const second = text[1].querySelectorAll(".char");

    let btnHoverAnim = gsap.timeline({
      paused: true,
      defaults: {
        duration: durationFast,
        ease: easeBase,
      },
    });

    btnHoverAnim
      .to(second, {
        yPercent: -100,
        stagger: {
          each: 0.02,
          from: "end",
        },
      })
      .to(
        first,
        {
          yPercent: -110,
          stagger: {
            each: 0.02,
            from: "end",
          },
        },
        "<"
      );

    btn.addEventListener("mouseenter", () => {
      btnHoverAnim.restart().play();
    });

    btn.addEventListener("mouseleave", () => {
      if (btnHoverAnim.progress() === 1) {
        btnHoverAnim.kill();
      }
    });
  });
}

function linkHover() {
  const links = document.querySelectorAll(".text-link_component");

  if (!links) {
    return;
  }

  links.forEach((link) => {
    const arrows = link.querySelectorAll(".btn_icon");
    const text = link.querySelector(".btn_text");

    let linkHoverAnim = gsap.timeline({
      paused: true,
      defaults: {
        duration: durationFast,
        ease: easeBack,
      },
    });

    linkHoverAnim
      .to(arrows, {
        x: "2rem",
      })
      .to(
        text,
        {
          x: "2rem",
        },
        "<"
      );

    link.addEventListener("mouseenter", () => {
      linkHoverAnim.play();
    });

    link.addEventListener("mouseleave", () => {
      linkHoverAnim.reverse();
    });
  });
}

function lightboxHover() {
  const lightbox = document.querySelector(".lightbox_wrapper");

  if (!lightbox) return;

  const image = lightbox.nextElementSibling;

  const lightboxHoverAnim = gsap.timeline({
    paused: true,
    defaults: {
      duration: durationFast,
      ease: easeBack,
    },
  });

  gsap.set(image, { scale: 1.02 });

  lightboxHoverAnim.to(image, {
    scale: 1.1,
  });

  lightbox.addEventListener("mouseenter", () => {
    lightboxHoverAnim.play();
  });

  lightbox.addEventListener("mouseleave", () => {
    lightboxHoverAnim.reverse();
  });
}

// Blog Card Hovers

function initializeCardHover(card) {
  const image = card.querySelector(".u-cover-absolute");

  if (!image) return;

  const blogHoverAnim = gsap.timeline({
    paused: true,
    defaults: {
      duration: durationFast,
      ease: easeBackBig,
    },
  });

  gsap.set(image, { scale: 1.02 });

  blogHoverAnim.to(image, {
    scale: 1.1,
  });

  card.addEventListener("mouseenter", () => {
    blogHoverAnim.play();
  });

  card.addEventListener("mouseleave", () => {
    blogHoverAnim.reverse();
  });
}

// Initialize Hover Animation for All Blog Cards

function blogHover() {
  const cards = document.querySelectorAll(".blog-card_component");

  if (!cards.length) return;

  cards.forEach((card) => {
    if (!card.dataset.hoverInitialized) {
      initializeCardHover(card);
      card.dataset.hoverInitialized = "true";
    }
  });
}

// Initialize Hover Animation for Finsweet Laoded Blog Cards

window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  "cmsload",
  (listInstances) => {
    // Run when new items are loaded
    const [listInstance] = listInstances;

    if (window.matchMedia("(min-width: 992px)").matches) {
      listInstance.on("renderitems", (renderedItems) => {
        blogHover();
      });
    }
  },
]);

function accordion() {
  const accordionLists = document.querySelectorAll(".accordion-list_component");

  if (!accordionLists.length) {
    return;
  }

  accordionLists.forEach((list) => {
    // Scope the accordion items to the current list
    const accordionItems = list.querySelectorAll(".accordion_component");

    if (!accordionItems.length) {
      return;
    }

    // Reset all accordions
    accordionItems.forEach((item) => {
      const content = item.querySelector(".accordion_content");
      const icon = item.querySelector(".accordion_icon");

      if (content && icon) {
        gsap.set(content, { height: 0, display: "none" });
        item.classList.remove("is-open");
        gsap.set(icon, { rotate: 0 });
      }
    });

    // Open first accordion
    const firstItem = accordionItems[0];
    if (firstItem) {
      const firstContent = firstItem.querySelector(".accordion_content");
      const firstIcon = firstItem.querySelector(".accordion_icon");

      if (firstContent && firstIcon) {
        gsap.set(firstContent, { height: "auto", display: "block" });
        firstItem.classList.add("is-open");
        gsap.set(firstIcon, { rotation: 135 });
      }
    }

    // Add click handlers
    accordionItems.forEach((item) => {
      const header = item.querySelector(".accordion_title-row");
      const content = item.querySelector(".accordion_content");
      const icon = item.querySelector(".accordion_icon");

      if (!header || !content || !icon) {
        return;
      }

      header.addEventListener("click", () => {
        // Close other accordions
        accordionItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("is-open")) {
            const otherContent = otherItem.querySelector(".accordion_content");
            const otherIcon = otherItem.querySelector(".accordion_icon");

            if (otherContent && otherIcon) {
              otherItem.classList.remove("is-open");
              gsap.to(otherContent, {
                height: 0,
                duration: durationFast,
                ease: easeBase,
                onComplete: () => {
                  gsap.set(otherContent, { display: "none" });
                },
              });

              gsap.to(otherIcon, {
                rotate: 0,
                duration: durationBase,
                ease: easeBack,
              });
            }
          }
        });

        // Toggle current accordion
        if (!item.classList.contains("is-open")) {
          gsap.set(content, { display: "block" });
          item.classList.add("is-open");
          gsap.to(content, {
            height: "auto",
            duration: durationFast,
            ease: easeBase,
          });

          gsap.to(icon, {
            rotate: 135,
            duration: durationFast,
            ease: easeBack,
          });
        } else {
          item.classList.remove("is-open");
          gsap.to(content, {
            height: 0,
            duration: durationFast,
            ease: easeBase,
            onComplete: () => {
              gsap.set(content, { display: "none" });
            },
          });

          gsap.to(icon, {
            rotate: 0,
            duration: durationFast,
            ease: easeBack,
          });
        }
      });
    });
  });
}

function initModals() {
  // Find all modal triggers on the page
  const triggers = document.querySelectorAll("[data-modal-open]");

  triggers.forEach((trigger) => {
    const modalId = trigger.getAttribute("data-modal-open");
    const modal = document.querySelector(`[data-modal="${modalId}"]`);
    const modalContent = modal?.querySelector(".modal_component");
    const closeButtons = modal?.querySelectorAll(
      `[data-modal-close="${modalId}"]`
    );

    if (!modal || !modalContent) return;

    let lastFocusedElement;

    // Create timeline for this specific modal
    const tl = gsap.timeline({
      paused: true,
      defaults: {
        duration: durationFast,
        ease: easeBase,
      },
      onReverseComplete: () => {
        modal.style.display = "none";
        gsap.set(modalContent, { scale: 0.8 });
      },
    });

    // Set initial states
    gsap.set(modal, { opacity: 0, display: "none" });
    gsap.set(modalContent, { scale: 0.8 });

    // Build the timeline
    tl.to(modal, {
      opacity: 1,
      duration: 0.3,
    }).to(
      modalContent,
      {
        scale: 1,
        ease: easeBack,
      },
      "<"
    );

    function openModal() {
      lastFocusedElement = document.activeElement;

      // Show modal and play animation
      modal.style.display = "flex";
      tl.play();

      // Accessibility
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      // Set tabindex on modal container to make it focusable
      modal.setAttribute("tabindex", "-1");
      // Focus the modal container itself (won't show outline but will trap focus)
      modal.focus();

      // Add focus trap
      modal.addEventListener("keydown", trapFocus);
    }

    function closeModal() {
      // Reverse animation
      tl.reverse();

      // Accessibility
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";

      // Return focus
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }

      // Remove focus trap and tabindex
      modal.removeEventListener("keydown", trapFocus);
      modal.removeAttribute("tabindex");
    }

    function trapFocus(e) {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    }

    // Event Listeners
    trigger.addEventListener("click", openModal);

    closeButtons?.forEach((button) => {
      button.addEventListener("click", closeModal);
    });

    // Close on background click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.style.display === "flex") {
        closeModal();
      }
    });
  });
}

function copyright() {
    const copyrightDate = document.querySelector('[data-js="copyright-date"]');

    if (copyrightDate) {
        const currentYear = new Date().getFullYear();
        copyrightDate.textContent = currentYear;
    }
}

//
// FUNCTION INITS
//

smoothScroll();
mobileMenu();
navDropdown();
accordion();
initModals();
copyright();

// Desktop Only Functions

if (window.matchMedia("(min-width: 992px)").matches) {
  navLink();
  btnHover();
  linkHover();
  lightboxHover();
  blogHover();
}