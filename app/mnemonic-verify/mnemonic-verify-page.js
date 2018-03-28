const MnemonicVerifyViewModel = require("./mnemonic-verify-view-model");

function onNavigatingTo(args) {
    const page = args.object;

    if (args.isBackNavigation) {
        return;
    }

    page.bindingContext = new MnemonicVerifyViewModel();
}

exports.onNavigatingTo = onNavigatingTo;

