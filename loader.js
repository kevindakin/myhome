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

loader();  