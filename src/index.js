import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import throttle from "lodash/throttle";
import { scrollTracker, scrollUp } from './js/help_functions';


const gallery = document.querySelector(".gallery");
let smleLightBox = new SimpleLightbox('ul.gallery a', {captionsData: 'alt', captionDelay: 0});


const btnScrollToTop = document.querySelector('.btn-up-scroll');        
window.addEventListener('scroll', throttle(()=>{scrollTracker(btnScrollToTop);},500));
btnScrollToTop.addEventListener('click', ()=>{
    scrollUp();
    this.classList.add('is-hidden-btn');
})  