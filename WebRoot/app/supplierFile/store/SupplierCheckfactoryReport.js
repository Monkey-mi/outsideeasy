Ext.define('srm.supplierFile.store.SupplierCheckfactoryReport', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierFile.model.SupplierCheckfactoryReport'],
	model: 'srm.supplierFile.model.SupplierCheckfactoryReport',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplier/supplierCheckfactoryReport.do?method=addSupplierCheckfactoryReport',
			update: 'supplier/supplierCheckfactoryReport.do?method=updateSupplierCheckfactoryReport',
			read: 'supplier/supplierCheckfactoryReport.do?method=getSupplierCheckfactoryReportList',
			destroy: 'supplier/supplierCheckfactoryReport.do?method=deleteSupplierCheckfactoryReport'
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
