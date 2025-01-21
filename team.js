function teamModal() {
    const wrappers = document.querySelectorAll(".team-card_component");

    wrappers.forEach((wrapper) => {
        const trigger = wrapper.querySelector('[data-team-open=""]');
        const modal = wrapper.querySelector('[data-team=""]');
        const modalContent = wrapper.querySelector(".team-modal_modal");
        const closeButtons = wrapper.querySelectorAll('[data-team-close=""]');

        // Move modal to body
        if (modal) {
        document.body.appendChild(modal);
        }

        let lastFocusedElement;

        const tl = gsap.timeline({
        paused: true,
        defaults: {
            duration: durationFast,
            ease: easeBase,
        },
        onReverseComplete: () => {
            modal.style.display = "none";
            gsap.set(modalContent, { x: "100%" });
        },
        });

        gsap.set(modalContent, { x: "100%" });

        tl.to(modal, {
        opacity: 1,
        duration: durationFast,
        display: "flex",
        }).to(
        modalContent,
        {
            x: "0%",
        },
        "<"
        );

        function openModal() {
        lastFocusedElement = document.activeElement;
        tl.play();

        // Accessibility
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        // Focus management
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length) {
            focusableElements[0].focus();
        }

        // Add focus trap
        modal.addEventListener("keydown", trapFocus);
        }

        function closeModal() {
        tl.reverse();

        // Accessibility
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        // Return focus
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }

        // Remove focus trap
        modal.removeEventListener("keydown", trapFocus);
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

        // Clean up function for modal removal
        function cleanupModal() {
        if (modal && modal.parentElement === document.body) {
            document.body.removeChild(modal);
        }
        }

        trigger?.addEventListener("click", openModal);

        closeButtons?.forEach((button) => {
        button.addEventListener("click", closeModal);
        });

        const handleEscape = (e) => {
        if (e.key === "Escape" && modal.style.display === "flex") {
            closeModal();
        }
        };

        document.addEventListener("keydown", handleEscape);

        // Return cleanup function
        return () => {
        trigger?.removeEventListener("click", openModal);
        closeButtons?.forEach((button) => {
            button.removeEventListener("click", closeModal);
        });
        document.removeEventListener("keydown", handleEscape);
        cleanupModal();
        };
    });
}

teamModal();  