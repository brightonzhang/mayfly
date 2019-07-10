$('textarea').each(function () {
    this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
}).on('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

function httpZeroError() {
    alert('Javascript returned an HTTP 0 error. One common reason this might happen is that you requested a cross-domain resource from a server that did not include the appropriate CORS headers in the response. Better open up your Firebug...');
}

function postmsg(msgText) {
    myajax = {};
    myajax.url = 'https://file.io';
    myajax.type = 'POST';
    myajax.data = { text: msgText };

    myajax.complete = function (jqXHR) {
        console.log(
            "HTTP " + jqXHR.status + " " + jqXHR.statusText);

        if (jqXHR.status != 200) {
            alert('Oops...Something goes wrong');
            return;
        }

        console.log(jqXHR.responseText);
        var obj = JSON.parse(jqXHR.responseText);
        console.log(obj.key);
        console.log(jqXHR.getAllResponseHeaders());

        location.href = '/ntf/' + obj.key;
    }

    if (jQuery.isEmptyObject(myajax.data)) {
        myajax.contentType = 'application/x-www-form-urlencoded';
    }

    $('#postingspinner').show();
    var req = $.ajax(myajax).always(function () {
        console.log('done or fail?');
        $('#postingspinner').hide();
    });
}

$("#submitmsg").click(function (e) {
    e.preventDefault();

    var msgText = $("#msgText").val();
    console.log(msgText);

    if (msgText == null || msgText == undefined || msgText == "") {
        alert('您似乎忘了输入消息内容。。。');
        return;
    }

    postmsg(msgText);
});

$("#readmsg").click(function (e) {
    e.preventDefault();

    var msgid = $("#msgid").attr('href');
    console.log(msgid);

    $('#notification').hide();
    $('#ntfspinner').show();

    location.href = '/msg/' + msgid;

});

$("#replymsg").click(function (e) {
    e.preventDefault();

    location.href = '/index';
});
