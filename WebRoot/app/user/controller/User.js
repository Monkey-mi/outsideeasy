Ext.define('srm.user.controller.User', {
	extend: 'Ext.app.Controller',
	requires:['srm.role.store.Roles'
	          ,'srm.user.store.UserRoles'
		      ,'srm.user.store.UserInfos'],
	views:  [
			   'srm.user.view.MngUserInfo'
	         ,'srm.user.view.ChgUserPwd'
	         ,'srm.user.view.UserInfoEditor'
	         ],
	refs:[
		  {ref:'mngPanel',selector:'mng_UserInfo'},
	      {ref:'usergrid',selector:'mng_UserInfo #userinfo_grid'},
	      {ref:'UserModule',selector:'userinfo_editor user_mofun'},
	      {ref:'BaseCtr',selector:'userinfo_editor user_ctr'},
	      {ref:'UserInfoForm',selector:'userinfo_editor userinfo_form'}
	],
	init: function() {
		//该函数将最先执行，甚至先于 appliction.launch
		if(this.isInited) return true;
		//处理所有view上面的交互
		this.control({
			//这里的ComponentQuery字符串中间千万不能有tab等不可见字符，
			//否则IE下会造成脚本运行缓慢,近似死机
			'mng_UserInfo':{
				afterrender: function(){
            		//响应数据提交的错误等
            		this.uStore = this.getUsergrid().getStore();
            		this.uStore.load();
            		this.ugrStore=Ext.create('srm.user.store.UserRoles');
            		this.ugrStore.load();
            		this.rStore=Ext.create('srm.role.store.Roles');
            		this.rStore.load();
            	}
			},
			'mng_UserInfo #userinfo_grid': {
				
                //响应用户清单表格上的鼠标双击事件
                itemdblclick: this.onItemdbclik
               
            },
            'mng_UserInfo button': {
            	//响应用户清单表界面上所有按钮点击事件
                click: this.onBtnClick
            },
            'user_mofun treepanel':{
            checkchange:this.UserModuleCheckChange
            },
            'userinfo_editor button':{
            	click:this.userEditorBtnClick
            },
            //'edt_ChgUserPwd button[action="ACT_ACCEPT"]':{
            'edt_ChgUserPwd button':{
            	click:this.onChgUserPwd
            }
        });
		this.isInited = true;
	},
	
	onLaunch: function(){
		//这个函数将在viewport被创建以后执行,准确时间是appliction.launch 执行以后
	},
	onChgUserPwd: function(btn,event){
		var win = btn.up('edt_ChgUserPwd');
		if(btn.action=='ACT_ACCEPT'){
		
		form = win.down('form');
	    if(form.getForm().isValid()){
	    	var userInfo = Ext.create('srm.user.model.UserInfo');
	    	var uStore = Ext.create('srm.user.store.UserInfos');
	    	uStore.proxy.api.update='common/Users.do?method=updateUserPwd';
	    	userInfo.set('login_id',form.getForm().findField('login_id').getValue());
	    	userInfo.set('pwd',form.getForm().findField('new_pwd1').getValue());
	    	//借用一下name字段来校验原密码
	    	if(win.isResetPwd)
	    		userInfo.set('name',null);
	    	else{
		    	userInfo.set('name',form.getForm().findField('pwd').getValue());
		    	userInfo.set('name',srm.Const.MD5(userInfo.get('name')));
	    	}
	    	//密码先做MD5处理
	    	userInfo.set('pwd',srm.Const.MD5(userInfo.get('pwd')));
	    	//修改密码后，如第一次登陆则添加登陆时间
	    	//表示密码已经修改过了。
	    	if (Ext.isEmpty(srm.UInfo.currentUser.userInfo.last_login)){
	    		userInfo.set('last_login',new Date());
	    	}
	    	//提交
	    	userInfo.phantom = false;
//	    	userInfo.setDirty();
	    	uStore.add(userInfo);
	    	uStore.sync();
	    	win.close();
		}
		}else{
			if (!Ext.isEmpty(srm.UInfo.currentUser.userInfo.last_login)){
				win.close();
			}else{
			  Ext.Msg.confirm("提示","你确定要退出系统吗?",function(btn){
			  	if (btn=="yes"){
			  		srm.Const.doLogout();
			  	}
			  });
			}
		}
		 
	},
	onItemdbclik: function(view, record) {
		//=============界面操作权限相关======================================
		//因为鼠标双击所在行代表修改操作，需要先检查操作权限
		if(!view.up('mng_UserInfo').modFuncsDisabled[srm.Const.FUNC_ITEMID_BTN_EDT])
			this.doEditUser(true);
    },
    onBtnClick: function(btn,event){
		//=============界面操作权限相关======================================
		//需要先检查操作权限
		var me = this;
		if(!btn.up('mng_UserInfo').modFuncsDisabled[btn.itemId])
			switch(btn.itemId){
				case srm.Const.FUNC_ITEMID_BTN_ADD:
	    			me.doAddUser();
	    			break;
				case srm.Const.FUNC_ITEMID_BTN_EDT:
					me.doEditUser(true);
					break;
				case srm.Const.FUNC_ITEMID_BTN_DEL:
					me.doDelUser();
					break;
	    		case srm.Const.FUNC_ITEMID_BTN_REFRESH:
		    		this.uStore.load();
		    		break;
	    		case srm.Const.FUNC_ITEMID_BTN_RESET:
	    			this.doResetPwd();
		    		break;
	    	}
	},
	doResetPwd:function(){
		//需要做一些逻辑检查
		var selModel = this.getUsergrid().getSelectionModel();
		if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
		}
		var rec =selModel.getSelection()[0];
		var edtWin = Ext.widget('edt_ChgUserPwd',{isResetPwd:true});
		var form = edtWin.down('form');
		form.getForm().findField('login_id').setValue(rec.get('login_id'));
		form.getForm().findField('name').setValue(rec.get('name'));
		edtWin.show();
		
	},
	doAddUser:function(){
		var me=this;
		var	rec = Ext.create('srm.user.model.UserInfo');
		var edtWin = Ext.widget('userinfo_editor',{isAddNew:true,isEdit:true,currentUser:rec,store:me.uStore,itemId:'edt_User'});
		edtWin.show();
	},
	doEditUser:function(isEdit){
		//需要做一些逻辑检查
		var me=this;
		var selModel = this.getUsergrid().getSelectionModel();
		if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
		}
		var rec =selModel.getSelection()[0];
		var edtWin = Ext.widget('userinfo_editor',{isAddNew:false,isEdit:isEdit,currentUser:rec,store:me.uStore,itemId:'edt_User'});
		edtWin.show();
	}, 
	doDelUser:function(){
		//删除前需要做一些逻辑检查
		var me = this;
		var selModel = me.getUsergrid().getSelectionModel();
		if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
		}
		var rec=selModel.getSelection()[0];
		Ext.Msg.confirm('提示','你确信要删除用户['+rec.get('name')+']吗?',
				function fn(id){
			      if(id==Ext.Msg.buttonIds[1]){
		    	      me.uStore.remove(rec);
			  		  me.uStore.sync();
			      }
		});
	},
	/**
	 *用户维护界面按钮点击响应 
	 */
	userEditorBtnClick:function(btn){
		var me=this;
		switch(btn.action){
			case 'ACT_SAVE':
			me.UserSave();
			break;
		}
	},
	/**
	 * 用户信息保存
	 */
	UserSave:function(){
		var me=this;
		var userctr=me.getBaseCtr();
		var form=this.getUserInfoForm();
		
		if(form.getForm().isValid()&&form.getForm().isDirty()){
			var rec=form.getRecord();
			form.updateRecord(rec);
			if(form.store.indexOf(rec)<0){
			    rec.set('pwd',srm.Const.MD5(rec.get('pwd')));
	    		form.store.add(rec);
		        form.store.sync({
					success:function(e,batch){
						var newUser=batch.operations.create[0];
						form.loadRecord(newUser);
						userctr.currentUser=newUser;
						//me.getOrgdeptAuth().SaveCtr(newUser.get('u_id'));
						userctr.SaveCtrs(newUser.get('u_id'));
						form.store.sort();
                        form.modeChange();
						Ext.Msg.alert('提示','保存成功!');
					},
					failure:function(batch,options){
                        Ext.Msg.alert('提示','保存失败!');
                    }
    			});
    		}else{
                    this.uStore.sync();
        			userctr.SaveCtrs();
        			this.uStore.sort();
        			Ext.Msg.alert('提示','保存成功!');
        			
    		}
		}
		
	},
	/**
	 * 用户模块，选择变化方法
	 */
	UserModuleCheckChange:function(model,checked,eopt){
		var me=this;
		var panel=me.getUserModule();
		switch(checked){
			case true:
			panel.checked(model);
			break;
			case false:
			panel.unchecked(model);
			break;
		}
	}
});