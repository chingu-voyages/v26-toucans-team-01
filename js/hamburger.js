const hamburger = document.getElementById('hamburger');
const navUL = document.getElementById('nav-ul');
const navBar = document.getElementById("nav-bar");
const closeBtn = document.getElementById("closebtn");
const openBtn = document.getElementById("openbtn");
const navLinks = document.querySelectorAll("#developers-modal-link, #contact-modal-link");
const navLinksArr = [...navLinks];
let showMenu = false;

function closeMenu () {
    document.getElementById("nav-bar").style.height = "0%";
    navBar.classList.remove('show-overlay');
    navUL.classList.remove('nav-ul-links');
    openBtn.style.display = "block";
    closeBtn.style.opacity = "0";
}

function openMenu () {
    document.getElementById("nav-bar").style.height = "100%";
    openBtn.style.display = "none";
    closeBtn.style.opacity = "1";
    navBar.classList.add('show-overlay');
    navUL.classList.add('nav-ul-links');
}

closeBtn.addEventListener('click', () => {
    closeMenu();
})

openBtn.addEventListener('click', () => {
    openMenu();
})

// hamburger.addEventListener("click", () => {
//     let mobileScreen = window.matchMedia("(max-width: 1024px)");
//     if (mobileScreen.matches) {
//         navBar.classList.toggle('show-overlay');
//         navUL.classList.toggle('nav-ul-updated');
//         hamburger.classList.toggle('hamburger-updated');
//         if (!showMenu) {
//             openNav.style.opacity = "0";
//             closeNav.style.opacity = "1";
//             showMenu = false;
//         } else {
//             openNav.style.opacity = "1";
//             closeNav.style.opacity = "0";
//             showMenu = true;
//         }

//         navLinksArr.forEach(link => {
//             link.classList.toggle("nav-ul-links");
//         });
//     }
// });