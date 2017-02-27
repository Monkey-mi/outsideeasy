/**
 * 用户基础信息
 */
Ext.define('srm.user.view.CurUserForm',{
    extend:'Ext.form.Panel',
    alias:'widget.curUser_form',
    frame:false,
    plugins:{
          ptype: 'FormKeyMapper'
	 },
	bodyPadding: 10,
    initComponent:function(){
    	var me=this;
    	
    	
    	Ext.apply(me,{
    		layout:'column',
			defaults: {
	          	labelWidth: 80,
	            padding:'4 8 4 8',
				msgTarget : 'side',
				autoFitErrors : true,
	            xtype: 'textfield'
	        },
        	 items:[
		   	  {
		        	 name : 'login_id',
		        	 fieldLabel: '用户ID',
		        	 itemId:'login_id',
		        	 columnWidth:0.5,
		        	 disabled:true
	          },{
	         	  name:'nickname',
	         	  fieldLabel:'昵称',
	         	  columnWidth:0.5,
	         	  itemId:'nickname'
	        },
	        {
	        	 name : 'name',
	        	 itemId:'name',
	        	 fieldLabel: '姓名',
	        	 allowBlank:false,
	        	 columnWidth:0.5
	         },
	         {
	        	 name : 'sex',
	        	 fieldLabel: '性别',
	        	 itemId: 'sex',
	        	 xtype:'combobox',
	        	 store:srm.Util.getCombxStore(srm.Const.SEX_TYPE),
	        	 queryMode: 'local',
	        	 displayField: 'name',
	        	 valueField: 'value',
	        	 columnWidth:0.5,
	        	 forceSelection:true
	         },
	         {
	        	 name : 'birthday',
	        	 fieldLabel: '出生日期',
	        	 itemId: 'birthday',
	        	 columnWidth:0.5,
	        	 xtype:'datefield'
	         },
	         {
	        	 name : 'email',
	        	 fieldLabel: '电子邮箱',
	        	 itemId: 'email',
	        	 columnWidth:0.5,
	        	 vtype:'email'
	         },
	         {
	        	 xtype:'datefield',
	        	 name : 'create_dt',
	        	 disabled:true,
	        	 fieldLabel: '创建日期',
	        	 columnWidth:0.5,
	        	 format:'Y-m-d H:i:s'
	         },
	         {
	        	 xtype:'datefield', 
	        	 name : 'last_login',
	        	 disabled:true,
	        	 fieldLabel: '最近登录',
	        	 columnWidth:0.5,
	        	 format:'Y-m-d H:i:s'
	         }
	   	  ] 
        
    	});
    	me.callParent(arguments);
    }
});