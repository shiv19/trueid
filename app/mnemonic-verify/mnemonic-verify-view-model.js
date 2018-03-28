const observableModule = require("data/observable");
const appSettings = require("application-settings");
const routes = require("~/shared/routes");
require("nativescript-nodeify");
const bip39 = require("bip39");

const dialogsModule = require("ui/dialogs");

function MnemonicVerifyViewModel() {
    const viewModel = observableModule.fromObject({
        mnemonic: "wet normal change meat dentist mansion radio horn ensure ahead over lunar",
        seedHex: "",
        loading: false,
        verifyMnemonic(args) {
            this.mnemonic = this.mnemonic.trim();
            if (this.mnemonic.split(/\s+/g).length >= 12 && bip39.validateMnemonic(this.mnemonic)) {
                this.loading = true;
                console.log("User has entered a valid mnemonic");

                const mnemonicEntryField = args.object.page.getViewById("mnemonic");
                mnemonicEntryField.dismissSoftInput();
                mnemonicEntryField.isEnabled = false;

                appSettings.setString("mnemonic", this.mnemonic);

                args.object.page.frame.navigate({
                    moduleName: routes.home,
                    animate: true,
                    transition: {
                        name: "slideTop",
                        duration: 380,
                        curve: "easeIn"
                    }
                });
            } else {
                dialogsModule.alert("You have entered an invalid 12 word pass phrase. Please try again.").then(function() {
                    console.log("Dialog closed!");
                });
            }
        }
    });

    return viewModel;
}

module.exports = MnemonicVerifyViewModel;
