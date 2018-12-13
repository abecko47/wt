
document.getElementById("textarea-editable").addEventListener("input", function() {
    if($("#textarea-editable").text() !== "") {
        $("#submit").removeAttr("disabled");
    } else {
        $("#submit").attr("disabled", "disabled");
    }
}, false);

$(document).ready(function() {
    var server="http://wt.kpi.fei.tuke.sk";
    $.ajax({
        type: "GET",
        url: server+"/api/tag",
        async: false,

        success: function(result){
            result.forEach(function(entry) {
                $("#tags-list").append("<option value=\""+entry.name+"\">");
            });
        },
        error: function (error) {
            alert("error: "+ JSON.stringify(error));
        }
    });
});

$(document).ready(function(event) {
    $('form[name=new-article]').submit(function(event){
        event.preventDefault();
        var server="http://wt.kpi.fei.tuke.sk";
        var postData = {
            "title": $("#title-article").val(),
            "content": $("#textarea-editable").val(),
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

function deleteArticle(deleteId) {
     var server="http://wt.kpi.fei.tuke.sk";
    $.ajax({
        type: "DELETE",
        url: server+"/api/article/"+deleteId,
        async: false,

        success: function(result){
            alert("Article is deleted.");
            window.location.href = "articles.html";
        },
        error: function (error) {
            alert("error: "+ JSON.stringify(error));
        }
    });
}

function showModalEdit(commentID) {
    $("#edit-comment").fadeIn();
    $("#hidden-edit-id").val(commentID);
    $("#edit-editable").text($("#content-"+commentID).text());
    $("#edit-author").val($("#author-"+commentID).text());
    $("#submit-edit").removeAttr("disabled");

}

var showComments = false;

function toggleComments() {
    if(showComments) {
        showComments = false;
        $("#new-comment-container").fadeOut();
    } else {
        showComments = true;
        $("#new-comment-container").fadeIn();
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    }
}
