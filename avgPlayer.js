var dollarray, bgarray, bgmarray, searray;

var xmlhttp_doll = new XMLHttpRequest();
xmlhttp_doll.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) { 
    dollarray = JSON.parse(this.responseText.replace(/\/\*\s{1,4}\d{1,4}\s{1,4}\*\//g,"").replace(",\n}", "\n}"));}
};
xmlhttp_doll.open("GET", "/index.php?title=JSON:AVGDOLL&action=raw", true);
xmlhttp_doll.send();

var xmlhttp_bg = new XMLHttpRequest();
xmlhttp_bg.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) { 
    bgarray = JSON.parse(this.responseText.replace(/\/\*\s{1,4}\d{1,4}\s{1,4}\*\//g,"").replace(",\n}", "\n}"));}
};
xmlhttp_bg.open("GET", "/index.php?title=JSON:AVGBGCG&action=raw", true);
xmlhttp_bg.send();

var xmlhttp_bgm = new XMLHttpRequest();
xmlhttp_bgm.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) { 
    bgmarray = JSON.parse(this.responseText.replace(/\/\*\s{1,4}\d{1,4}\s{1,4}\*\//g,"").replace(",\n}", "\n}"));}
};
xmlhttp_bgm.open("GET", "/index.php?title=JSON:AVGBGM&action=raw", true);
xmlhttp_bgm.send();

var xmlhttp_se = new XMLHttpRequest();
xmlhttp_se.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) { 
    searray = JSON.parse(this.responseText.replace(/\/\*\s{1,4}\d{1,4}\s{1,4}\*\//g,"").replace(",\n}", "\n}"));}
};
xmlhttp_se.open("GET", "/index.php?title=JSON:AVGSE&action=raw", true);
xmlhttp_se.send();

var effarray = {
    "%%code=AVG_ink1%%":"/images/Video/AVG/AVG_ink1.mp4",
    "%%code=AVG_ink2%%":"/images/Video/AVG/AVG_ink2.mp4",
    "%%code=AVG_ink3%%":"/images/Video/AVG/AVG_ink3.mp4",
    "%%code=AVG_ink4%%":"/images/Video/AVG/AVG_ink4.mp4",
    "%%code=AVG_ink5%%":"/images/Video/AVG/AVG_ink5.mp4",
    "%%code=AVG_ink6%%":"/images/Video/AVG/AVG_ink6.mp4",

    "%%code=NPC_TV_0%%":"/images/2/2c/NPC-news%280%29.png",
    "%%code=NPC_TV_1%%":"/images/2/2e/NPC-news%281%29.png",
    "%%code=NPC_TV_2%%":"/images/8/81/NPC-news%282%29.png",
    "%%code=NPC_TV_3%%":"/images/b/bc/NPC-news%283%29.png",
    "%%code=NPC_TV_4%%":"/images/3/37/NPC-news%284%29.png",
    "%%code=NPC_TV_5%%":"/images/7/76/NPC-news%285%29.png",
    "%%code=NPC_TV_6%%":"/images/6/69/NPC-news%286%29.png",
    "%%code=NPC_TV_7%%":"/images/1/1f/NPC-news%287%29.png",
    "%%code=NPC_TV_8%%":"/images/f/f4/NPC-news%288%29.png",
    "%%code=NPC_TV_9%%":"/images/f/f2/NPC-news%289%29.png",
    "%%code=NPC_TV_10%%":"/images/4/40/NPC-news%2810%29.png",
    "%%code=NPC_TV_11%%":"/images/0/05/NPC-news%2811%29.png",
    "%%code=NPC_TV_12%%":"/images/a/af/NPC-news%2812%29.png",
    "%%code=NPC_TV_13%%":"/images/1/13/NPC-news%2813%29.png",
    "%%code=NPC_TV_14%%":"/images/7/70/NPC-news%2814%29.png",
    "%%code=NPC_TV_15%%":"/images/8/8c/NPC-news%2815%29.png",
    "%%code=NPC_TV_16%%":"/images/d/df/NPC-news%2816%29.png",
    "%%code=NPC_TV_17%%":"/images/d/dc/NPC-news%2817%29.png",
    "%%code=NPC_TV_18%%":"/images/c/c6/NPC-news%2818%29.png",
    "%%code=NPC_TV_19%%":"/images/c/cf/NPC-news%2819%29.png",

    "%%code=changjing_huafen%%":"",
}

var linepos = 0;
var endsign = 0; /* 该剧情是否结束的标志 */
var avgtxt = ""; /* avg文本 */
var avgdoll = {left:0, center:0, right:0}; /*  当前立绘 */
var avgnextline = ""; /* 当一个场景有多个+台词时 */
var avgbranches = [];
var branchblock = 0;
var branchchosen = 0;

var flash_block = 0;

var autosign = 0; /* 是否开启自动模式 */
var autospeed = 4;  /* 自动速度 */

var logallsign = 0; /* log是否展示全部的标志 */

var printwordstr; /* 打印的台词 */
var printwordnum; /* 打印台词的位置 */

var blacksign = 0; /* 黑幕的标志 */

var loadingfile = "";
var loadingfin = {doll:0, bg:0, bgm:0, eff:0};
var loadingnow = {doll:0, bg:0, bgm:0, eff:0};

function avgcreat(){
    $(".avgchoice").click(function(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) { 
                avgtxt = (this.responseText); 
                endsign = 0;
                avgnextline = "";
                readline(); 
                firstloading(); 
            }
        };
        xmlhttp.open("GET", $(this).attr("link"), true);
        xmlhttp.send();

        loadingfile = $(this).attr("link");
        $("#avgtitle").html($(this).children("span.avgname").html().replace(/<span class="subsign">/g, "").replace(/<\/span>/g, ""));
        console.log($(this).children("span.avgname").html().replace(/<span class="subsign">/g, "").replace(/<\/span>/g, "") + " : " + $(this).attr("link"));
        $("#avgbgm").attr("src", ""); $(".avgsound").remove();
        $("#avgbackground").html("");
        $(".avgdollpic").remove();
        $(".avgefect").remove();
        linepos = 0;
        avgnextline = 0;
    });
}

function divcreat(){
    var html_string = `
        <div id="avgtitle">请选择剧情<\/div>

        <div id="avgsettings">
            <div id="avgblack" state="off" class="avgbutton">黑幕<\/div> 
            <div id="avgbtnbox">     
                <div id="avgsound" state="off" class="avgsmallbtn">?)<\/div>
                <div id="avgsoundminus" class="avgsmallbtn avgpushbutton">-<\/div>
                <div id="avgsoundwidth" state="4"><\/div>
                <div id="avgsoundplus" class="avgsmallbtn avgpushbutton">+<\/div>
            <\/div>
            <span style="padding:5px;"><\/span>

            <div id="avghand" class="avgbutton">手动<\/div>
            <div id="avgauto" class="avgbutton">自动<\/div>
            <div id="avgbtnbox">
                <div id="avgautominus" class="avgsmallbtn avgpushbutton">-<\/div>
                <div id="avgautonum">4<\/div>
                <div id="avgautoplus" class="avgsmallbtn avgpushbutton">+<\/div>
            <\/div>
            <span style="padding:5px;"><\/span>

            <div id="avglog" state="off" class="avgbutton">LOG<\/div>
            <div id="avglognow" class="avgbutton avgbutton">当前<\/div>
            <div id="avglogall" class="avgbutton avgbutton">全部<\/div>
            <span style="padding:5px;"><\/span>

            <div id="avgtobegin" class="avgbutton avgpushbutton">返回开始<\/div>
            <div id="avgtonext" class="avgbutton avgpushbutton">下一章节<\/div>
            <div id="avgchose" state="off" class="avgbutton">选择剧情<\/div>
            <div id="avgload">加载进度: PIC[0/0] CG[0/0] BGM[0/0] SE[0/0] E[0/0]<\/div>
        <\/div>

        <div id="avgbox">
            <div id="avgbackground"><\/div>
            <div id="avgword">
                <div id="avgspeaker"><\/div>
                <div id="avgline"><\/div>
            <\/div>
        <\/div>
        
        <div id="avglogbox" style="width:1200px; height:675px; border:1px #8888 solid; overflow-y:scroll; display:none; background-color:#111;"><\/div>
        <audio id="avgbgm" controls preload loop style="display:none;"><\/audio>`;

    $("#avgdiv").html(html_string);

    $(".avgpushbutton").mousedown(function(){
        $(this).css({"background-color":"#eaeaea88","color":"black"});
    });
    $(".avgpushbutton").mouseup(function(){
        $(this).css({"background-color":"#111111","color":"#eaeaea"});
    });

    $("#avgblack").click(function(){
        if($(this).attr("state") == "on"){
            $(this).attr("state", "off");
            $(this).css({"background-color":"#111111","color":"#eaeaea"});
            $("#mw-page-base").show();$("#mw-head-base").show();$("#mw-navigation").show();
            $("#footer").show();$(".comment-replybox").show();$("#siteNotice").show();$("#firstHeading").show();$("#contentSub").show();
            $("body").css({"background-image":""});$("body").css({"background-color":""});
            $("div#content").css("cssText","margin-left:11em; border:;");
            $("#avgdiv").css({"margin-left":"0px", "margin-top":"0px"});
 ? ? ? ? ?  $(".avgnavigationtitle").css({"margin-left":"0px"});
            $(".avgnavigation").css({"margin-left":"0px"});
            $(window).scrollTop(340);
        } else if($(this).attr("state") == "off"){
            $(this).attr("state", "on");
            $(this).css({"background-color":"#eaeaea","color":"black"});
            $("#mw-page-base").hide();$("#mw-head-base").hide();$("#mw-navigation").hide();
            $("#footer").hide();$(".comment-replybox").hide();$("#siteNotice").hide();$("#firstHeading").hide();$("#contentSub").hide();
            $("body").css({"background-image":"none"});$("body").css({"background-color":"black"});
            $("div#content").css("cssText","margin-left:0em !important; border:none;");
            $("#avgdiv").css({"margin-left":(window.innerWidth - 1202)/2 + "px", "margin-top":"100px"});
            $(".avgnavigationtitle").css({"margin-left":(window.innerWidth - 1202)/2 + "px"});
            $(".avgnavigation").css({"margin-left":(window.innerWidth - 1202)/2 + "px"});
            $(window).scrollTop(0);
        }
    });

    $("#avgsound").click(function(){
        if($(this).attr("state") == "on"){
            $(this).attr("state", "off");
            $(this).css({"background-color":"transparent","color":"#eaeaea"});
            $("#avgbgm")[0].muted = true;
            for(let i in $(".avgsound")) $(".avgsound")[i].muted = true;
        } else if($(this).attr("state") == "off"){
            $(this).attr("state", "on");
            $(this).css({"background-color":"#eaeaea","color":"black"});
            $("#avgbgm")[0].muted = false;
            for(let i in $(".avgsound")) $(".avgsound")[i].muted = false;
        }
    });
    $("#avgsoundminus").click(function(){
        let sound_num = Number($("#avgsoundwidth").attr("state"));
        if(sound_num > 0) sound_num = sound_num - 1;
        let back_text = String(sound_num) + "0%";
        $("#avgbgm")[0].volume = sound_num / 20;
        for(let i in $(".avgsound")) $(".avgsound")[i].volume = sound_num / 10;
        $("#avgsoundwidth").css("cssText","background-image: linear-gradient(90deg, #eaeaea " + back_text + ", transparent " + back_text + ");");
        $("#avgsoundwidth").attr("state",sound_num);
    });
    $("#avgsoundplus").click(function(){
        let sound_num = Number($("#avgsoundwidth").attr("state"));
        if(sound_num < 10) sound_num = sound_num + 1;
        let back_text = String(sound_num) + "0%";
        $("#avgbgm")[0].volume = sound_num / 20;
        for(let i in $(".avgsound")) $(".avgsound")[i].volume = sound_num / 10;
        $("#avgsoundwidth").css("cssText","background-image: linear-gradient(90deg, #eaeaea " + back_text + ", transparent " + back_text + ");");
        $("#avgsoundwidth").attr("state",sound_num);
    });

    $("#avgauto").click(function(){
        autosign = 1;
        setTimeout(function(){ autoreadline(); }, 4000 / autospeed); 
        $(this).css({"background-color":"#eaeaea","color":"black"});
        $("#avghand").css({"background-color":"#111111","color":"#eaeaea"});
    });
    $("#avghand").click(function(){
        autosign = 0;
        $(this).css({"background-color":"#eaeaea","color":"black"});
        $("#avgauto").css({"background-color":"#111111","color":"#eaeaea"});
    });

    $("#avgautoplus").click(function(){
        var numnow = Number($("#avgautonum").html());
        $("#avgautonum").html((numnow >= 8) ? 8 : numnow + 1);
        autospeed = (numnow >= 8) ? 8 : numnow + 1;
    });
    $("#avgautominus").click(function(){
        var numnow = Number($("#avgautonum").html());
        $("#avgautonum").html((numnow <= 1) ? 1 : numnow - 1);
        autospeed = (numnow <= 1) ? 1 : numnow - 1;
    });

    $("#avglog").click(function(){
        if($(this).attr("state") == "on"){
            $(this).attr("state", "off");
            $(this).css({"background-color":"#111111","color":"#eaeaea"});
            $("#avglogbox").fadeOut(300);
            setTimeout(function(){ $("#avgbox").fadeIn(300); }, 300);
        } else if($(this).attr("state") == "off"){
            $(this).attr("state", "on");
            $(this).css({"background-color":"#eaeaea","color":"black"});
            $("#avgbox").fadeOut(300);
            setTimeout(function(){ $("#avglogbox").fadeIn(300); }, 300);
            avglogcreat();
        }
    });
    $("#avglognow").click(function(){
        $(this).css({"background-color":"#eaeaea","color":"black"});
        $("#avglogall").css({"background-color":"#111111","color":"#eaeaea"});
        logallsign = 0;
        avglogcreat();
    });
    $("#avglogall").click(function(){
        $(this).css({"background-color":"#eaeaea","color":"black"});
        $("#avglognow").css({"background-color":"#111111","color":"#eaeaea"});
        logallsign = 1;
        avglogcreat();
    });

    $("#avgtobegin").click(function(){
        endsign = 0;
        linepos = 0;
        avgnextline = "";
        $(".avgefect").remove();
        readline();
    });

    $("#avgtonext").click(function(){
        let chosen_element = document.querySelectorAll(".avgchoice");
        for(let i = 0; i < chosen_element.length; i ++){
            if($(chosen_element[i]).attr("link") == loadingfile && (i + 1 < chosen_element.length)) { $(chosen_element[i + 1]).click(); return;}
        }
    });

    $("#avgchose").click(function(){
        if($(this).attr("state") == "on"){
            $(this).attr("state", "off");
            $(this).css({"background-color":"#111111","color":"#eaeaea"});
            $(".avgnavigationtitle").css("display","none");
            $(".avgnavigationtitle").attr("state","coll-off");
            $(".avgnavigation").css("display","none");
        } else if($(this).attr("state") == "off"){
            $(this).attr("state", "on");
            $(this).css({"background-color":"#eaeaea","color":"black"});
            $(".avgnavigationtitle").css("display","block");
            avglogcreat();
        }
    });

    $("#avgsound").click();
    $("#avgsoundminus").click();
    $("#avghand").click();
    $("#avglognow").click();
    $("#avgchose").click();
}

divcreat();
avgcreat();
$("#avgbox").click(function(){ 
    if(autosign == 1) $("#avghand").click();
    if(printwordstr && (printwordnum < printwordstr.length)) {printwordnum = printwordstr.length; printword();}
    else readline();
});

function readline(){
    if(blacksign == 1 || branchblock == 1 || flash_block == 1) return;
    
    if(endsign == 1) {
        $("#avgline").html(`<div class="endsigndiv">${$("#avgtitle").html()} END</div>`);
        return;
    }

    if(avgnextline){
        printwordstr = avgnextline.slice(0, (avgnextline.indexOf("+") == -1) ? avgnextline.length : avgnextline.indexOf("+")); 
        setTimeout(function(){ $("#avgline").html(""); printword(); }, 400);

        printwordnum = 1;
        if(avgnextline.indexOf("+") == -1) avgnextline = "";
        else avgnextline = avgnextline.slice(avgnextline.indexOf("+") + 1, avgnextline.length);
        return;
    }

    if(avgbranches.length != 0){
        let html_string = `<div id="avgbranchdiv">`;
        for(i in avgbranches) html_string += `<div class="avgbranch" index="${i}">${avgbranches[i]}<\/div>`;
        html_string += `<\/div>`;

        $("#avgbox").append(html_string);
        avgbranches = [];
        branchblock = 1;
        
        $(".avgbranch").click(function(){
            branchblock = 0;
            branchchosen = Number($(this).attr("index")) + 1;
            $("#avgbranchdiv").remove();
        });
        return;
    }

    var thisline = (avgtxt.indexOf("\n", linepos) == -1) ? avgtxt.slice(linepos, avgtxt.length) : avgtxt.slice(linepos, avgtxt.indexOf("\n", linepos));

    // branches
    while(thisline.indexOf("<分支>") != -1 && Number(thisline[thisline.indexOf("<分支>") + 4]) != branchchosen){
        if(avgtxt.indexOf("\n", linepos) == -1) { endsign = 1; return;}
        linepos = avgtxt.indexOf("\n", linepos) + 1;
        thisline = (avgtxt.indexOf("\n", linepos) == -1) ? avgtxt.slice(linepos, avgtxt.length) : avgtxt.slice(linepos, avgtxt.indexOf("\n", linepos));
    }
    if(thisline.indexOf("<分支>") == -1 && branchchosen != 0) branchchosen = 0;

    // black
    if((thisline.indexOf("<黑屏2>") != -1 || thisline.indexOf("<黑点2>") != -1) && blacksign == 0){
        $(".avgdollpic").fadeOut(1000 / autospeed); $(".avgefect").fadeOut(1000 / autospeed);
        $("#avgbackground").fadeOut(1000 / autospeed); $("#avgword").fadeOut(1000 / autospeed);
        setTimeout(function(){
            $(".avgefect").remove(); $(".avgsound").remove();
            $(".avgdollpic").remove(); $("#avgbackground").html(""); $("#avgbgm").attr("src", "");
            $("#avgspeaker").html(""); $("#avgline").html("");
            setTimeout(function(){
                blacksign = 2;
                readline();
                $(".avgdollpic").fadeIn(3000 / autospeed); $("#avgbackground").fadeIn(3000 / autospeed); $("#avgword").fadeIn(2000 / autospeed);
            }, 3000 / autospeed);
        }, 1000 / autospeed);
        blacksign = 1;
        return;
    } else if(blacksign == 2){
        blacksign = 0;
        if(!$("#avgbgm").attr("src") && $("#avgbgm")[0].paused){
            $("#avgbgm").attr("src", $("#avgbgm").attr("src-save")); // this black is for ending mp4
            $("#avgbgm")[0].play();
        }
    }

    // bgm
    if(thisline.indexOf("<BGM>") != -1){
        $("#avgbgm").attr("src", bgmarray[thisline.slice(thisline.indexOf("<BGM>") + ("<BGM>").length, thisline.indexOf("</BGM>"))]);
        $("#avgbgm").attr("src-save", bgmarray[thisline.slice(thisline.indexOf("<BGM>") + ("<BGM>").length, thisline.indexOf("</BGM>"))]);
        $("#avgbgm")[0].play();
    }

    // sound effect
    if(thisline.indexOf("<SE1>") != -1){
        while(thisline.indexOf("<SE1>") != -1){
            sound = thisline.slice(thisline.indexOf("<SE1>") + ("<SE1>").length, thisline.indexOf("</SE1>"));
            thisline = thisline.replace("<SE1>" + sound + "</SE1>", "");

            let audio = new Audio();
            audio.addEventListener("ended", function(){ $(this).remove();});
            $(audio).attr({"src":searray[sound], "preload":"preload", "controls":"controls"});
            $(audio).addClass(".avgsound");
            audio.play();

            if($("#avgsound").attr("state") == "off") audio.muted = true;
            audio.volume = Number($("#avgsoundwidth").attr("state")) / 10;
        }
    }

    //special '<' efect
    if(thisline.indexOf("<关闭蒙版>") != -1) $(".avgefect").remove();
    if(thisline.indexOf("<回忆>") != -1) $("#avgbox").append(`<div class="avgefect" style="width:1200px; height:675px; position:absolute; z-index:10; backdrop-filter:sepia(0.8) brightness(0.8)"><\/div>`);

    /*-- common_effect mp4 or other code --*/
    if(thisline.indexOf("<common_effect>") != -1){
        effect_creat(thisline.slice(thisline.indexOf("<common_effect>") + ("<common_effect>").length, thisline.indexOf("</common_effect>")));
    }

    // background
    if(thisline.indexOf("<BIN>") != -1){
        var bgsrc = bgarray[thisline.slice(thisline.indexOf("<BIN>") + ("<BIN>").length, thisline.indexOf("</BIN>"))];
        $("#avgbackground").html(`<img src="` + bgsrc + `"/>`);
        if(thisline.indexOf("<Night>") != -1) $("#avgbackground").append(`<div style="width:1200px; height:675px; position:absolute; backdrop-filter:saturate(0.6) brightness(0.4) hue-rotate(15deg)"><\/div>`);
    }
    if(thisline.indexOf("<闪屏>") != -1){
        let flash_str = thisline.slice(thisline.indexOf("<闪屏>") + ("<闪屏>").length, thisline.indexOf("</闪屏>"));
        let background_array = flash_str.slice(flash_str.indexOf("<CG>") + ("<CG>").length, flash_str.indexOf("</CG>")).split(",");
        let control_parament = {
            "duration":Number(flash_str.slice(flash_str.indexOf("<duration>") + ("<duration>").length, flash_str.indexOf("</duration>"))),
            "rate":Number(flash_str.slice(flash_str.indexOf("<rate>") + ("<rate>").length, flash_str.indexOf("</rate>"))),
            "delay":Number(flash_str.slice(flash_str.indexOf("<delay>") + ("<delay>").length, flash_str.indexOf("</delay>"))),
        };
        flash_block = 1;
        setTimeout(function(){
            flash_block = 0;
            $("#avgbackground").html(`<img src="${bgarray[background_array[background_array.length - 1]]}" style="display:none;"/>`);
            $("#avgbackground").children("img").fadeIn(control_parament.rate * 5);
        }, background_array.length * (control_parament.delay + control_parament.rate * 2 + control_parament.duration) * 5);

        for(let i = 0; i < background_array.length; i ++){
            let time_start = ((i + 1) * control_parament.delay + i * control_parament.rate * 2 + i * control_parament.duration) * 5;
            setTimeout(function(){
                $("#avgbackground").html(`<img src="${bgarray[background_array[i]]}" style="display:none;"/>`);
                $("#avgbackground").children("img").fadeIn(control_parament.rate * 5);
            }, time_start);
            setTimeout(function(){
                $("#avgbackground").children("img").fadeOut(control_parament.rate * 5);
            }, time_start + (control_parament.rate + control_parament.duration) * 5);
        }
    }

    //doll pic
    if(thisline.indexOf("<Speaker>") != -1){
        let avgpicstr = thisline.slice(0, thisline.indexOf("||"));
        let newavgdoll = {left:0,center:0,right:0};
        let the_speaker = "center";

        // center
        if(avgpicstr.indexOf(";") == -1 && avgpicstr.indexOf("()") == -1) 
            newavgdoll.center = avgpicstr.slice(0, avgpicstr.indexOf("<Speaker>"));
        // none
        else if(thisline.indexOf(";") == -1 && thisline.indexOf("()") != -1){}
        // speaker = left
        else if(avgpicstr.indexOf("<Speaker>") < avgpicstr.indexOf(";")){
            the_speaker = "left";
            let avgpicstr_righ = avgpicstr.slice(avgpicstr.indexOf(";") + 1, avgpicstr.length);
            avgpicleft = avgpicstr.slice(0, avgpicstr.indexOf("<Speaker>"));
            avgpicrigh = avgpicstr_righ.slice(0, ((avgpicstr_righ.indexOf("<") != -1) ? avgpicstr_righ.indexOf("<") : avgpicstr_righ.legth));
            newavgdoll = {left: avgpicleft, center: 0, right: avgpicrigh};
        }
        // speaker = right
        else if(avgpicstr.indexOf("<Speaker>") > avgpicstr.indexOf(";")){
            the_speaker = "right";
            let avgpicstr_left = avgpicstr.slice(0, avgpicstr.indexOf(";") + 1);
            avgpicleft = avgpicstr_left.slice(0, ((avgpicstr_left.indexOf("<") < avgpicstr_left.indexOf(";")) ? avgpicstr_left.indexOf("<") : avgpicstr_left.indexOf(";")));
            avgpicrigh = avgpicstr.slice(avgpicstr.indexOf(";") + 1, avgpicstr.indexOf("<Speaker>"));
            newavgdoll = {left: avgpicleft, center: 0, right: avgpicrigh};
        }

        // the same - none - changed
        if(newavgdoll == avgdoll) {
        } else if(newavgdoll == {left:0,center:0,right:0}) {
            $(".avgdollpic").fadeOut(150);
            setTimeout(function(){ $(".avgdollpic").remove();}, 150);
        } else {
            // telephone frame mask - not speaker dark mask
            // if telephone frame mask exist , not speaker dark mask won't exist
            let telemask = `<div class="telemaskdiv"><\/div>`;
            let darkmask_a = `<div class="darkmask" style="-webkit-mask-image:url(`;
            let darkmask_b = `); -webkit-mask-size:cover; display:none;"><\/div>`;
            
            if(newavgdoll.center != 0){
                let target_name = newavgdoll.center.slice(0, newavgdoll.center.indexOf("("));
                let avgdoll_div = document.querySelectorAll(".avgdollpic");
                let cen_sign = 1;

                for(let i = 0; i < avgdoll_div.length; i++){
                    let this_name = $(avgdoll_div[i]).attr("name-data").slice(0, $(avgdoll_div[i]).attr("name-data").indexOf("("));
                    if(target_name == this_name){
                        cen_sign = 0;
                        $(avgdoll_div[i]).stop();
                        $(avgdoll_div[i]).css({"z-index":"6"});
                        $(avgdoll_div[i]).animate({"left":"152px"}, 300);
                        if($(avgdoll_div[i]).children(".darkmask")){
                            $(avgdoll_div[i]).children(".darkmask").fadeOut(150);
                            $(avgdoll_div[i]).children(".darkmask").remove();
                        }
                        if($(avgdoll_div[i]).attr("name-data") != newavgdoll.center){
                            setTimeout(function(){
                                $(avgdoll_div[i]).attr("name-data", newavgdoll.center);
                                $(avgdoll_div[i]).children("img").attr("src", dollarray[newavgdoll.center]);
                            }, 300);
                        }
                    } else {
                        $(avgdoll_div[i]).fadeOut(150);
                        setTimeout(function(){ $(avgdoll_div[i]).remove();}, 150);
                    }
                }

                if(cen_sign){
                    setTimeout(function(){ 
                        let the_center = `<div class="avgdollpic" name-data="${newavgdoll.center}" style="z-index:6; display:none;`;

                        if((avgpicstr.indexOf("<Position>") != -1) && (avgpicstr.indexOf("<Position>") > avgpicstr.indexOf(";"))){
                            let position_str = avgpicstr.slice(avgpicstr.indexOf("<Position>") + ("<Position>").length, avgpicstr.indexOf("</Position>"));
                            let position_array = position_str.split(",");
                            the_center += `left:${152 - Number(position_array[0])/2}px; top:${110 - Number(position_array[1])/2}px; height:${565 + Number(position_array[1])/2}px;">`;
                        } else the_center += `left:152px;">`;

                        the_center += `<img src="` + dollarray[newavgdoll.center] + `" style="`;
                        if((avgpicstr.indexOf("<通讯框>") != -1) && (avgpicstr.indexOf("<通讯框>") > avgpicstr.indexOf(";"))){
                            the_center += `background-color:#12131d; -webkit-mask-image:url(/images/d/d0/Mask.png); -webkit-mask-position-x: 28px; -webkit-mask-size: 850px;"/>` + telemask + `<\/div>`;
                        } else the_center += `"/><\/div>`;
                        
                        $("#avgbox").append(the_center);
                        $(".avgdollpic").fadeIn(150);
                    }, 150);
                }
            }

            if(newavgdoll.left != 0 && newavgdoll.right != 0){
                let left_name = newavgdoll.left.slice(0, newavgdoll.left.indexOf("("));
                let right_name = newavgdoll.right.slice(0, newavgdoll.right.indexOf("("));
                let avgdoll_div = document.querySelectorAll(".avgdollpic");
                let left_sign = 1, right_sign = 1;

                for(let i = 0; i < avgdoll_div.length; i++){
                    let this_name = $(avgdoll_div[i]).attr("name-data").slice(0, $(avgdoll_div[i]).attr("name-data").indexOf("("));
                    if(left_name == this_name){
                        left_sign = 0;
                        $(avgdoll_div[i]).stop();
                        $(avgdoll_div[i]).animate({"left":"-20px"}, 300);
                        $(avgdoll_div[i]).css({"z-index":((the_speaker == "left") ? "4" : "2")});
                        
                        if($(avgdoll_div[i]).children(".darkmask").length && (the_speaker == "left")){
                            $(avgdoll_div[i]).children(".darkmask").fadeOut(150);
                            $(avgdoll_div[i]).children(".darkmask").remove();
                        } else if(!($(avgdoll_div[i]).children(".darkmask").length) && the_speaker == "right"){
                            let darkmask = darkmask_a + dollarray[newavgdoll.left] + darkmask_b;
                            $(avgdoll_div[i]).append(darkmask);
                            $(".darkmask").fadeIn(300);
                        }
                        
                        if($(avgdoll_div[i]).attr("name-data") != newavgdoll.left){
                            setTimeout(function(){ 
                                $(avgdoll_div[i]).attr("name-data", newavgdoll.left);
                                $(avgdoll_div[i]).children("img").attr("src", dollarray[newavgdoll.left]);
                            }, 150);
                        }
                    } else if(right_name == this_name){
                        right_sign = 0;
                        $(avgdoll_div[i]).stop();
                        $(avgdoll_div[i]).animate({"left":"324px"}, 300);
                        $(avgdoll_div[i]).css({"z-index":((the_speaker == "right") ? "4" : "2")});

                        if($(avgdoll_div[i]).children(".darkmask").length && (the_speaker == "right")){
                            $(avgdoll_div[i]).children(".darkmask").fadeOut(150);
                            $(avgdoll_div[i]).children(".darkmask").remove();
                        } else if(!($(avgdoll_div[i]).children(".darkmask").length) && the_speaker == "left"){
                            let darkmask = darkmask_a + dollarray[newavgdoll.right] + darkmask_b;
                            $(avgdoll_div[i]).append(darkmask);
                            $(".darkmask").fadeIn(300);
                        }

                        if($(avgdoll_div[i]).attr("name-data") != newavgdoll.right){
                            setTimeout(function(){ 
                                $(avgdoll_div[i]).attr("name-data", newavgdoll.right);
                                $(avgdoll_div[i]).children("img").attr("src", dollarray[newavgdoll.right]);
                            }, 150);
                        }
                    } else {
                        $(avgdoll_div[i]).fadeOut(150);
                        setTimeout(function(){ $(avgdoll_div[i]).remove();}, 150);
                    }
                }

                if(left_sign){
                    setTimeout(function(){ 
                        let the_left = `<div class="avgdollpic" name-data="${newavgdoll.left}" style="z-index:` + ((the_speaker == "left") ? "4" : "2") + ";";
                        
                        if((avgpicstr.indexOf("<Position>") != -1) && (avgpicstr.indexOf("<Position>") < avgpicstr.indexOf(";"))){
                            let position_str = avgpicstr.slice(avgpicstr.indexOf("<Position>") + ("<Position>").length, avgpicstr.indexOf("</Position>"));
                            let position_array = position_str.split(",");
                            the_left += `left:${-20 - Number(position_array[0])/2}px; top:${110 - Number(position_array[1])/2}px; height:${565 + Number(position_array[1])/2}px;">`;
                        } else the_left += `left:-20px;">`;

                        the_left += `<img src="` + dollarray[newavgdoll.left] + `" style="`;
                        if((avgpicstr.indexOf("<通讯框>") != -1) && (avgpicstr.indexOf("<通讯框>") < avgpicstr.indexOf(";"))){
                            the_left += `background-color:#12131d; -webkit-mask-image:url(/images/d/d0/Mask.png); -webkit-mask-position-x: 28px; -webkit-mask-size: 850px;"/>` + telemask + `<\/div>`;
                        } else the_left += `"/><\/div>`;
                        $("#avgbox").append(the_left);
                        $(".avgdollpic").fadeIn(150);
                    }, 150);
                }
                if(right_sign){
                    setTimeout(function(){ 
                        let the_right = `<div class="avgdollpic" name-data="${newavgdoll.right}" style="z-index:` + ((the_speaker == "right") ? "4" : "2") + ";";

                        if((avgpicstr.indexOf("<Position>") != -1) && (avgpicstr.indexOf("<Position>") > avgpicstr.indexOf(";"))){
                            let position_str = avgpicstr.slice(avgpicstr.indexOf("<Position>") + ("<Position>").length, avgpicstr.indexOf("</Position>"));
                            let position_array = position_str.split(",");
                            the_right += `left:${324 - Number(position_array[0])/2}px; top:${110 - Number(position_array[1])/2}px; height:${565 + Number(position_array[1])/2}px;">`;
                        } else the_right += `left:324px;">`;

                        the_right += `<img src="` + dollarray[newavgdoll.right] + `" style="`;
                        if((avgpicstr.indexOf("<通讯框>") != -1) && (avgpicstr.indexOf("<通讯框>") > avgpicstr.indexOf(";"))){
                            the_right += `background-color:#12131d; -webkit-mask-image:url(/images/d/d0/Mask.png); -webkit-mask-position-x: 28px; -webkit-mask-size: 850px;"/>` + telemask + `<\/div>`;
                        } else the_right += `"/><\/div>`;
                        $("#avgbox").append(the_right);
                        $(".avgdollpic").fadeIn(150);
                    }, 150);
                }
            }
        }

        avgdoll = newavgdoll;
    } else {
        $(".avgdollpic").fadeOut(150);
        setTimeout(function(){ $(".avgdollpic").remove();}, 150);
    }

    //word speaker
    if(thisline.indexOf("<Speaker>") != -1){
        var speaker = thisline.slice(thisline.indexOf("<Speaker>") + ("<Speaker>").length , thisline.indexOf("</Speaker>"));
        setTimeout(function(){ $("#avgspeaker").html(speaker); }, 400);
    } else setTimeout(function(){ $("#avgspeaker").html(" "); }, 400);

    //word line - color & size handler
    if(thisline.indexOf(":") != -1){
        let keyword = (thisline.indexOf("+") != -1) ? "+" : ((thisline.indexOf("<c>") != -1) ? "<c>" : "\n");
        let line = thisline.slice(thisline.indexOf(":") + 1, thisline.length);
        // color & size
        line = line.replace(/<\/color>/g, "<\/span>").replace(/<\/Size>/g, "<\/span>");
        for(let j = 0; j < line.length; j++){
            if(line.slice(j - ("<Size=").length, j) == "<Size="){
                let size_num = (Number(line.slice(j, j+2)) / 2.4).toFixed(0);
                line = line.slice(0, j - ("<Size=").length) + "<span style=\"font-size:" + size_num + "px;\"" + line.slice(j+2, line.length);
            } else if(line.slice(j - ("<color=").length, j) == "<color="){
                line = line.slice(0, j - ("<color=").length) + "<span style=\"color:" + line.slice(j, j + ("#000000").length) + ";\"" + line.slice(j + ("#000000").length, line.length);
            }
        }
        printwordstr = (keyword == "\n" && line.indexOf("/n") == -1) ? line : line.slice(0, line.indexOf(keyword));

        $("#avgword").stop();
        $("#avgword").animate({opacity:"0.0"}, 400, "swing");
        setTimeout(function(){ $("#avgline").html(""); $("#avgword").animate({opacity:"1.0"}, 400, "swing");}, 400);
        setTimeout(function(){ printword();}, 800);
        printwordnum = 1;

        if((line.indexOf("+") != -1)) avgnextline = line.slice(line.indexOf("+") + 1, line.length);
        else if(line.indexOf("<c>") != -1) {
            let line_temp = line.slice(line.indexOf("<c>") + 3, line.length).replace("\r", "");
            avgbranches = line_temp.split("<c>");
            console.log(avgbranches);
        }
    } else {
        $("#avgword").stop();
        $("#avgword").animate({opacity:"0.0"}, 400, "swing");
        setTimeout(function(){ $("#avgline").html(""); $("#avgword").animate({opacity:"1.0"}, 400, "swing");}, 400);
    }

    //position sign
    if(avgtxt.indexOf("\n", linepos) == -1) endsign = 1;
    linepos = avgtxt.indexOf("\n", linepos) + 1;
    if($("#avglog").attr("state") == "on") avglogcreat();
}

function autoreadline(){
    if(autosign == 0 || branchblock == 1) return;
    if($("#avglog").attr("state") != "on") readline();
    setTimeout(function(){
        autoreadline();
    }, 1000 + 600 * printwordstr.replace(/<\/span>/g, "").replace(/<span style="color:#[0-9A-Z]{6};">/g, "").replace(/<span style="font-size:1[0-9]{2}%;">/g, "").length / autospeed); 
}

function printword(){
    if(printwordstr[printwordnum - 1] == "<") printwordnum = printwordstr.indexOf(">", printwordnum - 1) + 2;
    let thisprint = printwordstr.slice(0, printwordnum);
    if(thisprint.indexOf("<span") != -1 && ((thisprint.indexOf("</span") == -1) || (thisprint.lastIndexOf("</span") < thisprint.lastIndexOf("<span")))) $("#avgline").html(thisprint + "<\/span>"); 
    else $("#avgline").html(thisprint);

    printwordnum ++;
    if(printwordnum > printwordstr.length) return;
    setTimeout(function(){ printword();}, 200 / autospeed);
}

/*------- AVG log's display and control -------*/
function avglogcreat(){
    let logpos = 0;
    let logline = 1;
    let log_string = ``;

    while(1){
        let thisline = (avgtxt.indexOf("\n", logpos) == -1) ? avgtxt.slice(logpos, avgtxt.length) : avgtxt.slice(logpos, avgtxt.indexOf("\n", logpos));

        log_string += `<div style="border-top:1px #8886 dashed; padding:7px 4px;"><table style="width:100%;"><tr><td avgpos="` + logpos + `"`;
        if(thisline.indexOf("<黑屏2>") != -1 || thisline.indexOf("<黑点2>") != -1) log_string += ` class="avglogtd" style="border:1px dashed #f4c430; cursor:zoom-in;`;
        else log_string += ` style="border:none;`;
        log_string += `width:5%; text-align:center; vertical-align:baseline;">` + logline + `<\/td>`;
        log_string += `<td style="width:15%; text-align:center; vertical-align:baseline;">` + ((thisline.indexOf("<Speaker>") != -1) ? thisline.slice(thisline.indexOf("<Speaker>") + ("<Speaker>").length , thisline.indexOf("</Speaker>")) : "");
        log_string += `<\/td><td style="width:80%; vertical-align:baseline;">` + ((thisline.indexOf("<分支") != -1) ? ("分支" + thisline[thisline.indexOf("<分支") + 4] + "<br>") : "");
        log_string += thisline.slice(thisline.indexOf(":") + 1, thisline.length).replace(/\+/g, "<br>").replace(/<c>/g, " 分支") + `<\/td><\/tr><\/table><\/div>`;
            
        if(avgtxt.indexOf("\n", logpos) == -1) break;
        logpos = avgtxt.indexOf("\n", logpos) + 1;
        if(logpos >= linepos && logallsign == 0) break;
        logline ++;
    }

    $("#avglogbox").html(log_string);

    $(".avglogtd").click(function(){
        endsign = 0;
        $("#avglog").click();
        $(".avgefect").remove();
        avgnextline = "";
        linepos =Number( $(this).attr("avgpos"));
        readline();
    });
}

/*------ first load, preload, display loading information ------*/
function firstloading(){
    loadingfin = {doll:0, bg:0, bgm:0, se:0, eff:0};
    loadingnow = {doll:0, bg:0, bgm:0, se:0, eff:0};

    var logpos = 0;
    var loading = {doll:[], bg:[], bgm:[], se:[], eff:[]};

    /*--------------------------- key word query, console that not in the array ---------------------------*/
    var sekeyword = ["Speaker", "BIN", "BGM", "SE1", "SE2", "color", "Size", "通讯框", "黑屏1", "黑屏2", "黑点1", "黑点2", "common_effect", "关闭蒙版", "CGDelay", "回忆", "Position", "Night"];
    var the_words = avgtxt.replace(/<color=#[A-Za-z0-9]{6}>/g, "<color>").replace(/<Size=\d{2}>/g, "<Size>");
    while(the_words.indexOf("<") != -1 && the_words.length != 0){
        let this_word = the_words.slice(the_words.indexOf("<"), the_words.indexOf(">") + 1);
        the_words = the_words.slice(the_words.indexOf(">") + 1, the_words.length);
        if(this_word[1] == "/") continue;

        let sign = 1;
        for(i in sekeyword) if(("<" + sekeyword[i] + ">") == this_word) { sign = 0; break;}
        if(sign) console.log("need effect -- " + this_word);
        if(sign) sekeyword.push(this_word.slice(1, this_word.length - 1));
    }

    while(1){
        var thisline = (avgtxt.indexOf("\n", logpos) == -1) ? avgtxt.slice(logpos, avgtxt.length) : avgtxt.slice(logpos, avgtxt.indexOf("\n", logpos));
        thisline = thisline.replace(/\<Position\>[0-9]{1,3},[0-9]{1,3}\<\/Position\>/g, '');

        if(thisline.indexOf("<Speaker>") != -1 && thisline.indexOf("()<Speaker>") == -1){
            let avgpicstr = thisline.slice(0, thisline.indexOf("||"));
            let newavgdoll = [];
            if(avgpicstr.indexOf(";") == -1 && avgpicstr.indexOf("()") == -1){
                newavgdoll.push(avgpicstr.slice(0, avgpicstr.indexOf("<Speaker>")));
            } else if(thisline.indexOf(";") == -1 && thisline.indexOf("()") != -1){
            } else if(avgpicstr.indexOf("<Speaker>") < avgpicstr.indexOf(";")){
                let avgpic_righ = avgpicstr.slice(avgpicstr.indexOf(";") + 1, avgpicstr.length);
                newavgdoll.push(avgpicstr.slice(0, avgpicstr.indexOf("<Speaker>")));
                newavgdoll.push((avgpic_righ.indexOf("<") == -1) ? avgpic_righ : avgpic_righ.slice(0, avgpic_righ.indexOf("<")));
            } else if(avgpicstr.indexOf("<Speaker>") > avgpicstr.indexOf(";")){
                newavgdoll.push(avgpicstr.slice(0, ((avgpicstr.indexOf("<") > avgpicstr.indexOf(";")) ? avgpicstr.indexOf(";") : avgpicstr.indexOf("<"))));
                newavgdoll.push(avgpicstr.slice(avgpicstr.indexOf(";") + 1, avgpicstr.indexOf("<Speaker>")));
            }

            for(let i = 0; i < newavgdoll.length; i++){
                let sign = 1;
                for(let j = 0; j < loading.doll.length; j++){
                    if(newavgdoll[i] == loading.doll[j].ID){ sign = 0; break; }
                } if(sign) loading.doll.push({"ID":newavgdoll[i], "URL":dollarray[newavgdoll[i]]});
            }
        }
        if(thisline.indexOf("<BGM>") != -1){
            let sign = 1;
            let a = thisline.slice(thisline.indexOf("<BGM>") + ("<BGM>").length, thisline.indexOf("</BGM>"));
            for(let i = 0; i < loading.bgm.length; i++){
                if(a == loading.bgm[i].ID){ sign = 0; break; }
            } if(sign) loading.bgm.push({"ID":a, "URL":bgmarray[a]});
        }
        if(thisline.indexOf("<SE1>") != -1){
            while(thisline.indexOf("<SE1>") != -1){
                let sign = 1;
                let a = thisline.slice(thisline.indexOf("<SE1>") + ("<SE1>").length, thisline.indexOf("</SE1>"));
                thisline = thisline.replace("<SE1>" + a + "</SE1>", "");
                for(let i = 0; i < loading.se.length; i++){
                    if(a == loading.se[i].ID){ sign = 0; break; }
                } if(sign) loading.se.push({"ID":a, "URL":searray[a]});
            }
        }
        if(thisline.indexOf("<BIN>") != -1){
            let sign = 1;
            let a = thisline.slice(thisline.indexOf("<BIN>") + ("<BIN>").length, thisline.indexOf("</BIN>"));
            for(let i = 0; i < loading.bg.length; i++){
                if(a == loading.bg[i].ID){ sign = 0; break; }
            } if(sign) loading.bg.push({"ID":a, "URL":bgarray[a]});
        }
        if(thisline.indexOf("<闪屏>") != -1){
            let a = thisline.slice(thisline.indexOf("<闪屏>") + ("<闪屏>").length, thisline.indexOf("</闪屏>"));
            if(a.indexOf("<CG>") != -1){
                let b = a.slice(a.indexOf("<CG>") + ("<CG>").length, a.indexOf("</CG>")).split(",");
                for(let j = 0; j < b.length; j ++){
                    let sign = 1;
                    for(let i = 0; i < loading.bg.length; i++){
                        if(b[j] == loading.bg[i].ID){ sign = 0; break; }
                    } if(sign) loading.bg.push({"ID":b[j], "URL":bgarray[b[j]]});
                }
            }
        }
        if(thisline.indexOf("<common_effect>") != -1){
            let sign = 1;
            let a = thisline.slice(thisline.indexOf("<common_effect>") + ("<common_effect>").length, thisline.indexOf("</common_effect>"));
            for(let i = 0; i < loading.eff.length; i++){
                if(a == loading.eff[i].ID){ sign = 0; break; }
            } if(sign) loading.eff.push({"ID":a, "URL":effarray[a]});
        }

        if(avgtxt.indexOf("\n", logpos) == -1) break;
        logpos = avgtxt.indexOf("\n", logpos) + 1;
    }

    /*----------------- console loading urls ---------------*/
    console.log("Character Image", loading.doll);
    console.log("Background CG", loading.bg);
    console.log("Background Music", loading.bgm);
    console.log("Sound Effect", loading.se);
    console.log("Common Effect", loading.eff);
    console.log("********* Console end *********");
    loadingfin.doll = loading.doll.length;
    loadingfin.bg = loading.bg.length;
    loadingfin.bgm = loading.bgm.length;
    loadingfin.se = loading.se.length;
    loadingfin.eff = loading.eff.length;
    loading_sub();

    for(i in loading.doll){
        let img = new Image();
        $(img).load(function(){ 
            if($(this).attr("file") == loadingfile) loadingnow.doll ++; 
            loading_sub(); $(this).remove();
        }); 
        $(img).attr({"src":dollarray[loading.doll[i].ID], "file":loadingfile});
    }
    for(i in loading.bg){
        let img = new Image();
        $(img).load(function(){ 
            if($(this).attr("file") == loadingfile) loadingnow.bg ++; 
            loading_sub(); $(this).remove();
        }); 
        $(img).attr({"src":bgarray[loading.bg[i].ID], "file":loadingfile});
    }
    for(i in loading.bgm){
        let audio = new Audio();
        audio.addEventListener("canplaythrough", function(){ 
            if($(this).attr("file") == loadingfile) loadingnow.bgm ++; 
            loading_sub(); $(this).remove();
        });
        $(audio).attr({"src":bgmarray[loading.bgm[i].ID], "file":loadingfile, "preload":"preload", "controls":"controls"});
    }
    for(i in loading.se){
        let audio = new Audio();
        audio.addEventListener("canplaythrough", function(){ 
            if($(this).attr("file") == loadingfile) loadingnow.se ++; 
            loading_sub(); $(this).remove();
        });
        $(audio).attr({"src":searray[loading.se[i].ID], "file":loadingfile, "preload":"preload", "controls":"controls"});
    }
    for(i in loading.eff){
        let target_url = effarray[loading.eff[i].ID];
        if(!target_url) {loadingnow.eff ++; continue;}
        let target_type = target_url.slice(target_url.length - 3, target_url.length);
        let new_element = (target_type == "png") ? document.createElement('img') : document.createElement('video');
        if(target_type == "mp4") {
            new_element.addEventListener("canplaythrough", function(){ 
                if($(this).attr("file") == loadingfile) loadingnow.eff ++; 
                loading_sub(); $(this).remove();
            }); 
            $(new_element).attr({"src":effarray[loading.eff[i].ID], "file":loadingfile, "preload":"preload"});
        } else if(target_type == "png") {
            $(new_element).load(function(){ 
                if($(this).attr("file") == loadingfile) loadingnow.eff ++; 
                loading_sub(); $(this).remove();
            }); 
            $(new_element).attr({"src":effarray[loading.eff[i].ID], "file":loadingfile});
        }
    }
}

function loading_sub(){
    $("#avgload").html(`加载进度: PIC[${loadingnow.doll}/${loadingfin.doll}] CG[${loadingnow.bg}/${loadingfin.bg}] BGM[${loadingnow.bgm}/${loadingfin.bgm}] SE[${loadingnow.se}/${loadingfin.se}] E[${loadingnow.eff}/${loadingfin.eff}]`);
}

/*---------------------------特效code 创建---------------------------*/
function effect_creat(effect_name){
    if(effect_name.slice(0, ("%%code=AVG_ink").length) == "%%code=AVG_ink") {
        let new_element = document.createElement('video');
        $(new_element).attr({"class":"avgefect", "autoplay":"autoplay", "preload":"auto", "src":effarray[effect_name]});
        $(new_element).css({"position":"absolute", "width":"1200px", "height":"675px", "top":"0px", "left":"0px", "overflow":"hidden", "z-index":"1"});
        $(new_element).bind('ended', function(){ $(this).remove();});
        $("#avgbox").append(new_element);
        $("#avgbgm")[0].pause();
    } else if(effect_name.slice(0, ("%%code=NPC_TV").length) == "%%code=NPC_TV"){
        let new_element = document.createElement('img');
        $(new_element).attr({"class":"avgefect", "src":effarray[effect_name]});
        $(new_element).css({"position":"absolute", "width":"1200px", "top":"-262.5px", "z-index":"1"});
        $("#avgbox").append(new_element);
    } else if(effect_name == "%%code=changjing_huafen%%"){
        return;
    }
}