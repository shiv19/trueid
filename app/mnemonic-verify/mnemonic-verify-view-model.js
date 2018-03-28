const observableModule = require("data/observable");
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

                console.log("generating seed hex");

                this.seedHex = bip39.mnemonicToSeedHex(this.mnemonic);
                console.log(this.seedHex);
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
