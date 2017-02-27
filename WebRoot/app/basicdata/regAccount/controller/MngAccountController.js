/**
 * 注册账户
 */
Ext.define('srm.basicdata.regAccount.controller.MngAccountController', {
   extend : 'Ext.app.Controller',
	requires : [
				'srm.ux.PagingBar',				
				'srm.basicdata.regAccount.store.MngRegAccout',
				'srm.basicdata.regAccount.store.MngSubAccount',
				'srm.basicdata.regAccount.store.MngCompany',
				'srm.basicdata.regAccount.store.MngRegCompany',
				'srm.basicdata.regAccount.store.MngCompanyInfo'
				],
	views:[
				'srm.basicdata.regAccount.view.MngAccountManager',
			    'srm.basicdata.regAccount.view.MngSubAccountInfo',
			    'srm.basicdata.regAccount.view.MngAccountRole',
			    'srm.basicdata.regAccount.view.MngRegCompanyInfo',
			    'srm.basicdata.regAccount.view.MngEditerRegAccount'
	],
	refs:[
	            {ref:'mngAccountManager',selector:'mngAccountManager'},
	            {ref:'mngSubAccountInfo',selector:'mngSubAccountInfo'},
	            {ref:'mngAccountRole',selector:'mngAccountRole'},
	            {ref:'mngRegCompanyInfo',selector:'mngRegCompanyInfo'},
	            {ref:'mngEditerRegAccount',selector:'mngEditerRegAccount'},
	],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			/*
			 *主账户grid的初始化 
			 */
			'mngAccountManager':{
				afterrender:function(cmp){	
					me.panel=me.getMngAccountManager();
					me.regstore = me.panel.regstore;
					me.substore = me.panel.substore;
					me.suppliestore = me.panel.suppliestore;	
					me.regstore.load();																							
				}
			},
			/*
			 * 释放缓存值
			 */
			beforedestroy:function(){
				delete me.store.proxy.extraParams.condition;	
				delete me.store.proxy.extraParams.apply_sts;				
			},
			
			/**
			 *点击账户查询子账户
			 */
			'mngAccountManager #grid_head':{
				selectionchange:function(grid,recs){
					if(recs.length>0){				
						me.doShowSubAccount(recs[0]);
						//按钮可用
						me.setBtnStatus(false);	
					}else{
						//按钮不可用
						me.setBtnStatus(true);
						
					}
				},			
			},
			/**
			 *点击子账户显示按钮
			 */
			'mngAccountManager #grid_account':{
				selectionchange:function(grid,recs){
					if(recs.length>0){				
						//按钮可用
						me.setsubBtnStatus(false);	
					}else{
						//按钮不可用
						me.setsubBtnStatus(true);
						
					}
				},
				/**
				 * 双击编辑子账号
				* itemdblclick
				* @param grid
				* @param rec
				* @return void
				* @author chenlong
				* 2016-10-31
				 */
				itemdblclick : function(grid, rec) {
					me.doAccessApplication(rec);//子账号的显示
				}
			},
			/**
			 * 账号下的公司的显示
			 */
			'mngAccountManager #grid_supplies':{
				itemdblclick : function(grid, rec) {
					me.doAccessCompanyInfo(rec);//公司的显示
				}
			},
			/**
			 * 主账号进行查询和刷新
			 */
	        'mngAccountManager #grid_head button':{	
	        	//单击查询关联的子账号和公司
	           click:me.doSearchAccount
	        },

	        /**
			 * 主账号进行查询和刷新
			 */
	        'mngAccountManager #grid_head  #search':{	        	
	         //查询框回车事件
				'keypress':function(field,key)
				{
					if(key.getKey()==13)
					{
						var condition=me.panel.down('#search').getValue();
						var apply_stsSearch=me.panel.down('#state_search').getValue();
						me.regstore.proxy.extraParams.condition=condition;
						me.regstore.proxy.extraParams.apply_sts=apply_stsSearch;
						me.regstore.loadPage(1);
						me.substore.removeAll();
						me.suppliestore.removeAll();
					}
				}
	        },
			/**
			 * 进行查询和刷新
			 */
	        'mngAccountManager #grid_account button':{
	           click:me.dosubSole
	        },
	        /**
	         * 保存子账号
	         */
	        'mngSubAccountInfo #grid_heads button':{
	        	click:me.save_sub
	        },
	        /**
	         * 保存子账号和供应商的关系
	         */
	        'mngAccountRole #gridRegSupplier button':{
	        	click:me.save_SubSupplier
	        },
	        /**
	         * 保存子账号和公司之间的关系
	         */
	        'mngAccountRole #grid_company button':{
	        	click:me.save_SubCompany
	        },
	        /**
	         * 保存子账号和权限之间
	         */
	        'mngAccountRole #grid_role button':{
	        	click:me.save_SubRole
	        },
	        'mngEditerRegAccount button':{
	        	click:me.save_RegAcount
	        }
		});
		me.isInited=true;
	},
	/**
	 * 保存主账号
	* save_RegAcount
	* @param btn
	* @return void
	* @author chenlong
	* 2016-11-1
	 */
	save_RegAcount:function(btn){
		var me = this;
		switch(btn.action){
	  	case 'act_save':
	 	var edtWin = me.getMngEditerRegAccount();
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
	},
	/**
	 * 分配供应商
	* save_SubSupplier
	* @param btn
	* @return void
	* @author chenlong
	* 2016-10-26
	 */
	save_SubSupplier:function(btn){
		var me = this;
		switch(btn.action){
	  	case 'act_save':
	  	var grid= me.getMngAccountRole().down('#gridRegSupplier');
	  	var access_array = [];	
	    var recs = grid.getSelectionModel().getSelection();	
	    for(var i=0;i<recs.length;i++)
		{			
			access_array.push(recs[i].get("supplier_id"));
		}
	  	Ext.Msg.confirm("提示", "保存现在分配好的供应商吗？", function(btn) {
		 if (btn == "yes") {		
		 var json=srm.Const.callServiceMethodSync('mngsubAccount/reAccountServiceBg.do?method=updateSubAccoutForSubSupplier',{//json去的是data[]中的数据
			access_array:access_array.join(','),
			sa_id:me.getMngAccountRole().sa_id
	     });    
			if(json =="success"){
			    Ext.Msg.alert('提示',"分配供应商成功");
			    return ;
			}else{
				Ext.Msg.alert('提示',"系统错误！");
		        return ;
			}
		 }
		 });
		}		
	},
	/**
	 * 分配公司
	* save_SubSupplier
	* @param btn
	* @return void
	* @author chenlong
	* 2016-10-26
	 */
	save_SubCompany:function(btn){
		var me = this;
		switch(btn.action){
	  	case 'act_save':
	  	var grid= me.getMngAccountRole().down('#grid_company');
	  	var access_array = [];	
	    var recs = grid.getSelectionModel().getSelection();	
	    for(var i=0;i<recs.length;i++)
		{			
			access_array.push(recs[i].get("company_id"));
		}
	  	Ext.Msg.confirm("提示", "保存现在分配好的公司吗？", function(btn) {
		 if (btn == "yes") {		
		 var json=srm.Const.callServiceMethodSync('mngsubAccount/reAccountServiceBg.do?method=updateSubAccoutForSubCompany',{//json去的是data[]中的数据
			access_array:access_array.join(','),
			sa_id:me.getMngAccountRole().sa_id
	     });    
			if(json =="success"){
			    Ext.Msg.alert('提示',"分配公司成功");
			    return ;
			}else{
				Ext.Msg.alert('提示',"系统错误！");
		        return ;
			}
		 }
		 });
		}		
	},
	/**
	 * 分配角色
	* save_SubSupplier
	* @param btn
	* @return void
	* @author chenlong
	* 2016-10-26
	 */
	save_SubRole:function(btn){
		var me = this;
		switch(btn.action){
	  	case 'act_save':
	  	var grid= me.getMngAccountRole().down('#grid_role');
	  	var access_array = [];	
	    var recs = grid.getSelectionModel().getSelection();	
	    for(var i=0;i<recs.length;i++)
		{			
			access_array.push(recs[i].get("role_id"));
		}
	  	Ext.Msg.confirm("提示", "保存现在分配好的角色吗？", function(btn) {
		 if (btn == "yes") {		
		 var json=srm.Const.callServiceMethodSync('mngregAccount/reAccountServiceBg.do?method=updateSubAccoutForSubRole',{//json去的是data[]中的数据
			access_array:access_array.join(','),
			sa_id:me.getMngAccountRole().sa_id
	     });    
			if(json =="success"){
			    Ext.Msg.alert('提示',"分配角色成功");
			    return ;
			}else{
				Ext.Msg.alert('提示',"系统错误！");
		        return ;
			}
		 }
		 });
		}		
	},
	/**
	 * 添加子账号
	* save_sub
	* @param btn
	* @return void
	* @author chenlong
	* 2016-10-25
	 */
	save_sub:function(btn){
		 var me = this;
		  switch(btn.action){
		  	case 'act_save':
		  	var edtWin = me.getMngSubAccountInfo();
		  	//基本信息form
			var form=edtWin.down("form");
			var isAddNew = me.getMngSubAccountInfo().isAddNew;
			//获取界面数据	
			form.updateRecord();
			var rec=form.getRecord();	
			rec.set("reg_id",me.getMngSubAccountInfo().reg_id);
			var count=srm.Const.callServiceMethodSync('mngsubAccount/reAccountServiceBg.do?method=checkSubName',{
				sa_names:rec.get('sa_names'),sa_name:rec.get('sa_name'),sa_id:rec.get("sa_id")
			 });
			if(count>0){
			 	Ext.Msg.alert('提示','当前名称的子账号已存在，不能重名！');
				return;
			 }
			var count1=srm.Const.callServiceMethodSync('mngsubAccount/reAccountServiceBg.do?method=checkEmpNo',{
				reg_id:rec.get('reg_id'),emp_no:rec.get("emp_no"),sa_id:rec.get("sa_id")
			 });
			if(count1>0){
			 	Ext.Msg.alert('提示','当前员工工号已存在，不能重复！');
				return;
			 }
			if(form.getForm().isValid()&&form.getForm().isDirty()){
				if(isAddNew){
				me.substore.add(rec);	
				}else{				
				}				
				me.substore.sync({
					success:function(e,batch){
						if(isAddNew){
							Ext.Msg.alert('提示', batch.operations.create[0].get("message"));	
							edtWin.close();
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
	 * 显示子账号的
	* doAccessApplication
	* @param rec
	* @return void
	* @author chenlong
	* 2016-10-14
	 */
	doAccessApplication:function(rec){	
		var me = this;
		var grid= me.panel.down('#grid_head');
  		var recs =  grid.getSelectionModel().getSelection();
  		var sa_namebu = rec.get('sa_name');
  		rec.set("sa_names",rec.get('sa_name').substr(parseInt(rec.get('sa_name').indexOf(":"))+1));
  		rec.set("sa_name",recs[0].get('acc_name')+":");
		var edtWin = Ext.widget('mngSubAccountInfo',{
			isAddNew: false	,
			reg_id:recs[0].get('reg_id'),
			acc_name:recs[0].get('acc_name'),
			ac_titie:'修改子账号'
		});
		edtWin.organizstore.load();
		edtWin.loadData(rec);
		edtWin.show();
		rec.set("sa_name",sa_namebu);
	},
	/**
	 * 查看公司的详细信息
	* doAccessCompanyInfo
	* @param rec
	* @return void
	* @author chenlong
	* 2016-10-31
	 */
	doAccessCompanyInfo:function(rec){	
		var me = this;
		var ac_titie = rec.get('cpyname_cn')+"信息";		
		var edtWin = Ext.widget('mngRegCompanyInfo',{
			isAddNew: false	,
			ac_titie:ac_titie,
		});
		edtWin.loadData(rec);
		edtWin.show();
	},
	/**
	 *进行主账号button
	 */
	doSearchAccount:function(btn){
	  var me = this;
	  switch(btn.itemId){
		  	case 'btn_reflash':
		    me.regstore.loadPage(1); 
		  	break;
	  	case 'btn_search':
			var condition=me.panel.down('#search').getValue();
			var apply_stsSearch=me.panel.down('#state_search').getValue();
			me.regstore.proxy.extraParams.condition=condition;
			me.regstore.proxy.extraParams.apply_sts=apply_stsSearch;
			me.regstore.loadPage(1); 
			me.substore.removeAll();
			me.suppliestore.removeAll();
	  	    break;
	  	case 'btn_addRegAcc':
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
	  		break;
	  	case 'btn_AuditPass':
	        me.doAccesssReview(1,"grid_head");//启用
	  	    break;
	  	case 'btn_AuditUnPass':
	  		me.doAccesssReview(0,"grid_head");//禁用
	  	    break;
	  }
	},
	/**
	 * 对子账号的操作
	* dosubSole
	* @param btn
	* @return void
	* @author chenlong
	* 2016-10-26
	 */
	dosubSole:function(btn){
		 var me = this;
		  switch(btn.itemId){
			case 'add_operto'://添加子账号
				var grid= me.panel.down('#grid_head');
				var rec=Ext.create('srm.basicdata.regAccount.model.MngSubAccount');
		  		var recs =  grid.getSelectionModel().getSelection();
		  		var	mm  = recs[0].get("acc_name")+":";
		  		var pass_mess = '<font color="red">'+'【 默认密码：666888】'+'</font>';
		  		var edtWin = Ext.widget('mngSubAccountInfo',{
					isAddNew: true	,
					re_name:mm,
					reg_id:recs[0].get('reg_id'),
					acc_name:recs[0].get('acc_name'),
					pass_mess : pass_mess,
					ac_titie:'添加子账号'
				});	 
		  		edtWin.loadData(rec);
				edtWin.show();			
			  	break;
		  	case 'company_operto':
		  		var grid= me.panel.down('#grid_head');
		  		var grid2= me.panel.down('#grid_account');
		  		var rec =  grid2.getSelectionModel().getSelection();
				var recModel = grid.getSelectionModel();	
				var recs = recModel.getSelection();//有可能多选	
				
		  		var edtWin = Ext.widget('mngAccountRole',{
					isAddNew: true	,
					reg_id:recs[0].get('reg_id'),
					role_id:recs[0].get('role_id'),
					sa_id:rec[0].get('sa_id'),
					regSupplierstore:me.regSupplierstore,
					regCompanystore:me.regCompanystore,
					regRolestore:me.regRolestore,
					sub_name:rec[0].get('sa_name')
				});		
				edtWin.show();
			  	break;
		  	case 'btn_AuditsubPass':
		  		me.doAccesssReview(1,"grid_account");
		  		break;
		  	case 'btn_AuditsubunPass':
		  		me.doAccesssReview(0,"grid_account");
		  	case 'reset_Password':
		  		me.resetSubPassword();
		  }
	},
	resetSubPassword:function(){
		var me = this;
		var panel=me.getMngAccountManager();
		var grid= panel.down("#grid_account");	
		var recModel = grid.getSelectionModel();	
		var recs = recModel.getSelection();//有可能多选
		if(!recModel.hasSelection()){
				Ext.Msg.alert('提示', '请至少选择一条数据!');
				return false;
			}
		 var name_array = [];
		 for(var i=0;i<recs.length;i++)
			{			
				name_array.push(recs[i].get("sa_name"));
			}
		 Ext.Msg.confirm("提示", "真的要重置密码选中的"+"["+recs.length+"]"+"个账号吗!重置后密码为666888", function(btn) {
				if (btn == "yes") {		
					var json=srm.Const.callServiceMethodSync('mngsubAccount/reAccountServiceBg.do?method=updateMngSubAccoutForReset',{//json去的是data[]中的数据
					name_array:name_array.join(',')
			     });    
					if(json =="success"){
					    Ext.Msg.alert('提示',"操作成功");
					    return ;
					}else{
						Ext.Msg.alert('提示',"系统错误！");
				        return ;
					}
				}
			});
	},
	/**
	* doAccesssReview 账号进行启用或禁用
	* @returns {Boolean}
	* @return Boolean
	* @author chenlong
	* 2016-8-3
	 */
	doAccesssReview:function(boo,vecbod){
		  var me = this;
		  var panel=me.getMngAccountManager();
		  var grid= panel.down("#"+vecbod);	
		  var recModel = grid.getSelectionModel();	
		  var recs = recModel.getSelection();//有可能多选
		  if(!recModel.hasSelection()){
				Ext.Msg.alert('提示', '请至少选择一条数据!');
				return false;
			}
		  var access_array=[];
		  var rsrc = "";		  
		  if(vecbod == "grid_head"&&parseInt(boo)==1){
			rsrc = 'mngregAccount/reAccountServiceBg.do?method=updateMngRegAccoutForID';
			for(var i=0;i<recs.length;i++)
			{			
				access_array.push(recs[i].get("reg_id"));
			}
		    me.accessPass(access_array,recs,rsrc);
		  }else if(vecbod == "grid_head"&&parseInt(boo)==0){
			rsrc = 'mngregAccount/reAccountServiceBg.do?method=updateMngRegAccoutForID2'; 
			for(var i=0;i<recs.length;i++)
			{			
				access_array.push(recs[i].get("reg_id"));
			}
			me.accessNoPass(access_array,recs,rsrc); 
		  }else if(vecbod == "grid_account"&&parseInt(boo)==1){
			rsrc = 'mngsubAccount/reAccountServiceBg.do?method=updateMngSubAccoutForID';
			for(var i=0;i<recs.length;i++)
			{			
				access_array.push(recs[i].get("sa_id"));
			}
			me.accessPass(access_array,recs,rsrc);
		  }
		  else if(vecbod == "grid_account"&&parseInt(boo)==0){
			rsrc = 'mngsubAccount/reAccountServiceBg.do?method=updateMngSubAccoutForID2';
			for(var i=0;i<recs.length;i++)
			{			
				access_array.push(recs[i].get("sa_id"));
			}
			me.accessNoPass(access_array,recs,rsrc);
		}		  			 
	},
	/**
	* accessPass 启用主账号
	* @param access_array
	* @return void
	* @author chenlong
	* 2016-8-4
	 */
	accessPass:function(access_array,recs,rsrc){
		 var me = this;
		 Ext.Msg.confirm("提示", "真的要启用选中的"+"["+recs.length+"]"+"个账号吗?", function(btn) {
				if (btn == "yes") {		
					var json=srm.Const.callServiceMethodSync(rsrc,{//json去的是data[]中的数据
					access_array:access_array.join(',')	       
			     });    
					if(json =="success"){
					    Ext.Msg.alert('提示',"操作成功");
					    for(var i=0;i<recs.length;i++)
						{			
							recs[i].set("enabled",0);
						}
				        return ;
						}else{
						Ext.Msg.alert('提示',"系统错误！");
				        return ;
					}
				}
			});
	},
	/**
	* accessNoPass  禁用账号
	* @param access_array
	* @return void
	* @author chenlong
	* 2016-8-4
	 */
	accessNoPass:function(access_array,recs,rsrc){
		 var me = this;
		 Ext.Msg.confirm("提示", "真的要禁用选中的"+"["+recs.length+"]"+"个账号?", function(btn) {
				if (btn == "yes") {		
					var json=srm.Const.callServiceMethodSync(rsrc,{//json去的是data[]中的数据
					access_array:access_array.join(',')	       
			     });    
					if(json =="success"){
					    Ext.Msg.alert('提示',"操作成功");
					    for(var i=0;i<recs.length;i++)
						{			
							recs[i].set("enabled",1);
						}
				        return ;
						}else{
						Ext.Msg.alert('提示',"系统错误！");
				        return ;
					}
				}
			});
	},
	
	/**
	 * 点击账户查询子账户
	 * @param {} btn
	 */
	doShowSubAccount:function(recs){
      var me = this;
	  me.substore.load({
			params:{reg_id:recs.get('reg_id')}
		});
	  me.suppliestore.load({
			params:{reg_id:recs.get('reg_id')}
		});
	  },
	//主账号管理页面按钮可不可见
	setBtnStatus:function(sts)
	{
		var me=this;
		var panel=me.getMngAccountManager();
		panel.down("#add_operto").setDisabled(sts);
		panel.down('#btn_AuditPass').setDisabled(sts);
		panel.down('#btn_AuditUnPass').setDisabled(sts);
	},
	//主账号管理页面按钮可不可见
	setBtnStatus2:function(sts)
	{
		var me=this;
		var panel=me.getMngAccountManager();
		panel.down('#btn_AuditPass').setDisabled(sts);
		panel.down('#btn_AuditUnPass').setDisabled(sts);
	},
	//子账号管理页面按钮可不可见
	setsubBtnStatus:function(sts)
	{
		var me=this;
		var panel=me.getMngAccountManager();
		panel.down('#company_operto').setDisabled(sts);
		panel.down('#btn_AuditsubPass').setDisabled(sts);
		panel.down('#btn_AuditsubunPass').setDisabled(sts);
		panel.down('#reset_Password').setDisabled(sts);
	},

});