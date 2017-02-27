Ext.define('srm.supplierAudit.store.CompanyAuthcationHistory', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.supplierAudit.model.CompanyAuthcationHistory'],
	model: 'srm.supplierAudit.model.CompanyAuthcationHistory',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplier/companyAuthcationHistory.do?method=addCompanyAuthcationHistory',
			update: 'supplier/companyAuthcationHistory.do?method=updateCompanyAuthcationHistory',
			read: 'supplier/companyAuthcationHistory.do?method=getCompanyAuthcationHistoryList',
			destroy: 'supplier/companyAuthcationHistory.do?method=deleteCompanyAuthcationHistory'
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
		property: 'auth_history_id',
		direction: 'ASC'
	}]
});
