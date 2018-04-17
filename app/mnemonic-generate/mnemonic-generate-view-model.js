const observableModule = require("data/observable");
require("nativescript-nodeify");
const bip39 = require("bip39");

function MnemonicGenerateViewModel() {
    const viewModel = observableModule.fromObject({
        mnemonic: "",
        generateMnemonic() {
            this.mnemonic = bip39.generateMnemonic();
        }
    });

    return viewModel;
}

module.exports = MnemonicGenerateViewModel;
