/*
 * Created by Stefan Korecko, 2016-18
 */
// var server="wt.kpi.fei.tuke.sk";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//KĂłd, ktorĂ˝ sa vykonĂˇ pri naÄŤĂ­tanĂ­ skriptu
//Code executed when the script is loaded
writeArticle2Html("article");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//funkcie



/**
 * otvori dialogove okno s chybovym hlasenim
 * @param status -  hodnota XMLHttpRequest.status
 *
 * opens dialog with error message
 * @param status -  value XMLHttpRequest.status
 */
function errorDialog(status){
    window.alert("Chyba pri naÄŤĂ­tanĂ­ Ăşdajov zo servera.\nStatus= "+status);
}



/**
 * ZapĂ­Ĺˇe Ăşdaje o ÄŤlĂˇnku do elementu s id=articleElmId.
 * @param articleElmId - Id elementu do ktorĂ©ho sa ÄŤlĂˇnok mĂˇ vypĂ­saĹĄ
 *
 * Writes article data to the element with id=articleElmId.
 * @param articleElmId - id of the html element to which the article data are written
 */
function writeArticle2Html(articleElmId){

    var artId = queryString2obj().id;

    if (isFinite(artId)){
        $.ajax({
            type: 'GET',
            url: "http://"+server+"/api/article/"+artId,
            dataType: "json",
            success: function (article) {
                $.get("templates/article.mst",      //get() je vlastne specialna verzia ajax()
                    function (template) {
                        $("#"+articleElmId).html(Mustache.render(template, article));

                    }
                    ,"text");
                $.get("templates/get_title.mst",      //get() je vlastne specialna verzia ajax()
                    function (template) {
                        $("#get-title").html(Mustache.render(template, article));
                    }
                    ,"text");
                $.get("templates/edit-link.mst",      //get() je vlastne specialna verzia ajax()
                    function (template) {
                        $("#edit-link").html(Mustache.render(template, article));
                    }
                    ,"text");
                $.get("templates/delete-article.mst",      //get() je vlastne specialna verzia ajax()
                    function (template) {
                        $("#delete-article").html(Mustache.render(template, article));
                    }
                    ,"text");
            },
            error:function(responseObj,textStatus, errorThrown){
                errorDialog(textStatus+"("+errorThrown+")");
            }
        });

        $.ajax({
            type: 'GET',
            url: "http://"+server+"/api/article/"+artId+"/comment",
            dataType: "json",
            success: function (comments) {
                $.get("templates/comment.mst",      //get() je vlastne specialna verzia ajax()
                    function (template) {
                        $("#comments").html(Mustache.render(template, comments));
                    }
                    ,"text")
            },
            error:function(responseObj,textStatus, errorThrown){
                errorDialog(textStatus+"("+errorThrown+")");
            }
        });
        window.setTimeout(changehtml,100);

    }
}


function changehtml() {
    content = $("#content-article").text();
    $("#content-article").html(content);
}


/**
 * Sparsuje query string do objektu
 * Pozor! Ak je viac poloĹľiek s rovnakĂ˝m menom, uloĹľĂ­ sa do prĂ­sluĹˇnej poloĹľky iba poslednĂˇ.
 * @returns objekt s query string
 *
 * Parses the query string to an object
 * Beware! If there are more items with the same name, it takes the last one.
 * @returns the object with the parsed query string
 */
function queryString2obj(){
//modified code from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    var urlParams = {},
        match,
        pl     = /\+/g, // Regex for replacing addition symbol with a space:
                        // / - the beginning and the end of the expression
                        // g - modifier to perform a global match (i.e. find all matches instead of the first match only).
                        // \+ - symbol "+"
        search = /([^&=]+)=?([^&]*)/g,// [^&=] - complemented character set: any character except of "&" and "="
                                      // [^&] - complemented character set: any character except of "&"
                                      // + -  the preceding expression 1 or more times
                                      // ? -  the preceding expression 0 or 1 time
                                      // * -  the preceding expression 0 or more times

        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
    return urlParams;
}

// create comment
$(document).ready(function(event) {
    $('form[name=new-comment]').submit(function(event){
        event.preventDefault();
        var server="http://wt.kpi.fei.tuke.sk";

        var postData = {
            "author": $("#comment-author").val(),
            "text": $("#textarea-editable").text()
        };

        var jsonData = JSON.stringify(postData);

        $.ajax({
            type: "POST",
            url: server+"/api/article/"+queryString2obj().id+"/comment",
            dataType: 'json',
            async: false,
            data: jsonData,
            contentType: 'application/json',

            success: function(result){
                alert("Comment was added succesfully.");
                location.reload();
            },
            error: function (error) {
                alert("error: "+ JSON.stringify(error));
            }
        });
    });
});

function deleteComment(commentID) {
    var server="http://wt.kpi.fei.tuke.sk";
    $.ajax({
        type: "DELETE",
        url: server+"/api/comment/"+commentID,
        async: false,

        success: function(result){
            alert("Comment is deleted.");
            location.reload();
        },
        error: function (error) {
            alert("error: "+ JSON.stringify(error));
        }
    });
}


$(document).ready(function(event) {
    $('form[name=edit-comment]').submit(function(event){
        event.preventDefault();
        var server="http://wt.kpi.fei.tuke.sk";

        var editid = $("#hidden-edit-id").val();
        var postData = {
            "author": $("#edit-author").val(),
            "text": $("#edit-editable").text()
        };

        var jsonData = JSON.stringify(postData);

        $.ajax({
            type: "PUT",
            url: server+"/api/comment/"+editid,
            dataType: 'json',
            async: false,
            data: jsonData,
            contentType: 'application/json',

            success: function(result){
                alert("Comment was edited succesfully.");
                location.reload();
            },
            error: function (error) {
                alert("error: "+ JSON.stringify(error));
            }
        });
    });
});