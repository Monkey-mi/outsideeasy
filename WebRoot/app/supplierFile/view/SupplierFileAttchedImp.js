Ext.define('srm.supplierFile.view.SupplierFileAttchedImp',{
	extend:'srm.ux.Window',
	alias:'widget.SupplierFileAttchedImp',
	modal:true,
	autoScroll :'true',
	height:300,
	width:500,
	requires:[
	],

	initComponent:function(){
		var  me=this;
		me.fileTypeStore=Ext.create('srm.basicdata.file.store.MngBaseFileType');
		me.fileTypeStore.proxy.extraParams.isQualification=true;
		me.fileTypeStore.load();
		Ext.apply(me,{
			layout:{type:'vbox',align:'stretch'},
			defaults:{xtype:'container',padding:'5'},
			items:[{
				xtype:'form',
				itemId:'upLoadForm',
				
				items:[{
					itemId:'file_type_id',
					name:'file_type_id',
					fieldLabel:'文件类型',
					
					xtype:'combo',
					store :me.fileTypeStore,
					displayField:'type_name',
					valueField:'ft_id',
					forceSelection:true,
					columnWidth:1
				},{
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
					height:120,
					anchor: '95%',
					title:'<span style="color:red">上传须知</span>',
					items:[{
						html:'<div style="color:#000000;padding-top:8px;">1、上传文件大小不超过5MB<br />2、除公司附件外请上传图片格式<br />'
							+'3、公司附件请上传文档格式<br />4、厂容厂貌、专利、企业其他资源图片、公司附件资料可以上传多张<br />5、其他的文件只能上传一张，再次上传将覆盖之前的</div>'
					}]}],
				 buttons: [{
        			text: '上传',
        			glyph:0xf093,
        			itemId:'btn_upload',
        			handler: function() {
            			var form = this.up('form').getForm();
            			var file_type_id=me.down('#file_type_id').getValue();
            			var fileName=me.down('#file').getValue();
            			if(me.supplier_id<0 || me.supplier_id==null)
						{
							Ext.Msg.alert("提示", "请先添加并保存供应商基本信息");
				            return;
						}else if(file_type_id==null){
							Ext.Msg.alert("提示", "请选择要上传的文件类型");
				            return;
						}
            			var formatType="image";
            			if(file_type_id==30){
            				formatType="text";
            			}
           		    	if(form.isValid()){
           		    		
                			form.submit({
                    		url: 'supplier/upQualificationAttchedFile.do',
                    		method:'POST',
				                    timeout : 20,
				                    params: {
				                    	file_type_id:file_type_id,
				                    	supplier_id:me.supplier_id,
				                    	fileName:fileName,
				                    	formatType:formatType
									},
				                    waitMsg : '正在上传文件...',
				                    success : function(form, action) {
				                    	if(!Ext.isEmpty(action.result.message)){
				                    		Ext.Msg.alert("提示", action.result.message);
				                    	}
				                    	me.store.reload();
				                    	me.close();
				                    },
				                    failure : function(form, action) {
				                    	if(!Ext.isEmpty(action.result.message)){
				                    		Ext.Msg.alert("提示", action.result.message);
				                    	}
				                        me.close();
				                    }
                    
                });
            }
        }
    }]
			}]
		
		});
		this.callParent(arguments);
	}
});