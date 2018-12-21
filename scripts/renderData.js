function renderAllSongs(songs) {
    $("#allSongsView > div .song-container").empty();
    let addEveryTime = $(`<h1>All Songs</h1>
                    <a href="#">
                        <button type="button" class="btn-lg btn-block new-song-btn" id="addSongButton">Add a new song</button>
                    </a>`);
    $("#allSongsView > div .song-container").append(addEveryTime);
    attachLinkEvents();
    //todo proba
    let countLikeId = 0;
    for (const song of songs.sort((k, v) =>{

     if(v.likes - k.likes==0){
         return v.listens - k.listens;
     } else{
         return v.likes - k.likes;
     }
    })) {
        let b = '';

        if(song._acl.creator!==sessionStorage.getItem('userId'))
            b = $(`<div class="song">
             <h5>Title: ${song.title}</h5>
             <h5>Artist: ${song.artist}</h5>

             <img class="cover" src="${song.imageURL}"/>
             <p>Likes: ${song.likes}</p>
             <a href="#/like"><button type="button" class="btn btn-primary mt-4" class="likeButton" onclick="kinveyRequester.likeSong($('#hiddenIdKey${countLikeId}').text())">Like</button></a>
             <p id="hiddenIdKey${countLikeId}" hidden>${song._id}</p>
         </div>`);

        $("#allSongsView > div .song-container").append(b)
        countLikeId++;
    }
    //todo proba
    for (const song of songs.sort((k, v) => v.likes - k.likes)) {
        let a = '';
       if(song._acl.creator===sessionStorage.getItem('userId')) {
            a = $(`<div class="song">
                        <h5 id="hTitle">Title: ${song.title}</h5>
                        <h5>Artist: ${song.artist}</h5>
                        <img class="cover" src="${song.imageURL}"/>
                        <p>Likes: ${song.likes}; Listened ${song.listens} times</p>
                        <a href="#/remove"><button type="button" class="btn btn-danger mt-4" onclick="kinveyRequester.deleteSong($('#hiddenIdKey${countLikeId}').text())">Remove</button></a>
                        <a href="#/listen"><button type="button" class="btn btn-success mt-4" onclick="kinveyRequester.listenSong($('#hiddenIdKey${countLikeId}').text())">Listen</button></a>
                        <p id="hiddenIdKey${countLikeId}" hidden>${song._id}</p>
                        <p>Likes: ${song.likes}</p>
                    </div>`);
       }
       //else{
       //    a = $(`<div class="song">
       //                 <h5>Title: ${song.title}</h5>
       //                 <h5>Artist: ${song.artist}</h5>
       //                 <img class="cover" src="${song.imageURL}"/>
       //                 <p>Likes: ${song.likes}</p>
       //
       //                 <a href="#"><button type="button" class="btn btn-primary mt-4">Like</button></a>
       //             </div>`);
       //}
        $("#allSongsView > div .song-container").append(a)
        countLikeId++;
    }


}

function renderMySongs(songs) {
    $("#mySongsView > div .song-container").empty().append($(`<h1>My Songs</h1>`));
    let count = 0;
    for (const song of songs) {
        let a = $(`<div class="song">
                        <h5>Title: ${song.title}</h5>
                        <h5>Artist: ${song.artist}</h5>
                        <img class="cover" src="${song.imageURL}"/>
                        <p>Likes: ${song.likes}; Listened ${song.listens} times</p>
                        <a href="#/remove"><button type="button" class="btn btn-danger mt-4" onclick="kinveyRequester.deleteMySong($('#songIdHidden${count}').text())">Remove</button></a>
                        <a href="#/listen"><button type="button" class="btn btn-success mt-4" onclick="kinveyRequester.listenMySong($('#songIdHidden${count}').text())">Listen</button></a>
                        <p id="songIdHidden${count}" hidden>${song._id}</p>
                    </div>`);
        $("#mySongsView > div .song-container").append(a)
        count++;
    }
}
