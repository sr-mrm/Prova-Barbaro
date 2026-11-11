document.addEventListener("DOMContentLoaded", function () {
    const triggers = document.querySelectorAll(".lightbox-trigger");

    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.innerHTML = `
        <button class="lightbox-close" aria-label="Chiudi">&times;</button>
        <img src="" alt="">
    `;

    document.body.appendChild(overlay);

    const lightboxImage = overlay.querySelector("img");

    triggers.forEach(function (trigger) {
        trigger.addEventListener("click", function (event) {
            event.preventDefault();
            const image = trigger.querySelector("img");

            lightboxImage.src = trigger.href;
            lightboxImage.alt = image.alt;

            overlay.classList.add("visible");
        });
    });

    function closeLightbox() {
        overlay.classList.remove("visible");
    }

    overlay.addEventListener("click", function (event) {
        if (event.target === overlay ||
            event.target.classList.contains("lightbox-close")) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });
});