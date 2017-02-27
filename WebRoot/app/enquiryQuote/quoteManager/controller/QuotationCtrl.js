Ext.define('srm.enquiryQuote.quoteManager.controller.QuotationCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar'
				,'srm.enquiryQuote.quoteManager.store.Quotation'
				,'srm.enquiryQuote.quoteManager.model.QuotationDetail'
				,'srm.enquiryQuote.quoteManager.model.QueryParam'
				],
	views:[	'srm.enquiryQuote.quoteManager.view.QuotationManager'
			,'srm.enquiryQuote.quoteManager.view.QuotationQuery'
		],
	refs:[
		{ref:'quotationManager',selector:'quotationManager'}
			],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'quotationManager':{
				afterrender:function(cmp){
					me.panel=me.getQuotationManager();
					me.grdmain=me.panel.down('#grd_Quotation');
					me.grdstore=me.panel.store;
					me.detailstore=me.panel.detailstore;
					me.panel.loadMain();
					
					me.query_rec=Ext.create('srm.enquiryQuote.quoteManager.model.QueryParam');
				},
				beforedestroy:function(th){
					delete me.grdstore.proxy.extraParams.condition;
					delete me.grdstore.proxy.extraParams.submitFlag;
				}
			},
			
			'quotationManager #grd_Quotation':{
				selectionchange:function(grid,recs){
					if(recs.length>0){
						me.detailstore.load({params:{quotation_id:recs[0].get('quotation_id')}});
						me.setBtnStatus(false);
					}else{
						me.setBtnStatus(true);
					}
				},
				itemdblclick:function(grid,rec){
//					me.doMaintainAction(srm.Const.FUNC_ITEMID_BTN_EDT);
				}
			},
			'quotationManager #function_btn button':{
				click:me.doAction
			}
		});
		me.isInited=true;
	},
	setBtnStatus:function(status){
		var me=this;
	},
	doAction:function(btn){
		var me=this;
		if(!me.panel.can_use_btn){
			Ext.Msg.alert('提示',"编辑状态不可操作");
			return;
		}
		switch (btn.itemId){
			case 'btn_query':
				var win=Ext.widget('quotationQuery',{
					itemId:'quotationQuery',
					mainstore:me.grdstore,
					mainview:me.panel,
					rec:me.query_rec
				});
				win.show();
				break;
			case 'btn_close':
				me.panel.close();	
				break;
		}
	},

	//检查状态位前后台一致, true通过；false 不通过
	checkStatusSame:function(sel_recs,idarray,statusarray){
		var me=this;
		var json=srm.Const.callServiceMethodSync('quote/quotation.do?method=checkStatusSame',{
			idarray:idarray.join(','),
			statusarray:statusarray.join(',')
		});
		json=Ext.decode(json);
		if(json.result==0){
			me.grdstore.relaod();
			Ext.Msg.alert('提示','数据不一致，请重新尝试');
			return false;
		}
		var status=sel_recs[0].get('enquiry_status');
		for(var i=0;i<sel_recs.length;i++){
			var temp_status=sel_recs[i].get('enquiry_status');
			if(status!=temp_status){
				Ext.Msg.alert('提示','所选记录的状态位存在不一致');
				return false;
			}
		}
		return true;
	},
	
	//完成标记
	dofinishAction:function(){
		var me=this;
		var sel_recs = me.grdmain.getSelectionModel().getSelection();
		if(sel_recs.length==0){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		var idarray=[];
		var statusarray=[];
		for(var i=0;i<sel_recs.length;i++){
			idarray.push(sel_recs[i].get('enquiry_id'));
			statusarray.push(sel_recs[i].get('enquiry_status'));
		}
		var result=me.checkStatusSame(sel_recs,idarray,statusarray);
		if(!result){
			return;
		}
		
		var status=sel_recs[0].get('enquiry_status');
		var alertmsg="";
		if(status==1){
			alertmsg="是否完成所选记录?";
		}else if(status==2){
			alertmsg="是否取消完成所选记录?";
		}else{
			Ext.Msg.alert('提示','操作无效');
			return;
		}
				
		Ext.Msg.confirm("提示",alertmsg,function(btn){
			if (btn=="yes")
			{	
				srm.Const.callServiceMethodSync('enquiry/enquiry.do?method=updateStatus',{
					idarray:idarray.join(','),
					enquiry_date:new Date(),
					enquiry_person:srm.Util.currentUser.userInfo.name,
					enquiry_status:(status==1?2:1)
				});
				me.grdstore.reload();	
			}//if (btn=="yes")
		});
	}
});