Ext.define('srm.platformdata.dictionary.model.DictionaryInfo', {
	extend: 'srm.basic.model.Model',
	identifier:'negative',
	idProperty:'id',
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'dictionary_key' },
		{ name: 'dictionary_value' }
	]
});
