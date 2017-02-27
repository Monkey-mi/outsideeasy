Ext.define('srm.module.view.MogodbQuery',{
	extend:'srm.ux.Window',
	alias:'widget.MogodbQuery',
	iconCls:'page_find',
	title:'mogodb文件筛选条件',
	width:400,
	height:500,
	frame:true,
	modal:true,
	initComponent : function() {
		var me=this;
		me.useType=Ext.create('srm.basicdata.file.store.MngBaseFileType');
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
				//全部记录
					{
						boxLabel: '全部记录',
						name: 'checkbox_qbjl',
						inputValue: '1',
						padding: '0 0 0 5',
						itemId: 'checkbox_qbjl',
						xtype: 'checkbox',
						columnWidth: 1,
						listeners: {
							change: function(form, newValue, oldValue, eOpts) {
								if (newValue == true) {
									me.down('#checkbox_useType').setValue(false);
									me.down('#checkbox_uploadDate').setValue(false);
									me.down('#checkbox_isimg').setValue(false);
									me.down('#checkbox_comName').setValue(false);
									me.down('#checkbox_comId').setValue(false);
									me.down('#checkbox_userName').setValue(false);
									me.down('#checkbox_filename').setValue(false);
									me.down('#checkbox_rwdh').setValue(false);
								}
							}
						}
					},
					{
						name      : 'checkbox_useType',
						itemId:'checkbox_useType',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'使用类别',
						name:'useType',
						columnWidth:0.9,
						xtype: 'combo',
						store: me.useType,
						displayField: 'type_name',
						valueField: 'ft_id',
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_useType').setValue(true);
							  	}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						name      : 'checkbox_uploadDate',
						itemId:'checkbox_uploadDate',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'上传日期',
						name:'uploadDate1',
						xtype:'datefield',
						columnWidth:.45
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_uploadDate').setValue(true);
								}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						fieldLabel:'至',
						name:'uploadDate2',
						labelWidth:20,
						xtype:'datefield',
						columnWidth:.45
					},
					{
						name      : 'checkbox_isimg',
						itemId:'checkbox_isimg',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'是否图片',
	                    columnWidth:0.9,
						xtype:'fieldcontainer',
						defaultType: 'radiofield',
						defaults: {
			                flex: 1
			            },
			            layout: {
			                type: 'hbox',
			                align: 'stretch'
			            },
						items:[{
			                checked:true,
			                name:'isimg',
			                boxLabel:'是',
			                inputValue:1
			                },{
			                columnWidth:.45,
			                name:'isimg',
			                boxLabel:'否',
			                inputValue:0
			                }],
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_isimg').setValue(true);
							  	}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						name      : 'checkbox_comName',
						itemId:'checkbox_comName',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'公司名称',
						name:'comName',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_comName').setValue(true);
							  	}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						name      : 'checkbox_comId',
						itemId:'checkbox_comId',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'公司ID',
						name:'comId',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_comId').setValue(true);
							  	}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						name      : 'checkbox_userName',
						itemId:'checkbox_userName',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'上传者',
						name:'userName',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_userName').setValue(true);
							  	}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						name      : 'checkbox_filename',
						itemId:'checkbox_filename',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'文件名',
						name:'filename',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_filename').setValue(true);
							  	}
							},
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						name      : 'checkbox_rwdh',
						itemId:'checkbox_rwdh',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'任务单号',
						name:'rwdh',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_rwdh').setValue(true);
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
		var condition=me.getQueryCondition();
		if(condition!=undefined){
			Ext.apply(me.mainstore.proxy.extraParams, 
					{			    
						isimg:condition.isimg,
						comName:condition.comName,
						useType:condition.useType,
						comID:condition.comID,
						userName:condition.userName,
						uploadDate1:condition.uploadDate1,
						uploadDate2:condition.uploadDate2,
						aliases:condition.filename,
						rwdh:condition.rwdh
					 }
				);
		}
		me.mainstore.load();
		me.close();
	},
	getQueryCondition:function(){
		var me=this;
		var condition={};
		var form=me.down('form');
		 if (form.getForm().isDirty()){
				var rec=form.getRecord();
				form.updateRecord(rec);
				var obj=rec.getChanges();
				var arr=[];
				for(var x in obj){
						if(!Ext.isEmpty(obj[x]))
						{		
						 	if(x=='isimg' && obj['checkbox_isimg']){
						 		condition.isimg=obj[x];
					 		}else if(x=='useType' && obj['checkbox_useType']){
					 			condition.useType=obj[x];
					 		}else if(x=='comName' && obj['checkbox_comName']){
					 			condition.comName=obj[x];
						 	}else if(x=='uploadDate1' && obj['checkbox_uploadDate']){
						 		condition.uploadDate1=obj[x];
					 		}else if(x=='uploadDate2' && obj['checkbox_uploadDate']){
					 			condition.uploadDate2=obj[x];
						 	}else if(x=='comId' && obj['checkbox_comId']){
						 		condition.comID=obj[x];
						 	}else if(x=='userName' && obj['checkbox_userName']){
						 		condition.userName=obj[x];
						 	}else if(x=='filename' && obj['checkbox_filename']){
						 		condition.filename=obj[x];
						 	}else if(x=='rwdh' && obj['checkbox_rwdh']){
						 		condition.rwdh=obj[x];
						 	}
				}
			}
			return condition;
	}
}});