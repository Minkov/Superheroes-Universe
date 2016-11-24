/* globals $ FormData*/

function urlencodeFormData(fd) {
    var s = "";

    function encode(s) {
        return encodeURIComponent(s).replace(/%20/g, "+");
    }

    for (var pair of fd.entries()) {
        if (typeof pair[1] == "string") {
            s += (s ?
                    "&" :
                    "") +
                encode(pair[0]) + "=" + encode(pair[1]);
        }
    }
    return s;
}


$(function() {
    $(".ajaxForm").submit(function(e) {
        e.preventDefault();
        var $this = $(this);

        var formData = new FormData($this[0]);
        var url = $this.attr("action");
        var method = $this.attr("method") || "GET";

        $.ajax({
            url: url,
            type: method,
            data: urlencodeFormData(formData),
            cache: false,
            processData: false,
            success: function(r, s, req) {
                console.log("Success!");
                console.log(req.getResponseHeader('Location'));

            },
            error: function(err) {
                console.log("Error!");
                console.error(err);
            }
        });

        return false;
    });
});