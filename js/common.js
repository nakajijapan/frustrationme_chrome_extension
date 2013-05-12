//----------------------------------------------
// common
//----------------------------------------------
//---------------------
// 新着一覧情報取得
//---------------------
function getNewList() {
    var response;
    $.ajax({
        url: "http://frustration.me/rest/timeline/new/",
        type: "GET",
        beforeSend : function() {
            $("#list_target").html("loding....");
        },

        success : function(response) {
            res = response;
        },
        complete : function(xhr, textStatus){
            var items = [];
            var errItems = [];
            var hostname = 'http://frustration.me/';
            // image list
            $.each(res.data, function(key, val){

                var img = new Image();
                img.src = hostname + val.icon_name;
                if (img.naturalWidth < 10) {
                    val.icon_name = 'img/icon.gif';
                }

                var str =
                    '<li>' +
                    '<a class="item" onclick="chrome.tabs.create({url: ' + "'" + hostname +'product/' + val.item_id + "'" + '});">' +
                    '<img src="' + val.image_m + '" width="75px" title="' + val.title + '" id="item_' + val.item_id + '"/>' +
                    '</a>' +
                    '<div class="user"><a onclick="chrome.tabs.create({url: ' + "'" + hostname + 'user/' + val.username + "'" + '});">' +
                    '<img src="' + hostname + val.icon_name + '" title=""/></a>' +
                    '</li>';
                items.push(str);

            });
            $("#list_target").html(items.join(''));
        }
    });
}

//---------------------
// 登録用
//---------------------
// ログインチェック
function checkLogin() {
    var ret = true;
    // status  list
    $.getJSON( gTargetUrl + '/rest/auth/sesscheck', null, function(json, status){
        // error?
        if (json.code != 1) {
            $('#overlay_nologin').show();
            ret = false;
        }
    });
    return ret;
}

// コンテンツ作成
function setContent(pageInfo) {

    var loginFlg = checkLogin();
    if (loginFlg != true) {
        return ;
    }

    // set title
    $('#f_title').val(pageInfo.title);

    // set images
    var imageList = '';
    gLength   = pageInfo.imgurls.length;

    for (var i=0;i < gLength; i++) {
        if (i==0) {
            imageList += '<img src="' + pageInfo.imgurls[i] + '" num="' + i + '" id="img_' + i + '" width="160px" />';
        }
        else {
            imageList += '<img src="' + pageInfo.imgurls[i] + '" num="' + i + '" id="img_' + i + '" width="160px" style="display:none" />';
        }
    }
    $('.img_list').html(imageList);

    // status  list
    $.getJSON( gTargetUrl + '/rest/master/statuses', null, function(json, status){
        var options = '';
        $.each(json.data, function(i,val){
            options += '<option value="' + i + '">' + val + '</option>';
        });
        $('#f_status').append(options);
    });

    // category  list
    $.getJSON( gTargetUrl + '/rest/settings/categorylist', null, function(json, status){
        var options = '<option value="">----</option>>';
        if (json != null) {
            $.each(json.data, function(i,val){
                options += '<option value="' + val.id + '">' + val.name + '</option>';
            });
        }
        $('#f_category').append(options);
    });


    // set image counter
    $('#act_current').text( (gCurrent + 1) + ' / ' + gLength);
}

// next button
function nextImage() {
    gCurrent++;
    if (gCurrent >= gLength) {gCurrent = 0}
    $(".img_list").find("img").each(function(i, elm){
        if (gCurrent == $(elm).attr('num')) {
            $(elm).show();
        }
        else {
            $(elm).hide();
        }
    });

    // set image counter
    $('#act_current').text( (gCurrent + 1) + ' / ' + gLength);

}
// back button
function backImage() {
    gCurrent--;
    if (gCurrent < 0) {gCurrent = gLength -1}
    $(".img_list").find("img").each(function(i, elm){
        if (gCurrent == $(elm).attr('num')) {
            $(elm).show();
        }
        else {
            $(elm).hide();
        }
    });

    // set image counter
    $('#act_current').text( (gCurrent + 1) + ' / ' + gLength);

}

//---------------------
// submit
//---------------------
function createFuman() {
    // global : pageInfo
    var date = new Date();
    var params = {
        'type' : 5,
        'category_id' : $('#f_category').val(),
        'status' :      $('#f_status').val(),
        'title' :       $('#f_title').val(),
        'price' :       $('#f_price').val(),
        'url' :         gBg.pageInfo.url,
        'image_l' :     gBg.pageInfo.imgurls[ gCurrent ] ,
        'date[Year]' :  date.getFullYear(),
        'date[Month]' : date.getMonth(),
        'date[Day]' :   date.getDay(),

        'content':         $('#f_content').val()
    }

    // connect & create frustration's item
    $.ajax({
        url : gTargetUrl + '/rest/fuman/add',
        type: 'POST',
        async : true, // 同期
        data : params,
        beforeSend : function(xhr) {
            $("input[name=btnCreate]").attr("disabled", "disabled");
            $("#overlay").fadeIn(100);
        },
        success : function(rs) {
            // error ?
            if (rs.return != 1) {
                $(".error").html(rs.message).show();
            }
            // success
            else {
                $("#create_fuman").html("アイテム<b>「" + params.title + "」</b>の登録に成功しました！");
            }
            $("input[name=btnCreate]").removeAttr("disabled");
            $("#overlay").fadeOut(1500);
        }
    });
}
