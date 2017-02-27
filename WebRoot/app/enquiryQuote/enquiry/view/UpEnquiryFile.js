Ext.define('srm.enquiryQuote.enquiry.view.UpEnquiryFile',{
	extend:'srm.ux.Window',
	alias : 'widget.upEnquiryFile',
	title:'文件上传',
	modal:true,
	width: 600,
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			layout:{
		     type: 'vbox',//垂直分布
		     pack: 'start',
		     align: 'stretch'
    	},
    	defaults:{padding:5},//默认样式
				items:[{
					xtype:'form',
					itemId:'attchedform',
			        width: 400,
			        bodyPadding: 10,
			        items: [{
			            xtype: 'filefield',
			            name : 'file',//不得修改,不然后台 空
			            itemId:'file',
			            fieldLabel: '选择文件',
			            labelWidth: 70,
			            msgTarget: 'side',
			            emptyText : '请选择文件',  
                        blankText : '文件不能为空', 
			            allowBlank: false,
			            anchor: '90%',
			            buttonText: '选择文件'
			        },{
			        	xtype:'fieldset',
			        	title:'上传须知',
			        	layout : {  
                                type : 'table',  
                                columns : 1 
                            },  
                            collapsible : false,// 是否可折叠  
                            defaultType : 'label',// 默认的Form表单组件  
                            items : [ {  
                                html : '1、上传文件大小不超过10MB.'  
                            }, {  
                              html : '2、支持以下格式的:png,jpg'  
                            }]  
			        }],
			        buttons : [ '->', {  
                            text : '保存',  
                            glyph:0xf0c7,
                            itemId:'btn_save',
                            handler:function(){
                            	var form=me.down('#attchedform');
                            	form.submit({
				                    url : 'common/uploadFile.do',
				                    method:'POST',
				                    timeout : 20,
				                    params: {
				    					partPath:'enquiryFile'
									},
				                    waitMsg : '正在上传文件...',
				                    success : function(form, action) {
				                    	//TODO:新增记录
				                    	if(!Ext.isEmpty(action.result.msg)){
				                    		Ext.Msg.alert("提示", action.result.msg);
				                    		return;
				                    	}
				                    	me.currentrec.set('attched',action.result.file_path);
				                    	me.close();
				                    },
				                    failure : function() {
				                        Ext.Msg.alert("提示", "文件保存失败");
				                        me.close();
				                    }
				                });
                            }
                        }, {  
                            text : '取消',  
                            itemId:'btn_cancel',
                            glyph:0xf057,
                            handler:function(){
                            	me.close();
                            }
                        }, '->' ]  
			}]
		});
		me.callParent(arguments);
	}
});