$("html").css("font-size", "1rem");

view = false;
$("#toggle-view").click(function () {
    if(view) {
        view = false;
        $("#toggle-view").removeClass("fa-toggle-on");
        $("#toggle-view").addClass("fa-toggle-off");
        $("html").css("font-size", "1rem");
        $("ul.breadcrumb").css("background-color", "#eee");
        $(".site-map").css("background-color", "#eee");
        $(".article-footer").css("background-color", "#ECEFF1");
    } else {
        view = true;
        $("#toggle-view").removeClass("fa-toggle-off");
        $("#toggle-view").addClass("fa-toggle-on");
        $("html").css("font-size", "1.3rem");
        $("ul.breadcrumb").css("background-color", "white");
        $(".site-map").css("background-color", "white");
        $(".article-footer").css("background-color", "white");
    }
});

navMenu = false;
$ ("#nav-menu").click(function () {
    if(navMenu) {
        $("#hidden-articles").css("display", "none");
        navMenu = false;
    } else {
        $("#hidden-articles").css("display", "block");
        navMenu = true;
    }
});