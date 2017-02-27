Ext.define('srm.module.view.UploadVideoWin',{
	extend:'Ext.window.Window',
	alias:'widget.video_win',
	width:400,
	height:150,
	title:'视频文件上传',
	buttons:[{text:'上传',itemId:'btnVideoUpload'},{text:'关闭',handler:function(btn){btn.up('window').close();}}],
	initComponent:function(){
	 	this.items=[{
	 		xtype:'form',
	 		padding:5,
	 		border:false,
	 		items:[{
	 		  xtype:'filefield',
	 		  name: 'file',
			  fieldLabel: '文件名称',
			  msgTarget: 'side',
			  allowBlank: false,
			  anchor: '100%',
		      buttonText: '选择文件...'
	 		},{
	 			border:false,
	 			html:'请上传MP4、AVI、FLV等视频文件格式'
	 		}]
	 	}];
	 	this.callParent();
	}
});

