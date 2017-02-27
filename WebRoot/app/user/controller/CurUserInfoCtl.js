Ext.define('srm.user.controller.CurUserInfoCtl',{
	extend: 'Ext.app.Controller',

	views: [
			'srm.user.view.CurUserInfo',
			'srm.def.ui.plugins.FormKeyMapper'
	        ],
    refs: [
    		{ref : 'userForm',selector : 'curUser_form'},//用户信息表单
    		{ref : 'edt_UserInfo',selector : 'edtCurUserInfo'}
	      ],
	//moduleId:0,
	init: function(){
		//controller只初始化一次
		if(this.isInited) return ;
		var me=this;
		this.control({
			//初始化信息
			'edtCurUserInfo':{
				afterrender:function(){
					var uinfo=srm.UInfo.currentUser.userInfo;
					var user=Ext.create('srm.user.model.UserInfo',{
						u_id:uinfo.u_id,
						sex:uinfo.sex,
						pwd:uinfo.pwd,
						name:uinfo.name,
						modify_dt:uinfo.modify_dt,
						login_id:uinfo.login_id,
						last_login:uinfo.last_login,
						create_dt:uinfo.create_dt,
						birthday:uinfo.birthday,
						nickname:uinfo.nickname,
						email:uinfo.email,
						address:uinfo.address,
						is_valid:uinfo.is_valid,
						login_def:uinfo.login_def,
						tel:uinfo.tel,
						nick_portrait:uinfo.nick_portrait,
						post:uinfo.post,
						company_id:uinfo.company_id,
						cpyname_cn:uinfo.cpyname_cn,
						row_permit:uinfo.row_permit
					});
					var form=me.getUserForm();
					form.loadRecord(user);
				}
			}
		});
		//controller初始化完成
		this.isInited = true;
	}
});