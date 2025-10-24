document.addEventListener('DOMContentLoaded', function(){
        /*Easy selector helper function */
        const select = (el, all = false) => {
                if (!el || typeof el !== 'string') return null;
                el = el.trim();
                if (all) {
                        return [...document.querySelectorAll(el)];
                } else {
                        return document.querySelector(el);
                }
        }
        /* Easy event listener function */
        const on = (type, el, listener, all = false) => {
                let selectEl = select(el, all)
                if (selectEl) {
                if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
                } else {
                selectEl.addEventListener(type, listener)
                }
                }
        }
        /* Easy on scroll event listener  */
        const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
        }

        // Появление карточки при клике или ховере 
        const cartBtn = select('.header-cart__btn');
        const cartWrap = select('.headerCart-item__wrap');

        if (cartBtn && cartWrap) {
        cartBtn.addEventListener('mouseenter', () => {
        cartWrap.classList.add('_show');
        });
        cartBtn.addEventListener('mouseleave', () => {
        setTimeout(() => {
        if (!cartWrap.matches(':hover') && !cartBtn.matches(':hover')) {
                cartWrap.classList.remove('_show');
        }
        }, 100);
        });
        cartWrap.addEventListener('mouseenter', () => {
        cartWrap.classList.add('_show');
        });
        cartWrap.addEventListener('mouseleave', () => {
        setTimeout(() => {
        if (!cartWrap.matches(':hover') && !cartBtn.matches(':hover')) {
                cartWrap.classList.remove('_show');
        }
        }, 100);
        });

        // Also toggle on click (for mobile)
        cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartWrap.classList.toggle('_show');
        });
        }
        
        // хедер при при скролле 
        let selectHeader = select('.header')
        if (selectHeader) {
        const headerScrolled = () => {
        if (window.scrollY > 100) {
                selectHeader.classList.add('scrolling')
        } else {
                selectHeader.classList.remove('scrolling')
        }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(window, headerScrolled)
        }
        // бургер
        const burger = select('.js-burger');
        const nav = select('.header-nav');

        document.addEventListener('click', (e) => {
            const isBurger = e.target.closest('.js-burger');
            const isNav = e.target.closest('.header-nav');

            if (isBurger) {
                burger.classList.toggle('clicked');
                nav.classList.toggle('show');
                return; 
            }
            if (!isNav) {
                burger.classList.remove('clicked');
                nav.classList.remove('show');
            }
        });


        // marquee 
        const marquee = select('.marquee-item');
        if(marquee){
                const content = marquee.querySelector('.marquee-item__content');
                const cloneCount = 2; // add 2 more clones
                for (let i = 0; i < cloneCount; i++) {
                const clone = content.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                marquee.appendChild(clone);
                }
        }

        // dropdown 
        HTMLElement.prototype.slideToggle = function(duration, callback) {
        if (this.clientHeight === 0) {
        _s(this, duration, callback, true);
        } else {
        _s(this, duration, callback);
        }
        };
        HTMLElement.prototype.slideUp = function(duration, callback) {
        _s(this, duration, callback);
        };
        HTMLElement.prototype.slideDown = function (duration, callback) {
        _s(this, duration, callback, true);
        };
        function _s(el, duration, callback, isDown) {
        if (typeof duration === 'undefined') duration = 400;
        if (typeof isDown === 'undefined') isDown = false;
        el.style.overflow = "hidden";
        if (isDown) el.parentNode.classList.add('is-open');
        if (isDown) el.style.display = "block";
        var elStyles        = window.getComputedStyle(el);
        var elHeight        = parseFloat(elStyles.getPropertyValue('height'));
        var elPaddingTop    = parseFloat(elStyles.getPropertyValue('padding-top'));
        var elPaddingBottom = parseFloat(elStyles.getPropertyValue('padding-bottom'));
        var elMarginTop     = parseFloat(elStyles.getPropertyValue('margin-top'));
        var elMarginBottom  = parseFloat(elStyles.getPropertyValue('margin-bottom'));
        var stepHeight        = elHeight        / duration;
        var stepPaddingTop    = elPaddingTop    / duration;
        var stepPaddingBottom = elPaddingBottom / duration;
        var stepMarginTop     = elMarginTop     / duration;
        var stepMarginBottom  = elMarginBottom  / duration;
        var start;

        function step(timestamp) {
        if (start === undefined) start = timestamp;
        var elapsed = timestamp - start;
        if (isDown) {
        el.style.height        = (stepHeight        * elapsed) + "px";
        el.style.paddingTop    = (stepPaddingTop    * elapsed) + "px";
        el.style.paddingBottom = (stepPaddingBottom * elapsed) + "px";
        el.style.marginTop     = (stepMarginTop     * elapsed) + "px";
        el.style.marginBottom  = (stepMarginBottom  * elapsed) + "px";
        } else {
        el.style.height        = elHeight        - (stepHeight        * elapsed) + "px";
        el.style.paddingTop    = elPaddingTop    - (stepPaddingTop    * elapsed) + "px";
        el.style.paddingBottom = elPaddingBottom - (stepPaddingBottom * elapsed) + "px";
        el.style.marginTop     = elMarginTop     - (stepMarginTop     * elapsed) + "px";
        el.style.marginBottom  = elMarginBottom  - (stepMarginBottom  * elapsed) + "px";
        }
        if (elapsed >= duration) {
        el.style.height        = "";
        el.style.paddingTop    = "";
        el.style.paddingBottom = "";
        el.style.marginTop     = "";
        el.style.marginBottom  = "";
        el.style.overflow      = "";
        if (!isDown) el.parentNode.classList.remove('is-open');
        if (!isDown) el.style.display = "none";
        if (typeof callback === 'function') callback();
        } else {
        window.requestAnimationFrame(step);
        }
        }
        window.requestAnimationFrame(step);
        }

        document.addEventListener("click", function(e){
        if(!e.target.classList.contains('drop-head')){
                }
                else {
                        var nextPanel = e.target.nextElementSibling;
                        nextPanel.slideToggle(200);
                }
        })

        // observer
        const inViewport = (entries, observer) => {
        entries.forEach(entry => {
                const el = entry.target;

                el.classList.toggle("is-inViewport", entry.isIntersecting);

                if (entry.isIntersecting && !el.classList.contains('watched')) {
                let delay = el.getAttribute('data-delay');
                if (window.innerWidth < 992 && delay) {
                        const delayNum = parseFloat(delay) || 0;
                        delay = Math.min(delayNum, 0.2) + 's';
                }

                if (delay) {
                        el.style.transitionDelay = delay;
                        el.style.animationDelay = delay;
                }

                el.classList.add("watched");
                }
        });
        };

        let ioConfiguration = {
        rootMargin: '0% 0% 0% 0%',
        threshold: 0.2
        };

        const Obs = new IntersectionObserver(inViewport, ioConfiguration);
        document.querySelectorAll('[data-inviewport]').forEach(EL => {
        Obs.observe(EL);
        });

})





