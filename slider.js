$(() => {
    let x = 0;
    let interval; 
    const path = 'assets/'; // Change this path to match your path's name
    const slider = $('#slider'); // Change this ID to match your slider's ID
    const container = $('#container')
    const image = ['wall1.jpg', 'wall4.jpg', 'wall2.jpg', 'wall3.jpg', 'wall5.jpg', 'wall6.jpg', 'wall7.jpg', 'wall8.jpg']; // Change these image names to match your image files

    container
        .append(`<div id="thumb"></div>`)
        .css({
            position: 'relative'
        })
    slider
        .css({background: `url('${path}${image[0]}') center/cover`, borderRadius: '20px', position: 'relative', overflow: 'hidden'})
        .prepend(`<div id="progress"></div>`)
        .append(`<div id="slide"></div>`)
        .append(`<span id="place"></span>`)
        .click(function(e) {
            if(e.offsetX >= $(this).width() / 2) changeImage(1);
            else changeImage(-1);
            resetInterval(); 
        });
    const slide = $('#slide');
    const thumb = $('#thumb');
    const place = $('#place');
    const progress = $('#progress');

    progress.css({
        position: 'absolute',
        top: 0,
        left: 0,
        height: '2px',
        width: '0%',
        backgroundColor: 'cyan',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        zIndex: 99
    });

    slide.css({
        width: '100%',
        height: '100%',
        background: `url('${path}${image[0]}') center/cover`,
        borderRadius: '20px'
    });

    // Show Place on Slider
    place
        .css({
            color: '#FFF',
            position: 'absolute',
            top: '20px',
            right: '20px',
            font: 'bold 1.5em Helvetica, sans-serif'
        })
        .text(`1 / ${image.length}`);

    // Create thumb for slider
    image.forEach(img => thumb.append(`<img src="${path}${img}" />`));
    thumb
        .css({ 
            textAlign: 'center',

        })
        .find('img')
                .css({
                    margin: '15px 5px',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    border: '2px solid #FFF',
                })
                .click(function() {
                    x = $(this).parent().find('img').index(this);
                    changeImage(0);
                    resetInterval(); 
                });

    // Call ResponsiveThumb functions when window resized
    responsiveThumb();
    $(window).resize(responsiveThumb);

    // Responsive
    function responsiveThumb() {
        if (window.innerWidth <= 768) {
            thumb.find('img').css({
                width: '60px',
                height: '60px'
            });
        }
    }
    
    // Call Interval 
    startInterval();

    // Create Interval
    function startInterval() {
        animateProgressBar();
        interval = setInterval(() => {
            changeImage(1);
            animateProgressBar();
        }, 3000);
    }

    // Reset Interval when slider clicked
    function resetInterval() {
        clearInterval(interval);
        animateProgressBar();
        startInterval();
    }

    // Create Progress Bar

    function animateProgressBar() {
        progress
            .stop(true, true)
            .css({ width: '0%' })
            .animate({ width: '100%' }, 3000, 'linear'); 
    }
    
    

    // Change with Click
    function changeImage(dir) {

        x = (x + dir + image.length) % image.length;
        place.text(`${x + 1} / ${image.length}`);
        slide
            .fadeOut('fast', function() {
                $(this)
                    .css({
                        backgroundImage: `url('${path}${image[x]}')`
                    })
                    .fadeIn('fast', function () {
                        slider.css({
                            backgroundImage: `url('${path}${image[x]}')`
                        });
                    });
            });

        // Update thumb border color
        thumb.find('img').css('border-color', '#FFF');
        thumb.find('img').eq(x).css('border-color', 'cyan');
    }

    // initial thumb border color
    thumb.find('img').eq(0).css('border-color', 'cyan');
});
