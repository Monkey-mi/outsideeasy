Ext.define('srm.supplierFile.store.AccDevicelist', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierFile.model.AccDevicelist'],
	model: 'srm.supplierFile.model.AccDevicelist',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			
				create: 'supplier/devicelist.do?method=addAccDevicelist',
				update: 'supplier/devicelist.do?method=updateAccDevicelist',
				read: 'supplier/devicelist.do?method=getAccDevicelistList',
				destroy: 'supplier/devicelist.do?method=deleteAccDevicelist'
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
