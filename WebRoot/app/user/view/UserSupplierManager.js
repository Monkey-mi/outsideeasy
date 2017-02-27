Ext.define('srm.user.view.UserSupplierManager' , {
 extend:'srm.ux.Panel',
 alias : 'widget.userSupplierManager',
 title: '供应商操作员',
 
 layout:'border',
 initComponent:function(){
 	var me=this;
 	me.supplierstore=Ext.create('srm.user.store.TempSupplierFile');
 	Ext.apply(me.supplierstore.proxy.extraParams,{usePaging:true});
    me.supplierstore.loadPage(1);
 	me.userstore=Ext.create('srm.user.store.TempUserInfos');
 	Ext.apply(me,{
 		items:[
	 	{
	 		region:'center',
	 		layout:'fit',
	 		itemId:'supplierFilePanel',
	 		dockedItems:[
   	  	  		{xtype:'toolbar',dock:'top',itemId:'top_bar',
   	  	  		items:[
				{xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'供应商中文或英文名称关键字搜索..',enableKeyEvents:true,labelWidth:60,width:260},
				{text:'查询',glyph:0xf002,itemId:'btn_search'}
				]}],
	 		items:[{
	 		xtype:'grid',
	 		itemId:'grd_SupplierFile',
	 		flex:1,
	 		title:'供应商',
	  	  	store:me.supplierstore,
	  	  	
	  	  	dockedItems:[{
			    		xtype : 'pagingbar',
	                    stateId : 'userSupplierManager-1',
			    		store:me.supplierstore,
			    		dock:'bottom',
			    		displayInfo:true
			    	  }],
	  	  	columns:
	  	  	[
	  	  		{header: '编号',dataIndex: 'company_id',align:'center',width:60},
				{header: '<div style="text-align:center">供应商名称</div>',dataIndex: 'cpyname_cn',flex:1},
	  	  		{header: '<div style="text-align:center">英文名称</div>',dataIndex: 'cpyname_en',width:200},
				{header: '<div style="text-align:center">法人代表</div>',dataIndex: 'corporation',align:'center',width:100}		
	  	  	]
	 		}]
	 		
	 	},
	 	{
	 		region:'east',
	 		title:'操作员',
	 		xtype:'grid',
	 		itemId:'grd_user',
	 		width:260,
	 		split:true,
	 		store:me.userstore,
	 		tbar:[{
				text:'添加',glyph:0xf055,itemId:'BTN_ADD'
			},{
				text:'删除',glyph:0xf014,itemId:'BTN_DEL'
			}],
	 		columns:[
	 		{header: '编号',dataIndex: 'u_id',align:'center',width:60,hidden:true},
	 		{header: '登录号',dataIndex: 'login_id',align:'center',width:60},
	 		{header: '姓名',dataIndex: 'name',align:'center',width:200}
	 		]
	 		
	 	}
	 	]
 	});
 	
	this.callParent(arguments);
  }
});