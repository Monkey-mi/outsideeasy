Ext.define('srm.util.UInfo',{
	requires: ['srm.supplier.model.SupplierFile'],
	currentUser:{},
	init:function(callbackFn){
		this.getLoginInfo(callbackFn);
	},
	getLoginInfo:function(callbackFn){
		var me=this;
		//加载用户登录信息
		Ext.Ajax.request({
			url:'common/Users/getLoginInfo.do',
			method:'POST',
			async:false,		//同步
			callback:function(options,success,resp){
				var retObj = Ext.decode(resp.responseText);
				if(retObj[srm.Const.AJAX_ERR_CODE] == srm.Const.AJAX_ERR_CODE_999_SessionTimeOut ){
				    //在未登录状态下执行的
					return;
				}
				if(retObj.success){
					var recs=retObj[srm.Const.AJAX_DATA_ROOT];
					if(recs[0]){
						me.currentUser =me.currentUser||{};
						me.currentUser.userInfo=recs[0];
						me.currentUser.loginId =recs[0].login_id;
						me.currentUser.name =recs[0].name;
						me.currentUser.u_id=recs[0].u_id;
						srm.Util.currentUser=me.currentUser;
					}
					//加载用户的角色信息
					if(recs[1]){
						me.currentUser.roleList = recs[1];
						//定义角色查询方法
						me.currentUser.hasRole = function(roleName){
							var ret = false;
							Ext.each(recs[1],function(roleData){
								 //Ext.log('role_name='+roleData.role_name+',roleName='+roleName);
							     if(roleData.role_name == roleName){
							     	ret = true;
                                    return false;
                                }
							});
							return ret;
						};
						//是否为管理员
						me.currentUser.isAdmin = me.currentUser.hasRole(srm.Const.SUPER_ROLE);
						me.isAdmin = me.currentUser.isAdmin;
					}
					//IP地址
					if(recs[2]){
						srm.IP = me.currentUser.IP = recs[2];
					}
					//默认组织
					me.currentUser.defaultOrg = recs[3] || {};
					srm.getDefaultOrg = me.currentUser.getDefaultOrg = function(){
						return me.currentUser.defaultOrg;
					};
				
					srm.getDefaultOuCode = me.currentUser.getDefaultOuCode = function(){
						return me.currentUser.getDefaultOrg().ou_code;
					};
					if(Ext.isEmpty(recs[0].company_id) || recs[0].company_id==0){
						//Ext.Msg.alert('提示','尚未关联供应商，请先到账号管理中完善公司信息');
						Ext.Msg.confirm('提示','尚未关联供应商，是否马上到账号管理中完善公司信息?',function(btn){
			 				if(btn=='yes')
			 				{
			 					//跳转到账号管理界面
			 					srm.Util.loadModule('10');
			 				}
						});
						
					}else{
						//加载供应商
						Ext.Ajax.request({
							url:'supplier/supplierFile.do?method=getSupplierFileByID',
							method:'POST',
							params: {
								company_id:recs[0].company_id
							},
							async:false,		//同步
							callback:function(options,success,resp){
								var retObj2 = Ext.decode(resp.responseText);
								if(retObj2.success && !Ext.isEmpty(retObj2.data) && retObj2.data.length>0){
									me.currentUser.supplier=Ext.create('srm.supplier.model.SupplierFile',retObj2.data[0]);
								}
							}
						});
					}
					
					//回调函数
					if(!Ext.isEmpty(callbackFn)&&Ext.isFunction(callbackFn)){
							Ext.callback(callbackFn,me);
					}
				}
			}
		});
	}
},function(){
    srm.UInfo = srm.util.UInfo = new this();
});
