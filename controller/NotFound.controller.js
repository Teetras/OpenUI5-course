sap.ui.define([
		"project1/project1/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("project1.project1.controller.NotFound", {
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);