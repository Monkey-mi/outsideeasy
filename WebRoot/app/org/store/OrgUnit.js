Ext.define('srm.org.store.OrgUnit', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.org.model.OrgUnit'],
	model: 'srm.org.model.OrgUnit',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		api: {
			create: 'org/OrgUnit.do?method=addOrgUnit',
			update: 'org/OrgUnit.do?method=updateOrgUnit',
			read: 'org/OrgUnit.do?method=getOrgUnitList',
			destroy: 'org/OrgUnit.do?method=deleteOrgUnit'
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
			allowSingle: false
		}
	},
	sorter: [{
		property: 'ou_id',
		direction: 'ASC'
	}]
});
