function vendorMarquee() {
    const wrapper = document.querySelector(".vendor-marquee_component");
    const list = wrapper.querySelectorAll(".vendor-marquee_cms");
    if (!list.length) return;

    gsap.to(list, {
        x: "-100%",
        duration: 20,
        ease: "none",
        repeat: -1,
    });
}

vendorMarquee();  