sap.ui.define(
  [
    "project1/project1/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "project1/project1/model/formatter",
    // "project1/project1/view/fragment/CreateDialog",
    "sap/ui/model/Filter",
    "sap/ui/model/Sorter",
    "sap/ui/core/Fragment"
  ],
  function (BaseController, JSONModel, formatter, Filter, Sorter, Fragment) {
    "use strict";

    return BaseController.extend("project1.project1.controller.Worklist", {
      formatter: formatter,
Ofunction: function(){
  return console.log("master branch")
},
      onInit: function () {
        const oViewModel = new JSONModel({
          count:'0'
        });
        this.setModel(oViewModel, "worklistView");
      },


_getTableTemplate(){
const oTemplate=new sap.m.ColumnListItem({
type:'Navigation',
navigation:true,
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
  }),
  new sap.m.Button({
    type:'Transparent',
    icon:this.getModel("i18n").getResourceBundle().getText("iconDelete"),
    press:this.deleteRecord.bind(this),//
  }),
]
});
return oTemplate;
},
deleteRecord(oEvent) {
  const oSource = oEvent.getSource().getBindingContext();
  const sKey = this.getModel().createKey('/zjblessons_base_Headers', {
      HeaderID: oSource.getProperty('HeaderID')
  });

  sap.m.MessageBox.confirm(
      "Вы уверены, что хотите удалить эту запись?", 
      {
          title: "Подтверждение удаления",
          onClose: (oAction) => {
              if (oAction === sap.m.MessageBox.Action.OK) {
                  this.getModel().remove(sKey, {
                      success: (oData) => {
                          sap.m.MessageToast.show("Запись успешно удалена.");
                      },
                      error: (oError) => {
                          sap.m.MessageBox.error("Ошибка при удалении записи.");
                      }
                  });
              }
          }
      }
  );
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
const columnNames='HeaderID,DocumentNumber,DocumentDate,PlantText,RegionText,Description,Created'
  OTable.bindItems({
    path:'/zjblessons_base_Headers',
    sorter:[new Sorter('DocumentDate',true)],
    template:this._getTableTemplate(),
    urlParameters:{
       $select: columnNames
    },
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

    _createDialog: async function() {
        
            this._oDialog = await Fragment.load({
                name: "project1.project1.view.fragment.CreateDialog",
                controller: this,
                id:'Dialog'
            }).then(oDialog=>{
            this.getView().addDependent(this.oDialog);
            return oDialog;
          })
    
        this._oDialog.open()
    },
    
    onDialogBeforeOpen(oEvent){
      const oDialog=oEvent.getSource(),
       oParams={
        Version:'A',
      },
      oEntry=this.getModel().createEntry('/zjblessons_base_Headers',{
        properties:oParams
      });
      oDialog.setBindingContext(oEntry)
    },

    onPressCreateDialog(){
        this._createDialog();
    },
      onPressCancel() {
        this.getModel().resetChanges()
          this._oDialog.close(); 
        },
        onPressCreate: function(oEvent) {
          const event=this._oDialog.getBindingContext().getObject();
          const oContext = this._oDialog.getBindingContext();
          const oModel = this.getModel();
      
          const headerID = oModel.getProperty("DocumentNumber", oContext);
          if (!headerID) {
              sap.m.MessageToast.show("Пожалуйста, введите Header ID.");
              return;
          }
      
          oModel.submitChanges({
              success: function() {
                  sap.m.MessageToast.show("Запись успешно создана.");
                  this._oDialog.close();
              }.bind(this),
              error: function(oError) {
                  sap.m.MessageToast.show("Ошибка при создании записи.");
              }
          });
      },
    });
  
  },

);
