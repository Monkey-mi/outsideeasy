Ext.define('srm.basic.store.Codes',{
	extend: 'Ext.data.Store',
	requires:['srm.basic.model.Code'],
	model: 'srm.basic.model.Code',
	pageSize: 30,
    proxy: {
        type: 'ajax',
        actionMethods : {  
                        create : 'POST',  
                        read : 'POST',  
                        update : 'POST',  
                        destroy : 'POST'  
                    }, 
        api: {
			create: 'base/Codes.do?method=addCode',
			update: 'base/Codes.do?method=updateCode',
			read:	'base/Codes.do?method=getCodeList',
			destroy:'base/Codes.do?method=deleteCode'
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
			writeAllFields:true,
			encode: true,
			allowSingle: false
		}
    },
    sorters:[{
		        property: 'type_code',   
		        direction: 'ASC'  
			},
			{
		        property: 'order_seq',   
		        direction: 'ASC'  
			},
			{
		        property: 'code',   
		        direction: 'ASC'  
			}
	]
});