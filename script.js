document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");

    hamburger.classList.toggle("toggle");
  });

  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue
        ) {
          card.classList.remove("hide");

          card.style.opacity = "0";
          setTimeout(() => (card.style.opacity = "1"), 200);
        } else {
          card.classList.add("hide");
        }
      });
    });
  });

  const observerOptions = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, observerOptions);

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));

  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const successMsg = document.getElementById("successMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    if (nameInput.value.trim() === "") {
      setError(nameInput, "Name cannot be empty");
      isValid = false;
    } else {
      setSuccess(nameInput);
    }

    if (emailInput.value.trim() === "") {
      setError(emailInput, "Email cannot be empty");
      isValid = false;
    } else if (!isEmail(emailInput.value.trim())) {
      setError(emailInput, "Not a valid email");
      isValid = false;
    } else {
      setSuccess(emailInput);
    }

    if (messageInput.value.trim() === "") {
      setError(messageInput, "Message cannot be empty");
      isValid = false;
    } else {
      setSuccess(messageInput);
    }

    if (isValid) {
      successMsg.innerText = "Message sent successfully!";
      form.reset();

      setTimeout(() => {
        successMsg.innerText = "";
        removeSuccessStyles();
      }, 3000);
    }
  });

  function setError(input, message) {
    const formGroup = input.parentElement;
    const small = formGroup.querySelector("small");
    formGroup.classList.add("error");
    small.innerText = message;
  }

  function setSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove("error");
  }

  function removeSuccessStyles() {
    const formGroups = document.querySelectorAll(".form-group");
    formGroups.forEach((group) => group.classList.remove("error"));
  }

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    );
  }
});
