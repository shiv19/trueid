const Observable = require("data/observable").Observable;

function HomeViewModel() {
    const viewModel = new Observable();

    viewModel.address = "";

    viewModel.loaded = false;

    return viewModel;
}

module.exports = HomeViewModel;
