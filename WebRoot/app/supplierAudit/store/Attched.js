Ext.define('srm.supplierAudit.store.Attched', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierAudit.model.Attched'],
	model: 'srm.supplierAudit.model.Attched',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplier/attched.do?method=addAttched',
			update: 'supplier/attched.do?method=updateAttched',
			read: 'supplier/attched.do?method=getAttchedList',
			destroy: 'supplier/attched.do?method=deleteAttched'
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
		property: 'id',
		direction: 'ASC'
	}]
});
