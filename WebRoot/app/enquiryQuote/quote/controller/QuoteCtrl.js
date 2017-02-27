Ext.define('srm.enquiryQuote.quote.controller.QuoteCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',
				'srm.enquiryQuote.quote.store.Enquiry',
				'srm.supplier.store.MaterialClass',
				'srm.enquiryQuote.quote.store.EnquiryDetail',
				'srm.enquiryQuote.quote.store.Quotation',
				'srm.enquiryQuote.quote.store.QuotationDetail'
				],
	views : [
				'srm.enquiryQuote.quote.view.QuoteManager'
			],
	refs : [
			{ref : 'quoteManager',selector : 'quoteManager'}
			
	],

	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited){
			return;
		}
		me.control({
					//初始化
					'quoteManager' : {
						afterrender : function(cmp) {
							me.mainView=me.getQuoteManager();
							me.mainView.loadData();
							me.mainView.changeToShowView(1);
							me.quotationstore=me.mainView.quotationstore;
							me.quotationDetailStore=me.mainView.quotationDetailStore;
						}
					},
					'quoteManager #quote_panel button':{
						click:me.doClickAction
					}
				});
		// controller初始化完成
		this.isInited = true;
	},
	doClickAction:function(btn){
		var me=this;
		var btn_save=me.mainView.down('#BTN_SAVE');
		var btn_submit=me.mainView.down('#BTN_SUBMIT');
		var btn_dis_submit=me.mainView.down('#BTN_DIS_SUBMIT');
		var grd_QuotationDetail=me.mainView.down('#grd_QuotationDetail');
		var form=me.mainView.down('#quote_form');
		switch(btn.itemId){
			case 'BTN_ADD_QuotationDetail':
				if(!me.mainView.canUseButtonOrEdit()){//已经提交，不可编辑
					return;
				}
				var maxorder=me.quotationDetailStore.max('item_order');
				maxorder=Ext.isEmpty(maxorder)?1:(maxorder+1);
				var newrec=Ext.create('srm.enquiryQuote.quote.model.QuotationDetail',{
					item_order:maxorder
				});
				me.quotationDetailStore.add(newrec);
				break;
			case 'BTN_DEL_QuotationDetail':
				if(!me.mainView.canUseButtonOrEdit()){//已经提交，不可编辑
					return;
				}
				var recs=grd_QuotationDetail.getSelectionModel().getSelection();
				me.quotationDetailStore.remove(recs);
				break;
			case 'BTN_SUBMIT'://前提要求：记录已经保存
				var rec=form.getRecord();
				if(rec.get('quotation_id')<1){
					Ext.Msg.alert('提示','尚未保存');return;
				}
				var result=me.checkStatusSame(rec);
				if(!result){
					return;
				}
				Ext.Msg.confirm("提示","是否保存并提交?",function(btn){
			   		if(btn=="yes")
			   		{
			   			
						rec.set('status',1);//提交状态
						rec.set('quote_date',new Date());
						form.updateRecord(rec);
						me.quotationstore.sync({
							success: function(batch,options) {	
								Ext.Msg.alert('提示','操作成功');
								me.mainView.disabledForm(true);
								btn_save.hide();
								btn_submit.hide();
								btn_dis_submit.show();
							}
						});
						var quotation_id=rec.get('quotation_id');
						//保存详细数据
						me.saveDetail(quotation_id);
			   		}
			    });//confirm
				break;
			case 'BTN_DIS_SUBMIT':
				var rec=form.getRecord();
				var result=me.checkStatusSame(rec);
				if(!result){
					return;
				}
				rec.set('status',0);//提交状态
				rec.set('quote_date',new Date());
				form.updateRecord(rec);
				me.quotationstore.sync({
					success: function(batch,options) {	
						Ext.Msg.alert('提示','操作成功');
						me.mainView.disabledForm(false);
						btn_save.show();
						btn_submit.show();
						btn_dis_submit.hide();
					}
				});
				break;
			case 'BTN_SAVE':
				//检测是否可以提交
				var rec=form.getRecord();
				var result=me.checkData();
				if(!result){
					return;
				}
				//通过验证
				form.updateRecord(rec);
				
				if(me.quotationstore.indexOf(rec)>= 0&&rec.get('quotation_id')>0){//update
					var quotation_id=rec.get('quotation_id');
					if (form.getForm().isDirty()&&form.getForm().isValid()){
						me.quotationstore.sync();
					}
					//保存详细数据
					me.saveDetail(quotation_id);
				}else{
					rec.phantom =true;//表示新增
					me.quotationstore.add(rec);
	    			me.quotationstore.sync({
						success : function(e, batch) {
							 var newRec=batch.operations.create[0];
							 form.loadRecord(newRec);//重新加载到form
							 var quotation_id=newRec.get('quotation_id'); 
							 me.saveDetail(quotation_id);
						}
					});
				}
				Ext.Msg.alert('提示','保存成功');
			    me.mainView.disabledForm(false);
			    btn_save.show();
			    btn_submit.show();//显示，因为已经保存
			    btn_dis_submit.hide();
				break;
		}
	},
	checkData:function(){
		var me=this;
		var flag=true;
		var form=me.mainView.down('#quote_form');
		var values=form.getValues();
		if(!form.getForm().isValid()){
			Ext.Msg.alert('提示','请检查表单数据有效性');
			flag=false;
			return flag;
		}else{
			if(Ext.isEmpty(values.cpyname_cn)){
				Ext.Msg.alert('提示','没有所属公司，无法提交');
				flag=false;
			}
			var grd_QuotationDetail=me.mainView.down('#grd_QuotationDetail');
			var recs=grd_QuotationDetail.getSelectionModel().getSelection();
			for(var i=0;i<recs.length;i++){
				if(Ext.isEmpty(recs[i].get('item_name'))){
					Ext.Msg.alert('提示','顺序号'+recs[i].get('item_order')+'的项目名不允许为空');
					flag=false;
					break;
				}
			}
			return flag;
		}
	},
	saveDetail:function(quotation_id){
	 	 var me=this;
	 	 //保存报价详情
		 var quotationDetail_recs=me.quotationDetailStore.getRange();
		 for(var i=0;i<quotationDetail_recs.length;i++){
			quotationDetail_recs[i].set('quotation_id',quotation_id);
		 }
		 me.quotationDetailStore.sync({
			success:function(){
				me.quotationDetailStore.load({
					params:{
						quotation_id:quotation_id
					}
				});
			}
		});
	},
	//检查状态位前后台一致, true通过；false 不通过
	checkStatusSame:function(sel_rec){
		var me=this;
		var quotation_id=sel_rec.get('quotation_id');
		var json=srm.Const.callServiceMethodSync('quote/quotation.do?method=checkStatusSame',{
			quotation_id:quotation_id,
			status:sel_rec.get('status')
		});
		json=Ext.decode(json);
		
		if(json.result==0){
			me.quotationstore.reload({
				callback: function(records, operation, success) {
					var form=me.mainView.down('#quote_form');
					form.loadRecord(records[0]);
					me.mainView.setCanNotEdit(records[0]);
					Ext.Msg.alert('提示','数据已经变化');
				}
			});
			return false;
		}
		return true;
	}
});