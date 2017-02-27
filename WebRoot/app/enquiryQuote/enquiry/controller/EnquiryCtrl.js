Ext.define('srm.enquiryQuote.enquiry.controller.EnquiryCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',
				'Ext.ux.TreePicker',
				'srm.enquiryQuote.enquiry.store.Enquiry',
				'srm.enquiryQuote.enquiry.store.EnquiryDetail',
				'srm.enquiryQuote.enquiry.store.TempMaterialClass',
				'srm.basicdata.materialClass.store.MaterialClassTree',
				'srm.enquiryQuote.enquiry.model.QueryParam',
				'srm.enquiryQuote.enquiry.store.EnquiryDistribution',
				'srm.enquiryQuote.enquiry.store.SupplierFile',
				'srm.enquiryQuote.enquiry.store.TempQuotation',
				'srm.enquiryQuote.enquiry.store.TempQuotationDetail'
				],
	views:[	'srm.ux.ComboxTree',
			'srm.enquiryQuote.enquiry.view.EnquiryManager',
			'srm.enquiryQuote.enquiry.view.EnquiryMaintain',
			'srm.enquiryQuote.enquiry.view.UpEnquiryFile',
			'srm.enquiryQuote.enquiry.view.EnquiryQuery',
			'srm.enquiryQuote.enquiry.view.SupplierWin'
		],
	refs:[
		{ref:'enquiryManager',selector:'enquiryManager'},
		{ref:'edt_Enquiry',selector:'edt_Enquiry'},
		{ref:'supplierWin',selector:'supplierWin'}
			],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'enquiryManager':{
				afterrender:function(cmp){
					me.panel=me.getEnquiryManager();
					me.grdmain=me.panel.down('#grd_Enquiry');
					me.grdstore=me.panel.store;
					me.detailstore=me.panel.detailstore;
					me.materialClassstore=me.panel.materialClassstore;
					me.treeStore=me.panel.treeStore;
					me.distributionstore=me.panel.distributionstore;
					me.panel.loadMain();
					me.query_rec=Ext.create('srm.enquiryQuote.enquiry.model.QueryParam');
					me.modFuncsDisabled=cmp.modFuncsDisabled;
				},
				beforedestroy:function(th){
					delete me.grdstore.proxy.extraParams.condition;
				}
			},
			
			'enquiryManager #grd_Enquiry':{
				selectionchange:function(grid,recs){
					if(recs.length>0){
						me.detailstore.load({params:{enquiry_id:recs[0].get('enquiry_id')}});
						me.distributionstore.load({params:{enquiry_id:recs[0].get('enquiry_id')}});
						me.setBtnStatus(false);
					}else{
						me.setBtnStatus(true);
					}
				},
				itemdblclick:function(grid,rec){
					me.doMaintainAction(srm.Const.FUNC_ITEMID_BTN_EDT);
				}
			},
			'enquiryManager #function_btn button':{
				click:me.doAction
			},
			'edt_Enquiry':{
						afterrender:function(th){
							me.panel.down('#function_btn').disable();
							me.grdmain.disable();
							me.panel.can_use_btn=false;
						},
						beforedestroy:function(th){
							me.panel.down('#function_btn').enable();
							me.grdmain.enable();
							me.panel.can_use_btn=true;
							var sel_rec=me.grdmain.getSelectionModel().getSelection()[0];
							me.grdmain.getSelectionModel().select(sel_rec);
						}
			},
			'edt_Enquiry button':{
				click:me.doEditAction
			},
			'supplierWin button':{
				click:me.dosetsupplier
			}
		});
		me.isInited=true;
	},
	setBtnStatus:function(status){
		var me=this;
		me.panel.down('#BTN_LOCK').setDisabled(status);	
		me.panel.down('#BTN_FINISH').setDisabled(status);
		me.panel.down('#BTN_DEL').setDisabled(status);	
	},
	doAction:function(btn){
		var me=this;
		if(!me.panel.can_use_btn){
			Ext.Msg.alert('提示',"编辑状态不可操作");
			return;
		}
		switch (btn.itemId){
			case srm.Const.FUNC_ITEMID_BTN_ADD:
			case srm.Const.FUNC_ITEMID_BTN_COPY:					
				me.doMaintainAction(btn.itemId);
				break;
			case 'BTN_DEL':
				me.dodeleteAction();
				break;
			case 'BTN_LOCK':
				me.dolockAction();
				break;
			case 'BTN_FINISH':
				me.dofinishAction();
				break;
			case 'btn_query':
				var win=Ext.widget('enquiryQuery',{
					itemId:'enquiryQuery',
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
	doEditAction:function(btn){
		var me=this;
		var edt_Enquiry=me.getEdt_Enquiry();
		var form=edt_Enquiry.down('form');
		var grid_detail=edt_Enquiry.down('#grd_EnquiryDetail');
		var detailstore=edt_Enquiry.detailstore;
		var distributionstore=edt_Enquiry.distributionstore;
		switch(btn.itemId){
			case 'BTN_SAVE':
				//验证数据
			
				//保存数据
				var rec=form.getRecord();
				form.updateRecord(rec);
				var enquiry_item=form.getForm().findField('enquiry_item');
				if(form.getForm().isValid()&&form.getForm().isDirty()){
					if(enquiry_item!=null && srm.Util.gettextlength(enquiry_item)>200){
						Ext.Msg.alert('提示',"项目最大长度200字符");
						return;
					}
					if(me.grdstore.indexOf(rec) >= 0&&rec.get('enquiry_id')>0){
						me.grdstore.sync({
								success : function(e, batch) {
									
								}
							});
						detailstore.each(function(record){
				  			record.set('enquiry_id',rec.get('enquiry_id'));
				  		});
				  		detailstore.sync({
							success:function(){
								detailstore.reload({
									params:{
										enquiry_id:rec.get('enquiry_id')
									}
								});
								//执行删除文件
								edt_Enquiry.deleteUploadFile();
							}
						});
						distributionstore.each(function(record){
				  			record.set('enquiry_id',rec.get('enquiry_id'));
				  		});
						distributionstore.sync({
							success:function(){
								distributionstore.reload({
									params:{
										enquiry_id:rec.get('enquiry_id')
									}
								});
							}
						});
						Ext.Msg.alert('提示','保存成功');
					}else{
						rec.phantom =true;//表示新增
						me.grdstore.add(rec);
		    			me.grdstore.sync(
							{
								success : function(e, batch) {
									 var newRec=batch.operations.create[0];
									 form.loadRecord(newRec);
									 
									 detailstore.each(function(record){
							  			record.set('enquiry_id',newRec.get('enquiry_id'));
							  		});
							  		detailstore.sync({
										success:function(){
											detailstore.reload({
												params:{
													enquiry_id:rec.get('enquiry_id')
												}
											});
											//执行删除文件
											edt_Enquiry.deleteUploadFile();
										}
									});
									distributionstore.each(function(record){
							  			record.set('enquiry_id',rec.get('enquiry_id'));
							  		});
									distributionstore.sync({
										success:function(){
											distributionstore.reload({
												params:{
													enquiry_id:rec.get('enquiry_id')
												}
											});
										}
									});
								}
							}
						);
					Ext.Msg.alert('提示','保存成功');
					}	
				}
				break;
			case 'btn_enquirydetail_add':
				var maxorder=detailstore.max('item_order');
				maxorder=Ext.isEmpty(maxorder)?1:(maxorder+1);
				var newrec=Ext.create('srm.enquiryQuote.enquiry.model.EnquiryDetail',{
					item_order:maxorder
				});
				detailstore.add(newrec);
				break;
			case 'btn_enquirydetail_del':
				var toBeDeleteFileArray=edt_Enquiry.toBeDeleteFileArray;
				var sel_recs=grid_detail.getSelectionModel().getSelection();
				for(var i=0;i<sel_recs.length;i++){
	   				toBeDeleteFileArray.push(sel_recs[i].get('attched'));
	   			}
				detailstore.remove(sel_recs);
				break;
			case 'btn_EnquiryDistribution_add':
				var win=Ext.widget('supplierWin',{
					itemId:'supplierWin'
				});
				win.show();
				win.loadData();
				break;
			case 'btn_EnquiryDistribution_del':
				var sel_recs=edt_Enquiry.down('#grd_EnquiryDistribution').getSelectionModel().getSelection();
				distributionstore.remove(sel_recs);
				break;
		}
	},
	doMaintainAction:function(type){
		var me=this;
		var rec;
		var isAdd=isEdit=isCopy=false;
		switch(type){
			case srm.Const.FUNC_ITEMID_BTN_ADD:
					isAdd=true;
					isEdit=false;
					var today=new Date();
					var supplier= srm.UInfo.currentUser.supplier;
					rec=Ext.create('srm.enquiryQuote.enquiry.model.Enquiry',{
						enquiry_date:today,
						enquiry_person:srm.Util.currentUser.userInfo.name,
						enquiry_status:0,
						company_id:supplier.get('company_id'),
						cpyname_cn:supplier.get('cpyname_cn')
					});
					break;
			case srm.Const.FUNC_ITEMID_BTN_EDT:
					isAdd=false;
					rec=me.grdmain.getSelectionModel().getSelection()[0];
					isEdit=true;
					break;
			
		}
		if(Ext.isEmpty(rec)){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		if(rec.get('enquiry_status')>0){
			Ext.Msg.alert('提示','已发布，不可编辑');
			return;
		}
		var win =Ext.widget('edt_Enquiry',{
			itemId:'edt_Enquiry',
			title : '询价维护',
			isAdd : isAdd,
			isEdit : isEdit,
			isCopy:isCopy,
			cannotedit:(rec.get('enquiry_status')>0),
			rec:rec,
			mainstore:me.grdstore,
			materialClassstore:me.materialClassstore,
			treeStore:me.treeStore,
			modFuncsDisabled:me.modFuncsDisabled
		});
		win.loadData(rec,isAdd,isEdit);
		win.show();
	},
	
	dodeleteAction:function(){
		var me=this;
		var sel_recs = me.grdmain.getSelectionModel().getSelection();
		if(sel_recs.length==0){
			Ext.Msg.alert('提示','请先选中一条记录');
			return;
		}
		//刷新标记位
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
		for(var i=0;i<sel_recs.length;i++){
			if(sel_recs[i].get('enquiry_status')>0){
				Ext.Msg.alert('提示','编号'+sel_recs[i].get('enquiry_id')+'已经发布，不可删除');
				return;
			}
		}
		Ext.Msg.confirm("提示","确认删除记录?",function(btn){
			if (btn=="yes")
			{	
				me.grdstore.remove(sel_rec);
				me.grdstore.sync({
					success: function(batch,options) {
						 me.grdstore.reload();
					}
				});																	
			}//if (btn=="yes")
		});
	},
	//检查状态位前后台一致, true通过；false 不通过
	checkStatusSame:function(sel_recs,idarray,statusarray){
		var me=this;
		var json=srm.Const.callServiceMethodSync('enquiry/enquiry.do?method=checkStatusSame',{
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
	//发布标记
	dolockAction:function(){
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
		if(status==0){
			alertmsg="是否发布所选记录?";
		}else if(status==1){
			alertmsg="是否取消发布所选记录?";
		}else{
			Ext.Msg.alert('提示','操作无效');
			return;
		}
		if(status==1){//取消发布时，如果已经有报价的记录，不可取消
			var result=me.hasQuote(idarray);
			if(result>0){//检查是否有报价记录
				Ext.Msg.alert('提示','编号'+result+'已经有报价，不去取消发布');
				return;
			}
		}		
		Ext.Msg.confirm("提示",alertmsg,function(btn){
			if (btn=="yes")
			{	
				srm.Const.callServiceMethodSync('enquiry/enquiry.do?method=updateStatus',{
					idarray:idarray.join(','),
					enquiry_date:new Date(),
					enquiry_person:srm.Util.currentUser.userInfo.name,
					enquiry_status:(status==0?1:0)
				});
				me.grdstore.reload();	
			}//if (btn=="yes")
		});
	
	},
	//终止标记
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
			alertmsg="是否终止所选记录?";
		}else if(status==2){
			alertmsg="是否取消终止所选记录?";
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
	},
	//新增 分发供应商的记录
	dosetsupplier:function(btn){
		var me=this;
		var win=me.getSupplierWin();
		var editpanel=me.getEdt_Enquiry();
		var distributionstore=editpanel.distributionstore;
		switch(btn.itemId){
			case 'BTN_SAVE':
				var recs=win.down('#grid_supplier').getSelectionModel().getSelection();
				var today=new Date();
				var extst_recs=distributionstore.getRange();
				
				for(var i=0;i<recs.length;i++){
					
					//加入判断，防止重复添加
					var flag=false;//默认不存在
					for(var j=0;j<extst_recs.length;j++)
					{
						
						if(recs[i].get('company_id')==extst_recs[j].get('company_id'))
						{
							flag=true;
							break;
						}
					}
					if(flag)
					{
						Ext.Msg.alert('提示',recs[i].get('cpyname_cn')+'已存在,请重新选择！');
						return;
					}
					else
					{
					var newrec=Ext.create('srm.enquiryQuote.enquiry.model.EnquiryDistribution',{
						distribute_date:today,
						company_id:recs[i].get('company_id'),
						cpyname_cn:recs[i].get('cpyname_cn')
					});
					distributionstore.add(newrec);
					}
				}
				break;
		}
	},
	/**检查是否有报价记录, 
	 * result表示有报价的询价单编号；
	 * result=0,表示全部没有报价*/
	hasQuote:function(idarray){
		var me=this;
		var json=srm.Const.callServiceMethodSync('quote/quotation.do?method=hasQuote',{
			idarray:idarray.join(',')
		});
		json=Ext.decode(json);
		return json.result;
	}
});