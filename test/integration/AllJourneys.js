/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"project1/project1/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"project1/project1/test/integration/pages/Worklist",
	"project1/project1/test/integration/pages/Object",
	"project1/project1/test/integration/pages/NotFound",
	"project1/project1/test/integration/pages/Browser",
	"project1/project1/test/integration/pages/App"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "project1.project1.view."
	});

	sap.ui.require([
		"project1/project1/test/integration/WorklistJourney",
		"project1/project1/test/integration/ObjectJourney",
		"project1/project1/test/integration/NavigationJourney",
		"project1/project1/test/integration/NotFoundJourney"
	], function () {
		QUnit.start();
	});
});