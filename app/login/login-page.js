const LoginViewModel = require("./login-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new LoginViewModel();
}

function onCreateAccount(args) {
    const button = args.object;
    const bindingContext = button.bindingContext;

    bindingContext.createAccount();
}

function onRetrieveAccount(args) {
    const button = args.object;
    const bindingContext = button.bindingContext;

    bindingContext.validateMnemonic();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onCreateAccount = onCreateAccount;
exports.onRetrieveAccount = onRetrieveAccount;
