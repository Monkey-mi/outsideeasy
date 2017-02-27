Ext.define('srm.supplierFile.controller.SupplierFileCtrl', {
    extend: 'Ext.app.Controller',
    requires : [
				'srm.ux.PagingBar',				
				'srm.supplierFile.view.SupplierFileManager',
				'srm.supplierFile.store.AccBankAccount',
				'srm.supplierFile.store.AccCompetitor',
				'srm.supplierFile.store.AccCustomAttched',
				'srm.supplierFile.store.AccDevicelist',
				'srm.supplierFile.store.AccGoods',
				'srm.supplierFile.store.AccInvoiceTitle',
				'srm.supplierFile.store.AccMainCustomer',
				'srm.supplierFile.store.AccMetarial',
				'srm.supplierFile.store.SupplierFile',
				'srm.supplierFile.store.SupplierFileAttched',
				],
    views:['srm.supplierFile.view.SupplierFileManager',
           'srm.supplierFile.view.SupplierFileBaseShow',
           'srm.supplierFile.view.SupplierFileAttchedShow',
           'srm.supplierFile.view.SupplierFileBusShow',
           'srm.supplierFile.view.SupplierFileImp',
           'srm.supplierFile.view.SupplierFileShow',
           'srm.basicdata.regAccount.view.MngEditerRegAccount'
    ],
    refs:[
    	{ref:'SupplierFileManager',selector:'SupplierFileManager'},
    	{ref:'SupplierFile',selector:'SupplierFileManager #SupplierFile'},
    	{ref:'SupplierFileShow',selector:'SupplierFileShow'},
    	{ref:'SupplierFileBaseShow',selector:'SupplierFileShow #SupplierFileBaseShow'},
    	{ref:'SupplierFileAttchedShow',selector:'SupplierFileShow #SupplierFileAttchedShow'},
    	{ref:'PanelBaseInfo',selector:'SupplierFileBaseShow #PanelBaseInfo'},
    	{ref:'SupplierFileBusShow',selector:'SupplierFileBaseShow #SupplierFileBusShow'},
    	{ref:'mngEditerRegAccount',selector:'mngEditerRegAccount'}
    	],
    init: function() {
		var me=this;
		if (this.isInited)
			return;
		me.control({
			'SupplierFileManager':{
				afterrender:function(cmp){
					me.gridStore = me.getSupplierFile().getStore();
				}
			},
			'SupplierFileManager  button':{
				click:me.doAction
			},
			'SupplierFileManager #SupplierFile':{
				selectionchange:function(grid, rec){
					var me = this;
					var panel = me.getSupplierFileManager();
					//列表有数据
					if (rec.length > 0) {
						panel.down('#BTN_EDT').setDisabled(false);
					}
					//列表记录为空
					else
					{
						panel.down('#BTN_EDT').setDisabled(true);
					}
				},
				itemdblclick : function(grid, rec) {
					me.EditSupplierInfo('BTN_EDT',false);
				}
			},
			//新增编辑页面提交按钮事件
			'SupplierFileBaseShow #PanelBaseInfo button':{
				click:me.btnEditformAction
			},
			'SupplierFileShow #SupplierFileAttchedShow button':{
				click:me.btnAttchedformAction
			},
	        'mngEditerRegAccount button':{
	        	click:me.save_RegAcount
	        }
		});
		// controller初始化完成
		this.isInited = true;	
	},
	doAction:function(btn){
		var me = this;
		var panel=me.getSupplierFileManager();
		switch(btn.itemId){
		case 'BTN_ADD':
		case 'BTN_EDT':
			this.EditSupplierInfo(btn.itemId,true);
			break;
		 case 'btn_search':
			 this.doQuery();
		 break;
		 case 'btn_download':
			 var temppath="/doc/ImportSupplierTemplate.xlsx";
			var file_path=encodeURIComponent(encodeURIComponent(temppath));
			 var src='subAccount/downloadFile.do?file_path='+file_path;
			window.open(src, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
		 break;
		 case 'btn_import':
			 var panel=me.getSupplierFileManager();
			 var win =Ext.create('srm.supplierFile.view.SupplierFileImp',{
					title:'供应商导入',
					glyph:0xf0f0,
					closable:true,
					store:panel.store
				});
				win.show();
		 break;
		};
	},
	/*查询列表页面功能*/
	doQuery:function(){
		var me=this;
		var panel=me.getSupplierFileManager();
		var condition=panel.down('#search').getValue();
		
		panel.store.proxy.extraParams.cpyname_cn=condition;
		panel.store.proxy.extraParams.usePaging=true;
		panel.store.loadPage(1);
	},
	/*修改、新增供应商按钮事件*/
	EditSupplierInfo:function(itemId,isEdit){
		var me=this; 
		var rec,isAdd,opentitle,openglyph;
		var grid=me.getSupplierFile();
		//为其他同类页面何用做准备，如编辑，复制
		switch(itemId){
			case 'BTN_ADD'://新增按钮
				var today=Ext.Date.format(new Date(),'Y-m-d H:i:s');
				rec=Ext.create('srm.supplierFile.model.SupplierFile');
				isAdd=true;
				isEdit=true;
				break;
			case 'BTN_EDT':
				rec=grid.getSelectionModel().getSelection()[0];
				isAdd=false;
			break;
		}
		if(isAdd){
			var rec=Ext.create('srm.basicdata.regAccount.model.MngRegAccout');
	  		rec.set("role_id",1);
	  		rec.set("role_name","SupplierRegister");
	  		rec.set("password",123456);
	  		rec.set("re_password",123456);
	  		var pass_mess = '<font color="red">'+'【 默认密码：123456】</br>【可以自己修改】'+'</font>';
	  		var edtWin = Ext.widget('mngEditerRegAccount',{
				isAddNew: true,
				ac_titie:'添加主账号',
				pass_mess:pass_mess
			});
	  		edtWin.loadData(rec);
			edtWin.show();
		}else{
			if(!isAdd&&isEdit){
				opentitle='修改供应商';
				openglyph=0xf0f0;
			}else if(!isAdd||!isEdit){
				opentitle='查看供应商';
				openglyph=0xf0f0;
			}
			var win=Ext.widget('SupplierFileShow',{
				//新增、修改页面
				itemId:'SupplierFileShow',
				title:opentitle,
				glyph:openglyph,
				supplierRec:rec,
				isAdd:isAdd,
				isEdit:isEdit,
				store:grid.getStore(),
				closable:true
			});
			win.show();
		}
	},
	/*供应商提交、修改保存表单*/
	btnEditformAction:function(btn){
		
		var me=this;
		var mainPanel=me.getSupplierFileShow();
		var formpanel=me.getSupplierFileBaseShow();
		var isAdd=mainPanel.isAdd;
		var isEdit=mainPanel.isEdit;
		//基本信息form
		var form=me.getPanelBaseInfo();
		//获取界面数据
		var rec=form.getRecord();		
		//联系地址 省市县+详细地址
		var province = form.down('#area_pro_contact').getRawValue();
		var city = form.down('#area_city_contact').getRawValue();
		var county = form.down('#contact_addr_code').getRawValue();
		var realtedAddress = province+city+county+rec.get('contact_addr');
		rec.set('realtedAddress',realtedAddress);
		var recc;
		if(isEdit){
		var grid=me.getSupplierFile();
		recc=grid.getSelectionModel().getSelection()[0];		
		}
		//业务信息Tab页面
		var buspanel=me.getSupplierFileBusShow();
		//附件
		var registerAttchedPanl=me.getSupplierFileAttchedShow();
		
		switch(btn.itemId){
			case 'BTN_SAVE':
			form.updateRecord(rec);	
			if(form.getForm().isValid()&&form.getForm().isDirty())
			{
			 Ext.Msg.confirm('提示','你确定要保存供应商基本信息及业务信息吗?',function(btn){
			 	if(btn=='yes')
			 	{
			 		//更新数据到数据库
			 		var is_chinese=rec.get('is_chinese');
			 		//如果是国外供应商，则把注册地址联系地址的地区基础数据设置为空
			 		if(is_chinese!=0)
			 		{
			 			rec.set('reg_addr_code',null);
			 			rec.set('contact_addr_code',null);
			 		}
			 		var reg_fund=rec.get('reg_fund');
			 		if(reg_fund<=0)
			 		{
			 			Ext.Msg.alert('提示','注册资金不为空且大于零！');
						return;
			 		}
			 		
			 		//前端业务信息数据判断
			 		//银行账号默认值只能设置一个
			 		var bankaccountRecs=buspanel.bankAccountStore.getRange();
			 		var bankDefaultCount=0;
			 		for(var i=0;i<bankaccountRecs.length;i++)
			 		{
			 			var current= bankaccountRecs[i].get('default_id');				
						if(current==true||current==1)
						{
							bankDefaultCount++;
						}
						
			 		}
			 		
					if(bankDefaultCount>1)
					{
						Ext.Msg.alert('提示','银行账号的默认只有一个，请重新设置！');
						return;
					}
					//发票抬头的默认只能设置一个
			 		var invoiceRecs=buspanel.invoicestore.getRange();
			 		var invoiceDefaultCount=0;
			 		for(var i=0;i<invoiceRecs.length;i++)
			 		{
			 			var current= invoiceRecs[i].get('default_id');				
						if(current==true||current==1)
						{
							invoiceDefaultCount++;
						}
						
			 		}
					if(invoiceDefaultCount>1)
					{
						Ext.Msg.alert('提示','发票抬头的默认只有一个，请重新设置！');
						return;
					}
					//设置操作人和操作时间
					//rec.set('operator',erp.UInfo.currentUser.name);
					//rec.set('operater_dt',new Date());
					//厂商类别改成三级联动，最后一级可多选
					/*var materialClass_1=formpanel.down('#materialClass_1');
					var materialClass_2=formpanel.down('#materialClass_2');
			 		var materialClass_3=formpanel.down('#materialClass_3');
			 		
					var mc_id_2_str='';
			 		//第三级可为空
			 		var mc_id_3_str='';
			 		//先清空第二级、第三级存放的store表
			 		formpanel.supplierMaterialSub1Store.removeAll();
			 		
			 		
			 		//第三级下拉不为空,取第三级
					if(!Ext.isEmpty(materialClass_3.value)&&materialClass_3.value.length>0)
					{
			 			mc_id_3_str=materialClass_3.value[0];
			 			for(var i=0;i<materialClass_3.value.length;i++)
			 			{
			 				if(i>0)
			 				{
			 					mc_id_3_str+=','+materialClass_3.value[i];
				 			}
				 			var s_m_model=Ext.create('srm.supplierManager.model.SupplierMaterialSub1',{
				 				mc_id:materialClass_3.value[i],
				 				create_dt:new Date()
				 			});
				 			//将界面上的第三级下拉列表框中选择的选项逐个添加到supplierMaterialInfoStore中
				 			formpanel.supplierMaterialSub1Store.add(s_m_model);
			 			}
			 			
					}
					//取第二级作为最末级材料类别存入关联表中
					else
					{
						if(!Ext.isEmpty(materialClass_2.value)&&materialClass_2.value.length>0)
			 			{
			 				mc_id_2_str=materialClass_2.value[0];
			 				for(var i=0;i<materialClass_2.value.length;i++)
			 				{
			 					if(i>0)
			 					{
			 						mc_id_2_str+=','+materialClass_2.value[i];
			 					}
			 					var s_m_model1=Ext.create('srm.supplierManager.model.SupplierMaterialSub1',{
				 				mc_id:materialClass_2.value[i],
				 				create_dt:new Date()
				 				});
				 				formpanel.supplierMaterialSub1Store.add(s_m_model1);
			 				}
			 			}
					}
					if(mc_id_2_str=='')
					{
						//保存第二级id
						if(!Ext.isEmpty(materialClass_2.value)&&materialClass_2.value.length>0)
			 			{
			 				mc_id_2_str=materialClass_2.value[0];
			 				for(var i=0;i<materialClass_2.value.length;i++)
			 				{
			 					if(i>0)
			 					{
			 						mc_id_2_str+=','+materialClass_2.value[i];
			 					}
			 					
			 				}
			 			}
					}
			 		rec.set('mc_id_1',materialClass_1.value);
			 		rec.set('mc_name_1',materialClass_1.rawValue);
			 		rec.set('mc_id_2',mc_id_2_str);
			 		rec.set('mc_name_2',materialClass_2.rawValue);
			 		rec.set('mc_id_3',mc_id_3_str);
			 		rec.set('mc_name_3',materialClass_3.rawValue);*/
					var reg_fund=rec.get('reg_fund');
			 		//新增保存
					
					if(isAdd)
					{
						//var ownerId=form.down('#owner_id').getValue();
						var count=srm.Const.callServiceMethodSync('supplier/supplierFile.do?method=checkSupplierExistInReg',{
							supplierName:rec.get('cpyname_cn'),company_id:rec.get('owner_id')
						 });
						 if(count>0){
						 	Ext.Msg.alert('提示','当前名称的供应商已存在！');
							return;
						 }
						rec.set("reg_id",formpanel.reg_id);
						//将新增的记录添加到store
						formpanel.store.add(rec);
						//me.grdStore.add(rec);
						formpanel.store.sync({
							success:function(e,batch){
								var newSupplier=batch.operations.create[0];
								if(newSupplier!=null)
								{
									//重新加载新增的供应商信息，包括后台生成的Company_id等后台生成字段信息
									//form.loadRecord(newSupplier);
									/*var array_2=[];
									array_2=newSupplier.get('mc_id_2').split(',');
									formpanel.down('#materialClass_2').setValue(array_2);
									var array_3=[];
									array_3=newSupplier.get('mc_id_3').split(',');
									formpanel.down('#materialClass_3').setValue(array_3);*/
									
									//registerAttchedPanl.company_id=newSupplier.get('company_id');
									//registerAttchedPanl.SaveAttchedData(newSupplier);
									//将新增的供应商Id赋值给供应商材料类别第三级下拉列表store中
									//formpanel.setCIdToSupplierMaterial(newSupplier);
									//业务信息company_id设置
									buspanel.SavebusData(newSupplier);
									
									//业务信息保存数据
									buspanel.devicelistStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						
			 						buspanel.invoicestore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.metarialStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
									buspanel.maincustomerStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.competitorStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
										
										}
			 						});
			 						buspanel.bankAccountStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
										
										}
			 						});
			 						buspanel.goodsStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						/*formpanel.supplierMaterialSub1Store.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});*/
			 						
								}
								//todo:业务信息的保存
								Ext.Msg.alert('提示','新增成功！');
								mainPanel.close();
//								me.grdStore.reload();
							},
							failure : function(batch, options) {
											Ext.Msg.alert('提示', '保存失败!');
											return;
										}
						});
						mainPanel.isAdd=false;
						formpanel.isEdit=true;
						return;
					}
					//修改保存
					else
					{
						var isSync=form.down('#isSync').getValue();
						//formpanel.store.each(function(rec){
							rec.set('isSync',isSync);
	 						//});
						formpanel.store.sync({
							success:function(e,batch){
								
								var updateSupplier=batch.operations.update[0];
								/*formpanel.setCIdToSupplierMaterial(updateSupplier);
								formpanel.supplierMaterialSub1Store.each(function(ss){
			 						  ss.set('supplier_id',updateSupplier.get('supplier_id'));
			 						});
								formpanel.supplierMaterialSub1Store.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});*/
								formpanel.loadBaseData(updateSupplier);
								mainPanel.close();
								me.gridStore.reload();
			 					Ext.Msg.alert('提示','修改成功！');
							},
							failure : function(batch, options) {
								
								Ext.Msg.alert('提示', '保存失败!');
								return;
							}
						});
						
					
					//业务信息保存数据
						            buspanel.devicelistStore.each(function(der){
			 						  der.set('supplier_id',recc.get('supplier_id'));
			 						  der.set('company_id',recc.get('company_id'));
			 						 der.set('isSync',isSync);
			 						});
									buspanel.devicelistStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.invoicestore.each(function(inr){
			 						  inr.set('supplier_id',recc.get('supplier_id'));
			 						 inr.set('company_id',recc.get('company_id'));
			 						 inr.set('isSync',isSync);
			 						});
			 						buspanel.invoicestore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
										
										}
			 						});
			 						buspanel.metarialStore.each(function(mer){
			 						  mer.set('supplier_id',recc.get('supplier_id'));
			 						 mer.set('company_id',recc.get('company_id'));
			 						mer.set('isSync',isSync);
			 						});
			 						buspanel.metarialStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.maincustomerStore.each(function(mr){
			 						  mr.set('supplier_id',recc.get('supplier_id'));
			 						 mr.set('company_id',recc.get('company_id'));
			 						mr.set('isSync',isSync);
			 						});
									buspanel.maincustomerStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.competitorStore.each(function(dr){
										dr.set('supplier_id',recc.get('supplier_id'));
										dr.set('company_id',recc.get('company_id'));
										dr.set('isSync',isSync);
									});
			 						buspanel.competitorStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.bankAccountStore.each(function(bar){
			 						  bar.set('supplier_id',recc.get('supplier_id'));
			 						 bar.set('company_id',recc.get('company_id'));
			 						bar.set('isSync',isSync);
			 						});
			 						buspanel.bankAccountStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						buspanel.goodsStore.each(function(gr){
			 						  gr.set('supplier_id',recc.get('supplier_id'));
			 						 gr.set('company_id',recc.get('company_id'));
			 						gr.set('isSync',isSync);
			 						});
			 						buspanel.goodsStore.sync({
			 							success:function(){
			 								
			 							},
			 							failure : function(batch, options) {
											
										}
			 						});
			 						
			 						//Ext.Msg.alert('提示','修改成功！');
			 						//mainPanel.close();
					}
			 	}
			 	//me.gridStore.loadPage(1);
			 });
			}
		break;
		}
	},
	btnAttchedformAction:function(btn){
		var me = this;
		var attchedPanel=me.getSupplierFileAttchedShow();
		switch(btn.itemId){
		 case 'BTN_UPLOAD':
			 var win =Ext.create('srm.supplierFile.view.SupplierFileAttchedImp',{
					title:'认证文件上传',
					glyph:0xf0f0,
					closable:true,
					store:attchedPanel.registerAttchedStore,
					supplier_id:attchedPanel.supplier_id
				});
				win.show();
		 break;
		};
	},
	save_RegAcount:function(btn){
		var me = this;
		switch(btn.action){
	  	case 'act_save':
	 	var edtWin = me.getMngEditerRegAccount();
	 	var grid=me.getSupplierFile();
	 	me.regstore=Ext.create('srm.basicdata.regAccount.store.MngRegAccout');
	  	//基本信息form
		var form=edtWin.down("form");
		var isAddNew = me.getMngEditerRegAccount().isAddNew;
		//获取界面数据	
		form.updateRecord();
		var rec=form.getRecord();
		if(me.strlen(rec.get("acc_name"))<5||me.strlen(rec.get("acc_name"))>15){
			Ext.Msg.alert('提示', '请输入5-15位字符，可使用字母、汉字(2个字符)、数字、下划线自由组合');
			return;
		}
		var count=srm.Const.callServiceMethodSync('mngregAccount/reAccountServiceBg.do?method=checkRegName',{
			acc_name:rec.get('acc_name'),reg_id:rec.get("reg_id")
		 });
		if(count>0){
		 	Ext.Msg.alert('提示','当前名称的账户名已存在，不能重名！');
			return;
		 }
		if(rec.get('password')!=rec.get('re_password')){	
			Ext.Msg.alert('提示', '确认密码存在与填入的密码不同,请重新输入');
			return;
		}		
		if(form.getForm().isValid()&&form.getForm().isDirty()){
			if(isAddNew){
			me.regstore.add(rec);	
			}else{				
			}			
			me.regstore.sync({
				success:function(e,batch){
					if(isAddNew){
						Ext.Msg.alert('提示', batch.operations.create[0].get("message"));	
						edtWin.close();
						//basePanel.reg_id=batch.operations.create[0].get("reg_id");
						var rec=Ext.create('srm.supplierFile.model.SupplierFile');
						var isAdd=true;
						var isEdit=true;
						var win=Ext.widget('SupplierFileShow',{
							//新增、修改页面
							itemId:'SupplierFileShow',
							title:'新增供应商',
							glyph:0xf234,
							supplierRec:rec,
							reg_id:batch.operations.create[0].get("reg_id"),
							isAdd:isAdd,
							isEdit:isEdit,
							store:grid.getStore(),
							closable:true
						});
						win.show();
						}else{	
						Ext.Msg.alert('提示', batch.operations.update[0].get("message"));
						edtWin.close();
						}										
				},
				failure : function(batch, options) {
					Ext.Msg.alert('提示', '保存失败!');
					return;
				}
			});
		}
	  	break;	
		}
	},
	/**
	 * 检查字符串的长度
	* strlen
	* @param str
	* @returns {Number}
	* @return Number
	* @author chenlong
	* 2016-11-1
	 */
	strlen:function(str){
		var len = 0;
		for(var i = 0;i < str.length; i++){
			if(str.charCodeAt(i)>172 || str.charCodeAt(i)==94){//127-特殊字符及中文   94： 脱字符^
				len += 2;
			}else{
				len++;
			}
		}
		return len;
	}
});
