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
                debugger;
                toastr.success("Superhero updated");
                setTimeout(function() {
                    $(".ajax-form.hidden").removeClass("hidden");
                    $this.addClass("hidden");
                }, 1000);
            },
            error: function(err) {

            }
        });

        return false;
    });
});