// global value
//var gTargetUrl  = 'http://www.frustration.dev';
var gTargetUrl  = 'http://www.frustration.me';
var gCurrent = 0;
var gLength  = 0;


// get background
var gBg = chrome.extension.getBackgroundPage();

// on load event
window.onload =  function() {
  //getNewList();
  // 現在タブから情報を取得する
  setContent(gBg.pageInfo);
}
