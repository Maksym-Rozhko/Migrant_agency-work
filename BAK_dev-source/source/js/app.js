document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
    burgerMenu();
    initAllSliders();
    inputLabelsFocus();
    accordionShowMoreInfo();
    scrollToTop();
    popUp();
    sendPopUpOrderForm();
    smoothScrollToNav();
});

function burgerMenu() {
    const burgerMenuElem = document.querySelector('.burger-menu');
    const navigationMobileList = document.querySelector('.navigation__mobile');
    const navigationBackground = document.querySelector('.navigation-bg');
    
    burgerMenuElem.addEventListener('click', () => {
        burgerMenuElem.classList.toggle('burger-menu__active');
        navigationMobileList.classList.toggle('navigation__active');
        navigationBackground.classList.toggle('navigation-bg__active');
    });
};

const removeBurgerOverflow = () => {
    const burgerMenuElem = document.querySelector('.burger-menu');
    const navigationMobileList = document.querySelector('.navigation__mobile');
    const navigationBackground = document.querySelector('.navigation-bg');
    
    burgerMenuElem.classList.toggle('burger-menu__active');
    navigationMobileList.classList.toggle('navigation__active');
    navigationBackground.classList.toggle('navigation-bg__active');
};

function initAllSliders() {
    const advantagesSlider = new Swiper('.main-screen-slider.swiper-container', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        allowTouchMove: false,
    
        navigation: {
          nextEl: '.main-screen-btn__next',
          prevEl: '.main-screen-btn__prev',
        },
    });

    const reviewsSlider = new Swiper('.reviews-slider.swiper-container', {
        slidesPerView: 4,
        slidesPerGroup: 1,
        spaceBetween: 10,
  
        breakpoints: {
          300: {
            slidesPerView: 1,
          },
          575: {
            slidesPerView: 2,
          },
          812: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }
    });
}

function inputLabelsFocus() {
    const sectionFormBlock = document.querySelectorAll('.form');

    sectionFormBlock.forEach(form => {
        form.addEventListener('change', e => {
            const target = e.target;
            const label = target.labels[0];

            label && target.value ? label.classList.add('label-focus') : label.classList.remove('label-focus');
        });
    });
};

function accordionShowMoreInfo() {
    const accordionItemElems = document.querySelectorAll('.faq-item');
    
    const accordionRemoveItemElems = () => {
      accordionItemElems.forEach(item => item.classList.remove('faq-item--active'));
    }
    
    accordionItemElems.forEach(elem => {
      elem.addEventListener('click', () => {
        if (elem.classList.contains('faq-item--active')) {
          accordionRemoveItemElems();
        } else {
          accordionRemoveItemElems();
          elem.classList.add('faq-item--active');
        }
      });
    });
}

function scrollToTop() {
    const btnScrollUp = document.querySelector('.scroll-top');
    const topElem = document.querySelector('.main'); 

    btnScrollUp.addEventListener('click', () => {
        topElem.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

function popUp() {
    const btnOpenPopUpOrder = document.querySelectorAll('.main-button.order-call');
    const btnPopUpCloseElem = document.querySelector('.pop-up__close');
    const popUpOverflow = document.querySelector('.pop-up__overflow');
    const vacancyNameSend = document.querySelector('.vacancy-name');
    const allLabelsForm = document.querySelectorAll('.label');
    const btnReloadPage = document.querySelector('.btn-page_reload');
    const uForm2 = document.querySelector('#uForm_2');

    const clearInputs = () => {
        const allInputs = document.querySelectorAll('input:not(.uForm__extended)');
        const allTextarea = document.querySelectorAll('textarea');
        allInputs.forEach(input => input.value = '');
        allTextarea.forEach(txtarea => txtarea.value = '');
    };

    const openPopUp = () => {
        popUpOverflow.classList.add('pop-up__active');
        handlerReloadPage();
        document.addEventListener('keydown', escapeHandler);
    };

    const closePopUp = () => {
        popUpOverflow.classList.remove('pop-up__active');
        clearInputs();
        allLabelsForm.forEach(label => label.classList.remove('label-focus'));
        document.removeEventListener('keydown', escapeHandler);
    };

    const escapeHandler = e => {
        e.code === 'Escape' ? closePopUp() : false;
    }

    btnPopUpCloseElem.addEventListener('click', () => {
        closePopUp();
    });

    btnOpenPopUpOrder.forEach(btn => {
        btn.addEventListener('click', () => {
            if (vacancyNameSend.value === '') {
                vacancyNameSend.value = 'Заявка со страницы';
            }
            openPopUp();
        });
    });

    popUpOverflow.addEventListener('click', e => {
        const target = e.target;
        target.classList.contains('pop-up__close') || target === popUpOverflow ? closePopUp() : false;
    });

    const handlerReloadPage = () => {
        uForm2.addEventListener('submit', () => {
            setTimeout(() => {
                btnReloadPage.classList.add('show-btn__reload');
            }, 700);
        });
        
        btnReloadPage.addEventListener('click', () => {
            window.location.reload()
        });
    };
}

function sendPopUpOrderForm() {
    const vacancyItemElem = document.querySelectorAll('.vacancy-item');
    const vacancyNameSend = document.querySelector('.vacancy-name');
    const vacancyCountrySend = document.querySelector('.vacancy-country');


    vacancyItemElem.forEach(item => {
        item.addEventListener('click', e => {
            const target = e.target;
            if (target.classList.contains('order-call')) {
                const vacancyNameInfo = target.closest('.vacancy-item');

              if (vacancyNameInfo) {
                vacancyNameSend.value = vacancyNameInfo.querySelector('.vacancy-item__title').textContent.trim();
                vacancyCountrySend.value = vacancyNameInfo.querySelector('.location-name').textContent.trim();
              }
            }
        });
    });
}

function smoothScrollToNav() {
    const anchorsLink = document.querySelectorAll('li>a');
    const scrollTopLogo = document.querySelectorAll('a.header__logo');
    const headerLogoParentElem = document.querySelector('.header__logo-lang>a.header__logo');
    const footerLogoParentElem = document.querySelector('.footer-bottom>a.header__logo');

    const smoothScroll = (anchors) => {
        for (let anchor of anchors) {
            const blockID = anchor.getAttribute('href');
            anchor.addEventListener('click', (e) => {
                const target = e.target;

                if (anchor.classList.contains('pagenav')) return;

                if (anchor.href.match('/ua') || anchor.href.match('/ru')) return;

                e.preventDefault();

                if(innerWidth <= 812 && !target.classList.contains('logo')) {
                    setTimeout(() => {
                        removeBurgerOverflow();
                    }, 500);
                }

                document.querySelector(blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        };
    };
    
    smoothScroll(scrollTopLogo);
    smoothScroll(anchorsLink);
}

