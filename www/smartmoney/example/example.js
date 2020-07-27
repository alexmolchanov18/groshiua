window.onload = function() {
    addSubmitEvent();
}

function submitForm() {
    document.getElementById('smartmoney_api_result').innerHTML = 'Sending Data To API...';
}

function getAPIResponse() {
    if (SmartMoney.remoteAPIStatus) {
        alert(SmartMoney.remoteAPIMessage);

        setTimeout(function(){
            window.location.reload();
        }, 1000);

        return true;
    }

    document.getElementById('smartmoney_api_result').innerHTML = 'Error: ' + SmartMoney.remoteAPIMessage;

    return false;
}

function addSubmitEvent() {
    var inputForm = document.getElementById('test_form');

    inputForm.addEventListener("submit", function(event) {
        if (SmartMoney.remoteAPIStatus) {
            return true;
        }

        event.preventDefault();

        SmartMoney.init(
            formID = 'test_form',
            localAPIAddr = '/smartmoney/',
            submitFunction = 'submitForm',
            callBackFunction = 'getAPIResponse'
        );

        SmartMoney.send();

        return false;
    });
};