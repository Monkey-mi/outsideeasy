/*筛选查询*/
Ext.define('srm.enquiryQuote.enquiry.view.EnquiryQuery',{
	extend:'srm.ux.Window',
	alias:'widget.enquiryQuery',
	iconCls:'page_find',
	title:'询价单筛选条件',
	width:400,
	height:180,
	frame:true,
	modal:true,
	prefix:'t_app_enquiry.',
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
						name      : 'checkbox_enquiry_id',
						itemId:'checkbox_enquiry_id',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'编号',
						name:'enquiry_id1',
						columnWidth:0.45,
						listeners:{
							'change':function(obj,value){
							  	me.down('#enquiry_id2').setValue(value);
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_enquiry_id').setValue(true);
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
						itemId:'enquiry_id2',
						name:'enquiry_id2',
						fieldLabel : '至',
						labelWidth:20,
						columnWidth:0.45,
						listeners:{
	                    	specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.doQuery();
	    	                    }
	    	                }
						}
					},
					{
						name      : 'checkbox_enquiry_item',
						itemId:'checkbox_enquiry_item',
                    	xtype 	  :'checkbox',
	                   columnWidth:0.1
					},
					{
						fieldLabel:'询价项目',
						name:'enquiry_item',
						columnWidth:0.9
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_enquiry_item').setValue(true);
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
						name      : 'checkbox_enquiry_date',
						itemId:'checkbox_enquiry_date',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'询价日期',
						name:'enquiry_date1',
						xtype:'datefield',
						columnWidth:.45
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_enquiry_date').setValue(true);
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
						name:'enquiry_date2',
						labelWidth:20,
						xtype:'datefield',
						columnWidth:.45
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
						 	if(x=='enquiry_id1' && obj['checkbox_enquiry_id']){
						 		arr.push(me.prefix+"enquiry_id >= '"+obj[x]+"' ");
					 		}else if(x=='enquiry_id2' && obj['checkbox_enquiry_id']){
					 			arr.push(me.prefix+"enquiry_id <= '"+obj[x]+"' ");
					 		}else if(x=='enquiry_item' && obj['checkbox_enquiry_item']){
						 		arr.push(me.prefix+"enquiry_item like '%"+obj[x]+"%'");
					 		}else if(x=='enquiry_date1' && obj['checkbox_enquiry_date']){
						 		arr.push(me.prefix+"enquiry_date >= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
					 		}else if(x=='enquiry_date2' && obj['checkbox_enquiry_date']){
					 			arr.push(me.prefix+"enquiry_date <= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
						 	}
						}
				}
				condition=arr.join(' and ');
			}
			return condition;
	}
});