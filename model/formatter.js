sap.ui.define([], function () {
  "use strict";
  return {
    formatDate: function (oDate) {
      if (!oDate) return "";
      return sap.ui.core.format.DateFormat.getInstance({
        pattern: "short",
      }).format(new Date(oDate));
    },

    formatCreated: function (oDate) {
      if (!oDate) return "";
      return sap.ui.core.format.DateFormat.getInstance({
        pattern: "HH:mm dd/MM/yyyy",
      }).format(new Date(oDate));
    },

    numberUnit: function (sValue) {
      if (!sValue) {
        return "";
      }
      return parseFloat(sValue).toFixed(2);
    },
  };
});
