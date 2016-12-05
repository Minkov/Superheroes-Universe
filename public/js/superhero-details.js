$(function() {
    $(".ajax-form.add, .ajax-form.remove").on("submit", function(ev) {
        var $this = $(this);
        var url = $this.attr("action");
        var method = $this.attr("method");
        var data = $this.serialize();

        $.ajax({
            url: url,
            method: method,
            data: data,
            success: function(data) {
                $(".ajax-form.hidden").removeClass("hidden");
                $this.addClass("hidden");
            },
            error: function(err) {

            }
        });

        return false;
    });
});