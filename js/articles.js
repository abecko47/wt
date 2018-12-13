document.getElementById("textarea-editable").addEventListener("input", function() {
    if($("#textarea-editable").text() !== "") {
        $("#submit").removeAttr("disabled");
    } else {
        $("#submit").attr("disabled", "disabled");
    }
}, false);

$(document).ready(function(event) {
    $('form[name=new-article]').submit(function(event){
        event.preventDefault();
        var server="http://wt.kpi.fei.tuke.sk";

        var postData = {
            "title": $("#title-article").val(),
            "content": $("#textarea-editable").text(),
            "imageLink": $("#image-url").val(),
            "author": $("#author-name").val() + " " + $("#author-mail").val(),
            "tags": $("#tags").val().split(",")
        };

        var jsonData = JSON.stringify(postData);

        $.ajax({
            type: "POST",
            url: server+"/api/article/",
            dataType: 'json',
            async: false,
            data: jsonData,
            contentType: 'application/json',

            success: function(result){
                alert("Article is posted.");
                window.location.href = "article.html?id="+result.id;
            },
            error: function (error) {
                alert("error: "+ JSON.stringify(error));
            }
        });
    });
});
