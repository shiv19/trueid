const MnemonicGenerateViewModel = require("./mnemonic-generate-view-model");
const routes = require("~/shared/routes");
const dialogsModule = require("ui/dialogs");

function onNavigatingTo(args) {
    const page = args.object;

    if (args.isBackNavigation) {
        return;
    }

    const mnemonicGenVm = new MnemonicGenerateViewModel();
    page.bindingContext = mnemonicGenVm;

    mnemonicGenVm.generateMnemonic();
}

function onContinue(args) {

    dialogs.confirm({
        message: "Have you written down your 12 word pass phrase?",
        okButtonText: "Yes",
        cancelButtonText: "No"
    }).then(result => {
        if (result) {
            args.object.page.frame.navigate({
                moduleName: routes.mnemonicVerify,
                animate: true,
                transition: {
                    name: "slide",
                    duration: 380,
                    curve: "easeIn"
                }
            });
        }
    });

}

exports.onNavigatingTo = onNavigatingTo;
exports.onContinue = onContinue;
