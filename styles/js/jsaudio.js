$(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'download'
            ]
        });
        var index = 0,
            playing = false,
            mediaPath = 'song/',
            extension = '',
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npImg = $('#npImg'),
            npTitle = $('#npTitle'),
            npName = $('#npName'),
            npDescription = $('#npDescription'),
            infoArtiste = $('.info-artiste'),
            npSocialNetwork = $('#npSocialNetwork'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Play...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Pause...');
            }).on('ended', function () {
                npAction.text('Pause...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                infoArtiste.css('opacity', 0);
                var track = tracks[id];
                npImg.attr('src', track.img).attr('alt', track.name);
                npTitle.text(track.name);
                npName.find('h3').text(track.NameChant);
                if(tracks[id].description)
                {
                    npDescription.stop(true,true).slideDown().find('.npDec').html(track.description);
                }
                else
                {
                    npDescription.stop(true,true).slideUp();
                }
                var outPut = "";
                $.each(track.socialNetwork, function(i) {
                    $.each(track.socialNetwork[i], function(key, value) {
                        if(key === 'instagram')
                        {
                            outPut += "<a href=\"" + value + "\" class=\"instagram\" target=\"_blank\">\n" +
                                    "    <i class=\"fab fa-instagram\"></i>\n" +
                                    "</a>";
                        }
                        else if(key === 'twitter')
                        {
                            outPut += "<a href=\"" + value + "\" class=\"twitter\" target=\"_blank\">\n" +
                                    "     <i class=\"fab fa-twitter\"></i>\n" +
                                    "</a>";
                        }
                    });
                });
                if(track.oneSocialNetwork)
                {
                    npSocialNetwork.addClass('one-reseaux');
                }
                else if(npSocialNetwork.hasClass('one-reseaux'))
                {
                    npSocialNetwork.remouveClass('one-reseaux');
                }
                npSocialNetwork.find('.reseaux-sociaux').html(outPut);
                infoArtiste.animate({
                    opacity: 1,
                });
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});
