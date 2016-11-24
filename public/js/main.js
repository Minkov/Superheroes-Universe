/* globals $ prompt*/

$(function() {
    let $powersList = $(".powers-list");

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