const routes = require("~/shared/routes");
let shouldAnimate = false;

function onNavigatingTo(args) {
    const page = args.object;

    if (args.isBackNavigation) {
        shouldAnimate = false;

        return;
    }
    shouldAnimate = true;
}

function onLoaded(args) {

    const page = args.object;

    if (shouldAnimate) {
        const bottomPanel = page.getViewById("bottomPanel");
        const createAccountBtn = page.getViewById("createAccountBtn");
        const retrieveAccountBtn = page.getViewById("retrieveAccountBtn");

        createAccountBtn.opacity = 0;
        retrieveAccountBtn.opacity = 0;
        bottomPanel.opacity = 0;

        bottomPanel.animate({
            translate: { x: 0, y: 300 },
            duration: 0
        });
        bottomPanel.animate({
            translate: { x: 0, y: 0 },
            opacity: 100,
            duration: 800,
            curve: "easeIn"
        }).then(() => {
            createAccountBtn.animate({
                opacity: 100,
                duration: 380,
                curve: "easeIn"
            });
            retrieveAccountBtn.animate({
                opacity: 100,
                duration: 380,
                curve: "easeIn"
            });
        })
    }
    
}

function onCreateAccount(args) {
    const page = args.object.page;
    page.frame.navigate({
        moduleName: routes.mnemonicGenerate,
        animate: true,
        transition: {
            name: "slideTop",
            duration: 380,
            curve: "easeIn"
        }
    });
}

function onRetrieveAccount(args) {
    const page = args.object.page;
    page.frame.navigate({
        moduleName: routes.mnemonicVerify,
        animate: true,
        transition: {
            name: "slideTop",
            duration: 380,
            curve: "easeIn"
        }
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.onLoaded = onLoaded;
exports.onCreateAccount = onCreateAccount;
exports.onRetrieveAccount = onRetrieveAccount;
