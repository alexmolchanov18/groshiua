var SmartMoney = {
    localAPIAddr: '/smartmoney/',
    formID:       'mainForm',
    submitFunction: '',
    callBackFunction: '',
    remoteAPIStatus: false,
    remoteAPIMessage: 'Not Set',

    init: function(formID = 'mainForm', localAPIAddr = '/smartmoney/', submitFunction = '',callBackFunction = '') {
        SmartMoney.localAPIAddr     = localAPIAddr;
        SmartMoney.formID           = formID;
        SmartMoney.submitFunction   = submitFunction;
        SmartMoney.callBackFunction = callBackFunction;
    },

    send: function() {
        var formData = SmartMoney.getFormData();

        SmartMoney.sendRequest(formData);
        SmartMoney.execSubmitFunction();
    },

    execSubmitFunction: function() {
        if (SmartMoney.submitFunction.length > 0) {
            eval(SmartMoney.submitFunction + '();');
        }
    },

    submitCallBack: function() {
        if (SmartMoney.callBackFunction.length > 0) {
            eval(SmartMoney.callBackFunction + '();');
        }
    },

    sendRequest: function(formData) {
        var host = window.location.protocol + '//' + window.location.hostname;
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                SmartMoney.setRemoteResponse(xhr.responseText);
                SmartMoney.submitCallBack();
            }
        }

        xhr.open("POST", host + SmartMoney.localAPIAddr, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(formData);
    },

    setRemoteResponse: function(remoteResponse) {
        var status  = false;
        var message = '';

        if (typeof(remoteResponse) == "string" && remoteResponse.length > 0){
            remoteResponse = JSON.parse(remoteResponse);
        }

        if (typeof(remoteResponse.status) != 'undefined') {
            status = !(String(remoteResponse.status) != 'true'); 
        }

        if (typeof(remoteResponse.data) != 'undefined') {
            message = String(remoteResponse.data);
        }

        if (message.length < 1 && status) {
            message = 'Successfully Saved';
        }

        if (message.length < 1) {
            message = 'Unknown Remote API Error';
        }

        SmartMoney.remoteAPIStatus = status;
        SmartMoney.remoteAPIMessage = message;
    },

    getFormData: function () {
        var form = document.getElementById(SmartMoney.formID);
        var serialized = [];

        for (var i = 0; i < form.elements.length; i++) {
            var field = form.elements[i];

            if (
                !field.name ||
                field.disabled ||
                field.type === 'file' ||
                field.type === 'reset' ||
                field.type === 'submit' ||
                field.type === 'button'
            ) {
                continue;
            }

            if (field.type === 'select-multiple') {
                for (var n = 0; n < field.options.length; n++) {
                    if (!field.options[n].selected) {
                        continue;
                    }

                    serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
                }
            } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
                serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
            }
        }

        return serialized.join('&');
    }
}