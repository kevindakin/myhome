function reviewMarquee() {
    const wrapper = document.querySelector(".review-marquee_component");
    const list = wrapper.querySelectorAll(".review-marquee_cms");
    if (!list.length) return;

    const marqueeAnim = gsap.to(list, {
        x: "-100%",
        duration: 50,
        ease: "none",
        repeat: -1,
    });

    wrapper.addEventListener("mouseenter", () => {
        marqueeAnim.pause();
    });

    wrapper.addEventListener("mouseleave", () => {
        marqueeAnim.play();
    });
}

reviewMarquee();  