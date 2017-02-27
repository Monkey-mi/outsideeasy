Ext.define('srm.materialConfirmation.store.MaterialConfirmation', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.materialConfirmation.model.MaterialConfirmation'],
	model: 'srm.materialConfirmation.model.MaterialConfirmation',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'materialConfirmation/MaterialConfirmation.do?method=addMaterialConfirmation',
			update: 'materialConfirmation/MaterialConfirmation.do?method=updateMaterialConfirmation',
			read: 'materialConfirmation/MaterialConfirmation.do?method=getMaterialConfirmationList',
			destroy: 'materialConfirmation/MaterialConfirmation.do?method=deleteMaterialConfirmation'
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
		property: 'confirmation_id',
		direction: 'ASC'
	}]
});
