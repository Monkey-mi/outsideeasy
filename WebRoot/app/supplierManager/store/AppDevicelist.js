Ext.define('srm.supplierManager.store.AppDevicelist', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierManager.model.AppDevicelist'],
	model: 'srm.supplierManager.model.AppDevicelist',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
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
			encode: true,
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorter: [{
		property: 'device_id',
		direction: 'ASC'
	}]
});
