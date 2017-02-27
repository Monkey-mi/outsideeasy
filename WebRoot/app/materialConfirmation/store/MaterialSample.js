Ext.define('srm.materialConfirmation.store.MaterialSample', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.materialConfirmation.model.MaterialSample'],
	model: 'srm.materialConfirmation.model.MaterialSample',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'materialConfirmation/MaterialSample.do?method=addMaterialSample',
			update: 'materialConfirmation/MaterialSample.do?method=updateMaterialSample',
			read: 'materialConfirmation/MaterialSample.do?method=getMaterialSampleList',
			destroy: 'materialConfirmation/MaterialSample.do?method=deleteMaterialSample'
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
		property: 'sample_id',
		direction: 'ASC'
	}]
});
