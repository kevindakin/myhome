function imageParallax() {
    const wrappers = document.querySelectorAll(".image-callout_component");

    wrappers.forEach((wrapper) => {
        const img = wrapper.querySelector(".u-cover-absolute");

        gsap.set(img, { scale: 1.1 });

        let parallax = gsap.timeline({
        scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
        },
        });

        parallax.fromTo(
        img,
        {
            yPercent: -10,
        },
        {
            yPercent: 10,
        }
        );
    });
}

imageParallax();  