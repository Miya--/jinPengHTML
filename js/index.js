// slider
var slider = function(id){
    return function(id){
        var currentSlide = 0, oldSlide = 0, 
            sliderLi = $('#'+id).find('ul.slideList li');
            
        sliderLi.css('width', $(window).width());

        var slideNum = $('#'+id).find('a.slideNum'),
            slideCount = sliderLi.length,
            slideWidth = sliderLi.innerWidth();

        $('#'+id).find('ul.slideList').css('width', slideWidth * slideCount);
        slideNum.eq(0).addClass('current');

        var slideTimeout;
        var slideRotation = function() {
            oldSlide = currentSlide;
            currentSlide = (currentSlide + 1) % slideCount;
            slideNum.eq(oldSlide).removeClass('current');
            slideNum.eq(currentSlide).addClass('current');
            $('#'+id).find('ul.slideList').fadeOut('fast', function() {
                $(this).css('left', -slideWidth * currentSlide);
                $(this).fadeIn();
            });
            slideTimeout = setTimeout(slideRotation, 3000);
        };

        // 页面初始化
        slideTimeout = setTimeout(slideRotation, 3000); // 3秒执行一次

        // 鼠标悬停
        $('#'+id).hover(function() {
            clearTimeout(slideTimeout);
        },function() {
            slideTimeout = setTimeout(slideRotation, 3000);
        });

        // 控制按钮点击事件
        slideNum.click(function() {
            clearTimeout(slideTimeout);
            slideNum.removeClass('current');
            $(this).addClass('current');
            var c_num = $(this).attr("name");
            currentSlide = parseInt(c_num) - 1;
            oldSlide = currentSlide - 1;
            $('#'+id).find('ul.slideList').fadeOut('fast',function(){
                $(this).css('left', -slideWidth * currentSlide);
                $(this).fadeIn();
            });
        });
    }
}();

$(function(){
    // 图片轮播
    slider('slideBanner');
    // 视频播放器
    $("#jquery_jplayer_1").jPlayer({
        ready: function () {
            $(this).jPlayer("setMedia", {
                title: "",
                m4v: "http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v",
                ogv: "http://www.jplayer.org/video/ogv/Big_Buck_Bunny_Trailer.ogv",
                webmv: "http://www.jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm",
                poster: "http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"
            });
        },
        swfPath: "jplayer",
        supplied: "webmv, ogv, m4v",
        size: {
            width: "326px",
            height: "200px",
            cssClass: "jp-video-360p"
        },
        useStateClassSkin: true,
        autoBlur: false,
        smoothPlayBar: false,
        keyEnabled: true,
        remainingDuration: true,
        toggleDuration: true
    });
});