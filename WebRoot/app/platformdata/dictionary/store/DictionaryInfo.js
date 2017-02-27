Ext.define('srm.platformdata.dictionary.store.DictionaryInfo', {
	extend: 'Ext.data.Store',
	reqiures: ['srm.platformdata.dictionary.model.DictionaryInfo'],
	model: 'srm.platformdata.dictionary.model.DictionaryInfo',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
		api: {
			create: 'DictionaryInfo/mngAccessTempletbg.do?method=addDictionaryInfo',
			update: 'DictionaryInfo/mngAccessTempletbg.do?method=updateDictionaryInfo',
			read: 'DictionaryInfo/mngAccessTempletbg.do?method=getDictionaryInfoList',
			destroy: 'DictionaryInfo/mngAccessTempletbg.do?method=deleteDictionaryInfo'
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
		property: 'id',
		direction: 'ASC'
	}]
});
