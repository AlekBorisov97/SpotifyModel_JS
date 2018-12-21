const kinveyRequester = (function () {

    const BASE_URL = 'https://baas.kinvey.com/';
    const APP_KEY = 'kid_HkhMMfcxN';
    const APP_SECRET = '38e04a5ab37b4452baefc83ad7d740e0';
    const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)};

    function registerUser(username, password) {
        $.ajax({
            method: "POST",
            url: BASE_URL + 'user/' + APP_KEY + '/',
            headers: AUTH_HEADERS,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'Registration successful.');
            $('#formRegister').trigger('reset');
        }).catch(handleError)
    }

    function loginUser(username, password) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + 'user/' + APP_KEY + '/login',
            headers: AUTH_HEADERS,
            data: {username, password}
        }).then(function (res) {
            signInUser(res, 'Login successful.');
            $('#formLogin').trigger('reset');
        }).catch(handleError)
    }

    function logoutUser() {
        $.ajax({
            method: 'POST',
            url: BASE_URL +  'user/' + APP_KEY + '/_logout',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}
        }).catch(function (err) {
            console.log(err)
        });
        sessionStorage.clear();
        notify.showInfo("Logout successful");
        showHomeView();
        showHideLinks();
    }

    function postSong(title, artist, imageURL, likes,
                        listens) {
        $.ajax({
            method: 'POST',
            url: BASE_URL + 'appdata/' + APP_KEY + '/songs',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            data: {title, artist, imageURL, likes,
                listens}
        }).then(function () {
            showHomeView();
            notify.showInfo("Song created.")
            $('#formCreateSong').trigger("reset")
            kinveyRequester.getAllSongs();
            $('#allSongsView').show()
            $('#homeView').hide();
        }).catch(handleError)
    }

    function getAllSongs(){
        $.ajax({
            method: 'GET',
            url: BASE_URL + 'appdata/' + APP_KEY + '/songs',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (res) {
            notify.showInfo("Songs loaded.")
            console.log(res);
            renderAllSongs(res);
        }).catch(handleError)
    }
    function getMySongs(userId){
        $.ajax({
            method: 'GET',
            url: BASE_URL + 'appdata/' + APP_KEY + `/songs?query={"_acl.creator":"${userId}"}`,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function (res) {
            notify.showInfo("Songs loaded.")
            console.log(res);
            renderMySongs(res);
        }).catch(handleError)
    }



    function deleteSong(id) {
        $.ajax({
            method: 'DELETE',
            url: BASE_URL + 'appdata/' + APP_KEY + '/songs/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function () {
            notify.showInfo("Song deleted.")
            $("#linkFlights").trigger('click')
            getAllSongs();
        }).catch(handleError)
    }
    function deleteMySong(id) {
        $.ajax({
            method: 'DELETE',
            url: BASE_URL + 'appdata/' + APP_KEY + '/songs/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        }).then(function () {
            notify.showInfo("Song deleted.")
            getMySongs(sessionStorage.getItem('userId'));
        }).catch(handleError)
    }



    function getSong(id) {
        return $.ajax({
            method: 'GET',
            url: BASE_URL + 'appdata/' + APP_KEY + '/songs/' + id,
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
        })
      //      .then(function (res) {
      //      notify.showInfo("Successfully get song.")
      //      console.log(res);
      //  }).catch(handleError)
    }

//todo
    function likeSong(id) {
        getSong(id).then(function (res) {
            console.log(res);
            let title = res.title;
            let artist = res.artist;
            let imageURL = res.imageURL;
            let likes = Number.parseInt(res.likes) + 1;
            let listens = res.listens;
            $.ajax({
                method: 'PUT',
                url: BASE_URL + 'appdata/' + APP_KEY + '/songs/' + id,
                headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
                data: {title, artist, imageURL, likes,
                    listens}
            }).then(function (res) {
                notify.showInfo("Successfully edited song.")
                getAllSongs();
            }).catch(handleError)
        }).catch(handleError)
    }
    function listenSong(id) {
        getSong(id).then(function (res) {
            console.log(res);
            let title = res.title;
            let artist = res.artist;
            let imageURL = res.imageURL;
            let likes = res.likes;
            let listens = Number.parseInt(res.listens) +1;
            $.ajax({
                method: 'PUT',
                url: BASE_URL + 'appdata/' + APP_KEY + '/songs/' + id,
                headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
                data: {title, artist, imageURL, likes,
                    listens}
            }).then(function (res) {
                notify.showInfo("Successfully edited song.")
                getAllSongs();
            }).catch(handleError)
        }).catch(handleError)
    }
    function listenMySong(id) {
        getSong(id).then(function (res) {
            console.log(res);
            let title = res.title;
            let artist = res.artist;
            let imageURL = res.imageURL;
            let likes = res.likes;
            let listens = Number.parseInt(res.listens) +1;
            $.ajax({
                method: 'PUT',
                url: BASE_URL + 'appdata/' + APP_KEY + '/songs/' + id,
                headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
                data: {title, artist, imageURL, likes,
                    listens}
            }).then(function (res) {
                notify.showInfo("Successfully edited song.")
                getMySongs(sessionStorage.getItem('userId'));
            }).catch(handleError)
        }).catch(handleError)
    }
//todo

    function signInUser(res, message) {
        saveUserSession(res)
        notify.showInfo(message)
        showHomeView()
        showHideLinks()
    }

    function saveUserSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken)
        sessionStorage.setItem('username', userInfo.username)
        sessionStorage.setItem('userId', userInfo._id)
    }

    function handleError(err) {
        notify.showError(err.message)
    }


    return {registerUser, loginUser, logoutUser, postSong, getAllSongs,getMySongs,deleteSong,deleteMySong, getSong,listenMySong, likeSong, listenSong}
}());