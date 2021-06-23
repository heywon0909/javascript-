function debounce(func,wait=20,immediate= true){
    var timeout;
    return function(){
        var context = this, args = arguments;
        var later = function(){
            timeout = null;
            if(!immediate) func.apply(context,args);

        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later,wait);
        if(callNow) func.apply(context,args);
    };
};

const sliderImages = document.querySelectorAll('.slide-in');
function checkSlide() {
    sliderImages.forEach(sliderImage => {
      // half way through the image
      const viewportBottom = window.scrollY + window.innerHeight;
      const imageHalfBottom = sliderImage.offsetTop + sliderImage.height / 2;
      // bottom of the image
      
      const isHalfShown = viewportBottom > imageHalfBottom;
      const isNotScrolledPast = window.scrollY < imageHalfBottom;
      if (isHalfShown && isNotScrolledPast) {
        sliderImage.classList.add('active');
      } else {
        sliderImage.classList.remove('active');
      }
    });
  }
window.addEventListener('scroll',debounce(checkSlide));
const title = document.querySelector('.title.header');
function titleShown(){
  title.classList.add('active');
}
setTimeout(titleShown(),1000);

const btn = document.querySelector('.next_btn');
var offsetHeight = document.querySelector(".site-wrap").offsetHeight;
function nextShown(e){
  if(window.scrollY + innerHeight > btn.offsetTop){
    btn.classList.add('active');
  }else{
    btn.classList.remove('active');
  }
}
window.addEventListener('scroll',nextShown);