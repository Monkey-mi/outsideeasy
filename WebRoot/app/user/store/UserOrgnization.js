Ext.define('srm.user.store.UserOrgnization', {
	extend: 'Ext.data.Store',
	requires:['srm.user.model.UserOrgnization'],
	model: 'srm.user.model.UserOrgnization',
	proxy: {
		type: 'ajax',
		actionMethods : {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		api: {read:	'user/Users.do?method=getAllOrgnization'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			successProperty: 'success',
			messageProperty: 'message',
			totalProperty:'total'
		}
	},
	sorters: [
      {   
          property: 'create_dt',   
          direction: 'ASC'  
      }
    ]
    
});