import lang from "./js/lang";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import throttle from "lodash/throttle";
import { scrollTracker, scrollUp } from './js/help_functions';

const LOCALSTORAGE_KEY = "language";
const gallery = document.querySelector(".gallery"); 
let smleLightBox = new SimpleLightbox('li.is-visible-li a', {captionsData: 'alt', captionDelay: 0});


// ---------- обробка кнопок меню
{
    const menu = document.querySelector(".buttons-ul");
    const menuItems = document.querySelectorAll(".buttons-ul-btn");

    function onClickMenu({target}) {
        if (target.classList.contains("buttons-ul-btn")){
            menuItems.forEach((btn) => {
                if (btn.classList.contains("active")){
                    btn.classList.remove("active");
                }
            });
            target.classList.add('active');
            Array.from(gallery.children).forEach((li, idx)=>{
                if (li.classList.contains(target.value) || target.value === "all"){
                    li.classList.remove("is-hidden-li");
                    li.classList.add("is-visible-li");
                }else{
                    li.classList.add("is-hidden-li");
                    li.classList.remove("is-visible-li");
                }
            smleLightBox.refresh();
            })
        }
    };

    menu.addEventListener('click', onClickMenu);
}


// ---------- обробка кнопки для повернення на початок сторінки
{
    const btnScrollToTop = document.querySelector('.btn-up-scroll');

    window.addEventListener('scroll', throttle(()=>{scrollTracker(btnScrollToTop);},500));

    btnScrollToTop.addEventListener('click', scrollUpBtn);
    function scrollUpBtn(){
        scrollUp();
        this.classList.add("is-hidden-btn");
    };
}


// ---------- обробка вибору мови сайту
{
    const language = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

    switch (language){
        case "ua": changeLanguage("ua"); break;
        case "en": changeLanguage("en"); break;
        default:   changeLanguage("ua"); break;
    }

    const langSelect = document.querySelector('.lang');
    langSelect.addEventListener('change', ({target})=>{changeLanguage(target.value)});


    function changeLanguage(language){

        //зберігаємо обрану мову в локальному сховищі
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(language));

        //header, footer, hero
        document.querySelector(".lang").value = language;

        document.querySelector("html").setAttribute('lang',lang.metaLang[language]);
        document.querySelector('meta[name="title"]').setAttribute('content', lang.metaTitle[language]);
        document.querySelector('meta[name="descriptopn"]').setAttribute('content', lang.metaDscription[language]);

        document.querySelector(".header-h1").textContent = lang.title[language];
        document.querySelector(".header-h2").textContent = lang.subTitle[language];
        document.querySelector("header .city").textContent = lang.city[language];
        document.querySelector(".gallery-h3").textContent = lang.galleryTitle[language];
        document.querySelector(".footer-h3").textContent = lang.title[language];
        document.querySelector(".footer-h4").textContent = lang.subTitle[language];
        document.querySelector("footer .city").textContent = lang.city[language];

        //кнопки меню
        document.querySelector('button[value="all"]').textContent = lang.menuBtns.all[language];;
        document.querySelector('button[value="steering-wheel"]').textContent = lang.menuBtns.wheels[language];
        document.querySelector('button[value="knob"]').textContent = lang.menuBtns.knobs[language];
        document.querySelector('button[value="cover"]').textContent = lang.menuBtns.covers[language];
        document.querySelector('button[value="armrest"]').textContent = lang.menuBtns.armrests[language];
    
        //текст елементів галереї

        const galleryImg = document.querySelectorAll(".gallery-item img");
        const galleryText = document.querySelectorAll(".gallery-item-content p");

        galleryImg.forEach((item, idx) => {
            galleryImg[idx].alt = lang.imgContent[idx][language];
            galleryText[idx].textContent = lang.imgContent[idx][language];
        })

    }
}