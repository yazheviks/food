document.addEventListener('DOMContentLoaded', () => {

    //Tabs

    let tabElement = document.querySelectorAll('.tabheader__item'),
        tabParent = document.querySelector('.tabheader__items'),
        tabContent = document.querySelectorAll('.tabcontent');

    function hideTabContent() {
        tabContent.forEach(item => {
            item.style.display = 'none';
        });
        tabElement.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });                
    }

    function showTabContent(item = 0) {
        tabContent[item].style.display = 'block';
        tabElement[item].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabElement.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });          
        }  
    });

    //Timer

    const deadline = '2020-06-16';

    function timeLeft(time) {
        const t = Date.parse(time) - Date.parse(new Date()),
            days = Math.floor(t/(24 * 60 * 60 * 1000)),
            hours = Math.floor((t/(60 * 60 * 1000)) % 24),
            minutes = Math.floor((t/(60 * 1000)) % 60),
            seconds = Math.floor((t/1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero (num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function timer(selector, endTime) {
        const main = document.querySelector(selector),
            days = main.querySelector('#days'),
            hours = main.querySelector('#hours'),
            minutes = main.querySelector('#minutes'),
            seconds = main.querySelector('#seconds'),
            timeInterval = setInterval(activeTimer, 1000);
        
        activeTimer();
        
        function activeTimer() {
            const some = timeLeft(endTime);
            days.textContent = getZero(some.days);
            hours.textContent = getZero(some.hours);
            minutes.textContent = getZero(some.minutes);
            seconds.textContent = getZero(some.seconds);

            if (main >= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    timer('.timer', deadline);

    //Modal

    const modalBtn = document.querySelectorAll('[data-modal]'),
        modalWindow = document.querySelector('.modal'),
        close = document.querySelector('[data-close]');
    
    function openModal() {
        modalWindow.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimer);
    }
    
    function closeModal() {
        modalWindow.style.display = 'none';
        document.body.style.overflow = '';
        formAppear();
    }

    modalBtn.forEach( (btn) => {
        btn.addEventListener('click', () => {
            openModal();
        });
    });

    close.addEventListener('click', () => {
        closeModal();
    });

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.style.display == 'block') {
            closeModal();
        }
    });

    const modalTimer = setTimeout(() => {
        openModal();
        console.log('vremya');
    }, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            console.log(document.documentElement.scrollHeight);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //Menu items

    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH () {
            this.price = this.price * this.transfer;
        }

        render () {
            let element = document.createElement('div');

            if(this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.parent.append(element);
        }
    }

    new MenuCard (
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();

    new MenuCard (
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container'
    ).render();

    new MenuCard (
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container'
    ).render();

    //Forms FormData

    // const forms = document.querySelectorAll('form'),
    //       message = {
    //           loading: 'Загрузка...',
    //           success: 'Спасибо! Мы обязательно с вами свяжемся.',
    //           failure: 'Что-то пошло не так. Попробуйте еще раз.'
    //       },
    //       wrapper = document.createElement('div');
    
    // forms.forEach((item) => {
    //     sentData(item);
    // });

    // function sentData (arg) {
    //     arg.addEventListener ('submit', (e) => {
    //         e.preventDefault();

    //         const request = new XMLHttpRequest();
    //         request.open('POST', 'server.php');

    //         const formData = new FormData(arg);
            
    //         request.send(formData);
    //         arg.append(wrapper);
    //         wrapper.textContent = message.loading;

    //         request.addEventListener('load', () => {
    //             if(request.status == 200) {
    //                 wrapper.textContent = message.success;
    //                 arg.reset();
    //                 setTimeout(() => {
    //                     wrapper.remove();
    //                     if(modalWindow.style.display == 'block') {
    //                         closeModal();
    //                     }
    //                 }, 3000);
    //             } else {
    //                 wrapper.textContent = message.failure;
    //             }
    //         });
    //     });
    // }
    
    // Forms JSON

    const forms = document.querySelectorAll('form'),
          message = {
              loading: 'img/original.svg',
              success: 'Спасибо! Ожидайте звонка.',
              failure: 'Что-то пошло не так. Попробуйте еще раз.'
          },
          formModal = document.querySelector('.modal__form'),
          titleModal = document.querySelector('.modal__title');
    let element;
    
    
    function formDelete () {
        formModal.style.display = 'none';
    }
    
    function formAppear () {
        if(formModal.style.display == 'none') {
            formModal.style.display = 'block';
        }
        titleModal.textContent = 'МЫ СВЯЖЕМСЯ С ВАМИ КАК МОЖНО БЫСТРЕЕ!';
    }

    function timeout() {
        setTimeout(() => {
            closeModal();                    
        }, 3000);
    }

    function statusModal (status) {
        openModal();
        formDelete();
        titleModal.textContent = status;
    }

    function sentData (form) {
        form.addEventListener ('submit', (e) => {
            e.preventDefault();

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            const formData = new FormData(form),
                  obj = {};

            formData.forEach((item, i) => {
                obj[i] = item;
            });

            const json = JSON.stringify(obj);
            
            request.send(json);

            function addSpinner () {
                element = document.createElement('img');
                element.src = message.loading;
                element.style.cssText = `
                    display: block;
                    margin: 10px auto;
                `;
                document.querySelector('.modal__content').append(element);
                titleModal.textContent = 'Загрузка...';
            }

            function deleteSpinner () {
                element.style.display = 'none';
            }
            
            addSpinner();
            formDelete();
            openModal();

            request.addEventListener('load', () => {
                deleteSpinner();
                if(request.status == 200) {
                    statusModal(message.success);
                    form.reset();
                    timeout();
                } else {
                    statusModal(message.failure);
                    timeout();
                }
            });
        });
    }
    
    forms.forEach((item) => {
        sentData(item);
    });
});