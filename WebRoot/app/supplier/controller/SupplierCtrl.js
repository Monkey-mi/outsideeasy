Ext.define('srm.supplier.controller.SupplierCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',
				'srm.ux.RemoteValidator',
				'srm.ux.ButtonTransparent'
				,'srm.ux.ComboxTree'
				,'srm.supplier.store.SupplierFile'
				,'srm.supplier.store.CompanyClass'
				,'srm.supplier.store.Attched'
				,'srm.supplier.store.CustomAttched'
				,'srm.supplier.store.InvoiceTitle'
				,'srm.supplier.store.Competitor'
				,'srm.supplier.store.BankAccount'
				,'srm.supplier.store.MainCustomer'
				,'srm.supplier.store.Devicelist'
				,'srm.supplier.store.Metarial'
				,'srm.supplier.store.Goods'
				,'srm.supplier.store.Area'
				,'srm.supplier.store.MaterialClassTree'
				,'srm.supplier.store.MaterialClass'
				],
	views : [
				'srm.supplier.view.SupplierManager',
				'srm.supplier.view.UpAttchedFile',
				'srm.supplier.view.MaterialClassTreeWin'
			],
	refs : [
			{ref : 'supplierManager',selector : 'supplierSelfManager'},
			{ref : 'basicinfo',selector : 'supplierSelfManager #basicinfo'},
			{ref : 'materialClassTreeWin',selector:'#materialClassTreeWin'}
	],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited){
			return;
		}
		me.control({
					//初始化
					'supplierSelfManager' : {
						afterrender : function(cmp) {
							me.mainview=me.getSupplierManager();
							me.store=me.mainview.store;
							me.attchedstore=me.mainview.attchedstore;
							me.customAttchedStore=me.mainview.customAttchedStore;
							me.invoicestore=me.mainview.invoicestore;
							me.competitorstore=me.mainview.competitorstore;
							me.bankstore=me.mainview.bankstore;
							me.customerstore=me.mainview.customerstore;
							me.devicestore=me.mainview.devicestore;
							me.metarialstore=me.mainview.metarialstore;
							me.goodsstore=me.mainview.goodsstore;
							me.mainview.loadData();
							me.toBeDeleteFileArray=me.mainview.toBeDeleteFileArray;
						}
					},
					
					'supplierSelfManager #suppliermiddleView button':{
						click:me.doEditAction
					},
					'#materialClassTreeWin button':{
						click:me.doSelectTreeNode
					}
				});
		// controller初始化完成
		this.isInited = true;
	},
	doEditAction:function(btn){
		var me=this;
		var form=me.getBasicinfo();
		
		var btn_save=me.mainview.down('#BTN_SAVE');
		var btn_submit=me.mainview.down('#BTN_SUBMIT');
		var btn_dis_submit=me.mainview.down('#BTN_DIS_SUBMIT');
		if(btn.itemId!='BTN_SAVE' && btn.itemId!='BTN_SUBMIT' && btn.itemId!='BTN_DIS_SUBMIT'){
			if(!me.mainview.canUseButtonOrEdit()){//已经提交，不可编辑
				return;
			}
		}
		switch(btn.itemId){
			case 'BTN_SAVE': 
				//检测是否可以提交
				var rec=form.getRecord();
				var result=me.checkData();
				if(!result){
					return;
				}
				//通过验证
				rec.set('apply_sts',0);
				rec.set('create_dt',new Date());
				form.updateRecord(rec);
				
				if(me.store.indexOf(rec)>= 0&&rec.get('company_id')>0){//update
					var company_id=rec.get('company_id');
					if (form.getForm().isDirty()&&form.getForm().isValid()){
						me.store.sync({
							success: function(batch,options) {	
								srm.UInfo.currentUser.supplier=rec;
							}
						});
					}
					//保存详细数据
					me.saveDetail(company_id);
				}else{
					rec.phantom =true;//表示新增
					me.store.add(rec);
	    			me.store.sync({
						success : function(e, batch) {
							 var newRec=batch.operations.create[0];
							 form.loadRecord(newRec);//重新加载到form
							 var company_id=newRec.get('company_id'); 
							 var cpyname_cn=newRec.get('cpyname_cn');
							 srm.UInfo.currentUser.supplier=newRec;//重新给供应商对象赋值
							 //设置user所属的供应商
							 srm.UInfo.currentUser.userInfo.company_id=company_id;//更新本地用户信息
							 //更新数据库用户信息
							 srm.Const.callServiceMethodSync('common/update_company_id.do',{
									company_id:company_id,
									cpyname_cn:cpyname_cn,
									u_id:srm.UInfo.currentUser.userInfo.u_id
							 });
							 //保存详细数据
							 me.saveDetail(company_id);
						}
					});
				}
				Ext.Msg.alert('提示','保存成功');
			    me.mainview.disabledForm(false);
			    btn_save.show();
			    btn_submit.show();//显示，因为已经保存
			    btn_dis_submit.hide();
				break;
			case 'BTN_SUBMIT'://前提要求：记录已经保存
				var rec=form.getRecord();
				if(rec.get('company_id')<1){
					Ext.Msg.alert('提示','尚未保存');return;
				}
				var result=me.checkStatusSame(rec);
				if(!result){
					return;
				}
				Ext.Msg.confirm("提示","是否保存并提交?",function(btn){
			   		if(btn=="yes")
			   		{
			   			
						rec.set('apply_sts',5);//提交状态
						rec.set('create_dt',new Date());
						form.updateRecord(rec);
						me.store.sync({
							success: function(batch,options) {	
								srm.UInfo.currentUser.supplier=rec;
								Ext.Msg.alert('提示','操作成功');
								me.mainview.disabledForm(true);
								btn_save.hide();
								btn_submit.hide();
								btn_dis_submit.show();
							}
						});
						var company_id=rec.get('company_id');
						//保存详细数据
						me.saveDetail(company_id);
			   		}
			    });//confirm
				break;
			case 'BTN_DIS_SUBMIT':
				var rec=form.getRecord();
				var result=me.checkStatusSame(rec);
				if(!result){
					return;
				}
				rec.set('apply_sts',0);
				rec.set('create_dt',new Date());
				form.updateRecord(rec);
				me.store.sync({
					success: function(batch,options) {	
						srm.UInfo.currentUser.supplier=rec;
						Ext.Msg.alert('提示','操作成功');
						me.mainview.disabledForm(false);
						btn_save.show();
						btn_submit.show();
						btn_dis_submit.hide();
					}
				});
				break;
			case 'BTN_ADD_plinvoice':
				var newrec=Ext.create('srm.supplier.model.InvoiceTitle');
				me.invoicestore.insert(me.invoicestore.getCount(),newrec);
				break;
			case 'BTN_DEL_plinvoice':
				var grid_plinvoice=me.mainview.down('#plinvoiceDetails');
				var recs=grid_plinvoice.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.Msg.alert('提示','请先选择记录');
					return;
				}
				Ext.Msg.confirm("提示","是否确认删除?",function(btn){
			   		if(btn=="yes")
			   		{
			   			me.invoicestore.remove(recs);
			   		}
			    });//confirm
				
				break;
//			case 'BTN_DEFAULT_plinvoice':
//				var grid_plinvoice=me.mainview.down('#plinvoiceDetails');
//				var sel_recs=grid_plinvoice.getSelectionModel().getSelection();
//				if(sel_recs.length==0){
//					Ext.Msg.alert('提示','请先选择记录');
//					return;
//				}
//				var recs=me.invoicestore.getRange();
//				for(var i=0;i<recs.length;i++){
//					recs[i].set('default_id',false);//全部清零
//				}
//				sel_recs[0].set('default_id',true);//选中的一项打上默认标记
//				break;
			case 'BTN_ADD_plcompetitor':
				var newrec=Ext.create('srm.supplier.model.Competitor');
				me.competitorstore.insert(me.competitorstore.getCount(),newrec);
				break;
			case 'BTN_DEL_plcompetitor':
				var grid_competitor=me.mainview.down('#plcompetitorDetails');
				var recs=grid_competitor.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.Msg.alert('提示','请先选择记录');
					return;
				}
				Ext.Msg.confirm("提示","是否确认删除?",function(btn){
			   		if(btn=="yes")
			   		{
			   			me.competitorstore.remove(recs);
			   		}
			    });//confirm
				
				break;
			case 'BTN_ADD_plbank':
				var newrec=Ext.create('srm.supplier.model.BankAccount');
				me.bankstore.insert(me.bankstore.getCount(),newrec);
				break;
			case 'BTN_DEL_plbank':
				var grid_bank=me.mainview.down('#plbankDetails');
				var recs=grid_bank.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.Msg.alert('提示','请先选择记录');
					return;
				}
				Ext.Msg.confirm("提示","是否确认删除?",function(btn){
			   		if(btn=="yes")
			   		{
			   			me.bankstore.remove(recs);
			   		}
			    });//confirm
				
				break;
//			case 'BTN_DEFAULT_plbank':
//				var grid_bank=me.mainview.down('#plbankDetails');
//				var sel_recs=grid_bank.getSelectionModel().getSelection();
//				if(sel_recs.length==0){
//					Ext.Msg.alert('提示','请先选择记录');
//					return;
//				}
//				var recs=me.bankstore.getRange();
//				for(var i=0;i<recs.length;i++){
//					recs[i].set('default_id',false);//全部清零
//				}
//				sel_recs[0].set('default_id',true);//选中的一项打上默认标记
//				break;
//			case 'btn_add_attched':
//				var newrec=Ext.create('srm.supplier.model.Attched',{
//					create_dt:new Date()
//				});
//				me.attchedstore.insert(me.attchedstore.getCount(),newrec);
//				break;
//			case 'btn_del_attched':
//				var grid_attched=me.mainview.down('#fileGrid');
//				var recs=grid_attched.getSelectionModel().getSelection();
//				if(recs.length==0){
//					Ext.Msg.alert('提示','请先选择记录');
//					return;
//				}
//				//检验
//				for(var i=0;i<recs.length;i++){
//					if(recs[i].get('file_name')=='税务登记证' || recs[i].get('file_name')=='营业执照' ||recs[i].get('file_name')=='组织机构代码证'){
//						Ext.Msg.alert('提示',recs[i].get('file_name')+'必须上传');
//						return;
//					}
//					if(!Ext.isEmpty(recs[i].get('file_path'))){
//						Ext.Msg.alert('提示','请先删除上传的附件');
//						return;
//					}
//				}
//				Ext.Msg.confirm("提示","是否确认删除?",function(btn){
//			   		if(btn=="yes")
//			   		{
//			   			for(var i=0;i<recs.length;i++){
//			   				me.toBeDeleteFileArray.push(recs[i].get('file_path'));
//			   			}
//			   			//删除附件记录
//						me.attchedstore.remove(recs);
//			   		}
//			    });//confirm
//				
//				break;
			//自定义附件添加
			case 'btn_add_customattched':
				var newrec=Ext.create('srm.supplier.model.Attched',{
					create_dt:new Date(),
					"file_path":"",
					ismust:false,
					remark:'',
					iscustom:true
				});
				me.customAttchedStore.insert(me.customAttchedStore.getCount(),newrec);
				break;
				//自定义附件删除
			case 'btn_del_customattched':
				var grid_attched=me.mainview.down('#customfileGrid');
				var recs=grid_attched.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.Msg.alert('提示','请先选择记录');
					return;
				}
				//检验
//				for(var i=0;i<recs.length;i++){
//					if(recs[i].get('file_name')=='税务登记证' || recs[i].get('file_name')=='营业执照' ||recs[i].get('file_name')=='组织机构代码证'){
//						Ext.Msg.alert('提示',recs[i].get('file_name')+'必须上传');
//						return;
//					}
//					if(!Ext.isEmpty(recs[i].get('file_path'))){
//						Ext.Msg.alert('提示','请先删除上传的附件');
//						return;
//					}
//				}
				Ext.Msg.confirm("提示","是否确认删除?",function(btn){
			   		if(btn=="yes")
			   		{
			   			for(var i=0;i<recs.length;i++){
			   				me.toBeDeleteFileArray.push(recs[i].get('file_path'));
			   			}
			   			//删除附件记录
						me.customAttchedStore.remove(recs);
			   		}
			    });//confirm
				
				break;
			case 'BTN_ADD_customer':
				var newrec=Ext.create('srm.supplier.model.MainCustomer');
				me.customerstore.insert(me.customerstore.getCount(),newrec);
				break;
			case 'BTN_DEL_customer':
				var grid_customer=me.mainview.down('#customerDetails');
				var recs=grid_customer.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.Msg.alert('提示','请先选择记录');
					return;
				}
				Ext.Msg.confirm("提示","是否确认删除?",function(btn){
			   		if(btn=="yes")
			   		{
			   			me.customerstore.remove(recs);
			   		}
			    });//confirm
				
				break;
			case 'BTN_ADD_plEquipment':
				var newrec=Ext.create('srm.supplier.model.Devicelist');
				me.devicestore.insert(me.devicestore.getCount(),newrec);
				break;
			case 'BTN_DEL_plEquipment':
				var grid_device=me.mainview.down('#grdEquipmentDetails');
				var recs=grid_device.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.Msg.alert('提示','请先选择记录');
					return;
				}
				Ext.Msg.confirm("提示","是否确认删除?",function(btn){
			   		if(btn=="yes")
			   		{
			   			me.devicestore.remove(recs);
			   		}
			    });//confirm
				break;
			case 'BTN_ADD_plmaterials':
				var newrec=Ext.create('srm.supplier.model.Metarial');
				me.metarialstore.insert(me.metarialstore.getCount(),newrec);
				break;
			case 'BTN_DEL_plmaterials':
				var grid_metarial=me.mainview.down('#plmaterialsDetails');
				var recs=grid_metarial.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.Msg.alert('提示','请先选择记录');
					return;
				}
				Ext.Msg.confirm("提示","是否确认删除?",function(btn){
			   		if(btn=="yes")
			   		{
			   			me.metarialstore.remove(recs);
			   		}
			    });//confirm
				break;
			case 'BTN_ADD_plproduct':
				var newrec=Ext.create('srm.supplier.model.Goods');
				me.goodsstore.insert(me.goodsstore.getCount(),newrec);
				break;
			case 'BTN_EDT_plproduct':
				var win=Ext.widget('materialClassTreeWin',{
					itemId:'materialClassTreeWin'
				});
				win.show();
				break;
			case 'BTN_DEL_plproduct':
				var grid_goods=me.mainview.down('#plproductDetails');
				var recs=grid_goods.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.Msg.alert('提示','请先选择记录');
					return;
				}
				Ext.Msg.confirm("提示","是否确认删除?",function(btn){
			   		if(btn=="yes")
			   		{
			   			me.goodsstore.remove(recs);
			   		}
			    });//confirm
				break;
		}
	},
	//检验数据有效性
	checkData:function(){
		var me=this;
		var flag=true;
		var form=me.getBasicinfo();
		var values=form.getValues();
		if(!form.getForm().isValid()){
			Ext.Msg.alert('提示','请检查表单数据有效性');
			flag=false;
			return flag;
		}else{
			 var count=srm.Const.callServiceMethodSync('supplier/supplierFile.do?method=getCountByIdAndName',{
					company_id:values.company_id,
					cpyname_cn:values.cpyname_cn
			 });
			 if(count>0){
			 	Ext.Msg.alert('提示','该公司已注册');
				flag=false;
				return flag;
			 }
			 //发票抬头默认标记检测
			 var invoice_recs=me.invoicestore.getRange();
			 var invoice_deafult_count=0;
			 for(var i=0;i<invoice_recs.length;i++){
			 	if(invoice_recs[i].get('default_id')=='true' || invoice_recs[i].get('default_id')=='1'){
			 		invoice_deafult_count++;
			 	}
			 	if(Ext.isEmpty(invoice_recs[i].get('invoice_title_name'))){
			 		Ext.Msg.alert('提示','发票抬头名称不允许为空');
					flag=false;
					return flag;
			 	}
			 }
			 if(invoice_recs.length>0 && invoice_deafult_count!=1){
			 	Ext.Msg.alert('提示','发票抬头必须有且仅有一个默认标记');
				flag=false;
				return flag;
			 }
			 //竞争对手检测
			 var competitor_recs=me.competitorstore.getRange();
			 for(var i=0;i<competitor_recs.length;i++){
			 	if(Ext.isEmpty(competitor_recs[i].get('competitor_name'))){
			 		Ext.Msg.alert('提示','竞争对手信息不允许为空');
					flag=false;
					return flag;
			 	}
			 }
			 //银行账号检测
			 var bank_recs=me.bankstore.getRange();
			 var bank_deafult_count=0;
			 for(var i=0;i<bank_recs.length;i++){
			 	if(bank_recs[i].get('default_id')=='true' || bank_recs[i].get('default_id')=='1'){
			 		bank_deafult_count++;
			 	}
			 	if(Ext.isEmpty(bank_recs[i].get('account_name'))){
			 		Ext.Msg.alert('提示','银行账号名不允许为空');
					flag=false;
					return flag;
			 	}
			 	if(Ext.isEmpty(bank_recs[i].get('account_code'))){
			 		Ext.Msg.alert('提示','银行账号不允许为空');
					flag=false;
					return flag;
			 	}
			 }
			 if(bank_recs.length>0 && bank_deafult_count!=1){
			 	Ext.Msg.alert('提示','银行账号必须有且仅有一个默认标记');
				flag=false;
				return flag;
			 }
			 //主要客户检测
			 var customer_recs=me.customerstore.getRange();
			 for(var i=0;i<customer_recs.length;i++){
			 	if(Ext.isEmpty(customer_recs[i].get('customer_name'))){
			 		Ext.Msg.alert('提示','客户名称不允许为空');
					flag=false;
					return flag;
			 	}
			 }
			 //设备检测
			 var device_recs=me.devicestore.getRange();
			 for(var i=0;i<device_recs.length;i++){
			 	if(Ext.isEmpty(device_recs[i].get('device_name'))){
			 		Ext.Msg.alert('提示','设备名称不允许为空');
					flag=false;
					return flag;
			 	}
			 }
			 //材料检测
			 var metarial_recs=me.metarialstore.getRange();
			 for(var i=0;i<metarial_recs.length;i++){
			 	if(Ext.isEmpty(metarial_recs[i].get('material_name'))){
			 		Ext.Msg.alert('提示','材料名称不允许为空');
					flag=false;
					return flag;
			 	}
			 }
			 //产品检测
			 var goods_recs=me.goodsstore.getRange();
			 for(var i=0;i<goods_recs.length;i++){
			 	if(Ext.isEmpty(goods_recs[i].get('goods_name'))){
			 		Ext.Msg.alert('提示','产品名称不允许为空');
					flag=false;
					return flag;
			 	}
			 }
		}
		return flag;
	},
	//保存详细数据
	saveDetail:function(company_id){
	 	 var me=this;
	 	 //保存附件
		 var attched_recs=me.attchedstore.getRange();
		 for(var i=0;i<attched_recs.length;i++){
			attched_recs[i].set('company_id',company_id);
		 }
		 var attched_recs2=me.customAttchedStore.getRange();
		 for(var i=0;i<attched_recs2.length;i++){
			attched_recs2[i].set('company_id',company_id);
		 }
		 me.attchedstore.sync({
			success:function(){
				
				me.attchedstore.load({
					params:{
						company_id:company_id,
						iscustom:0
					}
				});
				//放里面，防止attchedstore新增没完成时customAttchedStore获取到的ID值不是最大值而导致插入失败
					
			}
		});
		//自定义上传附件
		me.customAttchedStore.sync({
			success:function(){
				me.customAttchedStore.load({
					params:{
						company_id:company_id,
						iscustom:1
					}
				});
//				//执行删除文件
//				me.mainview.deleteUploadFile();
			}
		});
		//执行删除文件
		 me.mainview.deleteUploadFile();
		//保存发票抬头信息
		 var invoice_recs=me.invoicestore.getRange();
		 for(var i=0;i<invoice_recs.length;i++){
			invoice_recs[i].set('company_id',company_id);
		 }
		 me.invoicestore.sync({
			success:function(){
				me.invoicestore.load({
					params:{
						company_id:company_id
					}
				});
			}
		});
		//保存竞争对手
		 var competitor_recs=me.competitorstore.getRange();
		 for(var i=0;i<competitor_recs.length;i++){
			competitor_recs[i].set('company_id',company_id);
		 }
		 me.competitorstore.sync({
			success:function(){
				me.competitorstore.load({
					params:{
						company_id:company_id
					}
				});
			}
		});
		//保存银行账号
		var bank_recs=me.bankstore.getRange();
		for(var i=0;i<bank_recs.length;i++){
			bank_recs[i].set('company_id',company_id);
		}
		me.bankstore.sync({
			success:function(){
				me.bankstore.load({
					params:{
						company_id:company_id
					}
				});
			}
		});
		//保存主要客户信息
		var customer_recs=me.customerstore.getRange();
		for(var i=0;i<customer_recs.length;i++){
			customer_recs[i].set('company_id',company_id);
		}
		me.customerstore.sync({
			success:function(){
				me.customerstore.load({
					params:{
						company_id:company_id
					}
				});
			}
		});
		//保存设备
		var device_recs=me.devicestore.getRange();
		for(var i=0;i<device_recs.length;i++){
			device_recs[i].set('company_id',company_id);
		}
		me.devicestore.sync({
			success:function(){
				me.devicestore.load({
					params:{
						company_id:company_id
					}
				});
			}
		});
		//保存材料
		var metarial_recs=me.metarialstore.getRange();
		for(var i=0;i<metarial_recs.length;i++){
			metarial_recs[i].set('company_id',company_id);
		}
		me.metarialstore.sync({
			success:function(){
				me.metarialstore.load({
					params:{
						company_id:company_id
					}
				});
			}
		});
		//保存产品
		var goods_recs=me.goodsstore.getRange();
		for(var i=0;i<goods_recs.length;i++){
			goods_recs[i].set('company_id',company_id);
		}
		me.goodsstore.sync({
			success:function(){
				me.goodsstore.load({
					params:{
						company_id:company_id
					}
				});
			}
		});
	},
	doSelectTreeNode:function(btn){
		var me=this;
		if(btn.itemId=='btn_confirm'){
			var win=me.getMaterialClassTreeWin();
			var tree=win.down('treepanel');
			var treeSelected=tree.getSelectionModel().getSelection()[0];
			if(Ext.isEmpty(treeSelected)){
				Ext.Msg.alert('提示','请先选中一条记录');
				return;
			}
			var id=treeSelected.get('id');
			
			var goods_grid=me.mainview.down('#plproductDetails');
			var recs=goods_grid.getSelectionModel().getSelection();
			for(var i=0;i<recs.length;i++){
				recs[i].set('mc_id',id);
			}
			win.close();
		}
	},
	//检查状态位前后台一致, true通过；false 不通过
	checkStatusSame:function(sel_rec){
		var me=this;
		var company_id=sel_rec.get('company_id');
		var json=srm.Const.callServiceMethodSync('supplier/supplierFile.do?method=checkStatusSame',{
			company_id:company_id,
			apply_sts:sel_rec.get('apply_sts')
		});
		json=Ext.decode(json);
		
		if(json.result==0){
			me.store.load({
				params:{
					company_id:company_id
				},
				callback: function(records, operation, success) {
					var form=me.getBasicinfo();
					form.loadRecord(records[0]);
					srm.UInfo.currentUser.supplier=records[0];
					me.mainview.setCanNotEdit(records[0]);
					Ext.Msg.alert('提示','数据已经变化');
				}
			});
			return false;
		}
		return true;
	}
});