// global value
//var gTargetUrl  = 'http://www.frustration.dev';
var gTargetUrl  = 'http://www.frustration.me';
var gCurrent = 0;
var gLength  = 0;
var gBg = null;

chrome.runtime.getBackgroundPage(function(bg){
  setContent(bg.pageInfo2);
  gBg = bg;
});

$(document).ready(function(){
  $('#act_back input').click(function(){
    backImage();
  });

  $('#act_next input').click(function(){
    nextImage();
  });

  $('#create_fuman').click(function(){
    createFuman();
  });

  $('#login_page_link').click(function(){
    chrome.tabs.create({url: 'http://www.frustration.me/'});
  });
  $('#login_page_link').click(function(){
    chrome.tabs.create({url: 'http://www.frustration.me/'});
  });

});