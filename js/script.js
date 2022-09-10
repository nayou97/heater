$(function(){
    // 햄버거 메뉴
    $("header ul.ham").on("click",function(){
        $(this).hide();
        $("header ul.ham2").show();
        $(".all_menu").fadeIn();
    });
    $("header ul.ham2").on("click",function(){
        $(this).hide();
        $("header ul.ham").show();
        $(".all_menu").fadeOut();
    });

    // 랭귀지 체인지
    var chk =0;
    $("header ul.l_box li:first-child").click(function(){
        if(chk == 0){
            $(this).find("i").removeClass("fa-caret-down").addClass("fa-caret-up");
            $(this).siblings().stop().slideDown();
            chk++;
        }
        else{
            $(this).find("i").removeClass("fa-caret-up").addClass("fa-caret-down");
            $(this).siblings().stop().slideUp();
            chk=0;
        }
    });

    // 메인 슬라이드 시작
    var slidePo;
    var slideIn=0;
    var inter = setInterval(nextSlide,3000);
    $("a.next").click(function(e){
        e.preventDefault(); // a링크(페이지 이동) 속성을 무효화
        clearInterval(inter); // interval을 무효화
        nextSlide();
        inter = setInterval(nextSlide,3000);
    });
    $("a.prev").click(function(e){
        e.preventDefault();
        clearInterval(inter);
        prevSlide();
        inter = setInterval(nextSlide,3000);
    });

    $(".pager a").click(function(e){
        e.preventDefault();
        clearInterval(inter);
        slideIn= $(this).index();
        moveSlide()
        inter = setInterval(nextSlide,3000);
    });

    function nextSlide(){
        if(slideIn<2){
            slideIn++;
        }else{
            slideIn=0;
        }
        moveSlide();
    };
    function prevSlide(){
        if(slideIn>0){
            slideIn--;
        }else{
            slideIn=2;
        }
        moveSlide();
    };

    function moveSlide(){
        slidePo= slideIn * (-100) + "%";
        $("ul.main_slider").animate({left:slidePo},500);
        $(".pager a").eq(slideIn).addClass("on").siblings().removeClass("on");
    };
    // 메인 슬라이드 끝


    // 스크롤 이벤트 시작
    $(window).scroll(function(){
        var st = $(this).scrollTop(); //스크롤 탑 위치를 st에 저장
        var evTop = $(".event").offset().top - 500; //이벤트가 스크롤 될 위치를 evTop에 저장
        var lineTop = $(".line_up").offset().top - 400; //라인업이 스크롤될 위치를 line_Top에 저장

        //이벤트 컨텐츠 액션
        if(st>evTop){
            $(".contents .event section").eq(0).addClass("on").siblings().addClass("on").css({transitionDelay : "0.3s"})
        }else{
            $(".contents .event section").removeClass("on");
        }
        //lineup액션
        for(var i=0; i<4; i++){
            if(st>= lineTop + (i*50)){
                //이미지박스 나오기
                $("ul.img_box li").eq(i).addClass("on").css({transitionDelay: (0.4*i)+"s"});
                //텍스트박스 나오기
                $("ul.txt_box li").eq(i).addClass("on").css({transitionDelay: (0.3*i)+"s"});
            }else{
                $("ul.img_box li, ul.txt_box li").removeClass("on");
            }
        }

        //products
        if(st>= $(".products").offset().top -500){
            for(var i=0; i<$(".products").find("li").length; i++){
                $(".products").find("li").eq(i).addClass("on").css({
                    "animation-delay" : (0.2*i) + "s"
                });
            }           
        }else{
            $(".products").find("li").removeClass("on");
        }


    });
    // 스크롤 이벤트 끝

    // 비디오 모달
    $(".video button").click(function(){
        $(".vid_modal").fadeIn(1000);
        $(".vid_modal iframe").attr("src","https://www.youtube.com/embed/tBFrGKaqQUw");
    });
    $(".vid_modal i").click(function(){
        $(".vid_modal").fadeOut(1000);
        $(".vid_modal iframe").attr("src",""); //동영상 리셋(처음으로 돌리기)
    });

    // 패밀리 사이트 토글
    $(".family").click(function(){
        $(this).find(".none").slideToggle().siblings().find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    });

    // top 버튼
    $(".top").click(function(e){
        e.preventDefault();
        $("html, body").animate({scrollTop : 0},500,"swing"); //swing =>가속도
    });

});