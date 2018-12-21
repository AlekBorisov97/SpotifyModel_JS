$(() => {

    const app = Sammy('#container', function () {

        this.get('#/remove',function () {
            notify.showInfo('remove')
            this.redirect('#')
        });
        this.get('#/like',function () {
            notify.showInfo('like')
            this.redirect('#')
        });
        this.get('#/listen',function () {
            notify.showInfo('listen')
            this.redirect('#')
        });
    });

    app.run();
    attachLinkEvents()
    showHideLinks()
    hideAllViews()
    attachButtonEvents()
    showHomeView()
})