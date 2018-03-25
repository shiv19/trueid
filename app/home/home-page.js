const HomeViewModel = require("./home-view-model");
const appSettings = require("application-settings");
const routes = require("~/shared/routes");
const topmost = require("ui/frame").topmost;

function onNavigatingTo(args) {
    const page = args.object;

    // Return if it is a back navigation
    if (args.isBackNavigation) {
        return;
    }

    // Goto login page if mnemonic phrase is not set
    const mnemonic = appSettings.getString("mnemonic", "");
    if (mnemonic === "") {
        topmost().navigate(routes.login);

        return;
    }

    // Create and bind VM
    const homeViewModel = new HomeViewModel();
    page.bindingContext = homeViewModel;

    // Set loaded to true, and show actionBar
    homeViewModel.set("loaded", true);
    page.actionBarHidden = false;
}

exports.onNavigatingTo = onNavigatingTo;
