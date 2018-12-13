document.getElementById("edit-editable").addEventListener("input", function() {
    if($("#edit-editable").text() !== "") {
        $("#submit-edit").removeAttr("disabled");
    } else {
        $("#submit-edit").attr("disabled", "disabled");
    }
}, false);