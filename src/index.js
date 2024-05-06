import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import throttle from "lodash/throttle";
import { scrollTracker, scrollUp } from './js/help_functions';


const gallery = document.querySelector(".gallery"); 
let smleLightBox = new SimpleLightbox('li.is-visible-li a', {captionsData: 'alt', captionDelay: 0});



// ---------- обробка кнопок меню
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



// ---------- btnScrollToTop - кнопка для повернення на початок сторінки
const btnScrollToTop = document.querySelector('.btn-up-scroll');

window.addEventListener('scroll', throttle(()=>{scrollTracker(btnScrollToTop);},500));

btnScrollToTop.addEventListener('click', ()=>{
    scrollUp();
    this.classList.add('is-hidden-btn');
});



// ---------- обробка вибору мови сайту
const lengSelect = document.querySelector('.leng');

lengSelect.addEventListener('change', onSelectChange);

function onSelectChange({target}){
    
}