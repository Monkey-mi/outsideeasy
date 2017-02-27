Ext.define('srm.mngOrderManager.store.MngOrderAgreementFile', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.mngOrderManager.model.MngOrderAgreementFile'],
	model: 'srm.mngOrderManager.model.MngOrderAgreementFile',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
        extraParams:{
			usePaging:true
		},
		api: {
			create: 'mngPurchaseOrder/mngOrderAgreementFile.do?method=addMngOrderAgreementFile',
			update: 'mngPurchaseOrder/mngOrderAgreementFile.do?method=updateMngOrderAgreementFile',
			read: 'mngPurchaseOrder/mngOrderAgreementFile.do?method=getMngOrderAgreementFileList',
			destroy: 'mngPurchaseOrder/mngOrderAgreementFile.do?method=deleteMngOrderAgreementFile'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		},
		writer: {
			type: 'json',
			rootProperty: 'data',
			encode: true,
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorter: [{
		property: 'agreement_id',
		direction: 'ASC'
	}]
});
