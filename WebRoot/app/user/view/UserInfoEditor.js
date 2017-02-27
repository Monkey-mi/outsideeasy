/**
 * 用户综合维护
 */
Ext.define('srm.user.view.UserInfoEditor',{
	extend:'srm.ux.Window',
    alias:'widget.userinfo_editor',
    requires:['srm.user.view.UserInfoForm'
              	  ,'srm.user.view.BaseUserCtr'
              	  ],
    glyph:0xf007,
    title:'用户信息',
    width:800,
    layout:{
     type: 'hbox',
     pack: 'start',
     align: 'stretch'
    },
    initComponent:function(){
    	var me=this;
    	Ext.apply(me,{
    	 items:[
    	 {
    	   flex:1,
    	   items:[
    	   {
        	 	xtype:'userinfo_form',
        	 	isEdit:me.isEdit,
        	 	isAddNew:me.isAddNew,
        	 	store:me.store,
        	 	flex:1
    	   }
    	   ]
    	 },{  
    	 	xtype:'user_ctr',
    	 	isEdit:me.isEdit,
//    	 	disabled:me.currentUser.isAdmin,
    	 	isAddNew:me.isAddNew,
    	 	currentUser:me.currentUser,
    	 	flex:1
    	 }
    	 ],
    	 buttons:[
    	{
    	 text:'保存',
    	 glyph:0xf0c7,
    	 hidden:!me.isEdit,
    	 action:'ACT_SAVE'
    	},
    	{
            text: '退出',
            glyph:0xf057,
            handler:function(btn){
                var me=btn.up('userinfo_editor');
                me.close();
            }
        }
    	]
    	});
    	me.callParent(arguments);
    	me.loadRecord(me.currentUser);
    	me.down('userinfo_form').promise=me.down('user_ctr').createPromise(me.createSavePromise());
    },
    /**
     * 构建执行队列
     * @return {}
     */
    createSavePromise:function(){
    	var me=this;
    	var promise=me.promise=new srm.DataUtil.Promise();
    	var form=me.down('userinfo_form');
    	var ctr=me.down('user_ctr');	
    	return promise.then(function(){
    	    var returnPromise=new srm.DataUtil.Promise();
    	    if(form.getForm().isValid()&&form.getForm().isDirty()){
    	    	var rec=form.getRecord();
    	    	form.getForm().updateRecord(rec);
    	    	if(form.store.indexOf(rec)<0){
    	    		form.store.add(rec);
    	    	}
    	    	if(form.store.getUpdatedRecords()||form.store.getNewRecords()){
	    	    	form.store.sync({
	    	    	  success:function(a,b){
	    	    	  	/*	*/
	    	    	  	form.loadRecord(newuser);
	    	    	  	returnPromise.resolve(newuser.get('u_id'));
	    	    	  }
	    	    	});
    	    	}else{
    	    		returnPromise.resolve(newuser.get('u_id'));
    	    	}
    	    	form.store.sort();
    	    }
    	    return returnPromise;
    	});
    },
    /**
     * 载入数据
     * @param {} rec
     */
    loadRecord:function(rec){
    	var me=this;
    	me.down('userinfo_form').loadRecord(rec);
    }
});
