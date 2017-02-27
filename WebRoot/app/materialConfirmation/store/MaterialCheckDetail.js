Ext.define('srm.materialConfirmation.store.MaterialCheckDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.materialConfirmation.model.MaterialCheckDetail'],
	model: 'srm.materialConfirmation.model.MaterialCheckDetail',
	pageSize: 25,
	
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'materialConfirmation/MaterialCheckDetail.do?method=addMaterialCheckDetail',
			update: 'materialConfirmation/MaterialCheckDetail.do?method=updateMaterialCheckDetail',
			read: 'materialConfirmation/MaterialCheckDetail.do?method=getMaterialCheckDetailList',
			destroy: 'materialConfirmation/MaterialCheckDetail.do?method=deleteMaterialCheckDetail'
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
			writeAllFields:true,
			encode: true,
			allowSingle: false
		}
	},

	sorter: [{
		property: 'check_id',
		direction: 'ASC'
	}]
});
