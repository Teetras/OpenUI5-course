sap.ui.define(
  [
    "project1/project1/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "project1/project1/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/Sorter",
    "sap/ui/model/FilterOperator",
  ],
  function (BaseController, JSONModel, formatter, Filter, Sorter, FilterOperator) {
    "use strict";

    return BaseController.extend("project1.project1.controller.Worklist", {
      formatter: formatter,

      onInit: function () {
        const oViewModel = new JSONModel({
          count:'0'
        });
        this.setModel(oViewModel, "worklistView");
      },


_getTableTemplate(){
const oTemplate=new sap.m.ColumnListItem({
type:'Navigation',
navigated:true,
cells:[
  new sap.m.Text({
    text:'{DocumentNumber}'
  }),
  new sap.m.Text({
    text:'{DocumentDate}'
  }),
  new sap.m.Text({
    text:'{PlantText}'
  }),
  new sap.m.Text({
                      
    text:'{RegionText}'
  }),
  new sap.m.Text({
    text:'{Description}'
  }),
  new sap.m.Text({
    text:'{Created}'
  })
]
});
return oTemplate;
},
_getTableCounter() {
  this.getModel().read('/zjblessons_base_Headers/$count', {
      success: (count) =>{
        this.getModel( 'worklistView').setProperty('/count',count);
      },
      error: (oError)=> {
      }
  });
},

_bindTable(){
  const OTable= this.getView().byId('table')
  OTable.bindItems({
    path:'/zjblessons_base_Headers',
    sorter:[new Sorter('DocumentDate',true)],
    template:this._getTableTemplate(),
      events:{
      dataReceived:(oData)=>{
      },
      dataRequested:(oData)=>{
        this._getTableCounter();
      }
    }

  })
},

      onBeforeRendering: function() {
        this._bindTable()
      
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
