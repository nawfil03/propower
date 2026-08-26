// ProPower Engineering & Contracting — site interactions
(function () {
  "use strict";

  /* Header scroll state */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* Active nav link */
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-nav a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;

  /* Scroll reveal (progressively enhanced — never leaves content stuck hidden) */
  var revealEls = document.querySelectorAll("[data-reveal]");
  /* Stagger siblings revealed together so groups cascade in rather than
     popping simultaneously. */
  var seenParents = new Map();
  revealEls.forEach(function (el) {
    var parent = el.parentElement;
    var count = seenParents.get(parent) || 0;
    el.style.setProperty("--reveal-delay", Math.min(count * 90, 360) + "ms");
    seenParents.set(parent, count + 1);
  });

  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
    /* Safety net: guarantees every element reveals even if it never
       intersects (e.g. crawlers, screenshot tools, very tall viewports). */
    window.setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add("in-view"); });
    }, 2200);
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* Scroll progress bar */
  var progressBar = document.querySelector(".scroll-progress");
  function onProgress() {
    if (!progressBar) return;
    var h = document.documentElement;
    var scrollable = h.scrollHeight - h.clientHeight;
    var pct = scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0;
    progressBar.style.width = pct + "%";
  }
  document.addEventListener("scroll", onProgress, { passive: true });
  onProgress();

  /* Cursor-reactive spotlight over dark sections */
  var spotlight = document.querySelector(".spotlight");
  if (spotlight && finePointer && !reduceMotion) {
    var darkSections = document.querySelectorAll(".on-dark, .hero, .page-hero, .cta-banner");
    document.addEventListener("mousemove", function (e) {
      var overDark = false;
      for (var i = 0; i < darkSections.length; i++) {
        var r = darkSections[i].getBoundingClientRect();
        if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
          overDark = true;
          break;
        }
      }
      spotlight.style.setProperty("--sx", e.clientX + "px");
      spotlight.style.setProperty("--sy", e.clientY + "px");
      spotlight.classList.toggle("is-active", overDark);
    }, { passive: true });
  }

  /* Magnetic primary buttons */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".btn-primary").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + x * 0.18 + "px," + y * 0.35 + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });

    /* 3D tilt on cards */
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        var rx = (0.5 - py) * 8;
        var ry = (px - 0.5) * 10;
        card.style.transform = "perspective(800px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-6px)";
        card.style.setProperty("--mx", px * 100 + "%");
        card.style.setProperty("--my", py * 100 + "%");
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* Marquee ticker — duplicate content once for a seamless loop */
  document.querySelectorAll(".marquee-track").forEach(function (track) {
    var clone = track.innerHTML;
    track.insertAdjacentHTML("beforeend", clone);
  });

  /* Hero headline word-cycle */
  var cycle = document.querySelector(".word-cycle");
  if (cycle) {
    var items = cycle.querySelectorAll(".wc-item");
    if (items.length > 1 && !reduceMotion) {
      var idx = 0;
      window.setInterval(function () {
        var current = items[idx];
        var next = items[(idx + 1) % items.length];
        current.classList.remove("wc-current");
        current.classList.add("wc-exit");
        next.classList.add("wc-current");
        window.setTimeout(function () {
          current.classList.remove("wc-exit");
        }, 550);
        idx = (idx + 1) % items.length;
      }, 2600);
    }
  }

  /* Contact form (client-side only — no backend wired up yet) */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var success = document.getElementById("form-success");
      if (success) {
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
  }

  /* Current year in footer */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
