document.addEventListener("DOMContentLoaded", () => {
  // INITIAL SETUP
  const titles = Array.prototype.slice.call(
    document.querySelectorAll(".project-title")
  );

  // PAGE LOAD
  const loadingAnim = new gsap.timeline();

  loadingAnim.fromTo(
    ".swiper-wrapper.is-main",
    {
      y: "-500%",
      opacity: 0
    },
    {
      y: "0%",
      opacity: 1,
      delay: 3.5,
      duration: 1,
      ease: "power2.inOut"
    }
  );

  loadingAnim.restart();

  // FUNCTIONS
  const updateProject = (idx) => {
    titles.forEach((element) => {
      element.classList.remove("is-active");
    });

    titles[idx].classList.add("is-active");

    // Update video
    updateVideo(idx);

    // Update live link
    const projectLink = titles[idx].querySelector(".live-link").innerHTML;
    document.querySelector(".project-link").setAttribute("href", projectLink);

    // Update banner
    document.querySelector(".banner-link").innerText = projectLink;
    document.querySelector(".banner-heading").innerText = titles[
      idx
    ].querySelector("[project-title]").innerHTML;
  };

  const updateVideo = (idx) => {
    // Enter loading state
    const videoComponent = document.querySelector(".video_component");
    videoComponent.classList.add("is-loading");

    const videoEmbed = document.querySelector(".video-embed video");
    const videoLink = titles[idx].querySelector(".video-link").innerHTML.trim();

    console.log(".video-link:", videoLink); // Debugging: Gibt den Video-Link in der Konsole aus

    if (videoLink) {
      videoEmbed.setAttribute("src", videoLink);
    } else {
      console.error(".video-link: Kein gültiger Video-Link gefunden!");
    }

    videoEmbed.addEventListener("canplay", () =>
      videoComponent.classList.remove("is-loading")
    );

    videoEmbed.addEventListener("error", () => {
      console.error(".video-link: Fehler beim Laden des Videos:", videoLink);
      videoComponent.classList.remove("is-loading");
    });
  };

  // SLIDER
  const projectsSwiper = new Swiper(".swiper.is-main", {
    direction: "vertical",
    loop: false,
    mousewheel: true,
    keyboard: true,
    centeredSlides: true,
    effect: "slide",
    grabCursor: true,
    spaceBetween: 150,
    speed: 900,
    slideActiveClass: "is-active",
    navigation: {
      nextEl: document.querySelector(".swiper-next"),
      prevEl: document.querySelector(".swiper-prev")
    },
    on: {
      init: function () {
        updateProject(0);
      }
    }
  });

  projectsSwiper.on("slideChange", () => {
    updateProject(projectsSwiper.activeIndex);
  });

  // TITLES INTERACTION
  titles.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      projectsSwiper.slideTo(titles.indexOf(element), 1000);
    });
  });

  const rotateSwiper = new gsap.timeline({
    defaults: { duration: 1, ease: "expo.out" }
  });
  rotateSwiper.paused(true);

  rotateSwiper.to(".swiper-slider_component", {
    rotationY: "0deg",
    rotationZ: "1deg"
  });

  document.querySelector(".titles-list").addEventListener("mouseenter", () => {
    rotateSwiper.timeScale(1);
    rotateSwiper.restart();
  });

  document.querySelector(".titles-list").addEventListener("mouseleave", () => {
    rotateSwiper.timeScale(0.9);
    rotateSwiper.reverse();
  });
});
