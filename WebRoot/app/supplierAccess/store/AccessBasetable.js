Ext.define('srm.supplierAccess.store.AccessBasetable', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierAccess.model.AccessBasetable'],
	model: 'srm.supplierAccess.model.AccessBasetable',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplierAccess/AccessBasetable.do?method=addAccessBasetable',
			update: 'supplierAccess/AccessBasetable.do?method=updateAccessBasetable',
			read: 'supplierAccess/AccessBasetable.do?method=getAccessBasetableList',
			destroy: 'supplierAccess/AccessBasetable.do?method=deleteAccessBasetable'
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
		property: 'item_id',
		direction: 'ASC'
	}]
});
