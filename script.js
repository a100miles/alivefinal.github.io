document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                preloader.style.opacity = "0";
                setTimeout(() => preloader.remove(), 500);
            }, 800);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    const navbar = document.querySelector(".nav-header");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
                navbar.style.backdropFilter = "blur(10px)";
            } else {
                navbar.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
                navbar.style.backdropFilter = "blur(5px)";
            }
        });
    }

    const animateOnScroll = () => {
        document.querySelectorAll(".animate-on-scroll").forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.8) {
                el.classList.add("animated");
            }
        });
    };
    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();

    const audioPlayer = document.getElementById("main-audio");
    const playButtons = document.querySelectorAll(".play-track");
    const trackTitle = document.getElementById("track-title");

    if (playButtons.length > 0) {
        playButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const src = btn.getAttribute("data-src");
                const title = btn.getAttribute("data-title");
                audioPlayer.src = src;
                trackTitle.textContent = title;
                audioPlayer.play();
                playButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
            });
        });
    }

    const countdownDate = new Date("2025-12-25T00:00:00").getTime();
    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown-timer").innerHTML = "<h3 class='text-success'>ALBUM IS OUT!</h3>";
        }
    }, 1000);

    document.querySelectorAll('.gallery-thumb').forEach((img, index) => {
        img.style.transitionDelay = `${index * 0.1}s`;
    });
});