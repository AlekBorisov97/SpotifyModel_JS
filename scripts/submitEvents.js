function attachButtonEvents() {
    $('#formRegister').on('submit', function (event) {
        event.preventDefault()
        let username = $("#formRegister input[name='username']").val()
        let password = $("#formRegister input[name='password']").val()
        if (username.length >= 3 && password.length >= 6) {
            kinveyRequester.registerUser(username, password)
        } else {
            notify.showError("Username and password must be al least 3 and 6 charachters long!")
        }
    });

    $('#formLogin').on('submit', function (event) {
        event.preventDefault()
        let username = $("#formLogin input[name='username']").val();
        let password = $("#formLogin input[name='password']").val();
        kinveyRequester.loginUser(username, password);
    });

    $("#navbarLogout").on('click', function () {
        kinveyRequester.logoutUser()
    });


    $("#formCreateSong").on('submit', function (event) {
        event.preventDefault();
        let title = $("#formCreateSong input[name='title']").val();
        let artist = $("#formCreateSong input[name='artist']").val();
        let imageURL = $("#formCreateSong input[name='imageURL']").val();
        let likes = 0;
        let listens = 0;
        let regexP = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        if (title && artist && imageURL && regexP.test(imageURL)) {
            kinveyRequester.postSong(title, artist, imageURL, likes, listens);
        } else if(!regexP.test(imageURL))
        {
            notify.showError('not a valid url')
        }
        else{
            notify.showError("Please fill all the fields.")
        }
    });
}