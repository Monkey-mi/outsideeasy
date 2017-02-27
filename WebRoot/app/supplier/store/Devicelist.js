Ext.define('srm.supplier.store.Devicelist', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplier.model.Devicelist'],
	model: 'srm.supplier.model.Devicelist',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
		api: {
			create: 'supplier/devicelist.do?method=addDevicelist',
			update: 'supplier/devicelist.do?method=updateDevicelist',
			read: 'supplier/devicelist.do?method=getDevicelistList',
			destroy: 'supplier/devicelist.do?method=deleteDevicelist'
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
	sorters: [{
		property: 'device_id',
		direction: 'DESC'
	}]
});
