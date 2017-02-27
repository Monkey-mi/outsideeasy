Ext.define('srm.supplierAccess.store.SupplierAccessUploadImg', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierAccess.model.SupplierAccessUploadImg'],
	model: 'srm.supplierAccess.model.SupplierAccessUploadImg',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplierAccess/SupplierAccessUploadImg.do?method=addSupplierAccessUploadImg',
			update: 'supplierAccess/SupplierAccessUploadImg.do?method=updateSupplierAccessUploadImg',
			read: 'supplierAccess/SupplierAccessUploadImg.do?method=getSupplierAccessUploadImgList',
			destroy: 'supplierAccess/SupplierAccessUploadImg.do?method=deleteSupplierAccessUploadImg'
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
		property: 'id',
		direction: 'ASC'
	}]
});
