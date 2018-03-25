const observableModule = require("data/observable");
require("nativescript-nodeify");
const bip39 = require("bip39");

function LoginViewModel() {
    const viewModel = observableModule.fromObject({
        mnemonic: "",
        generateMnemonic() {
            this.mnemonic = bip39.generateMnemonic();

            return this.mnemonic;
        },
        createAccount() {
            this.generateMnemonic();
            // TODO: use truffle to create eth account
        },
        validateMnemonic(mnemonic) {

        },
        retrieveAccount() {

        }
    });

    return viewModel;
}

module.exports = LoginViewModel;
