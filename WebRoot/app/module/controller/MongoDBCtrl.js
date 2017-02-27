Ext.define('srm.module.controller.MongoDBCtrl', {
    extend: 'Ext.app.Controller',
    views:['srm.module.view.MngMongoFile',
    	'srm.module.view.UploadVideoWin'
    ],
    refs:[
    	{ref:'mngMongoFile',selector:'mngMongoFile'},
    	{ref:'fileGrid',selector:'mngMongoFile #fileGrid'},
    	{ref:'playPanel',selector:'mngMongoFile #playPanel'},
    	{ref:'video_win',selector:'video_win'}
    	//
    	],
    init: function() {
		var me=this;
		if (this.isInited)
			return;
		me.control({
			'mngMongoFile':{
				afterrender:function(cmp){
					me.panel=me.getMngMongoFile();
					me.grid=me.getFileGrid();
					me.grid.getStore().load();
				}
			},
			'mngMongoFile #mongoVideo button':{
				click:function(btn){
					if(btn.itemId=="btnVideo"){
						var win=Ext.widget('video_win');
						win.show();
					}
					
				}
			},
			'mngMongoFile #dataForm  button':{
				click:function(btn){
					if(btn.action=="act_save"){
					var form=btn.up('form');
					if(form.getForm().isValid()){
						console.log(form.getValues());
						Ext.Ajax.request({
							url:'member/SaveData.do',
							method:'post',
							params:{'data':Ext.JSON.encode(form.getValues())},
							success:function(response){
								console.log(response.responseText);
							}
						});}
					}
				}
			},
			'mngMongoFile #fileForm button':{
				click:function(btn){
					console.log(btn);
					if(btn.action=="act_save"){
						var form = btn.up('form').getForm();
			            if(form.isValid()){
			                form.submit({
			                    url: 'fileopt/SaveFile.do',
			                    waitMsg: '文件上传中，请稍后...',
			                    success: function(fp, o) {
			                        Ext.Msg.alert('提示', '文件 "' + o.result.fileName + '" 上传成功.');
			                    }
			                });
			            }
					}
				}
				
			},
			'video_win button':{
				click:function(btn){
					if(btn.itemId=='btnVideoUpload')
					{
						var win=me.getVideo_win();
						var form = win.down('form').getForm();
			            if(form.isValid()){
			            	form.submit({
			                    url: 'fileopt/uploadVideo.do',
			                    waitMsg: '文件上传中，请稍后...',
			                    success: function(fp, o) {
//			                        Ext.Msg.alert('提示', '文件 "' + o.result.fileName + '" 上传成功.');
			                        win.close();
			                        var videofile='flashvars="vcastr_file='+me.panel.server_url+'fileopt/downLoadFileFormMongo.do?filename='+o.result.fileName+'&IsAutoPlay=1"';
					                me.panel.updateVideo(videofile);
					                
			                    }
			                });
			            }
					}
				}
			}
			
		});
		// controller初始化完成
		this.isInited = true;	
	}
});
