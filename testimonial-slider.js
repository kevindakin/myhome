function testimonialSlider() {
    const wrapper = document.querySelector(".testimonial_component");
    const slider = wrapper.querySelector(".testimonial_cms.swiper");

    let swiper = new Swiper(slider, {
        slidesPerView: 1,
        speed: 300,
        loop: true,
        effect: "fade",
        fadeEffect: {
        crossFade: true,
        },
        watchOverflow: true,
        navigation: {
        nextEl: ".testimonial_arrow.swiper-next",
        prevEl: ".testimonial_arrow.swiper-prev",
        },
    });
}

testimonialSlider();  