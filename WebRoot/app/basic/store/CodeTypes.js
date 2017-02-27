
Ext.define('srm.basic.store.CodeTypes', {
			extend : 'Ext.data.Store',
			storeId:'codeTypeId',
			requires : ['srm.basic.model.CodeType'],
			model : 'srm.basic.model.CodeType',
			autoLoad : false,
			pageSize : 30,
			proxy : {
				type : 'ajax',
				actionMethods : {  
                        create : 'POST',  
                        read : 'POST',  
                        update : 'POST',  
                        destroy : 'POST'  
                    },  
				api : {
					create : 'base/Codes.do?method=addCodeType',
					update : 'base/Codes.do?method=updateCodeType',
					read : 'base/Codes.do?method=getCodeTypeList',
					destroy : 'base/Codes.do?method=deleteCodeType'
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