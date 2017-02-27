Ext.define('srm.user.store.TempUserInfos', {
	extend: 'Ext.data.Store',
	requires:['srm.user.model.UserInfo'],
	model: 'srm.user.model.UserInfo',
	proxy: {
		type: 'ajax',
		actionMethods : {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		api: {
			create: 'user/Users.do?method=addUser',
			update: 'user/Users.do?method=updateUser',
			read:	'user/Users.do?method=getUserList',
			destroy:'user/Users.do?method=deleteUser'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			successProperty: 'success',
			messageProperty: 'message',
			totalProperty:'total'
		},
		writer: {
			type: 'json',
			rootProperty: 'data',    //返回数据可以用post_data=[xxx]的形式包装
			encode: true,
			writeAllFields:true,
			allowSingle:false  /*即使单行也包装成数组形式，这样后台服务就无需对单行和多行分开解释了*/
		}
	},
	sorters: [
      {   
          property: 'name',   
          direction: 'ASC'  
      },
      {   
          property: 'create_dt',   
          direction: 'DESC'  
      }
    ]
});