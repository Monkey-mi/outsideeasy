Ext.define('srm.basicdata.regAccount.view.MngSubAccountInfo',{
	extend:'srm.ux.Window',
	alias:'widget.mngSubAccountInfo',
	requires : [
	            'srm.ux.SearchCombobox'
	            ],
	width:400,
    height:320,
    modal : true,
	
	initComponent:function(){
		var me=this;
		me.organizstore = Ext.create('srm.basicdata.regAccount.store.MngOrganizated');	
		me.organizstore.proxy.extraParams.reg_id = me.reg_id;	
		Ext.apply(me,{
			title:me.acc_name,
			layout:{		
				type:'border',
    			padding :2				
			},
			items:[{
				region:'center',
				xtype:'form',
				title:me.ac_titie,
				bodyPadding: 10,
				itemId:'grid_heads',
				store:me.store,
				layout: 'column',
				buttons:[{
					xtype: 'displayfield',
					itemId: 'tips',
					value: me.pass_mess,
					width:150},{text:'保存',action:'act_save'}],
				
	       		defaults:{labelWidth:80,xtype:'textfield',padding:3},
				items:
				[	
					{fieldLabel:'用户名',name:'username',columnWidth:1,allowBlank:false,maxLength:20},
					{fieldLabel:'手机号',name:'phone',regex: /^1[3|4|5|8][0-9]{9}$/,columnWidth:1,allowBlank:false,maxLength:20},
					{fieldLabel:'子帐号名称',readOnly:true,name:'sa_name',maxLength:20,value:me.re_name,columnWidth:0.6,allowBlank:false},{fieldLabel:'',name:'sa_names',maxLength:15,columnWidth:0.4,allowBlank:false},					
					{fieldLabel:'组织',name:'org_id',columnWidth:1,xtype:'srm_searchcbo',value:"组织架构",
						itemId:'search',emptyText:'请选择组织名',hideTrigger:false,store:me.organizstore,displayField:'name',valueField:'org_id',allowBlank:false},
					{fieldLabel:'启用状态',name:'enabled',columnWidth:1,
						xtype:'combo',			
	 					store:[[0,'可用'],[1,'禁用']]
	 			},
	 			{fieldLabel:'员工工号',name:'emp_no',columnWidth:1,allowBlank:false,maxLength:20}
	 			
				]
			}
			]
			});
		me.callParent(arguments);
		
	},
   loadData:function(rec){
	var me=this;
	me.down("form").loadRecord(rec);
}

});