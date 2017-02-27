/**
 * 当前用户信息
 */
Ext.define('srm.user.view.CurUserInfo',{
	extend:'srm.ux.Window',
    alias:'widget.edtCurUserInfo',
    iconCls:'user_comment',
    requires:['srm.user.view.CurUserForm'],
    title:'用户信息',
    height:240,
    width:600,
    modal : true,
    layout:{
     type: 'fit',
     pack: 'start',
     align: 'stretch'
    },
    initComponent:function(){
    	var me=this;
    	var tbar=[
    	{
    	 text:'保存',
    	 glyph:0xf0c7,
    	 action:'ACT_SAVE',
    	 handler: function () {
    	 			var formCmp = me.down("curUser_form");
    	 			if(srm.Util.currentUser.userInfo.name=="admin"){
    	 				Ext.Msg.alert('提醒', '超级管理员信息不可做任何修改');
    	 				return;
    	 			}
    	 			 formCmp.updateRecord();
                    Ext.Msg.confirm('提醒','确认修改用户信息？',function(btn){
						if(btn=='yes'){
			                     var rec=formCmp.getRecord();
			                     srm.Util.currentUser.userInfo.nickname=rec.get('nickname');
			                     srm.Util.currentUser.userInfo.name=rec.get('name');
			                     srm.Util.currentUser.userInfo.sex=rec.get('sex');
			                     srm.Util.currentUser.userInfo.birthdat=rec.get('birthday');
			                     srm.Util.currentUser.userInfo.email=rec.get('email');
								 formCmp.store.add(rec);
								 formCmp.store.sync({
								 success : function(e, batch) {
									Ext.Msg.alert('提醒', '保存成功！');
								},
								failure : function(batch, options) {
								Ext.Msg.alert('提醒', '保存失败！');
								}
						});
					}
					});
					me.close();
                }
    	},
    	{
            text: '退出',
            glyph:0xf057,
            handler:function(btn){
                me.close();
            }
        }
    	];
    	Ext.apply(me,{
    		buttons:tbar,
    		items:[{
				xtype:'curUser_form',
				itemId:'UserInfoForm',
				store:Ext.create('srm.user.store.UserInfos')
    		}]
    	});
    	me.callParent(arguments);
    },
    loadRecord:function(rec){
    	var me=this;
    	me.down('curUser_form').loadRecord(rec);
    }
});
