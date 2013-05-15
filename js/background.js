var parentId = chrome.contextMenus.create({
    "title": "www.frustration.me で「%s」を検索",
    "type": "normal",
    "contexts" :  ["selection"]
}, function(){
    //callback
});

//----------------------------------------------------
// submenu
//----------------------------------------------------
chrome.contextMenus.create({
    "title": "Amazon",
    "type": "normal",
    "parentId" : parentId,
    "contexts": ["selection"],
    "onclick": function(info, tab){
        searchIndex(info, tab, 'amazon');
    }
}, function(){
   //callback
});
chrome.contextMenus.create({
    "title": "Yahoo Auction",
    "type": "normal",
    "parentId" : parentId,
    "contexts": ["selection"],
    "onclick": function(info, tab){
        searchIndex(info, tab, 'yahooauction');
    }
}, function(){
   //callback
});
chrome.contextMenus.create({
    "title": "Rakuten",
    "type": "normal",
    "parentId" : parentId,
    "contexts": ["selection"],
    "onclick": function(info, tab){
        searchIndex(info, tab, 'rakuten');
    }
}, function(){
   //callback
});
chrome.contextMenus.create({
    "title": "iTunes",
    "type": "normal",
    "parentId" : parentId,
    "contexts": ["selection"],
    "onclick": function(info, tab){
        searchIndex(info, tab, 'itunes');
    }
}, function(){
   //callback
});

//----------------------------------------------------
// common
//----------------------------------------------------
function searchIndex(info, tab, type) {

  var url = 'http://www.frustration.me';
  if(info.selectionText) {
    var keyword = encodeURIComponent(info.selectionText);
    var category = 'All';
    if (type == 'yahooauction' || type == 'rakuten') {
      category = 'ALL';
    }
    url += '/fumans/search/?s_keywords=' + keyword + '&s_service_name=' + type + '&s_category=' + category;
  }
  chrome.tabs.create({
    'url': url,
    'selected': true
  })
  return ;
}

//----------------------------------------------------
// get page info
//----------------------------------------------------

chrome.extension.onConnect.addListener(function(port, name) {
  console.log(name);
  port.onMessage.addListener(function(msg) {
    pageInfo  = msg;
  });
});

//タブが変更された時の処理
chrome.tabs.onSelectionChanged.addListener(function(tabid){
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {status: "changed"}, function(response) {
            // none
            console.log("hogehoge");
        });
    });
});