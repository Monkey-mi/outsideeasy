Ext.define('srm.basicdata.regAccount.view.MngEditerRegAccount',{
	extend:'srm.ux.Window',
	alias:'widget.mngEditerRegAccount',
	
	width:400,
    height:400,
    modal : true,	
	initComponent:function(){
		var me=this;
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
				itemId:'grid_RegAccout',
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
					{fieldLabel:'账号名称',name:'acc_name',columnWidth:1,allowBlank:false,maxLength:15},
					{fieldLabel:'密码',name:'password',inputType:'password',columnWidth:1,allowBlank:false,maxLength:20,minLength:6},
					{fieldLabel:'确认密码',name:'re_password',inputType:'password',columnWidth:1,allowBlank:false,maxLength:20,minLength:6},
					{fieldLabel:'注册邮箱',vtype:"email", vtypeText: "不是有效的邮箱地址",name:'reg_email',maxLength:20,columnWidth:1,maxLength:20},				
					{fieldLabel:'注册手机',name:'reg_phone',columnWidth:1,maxLength:20,regex: /^1[3|4|5|8][0-9]{9}$/ },
					{fieldLabel:'启用状态',name:'enabled',allowBlank:false,columnWidth:0.6,
						xtype:'combo',			
	 					store:[[0,'可用'],[1,'禁用']]
		 			}
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