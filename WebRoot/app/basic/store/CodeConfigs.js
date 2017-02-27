/**
 * 基础数据帮助配置
 */
Ext.define('srm.basic.store.CodeConfigs',{
	extend:'Ext.data.Store',
	model:'srm.basic.model.CodeConfig',
	proxy:{
		type:'ajax',
		actionMethods : {  
                        create : 'POST',  
                        read : 'POST',  
                        update : 'POST',  
                        destroy : 'POST'  
                    }, 
		extraParams:{
			usePaging: false
		},
		api:{
			create:'base/Codes.do?method=addCodeConfig',
			update:'base/Codes.do?method=updateCodeConfig',
			read:'base/Codes.do?method=getCodeConfigList',
			destroy:'base/Codes.do?method=deleteCodeConfig'
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
	}
});