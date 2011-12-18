//------------------------------------------
// content_script.js
//------------------------------------------
getPageInfo();

// タブが切り替わったときの処理 
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        getPageInfo();
    }
);

// ページ情報取得処理
function getPageInfo() {
    // get page title
    var title = document.getElementsByTagName('title')[0].firstChild.nodeValue.replace(/(^\s+)|(\s+$)/g, "");;
    var imgurls = getImgUrls();
    
    // send background
    var port = chrome.extension.connect({name: "frustration"});
    port.postMessage({
        title: title, 
        url : location.href,
        imgurls : imgurls,
        status : "start"
    });

    port.onMessage.addListener(function(msg) {
        if (msg.status == "loading"){
            port.postMessage({status: "loading"});
        }
    });

}
// get urls in image tag
function getImgUrls() {
    var urls = new Array();
    var size = 0;
    elms = document.getElementsByTagName( "img" );
    for (var i=0; i < elms.length; i++) {

        // あまりにも小さい画像は取得しないようにする
        if (elms[i].naturalHeight < 100) {
            continue;
        }
        if (elms[i].naturalWidth < 100) {
            continue;
        }

        urls.push( elms[i].src );
        if (i > 100) {
            break;
        }
    }

    return urls;
}