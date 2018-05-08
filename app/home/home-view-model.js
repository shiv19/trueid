const Observable = require("data/observable").Observable;
const appSettings = require("application-settings");
const topmost = require("ui/frame").topmost;

function HomeViewModel() {
    const viewModel = new Observable();

    viewModel.address = "";

    viewModel.loaded = false;

    viewModel.idCard = JSON.parse(appSettings.getString('idCard', '{}'));

    if (viewModel.idCard.address) {
        viewModel.address = viewModel.idCard.address;
        viewModel.loaded = true;

        const qrCode = topmost().getViewById('qrCode');
        if (qrCode) {
            qrCode.src = 'https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=' + viewModel.idCard.address;
        }
    }

    return viewModel;
}

module.exports = HomeViewModel;
