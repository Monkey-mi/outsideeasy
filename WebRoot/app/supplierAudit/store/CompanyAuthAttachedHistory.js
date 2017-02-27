Ext.define('srm.supplierAudit.store.CompanyAuthAttachedHistory', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierAudit.model.CompanyAuthAttachedHistory'],
	model: 'srm.supplierAudit.model.CompanyAuthAttachedHistory',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplier/companyAuthAttachedHistory.do?method=addCompanyAuthAttachedHistory',
			update: 'supplier/companyAuthAttachedHistory.do?method=updateCompanyAuthAttachedHistory',
			read: 'supplier/companyAuthAttachedHistory.do?method=getCompanyAuthAttachedHistoryList',
			destroy: 'supplier/companyAuthAttachedHistory.do?method=deleteCompanyAuthAttachedHistory'
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
		property: 'attached_id',
		direction: 'ASC'
	}]
});
