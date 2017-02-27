
Ext.define('srm.templet.store.MngContrlist', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.templet.model.MngTempletElemnetControllType'],
	model: 'srm.templet.model.MngTempletElemnetControllType',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: { read: 'POST'},
		extraParams:{usePaging:true,history:0},
		api: {		
			read: 'mngTempletElemnetControllType/mngTempletElemnetControllTypebg.do?method=getelTypeList'		
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
		
	}]
});