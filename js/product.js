document.addEventListener('DOMContentLoaded', () => {
    // productKit img 
    const mainImg = document.querySelector('.js-productKit-img');
    const mainLink = mainImg.closest('a');
    const variantInputs = document.querySelectorAll('.js-productKit-img__input');

    variantInputs.forEach(input => {
        input.addEventListener('change', () => {
        if (input.checked) {
            const newSrc = input.value;
            mainImg.classList.add('is-fading');

            // Wait for fade-out before swapping image
            setTimeout(() => {
            mainImg.src = newSrc;
            mainLink.href = newSrc;
            mainImg.classList.remove('is-fading');
            }, 200); // slightly shorter than transition duration
        }
        });
    });

    // Fancybox
    Fancybox.bind("[data-fancybox]", {
    
    });

    // modal 
    document.addEventListener('click', function (e) {
        if (!e.target.matches('[data-show-modal]')) return;
        e.preventDefault();
        const modal = document.querySelectorAll('#' + e.target.dataset.id);
        Array.prototype.forEach.call(modal, function (el) {
        el.classList.add('active');
        document.body.style.overflow = 'hidden';
        });
    });
    document.addEventListener('click', function (e) {
        if (!e.target.matches('[data-close-modal]')) return;
        const modal = e.target.closest('.modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // swiper 
    var productKitSwiper = document.querySelector('.modalProductKitSwiper');
    if(productKitSwiper){
        new Swiper(productKitSwiper, {
            slidesPerView: 'auto',
            loop: true,
            spaceBetween: 10,
            speed: 500, 
            breakpoints: {
                768: {
                    spaceBetween: 30,
                },
            },
        });
    }
    
});