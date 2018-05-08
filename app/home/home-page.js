const HomeViewModel = require("./home-view-model");
const appSettings = require("application-settings");
const routes = require("~/shared/routes");
const topmost = require("ui/frame").topmost;
const webViewInterfaceModule = require('nativescript-webview-interface');
let oWebViewInterface;
let homeViewModel;

// require("nativescript-nodeify");
// const HDWalletProvider = require("truffle-hdwallet-provider");

function onNavigatingTo(args) {
    const page = args.object;

    // Return if it is a back navigation
    if (args.isBackNavigation) {
        return;
    }

    // Create and bind VM
    homeViewModel = new HomeViewModel();
    page.bindingContext = homeViewModel;
    
    // Goto login page if mnemonic phrase is not set
    const mnemonic = appSettings.getString("mnemonic", "");
    if (mnemonic === "") {
        topmost().navigate(routes.login);

        return;
    }

    // Set loaded to true, and show actionBar
    homeViewModel.set("loaded", true);
    page.actionBarHidden = false;
}

function onLoaded(args) {
    const page = args.object;

    if (page.bindingContext) {
        console.log("setting up webview");
        setupWebViewInterface(page);
    }
}

// Initializes plugin with a webView
function setupWebViewInterface(page){
    var webView = page.getViewById('webView');
    var qrCode = page.getViewById('qrCode');
    oWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, '~/www/index.html');

    const mnemonic = appSettings.getString("mnemonic", "");  

    setTimeout(() => {
        console.log("calling js function");
        console.log('with mnemonic', mnemonic);
        oWebViewInterface.callJSFunction('initWeb3', mnemonic, function(account){
            console.log(account);
            homeViewModel.set("address", account);
            qrCode.src = 'https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=' + account;

            oWebViewInterface.callJSFunction('getIdCard', null, function(idCard){
                if (idCard.fullName !== "") {
                    appSettings.setString('idCard', JSON.stringify(idCard));
                    homeViewModel.set("idCard", idCard);
                }
            });
        });
    }, 3000);
}

function onLogout(args) {
    appSettings.clear();
    args.object.page.frame.navigate(routes.login);
}

exports.onNavigatingTo = onNavigatingTo;
exports.onLoaded = onLoaded;
exports.onLogout = onLogout;
