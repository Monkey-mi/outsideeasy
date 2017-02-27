Ext.define('srm.module.store.FileInfos',{
	extend:'Ext.data.Store',
	requires:['srm.module.model.FileInfo'],
	model:'srm.module.model.FileInfo',
	proxy:{
		type: 'ajax',
        actionMethods : {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		api:{
			read:"fileopt/getFileList.do"
		},
		reader:{
			type:"json",
			root:'data',
			successProperty:'success',
			messageProperty:'message'
		},
		writer: {
			type: 'json',
			rootProperty: 'data',    //提交数据可以用{data:[xxx]}的形式包装
			encode: true,    //数据经过encode后提交,形式为post_data=XXXXX
			writeAllFields:true,                 //后台需要用post_data为参数名提取后再解释为JSON
			allowSingle:false  /*即使单行也包装成数组形式，这样后台服务就无需对单行和多行分开解释了*/
		}
	}
});