//供应商档案信息表model
Ext.define('srm.supplierFile.store.OwnerCompany', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierFile.model.SupplierFile'],
	model: 'srm.supplierFile.model.SupplierFile',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		extraParams:{usePaging:true},
		api: {
			
				read: 'supplier/supplierFile.do?method=getOwnerCompanyList'
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
		property: 'company_id',
		direction: 'ASC'
	}]
});
