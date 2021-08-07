$(".avgnavigation").hide();
$(".avgnavigationtitle").click(function(){
    if($(this).attr("state") == "coll-on"){
        $(this).attr("state", "coll-off");
        $(this).next(".avgnavigation").slideUp();
    } else {
        $(this).attr("state", "coll-on");
        $(this).next(".avgnavigation").slideDown();
    }
});