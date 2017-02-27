Ext.define('srm.basicdata.regAccount.view.MngAccountRole',{
	extend:'srm.ux.Window',
	alias:'widget.mngAccountRole',
	width:1200,
    height:550,
    modal : true,
	listeners:{
		afterrender:function(){
			var me = this;
			var grid = me.down('#gridRegSupplier');
			var grid1 = me.down('#grid_company');
			var grid2 = me.down('#grid_role');
			me.regSupplierstore.load({
				params:{reg_id:me.reg_id,sa_id:me.sa_id},
				callback: function (record, options, success) {
					for(var i=0;i<record.length;i++){
						if(record[i].data.is_select==1){
						grid.getSelectionModel().select(record[i],true);
						}
					}
				}
			});			
			me.regCompanystore.load({
				params:{reg_id:me.reg_id,sa_id:me.sa_id},
				callback: function (record, options, success) {
					for(var i=0;i<record.length;i++){					
						if(record[i].data.is_select==1){
						grid1.getSelectionModel().select(record[i],true);
						}
					}
				}
			});	
			me.regRolestore.load({
				params:{reg_id:me.reg_id,sa_id:me.sa_id,role_id:me.role_id},
				callback: function (record, options, success) {				
					for(var i=0;i<record.length;i++){
						if(record[i].data.is_select==1){
						grid2.getSelectionModel().select(record[i],true);
						}
					}
				}
			});
		}
	},
	
	initComponent:function(){
		var me=this;
		me.regSupplierstore = Ext.create('srm.basicdata.regAccount.store.MngRegSupplier');//主账号的供应商
		me.regCompanystore = Ext.create('srm.basicdata.regAccount.store.MngRegCompany');//主账号的公司
		me.regRolestore = Ext.create('srm.basicdata.regAccount.store.MngRegRole');//主账号的角色
		Ext.apply(me,{
			title:'分配'+me.sub_name+"的权限",	
			layout:{
				type:'border',
    			padding :2				
			},
			items:[{
				region:'west',
				xtype:'grid',
				title:'分配供应商',			
				flex:1,	
				itemId:'gridRegSupplier',
				store:me.regSupplierstore,	
				selModel:Ext.create('Ext.selection.CheckboxModel',{checkOnly:true}),               
				buttons:[{text:'保存',action:'act_save'}],				
				columns:
				[		
				    {text:'序号',xtype:'rownumberer',align:'center',width:100},
					{text:'供应商ID',dataIndex: 'supplier_id',hidden:true},
					{text:'供应商名',dataIndex: 'supplier_cpyname',width:240}	  							
					
				]
			},			
		{
				region:'center',
				xtype:'grid',
				title:'分配公司',
				flex:1,	
				itemId:'grid_company',
				store:me.regCompanystore,
				selModel:Ext.create('Ext.selection.CheckboxModel',{checkOnly:true}), 
				buttons:[{text:'保存',action:'act_save'}],	  
				columns:
					[			                 
					{text:'序号',xtype:'rownumberer',align:'center',width:100},
					{text:'公司ID',dataIndex: 'company_id',hidden:true},
					{text:'公司名',dataIndex: 'cpyname_cn',width:240}	  							
						
					]
			},			
			{
				region:'east',
				xtype:'gridpanel',
				title:'分配角色',
				flex:1,	
				itemId:'grid_role',
				store:me.regRolestore,
				selModel:Ext.create('Ext.selection.CheckboxModel',{checkOnly:true}),
				buttons:[{text:'保存',action:'act_save'}],
	       		columns:
					[		                 
					{text:'序号',xtype:'rownumberer',align:'center',width:100},
					{text:'角色ID',dataIndex: 'role_id',hidden:true},
					{text:'角色名',dataIndex: 'role_name',width:240}	  							
						
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