sap.ui.define([
		"project1/project1/controller/BaseController",
		"sap/ui/model/json/JSONModel"
	], function (BaseController, JSONModel) {
		"use strict";

		return BaseController.extend("project1.project1.controller.App", {

			onInit : function () {
				var oViewModel,
					fnSetAppNotBusy,
					iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

				oViewModel = new JSONModel({
					busy : true,
					delay : 0
				});
				this.setModel(oViewModel, "appView");

				fnSetAppNotBusy = function() {
					oViewModel.setProperty("/busy", false);
					oViewModel.setProperty("/delay", iOriginalBusyDelay);
				};

				this.getOwnerComponent().getModel().metadataLoaded().
				    then(fnSetAppNotBusy);
				this.getOwnerComponent().getModel().attachMetadataFailed(fnSetAppNotBusy);

				this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			}
		});

	}
);