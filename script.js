const progressBar = document.querySelector(".progress-bar");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const height =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = (scrollTop / height) * 100;

    progressBar.style.width = progress + "%";

});

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.15
    }

);

document
.querySelectorAll(
".section, .hero-content, .hero-visual, .stat-card, .about-card, .champion-card"
)
.forEach(el => {

    el.classList.add("fade-up");

    observer.observe(el);

});
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".main-header nav a");

function updateActiveLink() {

    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {

        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (
            scrollPosition >= top &&
            scrollPosition < top + height
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") === "#" + id
                ) {
                    link.classList.add("active");
                }

            });

        }

    });

}

window.addEventListener("scroll", updateActiveLink);

navLinks.forEach(link => {

    link.addEventListener("click", e => {

        const href = link.getAttribute("href");

        if (!href.startsWith("#")) return;

        e.preventDefault();

        const target = document.querySelector(href);

        if (!target) return;

        window.scrollTo({

            top: target.offsetTop - 90,
            behavior: "smooth"

        });

    });

});

const heroCard = document.querySelector(".hero-logo-card");

if (heroCard) {

    heroCard.addEventListener("mousemove", e => {

        const rect = heroCard.getBoundingClientRect();

        const x =
            e.clientX - rect.left - rect.width / 2;

        const y =
            e.clientY - rect.top - rect.height / 2;

        heroCard.style.transform =
            `perspective(900px)
             rotateY(${x / 22}deg)
             rotateX(${-y / 22}deg)
             translateY(-6px)`;

    });

    heroCard.addEventListener("mouseleave", () => {

        heroCard.style.transform =
            "perspective(900px) rotateX(0deg) rotateY(0deg)";

    });

}
const statNumbers = document.querySelectorAll(".stat-card h3");

const numberObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const element = entry.target;
            const originalText = element.textContent.trim();
            const finalNumber = parseInt(originalText);

            if (isNaN(finalNumber)) return;

            let current = 0;
            const duration = 1200;
            const steps = 40;
            const increment = finalNumber / steps;
            const intervalTime = duration / steps;

            const counter = setInterval(() => {

                current += increment;

                if (current >= finalNumber) {

                    element.textContent = originalText;
                    clearInterval(counter);
                    return;

                }

                element.textContent = Math.floor(current);

            }, intervalTime);

            numberObserver.unobserve(element);

        });

    },

    {
        threshold: 0.5
    }

);

statNumbers.forEach(number => {

    numberObserver.observe(number);

});

const heroVisual = document.querySelector(".hero-visual");

window.addEventListener("scroll", () => {

    if (!heroVisual) return;

    const offset = window.scrollY * 0.08;

    heroVisual.style.transform =
        translateY(${offset}px);

});


updateActiveLink();
