/* globals $ prompt*/

$(function() {
    var $powersList = $(".powers-list"),
        $fractionsList = $(".fractions-list");

    $("#btn-add-new-fraction-option").on("click", function(ev) {
        ev.preventDefault();
        var fractionName = prompt("Enter fraction name");
        if (fractionName === "") {
            return false;
        }

        $("<li/>")
            .append(
                $("<label/>")
                .append(fractionName)
                .append($("<input />")
                    .addClass("form-control")
                    .attr("name", "fractions")
                    .attr("type", "checkbox")
                    .attr("checked", "true")
                    .val(fractionName)
                ))
            .appendTo($fractionsList);
    })

    $("#btn-add-new-power-option").on("click", function(ev) {
        ev.preventDefault();
        var powerName = prompt("Enter power name");
        if (powerName === "") {
            return false;
        }

        $("<li/>")
            .append(
                $("<label/>")
                .append(powerName)
                .append($("<input />")
                    .addClass("form-control")
                    .attr("name", "powers")
                    .attr("type", "checkbox")
                    .attr("checked", "true")
                    .val(powerName)
                ))
            .appendTo($powersList);
    });

    $("#img-input").on("change", function(ev) {
        var $this = $(this);

        if (this.files && this.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                console.log(e.target.result);
                $('#uploaded-img').attr('src', e.target.result);
            }

            reader.readAsDataURL(this.files[0]);
        }
    });

    $.getJSON("/superheroes/newest", function(resp) {
        var $list = $("<ul/>")
            .addClass("list-newest-superheroes")
            .addClass("list");

        resp.result.forEach(function(superhero) {
            $("<li/>")
                .addClass("text-center")
                .append(
                    $("<a/>")
                    .attr("href", "/superheroes/" + superhero._id)
                    .html(superhero.name)
                )
                .append("<br/>")
                .append(
                    $("<img/>")
                    .attr("src", superhero.imageUrl)
                )
                .appendTo($list);
        });
        $list.appendTo(".newest-superheroes-container");
    });
});