Ext.define('srm.role.model.RoleModule', {
	extend: 'Ext.data.Model',
	requires:['srm.module.model.Module',
	          'srm.role.model.Role'],
	idProperty: 'id',
	identifier:'negative',
	fields: [{name:'id', type:'int'},
	         {name:'role_id', type:'int'},
	         {name:'mod_id', type:'int'}
	         
	],
	hasMany:[
	               
	          {
	        	  model:'srm.role.model.Role',
	        	  name:'roles',
	        	  primaryKey:'role_id',
	        	  foreignKey:'role_id'
	          },
	          {
	        	  model:'srm.module.model.Module',
	        	  name:'modules',
	        	  primaryKey:'mod_id',
	        	  foreignKey:'mod_id'
	          }
	]
});