Ext.define('srm.platformdata.mngIp.store.IpAddress', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.platformdata.mngIp.model.IpAddress'],
	model: 'srm.platformdata.mngIp.model.IpAddress',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
        extraParams:{
			usePaging:true
		},
		api: {
			create: 'ipaddress/ipmanagerbg.do?method=addIpAddress',
			update: 'ipaddress/ipmanagerbg.do?method=updateIpAddress',
			read: 'ipaddress/ipmanagerbg.do?method=getIpAddressList',
			destroy: 'ipaddress/ipmanagerbg.do?method=updateStateIpAddress'
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
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorter: [{
		property: 'adress_id',
		direction: 'ASC'
	}]
});
