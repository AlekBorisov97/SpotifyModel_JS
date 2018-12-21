function showHideLinks() {
    hideAllLinks()
    if (sessionStorage.getItem("authToken")) {
        $('#navbarHome').show();
        $('#navbarAllSongs').show();
        $('#navbarMySongs').show();
        $('#navbarWelcome').text(`Welcome, ${sessionStorage.getItem("username")}!`);
        $('#navbarWelcome').show();
        $('#navbarLogout').show();
    } else {
        $('#navbarLogin').show();
        $('#navbarRegister').show();
    }
}

function showHomeView(){
    hideAllViews();
    showHideLinks()
    $('#homeView').show();
}

function hideAllViews() {
    $('#container > section').hide()
}

function hideAllLinks() {
    $('#navbarHome').hide()
    $('#navbarAllSongs').hide()
    $('#navbarMySongs').hide()
    $('#navbarWelcome').hide()
    $('#navbarLogout').hide()
    $('#navbarLogin').hide()
    $('#navbarRegister').hide()
}

function attachLinkEvents() {
    $('#navbarHome').on('click', function () {
        hideAllViews()
        $('#homeView').show()
    })
    $('#navbarLogin').on('click', function () {
        hideAllViews()
        $('#loginView').show()
    })
    $('#haveAccountLoginBtn').on('click', function () {
        hideAllViews()
        $('#loginView').show()
    })
    $('#navbarRegister').on('click', function () {
        hideAllViews()
        $('#registerView').show()
    })
    $('#dontHaveAccountRegisterBtn').on('click', function () {
        hideAllViews()
        $('#registerView').show()
    })
    $('#navbarAllSongs').on('click', function () {
        hideAllViews();
        showHideLinks();
        kinveyRequester.getAllSongs();
        $('#allSongsView').show()
    })
    $('#navbarMySongs').on('click', function () {
        hideAllViews();
        showHideLinks();
        kinveyRequester.getMySongs(sessionStorage.getItem('userId'));
        $('#mySongsView').show()
    })
    $('#addSongButton').on('click', function () {
        hideAllViews();
        showHideLinks();
        $('#createSongView').show()
    })

}

