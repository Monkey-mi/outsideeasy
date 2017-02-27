/*筛选查询*/
Ext.define('srm.sysmodule.view.WsIdentityQuery',{
	extend:'srm.ux.Window',
	alias:'widget.wsIdentityQuery',
	iconCls:'page_find',
	title:'筛选条件',
	width:400,
	height:180,
	frame:true,
	modal:true,
	prefix:'t_app_ws_identity.',
	initComponent : function() {
		var me=this;
		Ext.apply(me,{
			layout:'fit',
			items:[{
				xtype:'form',
				frame:true,
				heigth:50,
				layout:'column',
				defaults:{padding:5,xtype:'textfield',labelWidth:60,selectOnFocus:true,
					listeners:{
                    	specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.doQuery();
    	                    }
    	                }
					}},
				items:[
					
					{
						name      : 'checkbox_identify',
						itemId:'checkbox_identify',
                    	xtype 	  :'checkbox',
	                   columnWidth:0.1
					},
					{
						fieldLabel:'身份',
						name:'identify',
						columnWidth:0.9
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_identify').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
						
					}
				],
			
			buttons:[{text:'重置',glyph:0xf112,itemId:'btn_reset',
				handler:function(btn){	
						var form=me.down('form');
						form.form.reset();
						var rec=form.getRecord();
						form.updateRecord(rec);
       	  			}
			},
			'->',{text:'确认',glyph:0xf058,itemId:'btn_confirm',
				handler:me.doQuery
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			]
			}]
		});
		this.callParent(arguments);
		me.down('form').loadRecord(me.rec);
	},
	doQuery:function(){
		Ext.apply(me.mainstore.proxy.extraParams, 
			{
				condition:me.getQueryCondition()
			 }
		);
		me.mainview.loadMain();
		me.close();
	},
	getQueryCondition:function(){
		var me=this;
		var condition=null;
		var form=me.down('form');
		 if (form.getForm().isDirty()){
				var rec=form.getRecord();
				form.updateRecord(rec);
				var obj=rec.getChanges();
				var arr=[];
				for(var x in obj){
						if(!Ext.isEmpty(obj[x]))
						{							
						 	if(x=='identify' && obj['checkbox_identify']){
						 		arr.push(me.prefix+"identify like '%"+obj[x]+"%'");
					 		}
						}
				}
				condition=arr.join(' and ');
			}
			return condition;
	}
});