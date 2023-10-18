


// По клику на тумблер появляется загрузка изображения
const toggleElements = document.querySelectorAll('.toggle-switch');

// Добавляем обработчик события для каждого тумблера
toggleElements.forEach((toggle) => {
    toggle.addEventListener('change', function() {
        const item = this.closest('.item');
        const hiddenImageDownload = item.querySelector('.hidden-image_download');

        if (hiddenImageDownload) { // Проверяем наличие блока .hidden-image_download
            hiddenImageDownload.style.display = this.checked ? 'block' : 'none';
        }
    });
});





$( document ).ready(function() {

// Noui Slider
    var roundSlider = document.getElementById('slider-round');

    noUiSlider.create(roundSlider, {
        start: 50,
        connect: 'lower',
        range: {
            'min': 0,
            'max': 100
        }
    });

// Add variant hidden

    $('.add-variant').click(function(){
        $(this).parents('.check-box-line').find('.hidden-add_variant').slideToggle(400);
        $(this).parents('.check-box-line').find('.add-variant').toggleClass('is_openn');
    });


// Fancy-box
    Fancybox.bind('[data-fancybox]', {
        // Custom options for all galleries
    });


});


// Drang and drop


$( document ).ready(function() {
    const draggableBlocks = document.querySelectorAll('.draggable');
    let dragSrcEl = null;

    draggableBlocks.forEach(block => {
        block.addEventListener('dragstart', handleDragStart);
        block.addEventListener('dragover', handleDragOver);
        block.addEventListener('drop', handleDrop);
        block.addEventListener('dragend', handleDragEnd);
    });

    function handleDragStart(event) {
        dragSrcEl = this;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        event.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDrop(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        if (dragSrcEl !== this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = event.dataTransfer.getData('text/html');
        }
        return false;
    }

    function handleDragEnd(event) {
        draggableBlocks.forEach(block => {
            block.classList.remove('over');
        });
    }



// SWIPER

    var swiper = new Swiper(".quiz-swiper", {
        autoHeight: true,
        simulateTouch: false,
        navigation: {
            nextEl: ".q-next",
            prevEl: ".q-prev",
        },
    });



});


