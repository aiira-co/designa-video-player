$(document).ready(function () {

    var wrapper = $('body');

    // console.log($('.ad-video').not('[_adConstructed]'));
    function scanDOM4media() {
        // scan for ad-video
        if (wrapper.find('.ad-video').not('[_adConstructed]').length !== 0) {
            // console.log('slider found', $('.ad-video').not('[_adConstructed]').length);
            constructVideo();
        }

    }

    scanDOM4media();

    // Scan DOM Every 1s for unconstructed videos
    setInterval(function () {
        // console.log('scannning for media');
        scanDOM4media();
    }, 3000);


    // VIDEO PLAYER CONTROLS

    function constructVideo() {
        $('.ad-video')
            .not('[_adConstructed]')
            .each(function () {
                // check for video title: create the video title div
                if ($(this)[0].hasAttribute('videoTitle')) {
                    let videoTitleDIV =
                        `<div class="ad-heading text-center">
                  ` +
                        $(this).attr('videoTitle') +
                        `
                      </div>`;
                    $(this).append(videoTitleDIV);
                }

                videoPlayerId = $(this)[0].hasAttribute('videoId') ?
                    '#' + $(this).attr('videoId') :
                    '#video';
                let videoPlayer = $(this).find(videoPlayerId);
                videoPlayer.removeAttr('controls');

                //Check for autoplay
                if (videoPlayer[0].hasAttribute('autoplay')) {
                    var autoplay = true;
                    playBTN = 'pause';
                    $(this).attr('isplaying', 'true');
                } else {
                    var autoplay = false;
                    playBTN = 'play';
                    $(this).attr('isplaying', 'false');
                }

                //Create the Video Controls

                let videoControlHTML =
                    `
              
                            <span class="ad-message-display">
                              Volume: 95%
                            </span>
                            <span class="screen-button">
                              <i class="fa fa-` +
                    playBTN +
                    ` fa-5x fa-stack"></i>
                            </span>
                            <div class="ad-controls" locked>
                              <input type="range" name="" min="0" value="0" class="" id="seeker-control">
                              <div class="range-seeker"></div>
                              <div>
                                <button class="ad-btn ad-icon clear ad-round play ad-flat">
                                  <i class="fa fa-` +
                    playBTN +
                    `"></i>
                                </button>
                                <span class="ad-timer">
                                  <span class="currentTime">0:00</span>
                                  /
                                  <span class="duration">1:06</span>
                                </span>
                                <span class="rFloat">
                                  <span class="volume-control">
              
                                    <button class="ad-btn ad-round clear ad-icon ad-flat">
                                      <i class="fa fa-volume-up"></i>
                                    </button>
                                    <div class="volume-range">
                                      <input type="range" step="0.05" min="0" max="1" value=".95" name="" id="volume-control">
                                    </div>
                                  </span>
                                  <button class="ad-btn ad-round clear ad-icon ad-flat minimode">
                                      <i class="fa fa-square-o"></i>
                                  </button>
  
                                  <button class="ad-btn ad-round clear ad-icon ad-flat fullscreen">
                                    <i class="fa fa-clone"></i>
                                  </button>
  
  
                                  <button class="ad-btn ad-round clear ad-icon ad-flat">
                                    <i class="fa fa-sun-o"></i>
                                  </button>
                                </span>
                              </div>
                            </div>
              `;
                $(this).append(videoControlHTML);

                // if autoplay remove lock and fade screenBTN
                if (autoplay) {
                    $(this)
                        .find('span.screen-button')
                        .fadeOut('slow');
                    $(this)
                        .find('div.ad-controls')
                        .removeAttr('locked');
                }

                // Set The Timmer currentTime / Duration
                timer = $(this).find('span.ad-timer');

                $(this)
                    .find('span.ad-message-display')
                    .fadeOut('slow');
                // console.log($(videoPlayerId));
                // seekbar = $(this).find('input#seeker-control-' + videoPlayerId.replace('#', '') + '')[0];
                seekbar = $(this).find('input#seeker-control')[0];
                divSeekbar = $(this).find('div.range-seeker');
                // console.log('create video player instance');
                let videoNuu = new mediaPlayerUpdate();
                videoNuu.updateVideoTimer(videoPlayer[0], timer, seekbar, divSeekbar);

                // Mark as constructed
                $(this).attr('_adConstructed', true);
            });
    }

    // FOR VIDEO-REMIX

    function constructVideoRemix() {
        $('.ad-video-remix')
            .not('[_adConstructed]')
            .each(function () {
                // check for video title: create the video title div
                let videoTitle = $(this)[0].hasAttribute('videoTitle') ?
                    $(this).attr('videoTitle') :
                    '';

                videoPlayerId = $(this)[0].hasAttribute('videoId') ?
                    '#' + $(this).attr('videoId') :
                    '#video';
                let videoPlayer = $(this).find(videoPlayerId);
                videoPlayer.removeAttr('controls');

                //Check for autoplay
                if (videoPlayer[0].hasAttribute('autoplay')) {
                    var autoplay = true;
                    playBTN = 'pause';
                    $(this).attr('isplaying', 'true');
                } else {
                    var autoplay = false;
                    playBTN = 'play';
                    $(this).attr('isplaying', 'false');
                }

                //Create the Video Controls

                let videoControlHTML =
                    `
              
              <div class="ad-controls">
              <div class="ad-header ad-flat">
                <h2 class="title text-normal">` +
                    videoTitle +
                    `</h2>
  
                <span class="rFloat">
                    <button class="ad-btn ad-flat ">
                        <i class="fa fa-sun-o"></i>
                      </button>
                  <button class="ad-btn ad-flat ">
                    <i class="fa fa-volume-up"></i>
                  </button>
                </span>
              </div>
              <div class="ad-grid show-controls">
                <div>
                  <button class="ad-btn ad-icon clear ad-flat play">
                    <i class="fa fa-` +
                    playBTN +
                    `"></i>
                  </button>
                  <span class="ad-timer">
                      <span class="currentTime">0:00</span>
                  </span>
                </div>
                <div class="ad-input">
                  <input type="range" min="0" step="0.02" value="0" id="seeker-control">
                </div>
                <div>
                  <span class="ad-timer">
                      <span class="duration">0:00</span>
                  </span>
                  <button class="ad-btn ad-icon clear ad-flat fullscreen">
                    <i class="fa fa-expand"></i>
                  </button>
                </div>
              </div>
            </div>
              `;
                $(this).append(videoControlHTML);

                //autoplay
                if (videoPlayer[0].hasAttribute('autoplay')) {
                    setTimeout(() => {
                        $(this)
                            .find('div.ad-grid.show-controls')
                            .removeClass('show-controls');
                    }, 1000);
                }
                // Set The Timmer currentTime / Duration
                timer = $(this).find('span.ad-timer');

                // $(this).find('span.ad-message-display').fadeOut('slow');
                // console.log($(videoPlayerId));
                // seekbar = $(this).find('input#seeker-control-' + videoPlayerId.replace('#', '') + '')[0];
                seekbar = $(this).find('input#seeker-control')[0];
                divSeekbar = $(this).find('div.range-seeker');
                // console.log('create video player instance');
                let videoNuu = new mediaPlayerUpdate();
                videoNuu.updateVideoTimer(videoPlayer[0], timer, seekbar, divSeekbar);

                // Mark as constructed
                $(this).attr('_adConstructed', true);
            });
    }

    // Change the mode to remain when its clicked
    wrapper.on('click', '.ad-video', function (e) {
        // console.log('video parent clicked');
        $(this)
            .find('span.screen-button')
            .fadeIn('slow');

        let videoPlayerId = $(this)[0].hasAttribute('videoId') ?
            '#' + $(this).attr('videoId') :
            '#video';
        let icon = $(this).find('button.play>i.fa');
        let screenBTN = $(this).find('span.screen-button > i.fa');
        // console.log(parent.attr('isplaying'));
        if ($(this).attr('isplaying') == 'true') {
            $(videoPlayerId)[0].pause();
            $(this).attr('isplaying', 'false');
            icon.removeClass('fa-pause');
            icon.addClass('fa-play');

            screenBTN.removeClass('fa-pause');
            screenBTN.addClass('fa-play');
            // console.log('video paused');
        } else {
            $(videoPlayerId)[0].play();
            $(this).attr('isplaying', 'true');
            icon.removeClass('fa-play');
            icon.addClass('fa-pause');

            screenBTN.removeClass('fa-play');
            screenBTN.addClass('fa-pause');
            // console.log('video played');

            // fade out the screen button
            $(this)
                .find('span.screen-button')
                .fadeOut('slow');
        }

        // remove the locked controls
        if (
            $(this)
            .find('div.ad-controls')[0]
            .hasAttribute('locked')
        ) {
            // console.log('hhas locked attribute');
            $(this)
                .find('div.ad-controls')
                .removeAttr('locked');
        } else {
            // console.log('doest have locked attribute');
        }
    });

    // Toggle play and pause when video is clicked
    wrapper.on('click', '.ad-video .ad-controls', function (e) {
        e.stopPropagation();

        // console.log('controls clicked');
        let parent = $(this).parents('.ad-video'); // get your parent i.e .ad-video
        $(this).toggleClass('fixedmode');

        if ($(this).hasClass('fixedmode')) {
            var displayMessage = parent.find('span.ad-message-display');
            displayMessage.fadeIn('slow');
            displayMessage.text('Controls Mode: Fixed');
            setTimeout(function () {
                displayMessage.fadeOut('slow');
            }, 1500);
        } else {
            var displayMessage = parent.find('span.ad-message-display');
            displayMessage.fadeIn('slow');
            displayMessage.text('Controls Mode: Default');
            setTimeout(function () {
                displayMessage.fadeOut('slow');
            }, 1500);
        }
    });

    wrapper.on(
        'click',
        '.ad-video button.play, .ad-video-remix button.play',
        function (e) {
            e.stopPropagation();

            let parent =
                $(this).parents('.ad-video').length != 0 ?
                $(this).parents('.ad-video') :
                $(this).parents('.ad-video-remix');

            // fade IN the screen button
            parent.find('span.screen-button').fadeIn('slow');

            let videoPlayerId = parent[0].hasAttribute('videoId') ?
                '#' + parent.attr('videoId') :
                '#video';
            let screenBTN = parent.find('span.screen-button > i.fa');
            let icon = $(this).find('i.fa');
            // console.log(parent.attr('isplaying'));
            if (parent.attr('isplaying') == 'true') {
                $(videoPlayerId)[0].pause();
                parent.attr('isplaying', 'false');
                icon.removeClass('fa-pause');
                icon.addClass('fa-play');

                screenBTN.removeClass('fa-pause');
                screenBTN.addClass('fa-play');
                // console.log('video paused');
            } else {
                $(videoPlayerId)[0].play();
                parent.attr('isplaying', 'true');
                icon.removeClass('fa-play');
                icon.addClass('fa-pause');

                screenBTN.removeClass('fa-play');
                screenBTN.addClass('fa-pause');
                // console.log('video played');

                // fade out the screen button
                parent.find('span.screen-button').fadeOut('slow');
            }
        }
    );

    wrapper.on('change', '.ad-video input#volume-control', function (e) {
        e.stopPropagation();

        var parent = $(this).parents('.ad-video'); // get your video
        let videoPlayerId = parent[0].hasAttribute('videoId') ?
            '#' + parent.attr('videoId') :
            '#video';
        let vid = parent.find(videoPlayerId)[0];
        vid.volume = $(this).val(); //update its volume

        volumeIcon = $(this)
            .parents('.volume-control')
            .find('button.ad-icon>i.fa');
        // console.log(volumeIcon);

        volumeIcon.attr('class', '');
        // console.log('volume is ', $(this).val());
        if ($(this).val() >= 0.6) {
            icon = 'fa fa-volume-up';

            // console.log('volume up');
        } else if ($(this).val() <= 0.4 && $(this).val() > 0) {
            icon = 'fa fa-volume-down';
            // console.log('volume down');
        } else if ($(this).val() == 0) {
            icon = 'fa fa-volume-off';
            // console.log('volume mute');
        } else {
            icon = 'fa fa-volume-up';
            // console.log('volume normal');
        }

        volumeIcon.addClass(icon);
        var displayMessage = parent.find('span.ad-message-display');
        displayMessage.fadeIn('slow');
        displayMessage.text('Volume: ' + Math.round($(this).val() * 100) + '%');
        setTimeout(function () {
            displayMessage.fadeOut('slow');
        }, 1500);
    });

    //get scrolling event to manipulate the video;
    wrapper.on('mousewheel', '.ad-video .volume-control', function (e) {
        e.preventDefault();
        e.stopPropagation();

        let parent = $(this).parents('.ad-video'); // get your video
        let volumeRange = parent.find('input#volume-control')[0];

        let videoPlayerId = parent[0].hasAttribute('videoId') ?
            '#' + parent.attr('videoId') :
            '#video';
        let vid = parent.find(videoPlayerId)[0];
        let volumeIcon = parent.find('.volume-control button > i.fa');
        volumeIcon.attr('class', '');
        // get the scroll value
        // console.log('mouse scroll value',e.scrollHeight());
        // only move the volumeRange and the effect will propagate
        if (e.originalEvent.wheelDelta / 120 > 0) {
            // console.log('scrolling up !', e.originalEvent.wheelDelta);
            if (volumeRange.value !== 1) {
                volumeRange.value = volumeRange.value + 0.1;
                // console.log('increased  volllllll', volumeRange.value);
            }
        } else {
            // console.log('scrolling down !', e.originalEvent.wheelDelta);
            if (volumeRange.value !== 0) {
                volumeRange.value = volumeRange.value - 0.1;

                // console.log('decrease  volllllll', volumeRange.value);
            }
        }

        vid.volume = volumeRange.value;

        let displayMessage = parent.find('span.ad-message-display');

        // console.log(volumeRange.value);

        if (vid.volume >= 0.6) {
            icon = 'fa fa-volume-up';

            // console.log('volume up');
        } else if (vid.volume <= 0.4 && vid.volume > 0) {
            icon = 'fa fa-volume-down';
            // console.log('volume down');
        } else if (vid.volume == 0) {
            icon = 'fa fa-volume-off';
            // console.log('volume mute');
        } else {
            icon = 'fa fa-volume-up';
            // console.log('volume normal');
        }

        volumeIcon.addClass(icon);

        displayMessage.fadeIn('slow');
        displayMessage.text('Volume: ' + Math.round(vid.volume * 100) + '%');
        setTimeout(function () {
            displayMessage.fadeOut('slow');
        }, 1500);
    });

    // Set volume to zero/mute when volume btn is clcked
    wrapper.on('click', '.ad-video .volume-control button', function (e) {
        e.stopPropagation();

        var parent = $(this).parents('.ad-video'); // get your video
        let videoPlayerId = parent[0].hasAttribute('videoId') ?
            '#' + parent.attr('videoId') :
            '#video';
        let vid = parent.find(videoPlayerId)[0];
        let volumeIcon = $(this).find('i.fa');
        // console.log(volumeIcon);
        volumeIcon.attr('class', '');

        let volumeRange = parent.find('input#volume-control')[0];
        let displayMessage = parent.find('span.ad-message-display');

        // console.log(volumeRange.value);

        if (vid.volume !== 0) {
            // store current volume for unmute volume
            $(this).attr('volume', vid.volume);

            vid.volume = 0; //update its volume
            volumeRange.value = 0;
            icon = 'fa fa-volume-off';
        } else {
            // get the previous volume stored

            vid.volume = parseFloat($(this).attr('volume')); //update its volume
            volumeRange.value = parseFloat($(this).attr('volume'));
            icon = 'fa fa-volume-up';
        }

        volumeIcon.addClass(icon);

        displayMessage.fadeIn('slow');
        displayMessage.text('Volume: ' + Math.round(vid.volume * 100) + '%');
        setTimeout(function () {
            displayMessage.fadeOut('slow');
        }, 1500);
    });

    //get seeking the video.
    wrapper.on('click', '.ad-video input#seeker-control', function (e) {
        e.stopPropagation();
    });

    wrapper.on(
        'change',
        '.ad-video input#seeker-control, .ad-video-remix input#seeker-control',
        function (e) {
            e.stopPropagation();

            var parent =
                $(this).parents('.ad-video').length != 0 ?
                $(this).parents('.ad-video') :
                $(this).parents('.ad-video-remix'); // get your video
            let videoPlayerId = parent[0].hasAttribute('videoId') ?
                '#' + parent.attr('videoId') :
                '#video';
            let vid = parent.find(videoPlayerId)[0];
            vid.currentTime = $(this).val(); //update its volume;
            parent.find('span.currentTime').html(vid.currentTime);
            // console.log('seeking');
        }
    );

    // Get Fullscreen
    wrapper.on(
        'click',
        '.ad-video button.fullscreen, .ad-video-remix button.fullscreen',
        function (e) {
            e.stopPropagation();

            let parent =
                $(this).parents('.ad-video').length != 0 ?
                $(this).parents('.ad-video') :
                $(this).parents('.ad-video-remix');

            if (
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement
            ) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }

                //exit fullscreen
                // parent.removeClass('full-mode');
                parent.find('button.minimode').removeClass('hidden');
            } else {
                element = parent.get(0);
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }

                // enter fullscreen
                // parent.addClass('full-mode');
                parent.find('button.minimode').addClass('hidden');
            }
        }
    );

    // catch esc btn clicked

    $('.ad-video').keydown(function (e) {
        if (e.keyCode == 27) {
            if ($('.ad-video .fullscreen').length != 0) {
                $('.ad-video .fullscreen')
                    .find('button.minimode')
                    .removeClass('hidden');
                // $('.ad-video .fullscreen').removeClass('fullscreen');
            }

            // console.log('esc clicked');
        }
    });

    //mini mode
    wrapper.on('click', '.ad-video .minimode', function (e) {
        e.stopPropagation();
        let parent = $(this).parents('.ad-video');
        parent.toggleClass('mini-mode');
        parent.find('button.fullscreen').toggleClass('hidden');
    });


});