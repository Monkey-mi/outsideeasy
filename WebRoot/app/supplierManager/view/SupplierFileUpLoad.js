Ext.define('srm.supplierManager.view.SupplierFileUpLoad',{
	extend:'srm.ux.Window',
	alias:'widget.supplierFileUpLoad',
	title:'文件上传',
	modal:true,
	width: 500,
	
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			layout:{type:'vbox',align:'stretch'},
			defaults:{xtype:'container',padding:'5'},
			items:[{
				xtype:'form',
				itemId:'upLoadForm',
				
				items:[{
					xtype:'filefield',
					name:'file',
					itemId:'file',
					fileLabel:'选项文件',
					labelWidth: 70,
			        msgTarget: 'side',
			        emptyText : '请选择文件',  
                    blankText : '请选择上传文件', 
			        allowBlank: false,
			        anchor: '95%',
			        buttonText: '选择文件'
				},{//上传须知
					xtype:'fieldset',
					height:70,
					anchor: '95%',
					title:'<span style="color:red">上传须知</span>',
					items:[{
						html:'<div style="color:#000000;padding-top:8px;">1、上传文件大小不超过10MB<br />2、营业执照、税务登记证、组织结构代码证请上传图片格式</div>'
					}]}],
				 buttons: [{
        			text: '上传',
        			glyph:0xf093,
        			itemId:'btn_upload',
        			handler: function() {
            			var form = this.up('form').getForm();
           		    	if(form.isValid()){
           		    		
                			form.submit({
                    		url: 'supplier/upAttchedFile.do',
                    		method:'POST',
				                    timeout : 20,
				                    params: {
				    					company_id:me.company_id,
				    					file_name:me.currentrec.get('file_name'),
				    					partPath:'register',
				    					isimg:me.isimg
				    					
									},
				                    waitMsg : '正在上传文件...',
				                    success : function(form, action) {
				                    	//TODO:新增记录
				                    	if(!Ext.isEmpty(action.result.msg)){
				                    		Ext.Msg.alert("提示", action.result.msg);
				                    		return;
				                    	}
				                    	
				                    	me.currentrec.set('file_path',action.result.file_path);
				                    	if(!Ext.isEmpty(me.registerAttchedStore))
				                    	{
				                    	me.registerAttchedStore.sync({
			 								success:function(){
			 								me.registerAttchedStore.load({params:{company_id:me.company_id,iscustom:0}});
			 								}
			 								,failure : function(batch, options) {
													Ext.Msg.alert('提示', '上传保存失败!');
													return;
												}
			 								
			 								});
				                    	}
				                    	if(!Ext.isEmpty(me.customAttchedStore))
				                    	{
				                    	me.customAttchedStore.sync({
			 								success:function(){
			 								me.customAttchedStore.load({params:{company_id:me.company_id,iscustom:1}});
			 								}
			 								,failure : function(batch, options) {
													Ext.Msg.alert('提示', '自定义上传保存失败!');
													return;
												}
			 								
			 								});
				                    	}
				                    	me.close();
				                    },
				                    failure : function() {
				                        Ext.Msg.alert("提示", "文件保存失败");
				                        me.close();
				                    }
                    
                });
            }
        }
    }]
			}]
		});
		me.callParent(arguments);}
});