// Loader

function loader() {
    const visual = document.querySelector('[data-load="image"]');
    const eyebrow = document.querySelector('[data-load="eyebrow"]');
    const headingWrap = document.querySelector('[data-load="heading"]');
    const heading = document.querySelector('[data-load="heading"] > *');
    const fades = document.querySelectorAll('[data-load="fade-up"]');
    const sections = document.querySelectorAll(".section");

    gsap.set(headingWrap, { opacity: 1 });

    const headlineText = new SplitType(heading, {
        types: "lines, chars",
        tagName: "span",
    });

    const splitHeading = headlineText.chars;

    gsap.set(splitHeading, { y: "112%" });

    const loaderAnim = gsap.timeline({
        defaults: {
        duration: durationBase,
        ease: easeBack,
        },
    });

    if (visual) {
        const overlay = visual.querySelector(".hero-image_overlay");
        const image = visual.querySelector(".u-cover-absolute");

        gsap.set(image, { scale: 1.3, filter: "blur(2px)" });

        loaderAnim
        .to(overlay, {
            height: "0%",
            ease: easeBase,
        })
        .to(
            image,
            {
            scale: 1,
            filter: "blur(0px)",
            ease: easeBase,
            },
            "<0.2"
        );
    }

    if (eyebrow) {
        const icon = eyebrow.querySelector(".eyebrow_icon");
        const text = eyebrow.querySelector(".u-h6");

        const eyebrowText = new SplitType(text, {
        types: "chars",
        tagName: "span",
        });

        const splitEyebrow = eyebrowText.chars;

        gsap.set(eyebrow, { opacity: 1 });
        gsap.set(splitEyebrow, { opacity: 0 });
        gsap.set(icon, { scale: 0, rotate: 540 });

        loaderAnim
        .to(
            icon,
            {
            scale: 1,
            rotate: 0,
            },
            "<"
        )
        .to(
            splitEyebrow,
            {
            opacity: 1,
            stagger: 0.02,
            },
            "<"
        );
    }

    if (heading) {
        const underline = heading.querySelectorAll("em");

        loaderAnim.to(
        splitHeading,
        {
            y: "0%",
            stagger: 0.02,
            ease: "back.inOut(1.7)",
        },
        "<0.2"
        );

        if (underline) {
        loaderAnim.to(
            underline,
            {
            "--underline-opacity": 1,
            },
            "<0.2"
        );
        }
    }

    if (fades) {
        loaderAnim.to(
        fades,
        {
            y: "0rem",
            opacity: 1,
            stagger: 0.15,
        },
        "<0.6"
        );
    }

    loaderAnim.to(
        sections,
        {
        y: "0vh",
        opacity: 1,
        },
        "<0.2"
    );
}

// Image Reveal

function imageReveal() {
    const wrappers = document.querySelectorAll('[data-scroll="image-reveal"]');

    if (!wrappers.length) {
        return;
    }

    wrappers.forEach((wrapper) => {
        const img = wrapper.querySelector(".u-cover-absolute");

        gsap.set(img, { scale: 1.3, filter: "blur(2px)" });

        const imageAnim = gsap.timeline({
        scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
        },
        defaults: {
            duration: durationSlow,
            ease: easeBase,
        },
        });

        imageAnim.to(img, {
        scale: 1,
        filter: "blur(0px)",
        });
    });
}

// Scale In Animation

function scaleIn() {
    const items = document.querySelectorAll('[data-scroll="scale-in"]');

    if (!items.length) {
        return;
    }

    items.forEach((item) => {
        gsap.set(item, { scale: 0.9, opacity: 0 });

        const scaleAnim = gsap.timeline({
        scrollTrigger: {
            trigger: item,
            start: "top bottom",
            toggleActions: "play none none reverse",
        },
        defaults: {
            duration: durationBase,
            ease: easeBack,
        },
        });

        scaleAnim.to(item, {
        scale: 1,
        opacity: 1,
        });
    });
}

// Scale Out Animation

function scaleOut() {
    const items = document.querySelectorAll('[data-scroll="scale-out"]');

    if (!items.length) {
        return;
    }

    items.forEach((item) => {
        gsap.set(item, { scale: 1.3 });

        const scaleAnim = gsap.timeline({
        scrollTrigger: {
            trigger: item,
            start: "top bottom",
            toggleActions: "play none none reverse",
        },
        defaults: {
            duration: durationBase,
            ease: easeBack,
        },
        });

        scaleAnim.to(item, {
        scale: 1,
        });
    });
}

// Fade Up Animation

function fadeUp() {
    const fadeEls = document.querySelectorAll('[data-scroll="fade-up"]');

    if (!fadeEls.length) {
        return;
    }

    fadeEls.forEach((el) => {
        gsap.set(el, { opacity: 0, y: "6rem" });

        let fadeUp = gsap.timeline({
        scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none none",
        },
        defaults: {
            duration: durationBase,
            ease: easeBack,
        },
        });

        fadeUp.to(el, {
        opacity: 1,
        y: "0rem",
        });
    });
}

// Fade In Animation

function fadeIn() {
    const fadeItems = document.querySelectorAll('[data-scroll="fade-in"]');

    if (!fadeItems.length) {
        return;
    }

    fadeItems.forEach((fadeItem) => {
        gsap.set(fadeItem, { opacity: 0 });

        let fadeIn = gsap.timeline({
        scrollTrigger: {
            trigger: fadeItem,
            start: "top 92%",
            toggleActions: "play none none none",
        },
        defaults: {
            duration: durationBase,
            ease: easeBase,
        },
        });

        fadeIn.to(fadeItem, {
        opacity: 1,
        });
    });
}

// Split Text Animation

function splitText() {
    const headings = document.querySelectorAll('[data-scroll="split-text"] > *');

    if (!headings.length) {
        return;
    }

    headings.forEach((heading) => {
        const headlineSplit = new SplitType(heading, {
        types: "lines, chars",
        tagName: "span",
        });

        const splitText = heading.querySelectorAll(".char");

        const underline = heading.querySelectorAll("em");

        gsap.set(splitText, { y: "112" });

        let splitAnim = gsap.timeline({
        scrollTrigger: {
            trigger: heading,
            start: "top 95%",
            toggleActions: "play none none reverse",
        },
        defaults: {
            duration: durationBase,
            ease: "back.inOut(1.7)",
        },
        });

        splitAnim.to(splitText, {
        y: "0%",
        stagger: 0.02,
        });

        if (underline) {
        splitAnim.to(
            underline,
            {
            "--underline-opacity": 1,
            ease: easeBase,
            },
            "<0.4"
        );
        }
    });
}

// Split Words Animation

function splitWords() {
    const headings = document.querySelectorAll('[data-scroll="split-words"] > *');

    if (!headings.length) {
        return;
    }

    headings.forEach((heading) => {
        const headlineSplit = new SplitType(heading, {
        types: "lines, chars",
        tagName: "span",
        });

        const splitText = heading.querySelectorAll(".char");

        gsap.set(splitText, { y: "112%" });

        let splitAnim = gsap.timeline({
        scrollTrigger: {
            trigger: heading,
            start: "top 92%",
            toggleActions: "play none none reverse",
        },
        defaults: {
            duration: durationBase,
            ease: easeBack,
        },
        });

        splitAnim.to(splitText, {
        y: "0%",
        stagger: 0.005,
        });
    });
}

// Split Lines Animation

function splitLines() {
    const headings = document.querySelectorAll('[data-scroll="split-lines"] > *');

    if (!headings.length) {
        return;
    }

    headings.forEach((heading) => {
        const headlineSplit = new SplitType(heading, {
        types: "lines, words",
        tagName: "span",
        });

        const splitText = heading.querySelectorAll(".word");

        gsap.set(splitText, { y: "112%" });

        let splitAnim = gsap.timeline({
        scrollTrigger: {
            trigger: heading,
            start: "top 92%",
            toggleActions: "play none none reverse",
        },
        defaults: {
            duration: durationBase,
            ease: easeBack,
        },
        });

        splitAnim.to(splitText, {
        y: "0%",
        stagger: 0.005,
        });
    });
}

function eyebrowAnim() {
    const eyebrows = document.querySelectorAll('[data-scroll="eyebrow"]');

    if (!eyebrows.length) {
        return;
    }

    eyebrows.forEach((eyebrow) => {
        const icon = eyebrow.querySelector(".eyebrow_icon");
        const text = eyebrow.querySelector(".u-h6");

        if (!text) return;

        const heading = new SplitType(text, {
        types: "chars",
        tagName: "span",
        });

        const splitText = heading.chars;
        let tl = gsap.timeline({
        scrollTrigger: {
            trigger: eyebrow,
            start: "top 92%",
        },
        defaults: {
            duration: durationBase,
            ease: easeBase,
        },
        });

        gsap.set(splitText, { opacity: 0 });

        if (icon) {
        gsap.set(icon, {
            scale: 0,
            rotate: 540,
        });

        tl.to(icon, {
            scale: 1,
            rotate: 0,
        }).to(
            splitText,
            {
            opacity: 1,
            stagger: 0.02,
            },
            "<"
        );
        } else {
        tl.to(splitText, {
            opacity: 1,
            stagger: 0.02,
        });
        }
    });
}

//
// FUNCTION INITS
//

loader();
imageReveal();
scaleIn();
scaleOut();
fadeUp();
fadeIn();
splitText();
splitWords();
splitLines();
eyebrowAnim();  