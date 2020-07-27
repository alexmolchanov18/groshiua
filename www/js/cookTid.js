window.addEventListener("load",function(){

  function writeCookie(name, value, days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString()
    } else {
        expires = ""
    }
    document.cookie = name + "=" + value + expires + "; path=/"
  }

  function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

  let home_href = window.location.search.replace( '?', '');
  let keys = {};
  if(home_href.includes("utm_term")){
    // console.log(home_href);
    home_href.split('&').forEach(function(item) {
      item = item.split('=');
      keys[item[0]] = item[1];
    });
    
  }
  if(window.location.pathname == "/"){
    if(keys["utm_term"] == undefined){
      campaign = "campaign="
    }else{
      campaign = "campaign=" + keys["utm_term"]
    }
     writeCookie("campaign",campaign,0.5);
  }
  

  if(window.location.pathname == "/feed/"){

    let links = document.getElementsByTagName("a");
    let new_links = [];
    // console.log(links);
    for(let i=0;i<links.length;i++){
      let link_href = links[i].getAttribute("href");
      if(link_href.includes("go.salesdoubler") || link_href.includes("rdr.salesdoubler")){
        new_links[i] = links[i];
      }
    }
    // console.log(new_links);

    new_links.forEach(function(e){
       let get_current_link = e.getAttribute("href");
      // console.log(get_current_link);
        e.href = get_current_link + "&" + getCookie("campaign");
    });



  }


 });