Ext.define('srm.materialConfirmation.store.MaterialCheckclass', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.materialConfirmation.model.MaterialCheckclass'],
	model: 'srm.materialConfirmation.model.MaterialCheckclass',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'materialConfirmation/MaterialCheckclass.do?method=addMaterialCheckclass',
			update: 'materialConfirmation/MaterialCheckclass.do?method=updateMaterialCheckclass',
			read: 'materialConfirmation/MaterialCheckclass.do?method=getMaterialCheckclassList',
			destroy: 'materialConfirmation/MaterialCheckclass.do?method=deleteMaterialCheckclass'
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
		property: 'checkclass_id',
		direction: 'ASC'
	}]
});
