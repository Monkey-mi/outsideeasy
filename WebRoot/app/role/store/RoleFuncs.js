Ext.define('srm.role.store.RoleFuncs', {
	extend: 'Ext.data.Store',
	requires:['srm.role.model.RoleFunc'],
	model: 'srm.role.model.RoleFunc',
	proxy: {
		type: 'ajax',
		actionMethods : {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		extraParams:{model:'RoleFunc'},
		api: {
			create: 'user/Users.do?method=addRoleFunc',
			update: 'user/Users.do?method=updateRoleFunc',
			read:	'user/Users.do?method=getRoleFuncList',
			destroy:'user/Users.do?method=deleteRoleFunc'
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