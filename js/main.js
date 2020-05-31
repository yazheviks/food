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

    const deadline = '2020-06-03';

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
        clearTimeout(modelTimer);
    }
    
    function closeModal() {
        modalWindow.style.display = 'none';
        document.body.style.overflow = '';
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

    const modelTimer = setTimeout(() => {
        openModal();
        console.log('vremya');
    }, 3000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
            openModal();
            console.log(document.documentElement.scrollHeight);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
});