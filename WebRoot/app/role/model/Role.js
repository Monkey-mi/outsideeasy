Ext.define('srm.role.model.Role', {
	extend: 'Ext.data.Model',
	idProperty: 'role_id',
	identifier: 'negative',
	fields: [{name:'role_id', type:'int'},
	         {name:'role_name'},
	         {name:'role_desc'},
	         {name:'order_seq',type:'int'},
	         {name:'creator'},
	         {name:'checked',type:'boolean',defaultValue:null},
	         {name:'ou_code'},
	         {name:'has_prj',defaultValue:'false'}
	        ]
	
});