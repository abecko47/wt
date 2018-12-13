document.getElementById("textarea-editable").addEventListener("input", function() {
    if($("#textarea-editable").text() !== "") {
        $("#submit").removeAttr("disabled");
    } else {
        $("#submit").attr("disabled", "disabled");
    }
}, false);


$( document ).ready(function() {
    $("#title-article").val(getUrlParameter("title"));
    $("#textarea-editable").text(getUrlParameter("content"));
    $("#author-name").val(getUrlParameter("author"));
    $("#tags").val(getUrlParameter("tags"));
    $("#image-url").val(getUrlParameter("image"));
    $("#submit").removeAttr("disabled");
});

$(document).ready(function(event) {


    $('form[name=edit-article]').submit(function(event){
        event.preventDefault();
        var server = "http://wt.kpi.fei.tuke.sk";

        var postData = {
            "title": $("#title-article").val(),
            "content": $("#textarea-editable").text(),
            "imageLink": $("#image-url").val(),
            "author": $("#author-name").val() + " " + $("#author-mail").val(),
            "tags": $("#tags").val().split(",")
        };

        var jsonData = JSON.stringify(postData);

        $.ajax({
            type: "PUT",
            url: server+"/api/article/"+getUrlParameter("id"),
            dataType: 'json',
            async: false,
            data: jsonData,
            contentType: 'application/json',

            success: function(result){
                alert("Article is edited.");
                window.location.href = "article.html?id="+result.id;
            },
            error: function (error) {
                alert("error: "+ JSON.stringify(error));
            }
        });
    });
});