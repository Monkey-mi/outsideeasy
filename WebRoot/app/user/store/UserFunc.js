Ext.define('srm.user.store.UserFunc',{
    extend:'Ext.data.Store',
    model:'srm.user.model.UserFunc',
    proxy:{
    	type: 'ajax',
		actionMethods :{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		extraParams:{
			usePaging:true
		},
		api: {
			create: 'user/Users.do?method=addUserFunc',
			update: 'user/Users.do?method=updateUserFunc',
			read:	'user/Users.do?method=getUserFuncList',
			destroy:'user/Users.do?method=deleteUserFunc'
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
			writeAllFields:true,
			allowSingle:false  /*即使单行也包装成数组形式，这样后台服务就无需对单行和多行分开解释了*/
		}
    }
});