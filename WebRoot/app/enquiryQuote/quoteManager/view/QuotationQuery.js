/*筛选查询*/
Ext.define('srm.enquiryQuote.quoteManager.view.QuotationQuery',{
	extend:'srm.ux.Window',
	alias:'widget.quotationQuery',
	iconCls:'page_find',
	title:'询价单筛选条件',
	width:400,
	height:180,
	frame:true,
	modal:true,
	prefix:'t_app_quotation.',
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
						name      : 'checkbox_quotation_id',
						itemId:'checkbox_quotation_id',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'编号',
						name:'quotation_id',
						columnWidth:0.9,
						listeners:{
							'change':function(obj,value){
							  	if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_quotation_id').setValue(true);
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
						name      : 'checkbox_cpyname_cn',
						itemId:'checkbox_cpyname_cn',
                    	xtype 	  :'checkbox',
	                   columnWidth:0.1
					},
					{
						fieldLabel:'公司名',
						name:'cpyname_cn',
						columnWidth:0.9
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_cpyname_cn').setValue(true);
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
						name      : 'checkbox_quote_date',
						itemId:'checkbox_quote_date',
                    	xtype 	  :'checkbox',
	                    columnWidth:0.1
					},
					{
						fieldLabel:'报价日期',
						name:'quote_date1',
						xtype:'datefield',
						columnWidth:.45
						,listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							  		me.down('#checkbox_quote_date').setValue(true);
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
						name:'quote_date2',
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
						 	if(x=='quotation_id' && obj['checkbox_quotation_id']){
						 		arr.push(me.prefix+"quotation_id = '"+obj[x]+"' ");
					 		}else if(x=='cpyname_cn' && obj['checkbox_cpyname_cn']){
						 		arr.push(me.prefix+"cpyname_cn like '%"+obj[x]+"%'");
					 		}else if(x=='quote_date1' && obj['checkbox_quote_date']){
						 		arr.push(me.prefix+"quote_date >= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
					 		}else if(x=='quote_date2' && obj['checkbox_quote_date']){
					 			arr.push(me.prefix+"quote_date <= '"+Ext.Date.format(obj[x],'Y-m-d')+"' ");
						 	}
						}
				}
				condition=arr.join(' and ');
			}
			return condition;
	}
});