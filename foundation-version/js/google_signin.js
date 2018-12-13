function onSignIn(googleUser) {
    // Useful data for your client-side scripts:

    var profile = googleUser.getBasicProfile();
    var name = profile.getName();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + name);
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    $("#author-name").val(name);
    $("#author-mail").val(profile.getEmail());
    $("#comment-author").val(name);
    $("#edit-author").val(name);

}
