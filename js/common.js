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
// コンテンツ作成
function setContent(pageInfo) {
    console.log("start setContent");
    // set title
    $('#f_title').val(pageInfo.title);
    console.log($('#f_title'));
    console.log(pageInfo.imgurls);
    // set images
    var imageList = '';
    gLength   = pageInfo.imgurls.length;
    console.log('length = ' + gLength);
    for (var i=0;i < gLength; i++) {
        console.log(i + ' / ' + gLength);
        if (i==0) {
            imageList += '<img src="' + pageInfo.imgurls[i] + '" num="' + i + '" id="img_' + i + '" width="160px" />';
        }
        else {
            imageList += '<img src="' + pageInfo.imgurls[i] + '" num="' + i + '" id="img_' + i + '" width="160px" style="display:none" />';
        }
    }
    $('.img_list').html(imageList);
    console.log(imageList);
}

// next button
function nextImage() {
    gCurrent++;
    if (gCurrent >= gLength) {gCurrent = 0}  
    $(".img_list").find("img").each(function(i, elm){
        console.log('c = ' + gCurrent);
        console.log('l = ' + gLength);
        if (gCurrent == $(elm).attr('num')) {
            $(elm).show();
        }
        else {
            $(elm).hide();
        }
    });
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
}

//---------------------
// submit
//---------------------
function createFuman() {
    console.log("submit");
    $("input[name=btnCreate]").attr("disabled", "disabled");
    $("#overlay").show().addClass("overlay");
    
    setTimeout(function(){
        $("input[name=btnCreate]").removeAttr("disabled");
        $("#overlay").hide().removeClass("overlay");
        
    }, 2000);
}
