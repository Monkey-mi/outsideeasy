Ext.define('srm.role.model.RoleFunc', {
	extend: 'Ext.data.Model',
	requires:['srm.module.model.Function',
	          'srm.role.model.Role'],
	idProperty: 'id',
	identifier:'negative',
	fields: [{name:'id', type:'int'},
	         {name:'role_id', type:'int'},
	         {name:'f_id', type:'int'}
	],
	hasMany:[
	          {
	        	  model:'srm.role.model.Role',
	        	  name:'roles',
	        	  primaryKey:'role_id',
	        	  foreignKey:'role_id'
	          },
	          {
	        	  model:'srm.module.model.Function',
	        	  name:'funcs',
	        	  primaryKey:'f_id',
	        	  foreignKey:'f_id'
	          }
	]
});