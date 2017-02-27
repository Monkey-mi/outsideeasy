//供应商档案 数据仓库，专用的，别的地方别调用它
Ext.define('srm.enquiryQuote.enquiry.store.SupplierFile', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplier.model.SupplierFile'],
	model: 'srm.supplier.model.SupplierFile',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
		extraParams:{usePaging:true,history:0},
		api: {
			create: 'supplier/supplierFile.do?method=addSupplierFile',
			update: 'supplier/supplierFile.do?method=updateSupplierFile',
			read: 'supplier/supplierFile.do?method=getSupplierFileList',
			destroy: 'supplier/supplierFile.do?method=deleteSupplierFile'
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
		property: 'company_id',
		direction: 'ASC'
	}]
});
