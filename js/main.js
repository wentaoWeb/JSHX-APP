// $(document).ready(function(){
    // $("#one").click(function(){
    //     $("#navone").slideDown("slow");
    // });
//     $("#chaone").click(function(){
//        $("#navone").slideUp("slow");
//       });
//   });
// $('body').on('tap','#one',function(){
//     $("#navone").slideDown("slow");
// })
//   $(document).ready(function(){
//     $("#two").tap(function(){
//         $("#navTwo").slideDown("slow");
//     });
//     $("#chaTwo").tap(function(){
//         $("#navTwo").slideUp("slow");
//       });
//   });

  $(function(){
    $('body').on('tap', '#one', function(){
        $("#navone").slideToggle("slow");
        $('#one').css({"background":"#eee"})
        $("#one").siblings(".bigmenu").css({"background":"#fff"});
        $("#navone").siblings(".smallmenu").css({"display":"none"});
    });
    $('body').on('tap', '#two', function(){
      $("#navtwo").slideToggle("slow");
      $('#two').css({"background":"#eee"})
      $("#two").siblings(".bigmenu").css({"background":"#fff"});
      $("#navtwo").siblings(".smallmenu").css({"display":"none"});
  });
  $('body').on('tap', '#three', function(){
    $("#navthree").slideToggle("slow");
    $('#three').css({"background":"#eee"})
    $("#three").siblings(".bigmenu").css({"background":"#fff"});
    $("#navthree").siblings(".smallmenu").css({"display":"none"});
});
$('body').on('tap', '#four', function(){
    $("#navfour").slideToggle("slow");
    $('#four').css({"background":"#eee"})
    $("#four").siblings(".bigmenu").css({"background":"#fff"});
    $("#navfour").siblings(".smallmenu").css({"display":"none"});
});
$('body').on('tap', '#five', function(){
    $("#navfive").slideToggle("slow");
    $('#five').css({"background":"#eee"})
    $("#five").siblings(".bigmenu").css({"background":"#fff"});
    $("#navfive").siblings(".smallmenu").css({"display":"none"});
});
$('body').on('tap', '#six', function(){
    $("#navsix").slideToggle("slow");
    $('#six').css({"background":"#eee"})
    $("#six").siblings(".bigmenu").css({"background":"#fff"});
    $("#navsix").siblings(".smallmenu").css({"display":"none"});
});
$('body').on('tap', '#seven', function(){
    $("#navseven").slideToggle("slow");
    $('#seven').css({"background":"#eee"})
    $("#seven").siblings(".bigmenu").css({"background":"#fff"});
    $("#navseven").siblings(".smallmenu").css({"display":"none"});
});
$('body').on('tap', '#eight', function(){
    $("#naveight").slideToggle("slow");
    $('#eight').css({"background":"#eee"})
    $("#eight").siblings(".bigmenu").css({"background":"#fff"});
    $("#naveight").siblings(".smallmenu").css({"display":"none"});
});
$('body').on('tap', '#nine', function(){
    $("#navnine").slideToggle("slow");
    $('#nine').css({"background":"#eee"})
    $("#nine").siblings(".bigmenu").css({"background":"#fff"});
    $("#navnine").siblings(".smallmenu").css({"display":"none"});
});
  })