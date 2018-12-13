VK.init({
    apiId: 6782067
});


function loginVK() {
    VK.Auth.login(function(response) {
        if (response.session) {
            console.log(response);
            $("#vk-info").text("VK login: " + response.session.user.first_name + " " + response.session.user.last_name);
            $("#vk-info").append("<br /><a href='"+response.session.user.href+"'>Link</a>");
            if (response.settings) {
                console.log(response.settings);
            }
        } else {
            alert("You should allow us some access to continue working.");
        }
    });
}
