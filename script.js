console.clear();

(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init('r7fGMu5Cc-7oKVLx9');
})();

const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
    const overlayEl = e.currentTarget;
    const x = e.pageX - cardsContainer.offsetLeft;
    const y = e.pageY - cardsContainer.offsetTop;

    overlayEl.style.setProperty("--opacity", 1);
    overlayEl.style.setProperty("--x", `${x}px`);
    overlayEl.style.setProperty("--y", `${y}px`);
};

const createOverlayCta = (overlayCard, ctaEl) => {
    const overlayCta = document.createElement("div");
    overlayCta.classList.add("cta");

    overlayCta.setAttribute("aria-hidden", true);
    overlayCard.append(overlayCta);
};

const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
        const cardIndex = cards.indexOf(entry.target);
        let width = entry.borderBoxSize[0].inlineSize;
        let height = entry.borderBoxSize[0].blockSize;

        if (cardIndex >= 0) {
            overlay.children[cardIndex].style.width = `${width}px`;
            overlay.children[cardIndex].style.height = `${height}px`;
        }
    });
});

const initOverlayCard = (cardEl) => {
    const overlayCard = document.createElement("div");
    overlayCard.classList.add("card");
    createOverlayCta(overlayCard, cardEl.lastElementChild);
    overlay.append(overlayCard);
    observer.observe(cardEl);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);

function showPopup(id) {
    let popup = document.getElementById(id);
    if (popup) {
        popup.style.display = 'flex';
    }
}

function closePopup(id) {
    let popup = document.getElementById(id);
    if (popup) {
        popup.style.display = 'none';
    }
}

document.getElementById("emailForm").addEventListener("submit", function (event) {
    event.preventDefault();
    // these IDs from the previous steps
    emailjs.sendForm('service_kodair_one', 'template_kodair_one', this)
    .then(function() {
        console.log('SUCCESS!');
        document.getElementById("message").innerText = "Thank you for your interest! We'll be in touch soon.";
        document.getElementById("message").style.color = "#4CAF50";
        document.getElementById("container").style.opacity = 0;
        document.getElementById("container").style.transform = "translateY(20px)";
        setTimeout(function () {
            document.getElementById("container").style.opacity = 1;
            document.getElementById("container").style.transform = "translateY(0)";
        }, 500);
    }, function(error) {
        console.log('FAILED...', error);
    });
    
});