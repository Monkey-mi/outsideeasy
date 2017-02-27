Ext.define('srm.role.store.RoleModules', {
	extend: 'Ext.data.Store',
	requires:['srm.role.model.RoleModule'],
	model: 'srm.role.model.RoleModule',
	proxy: {
		type: 'ajax',
		actionMethods : {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		extraParams:{model:'RoleModule'},
		api: {
			create: 'user/Users.do?method=addRoleModule',
			update: 'user/Users.do?method=updateRoleModule',
			read:	'user/Users.do?method=getRoleModuleList',
			destroy:'user/Users.do?method=deleteRoleModule'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			successProperty: 'success',
			messageProperty: 'message'
		},
		writer: {
			type: 'json',
			rootProperty: 'data',    //返回数据可以用post_data=[xxx]的形式包装
			encode: true,
			allowSingle:false  /*即使单行也包装成数组形式，这样后台服务就无需对单行和多行分开解释了*/
		}			
	}
});