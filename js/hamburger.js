const hamburger = document.getElementById('hamburger');
const navUL = document.getElementById('nav-ul');
const navBar = document.getElementById("nav-bar");
const openNav = document.getElementsByClassName("fa-bars");
const closeNav = document.getElementsByClassName("fa-times");
const navLinks = document.querySelectorAll("#developers-modal-link, #contact-modal-link");
const navLinksArr = [...navLinks];
let showMenu = false;

hamburger.addEventListener("click", () => {
    let mobileScreen = window.matchMedia("(max-width: 1024px)");
    if (mobileScreen.matches) {
        navBar.classList.toggle('show-overlay');
        navUL.classList.toggle('nav-ul-updated');
        hamburger.classList.toggle('hamburger-updated');
        if (!showMenu) {
            openNav.classList.toggle("hide-hamburger");
            closeNav.class.toggle("show-close-button");
            showMenu = true;
        } else {
            closeNav.class.toggle("hide-hamburger");
            openNav.classList.toggle("show-close-button");
            showMenu = false;
        }
        navLinksArr.forEach(link => {
            link.classList.toggle("nav-ul-links");
        });
    }
});