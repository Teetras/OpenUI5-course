sap.ui.define(
  [
    "project1/project1/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "project1/project1/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (BaseController, JSONModel, formatter, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("project1.project1.controller.Worklist", {
      formatter: formatter,

      onInit: function () {
        const oViewModel = new JSONModel({});
        this.setModel(oViewModel, "worklistView");
      },
      onSearchDocNumber: function (oEvent) {
        var sQuery = oEvent.getParameter("newValue");
        var oBinding = this.byId("table").getBinding("items");

        var oFilter = new sap.ui.model.Filter(
          "DocumentNumber",
          sap.ui.model.FilterOperator.Contains,
          sQuery
        );
        oBinding.filter([oFilter]);
      },

      onSearchPlantText: function (oEvent) {
        var sQuery = oEvent.getParameter("newValue");
        var oBinding = this.byId("table").getBinding("items");

        var oFilter = new sap.ui.model.Filter(
          "PlantText",
          sap.ui.model.FilterOperator.EQ,
          sQuery
        );
        oBinding.filter([oFilter]);
      },
    });
  }
);
