Ext.define('srm.mes.mngtaskManager.view.ReplaceTaskFile',{
	extend:'srm.ux.Window',
	alias:'widget.ReplaceTaskFile',
	modal:true,
	autoScroll :'true',
	height:230,
	width:500,
	requires:[
	],

	initComponent:function(){
		var  me=this;
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
                    blankText : '请选择替换文件', 
			        allowBlank: false,
			        anchor: '95%',
			        buttonText: '选择文件'
				},{//上传须知
					xtype:'fieldset',
					height:70,
					anchor: '95%',
					title:'<span style="color:red">上传须知</span>',
					items:[{
						html:'<div style="color:#000000;padding-top:8px;">1、上传文件大小不超过5MB</div>'
					}]}],
				 buttons: [{
        			text: '上传',
        			glyph:0xf093,
        			itemId:'btn_replace',
        			handler: function() {
            			var form = this.up('form').getForm();
           		    	if(form.isValid()){
           		    		
                			form.submit({
                    		url: 'taskFile/replaceTaskFile.do',
                    		method:'POST',
				                    timeout : 20,
				                    params: {
				                    	mogodbId:me.mogodbId
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