const HomeViewModel = require("./home-view-model");
const appSettings = require("application-settings");
const routes = require("~/shared/routes");
const topmost = require("ui/frame").topmost;
const webViewInterfaceModule = require('nativescript-webview-interface');
let oWebViewInterface;
let homeViewModel;
const app = require('application');
const moment = require('moment');
const SocialShare = require('nativescript-social-share');

// Date Converter
const dateConverter = function(value) {
    if (value !== undefined) {
        return moment(value).format('Do MMM YYYY');
    } else {
        return '';
    }
};
app.getResources().dateConverter = dateConverter;

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
        topmost().navigate({
            moduleName: routes.login,
            clearHistory: true
        });

        return;
    }

    // Set loaded to true, and show actionBar
    homeViewModel.set("loaded", true);
    page.actionBarHidden = false;
}

function onLoaded(args) {
    const page = args.object;

    if (page.bindingContext && page.bindingContext.loaded) {
        console.log("setting up webview");
        setupWebViewInterface(page);
    }
}

// Initializes plugin with a webView
function setupWebViewInterface(page){
    var webView = page.getViewById('webView');
    var qrCode = page.getViewById('qrCode');
    var qrSpinner = page.getViewById('qrSpinner');
    oWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, '~/www/index.html');

    const mnemonic = appSettings.getString("mnemonic", "");  

    setTimeout(() => {
        console.log("calling js function");
        console.log('with mnemonic', mnemonic);
        oWebViewInterface.callJSFunction('initWeb3', mnemonic, function(account){
            console.log(account);
            homeViewModel.set("address", account);
            qrSpinner.visibility = 'collapse';
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
    appSettings.setString('idCard', '{}');
    appSettings.clear();
    args.object.page.frame.navigate(routes.login);
}

function onShare(args) {
    if (homeViewModel.idCard && homeViewModel.idCard.address) {
        SocialShare.shareText(
            homeViewModel.idCard.address
        );
    }
}

exports.onNavigatingTo = onNavigatingTo;
exports.onLoaded = onLoaded;
exports.onLogout = onLogout;
exports.onShare = onShare;
