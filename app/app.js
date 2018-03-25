require("./bundle-config");
const application = require("application");
const routes = require("~/shared/routes");

application.start({ moduleName: routes.home });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
