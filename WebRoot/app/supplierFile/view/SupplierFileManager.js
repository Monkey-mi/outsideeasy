/*供应商档案管理界面*/
Ext.define('srm.supplierFile.view.SupplierFileManager',{
	extend:'srm.ux.Panel',
	alias:'widget.SupplierFileManager',
	autoScroll :'true',
	requires:[
		'srm.supplierFile.store.SupplierFile'
	],
	listeners:{
	   'close':function(cmp){
		   cmp.destroy();
	    }
    },
 	initComponent:function(){
 		var me =this;
 		me.store=Ext.create('srm.supplierFile.store.SupplierFile');
 		me.store.proxy.extraParams.file_status = 0;
 		Ext.apply(me,{
			items:[{
   	  	  	xtype:'panel',
   	  	  	itemId:'plSupplier',
   	  	  	layout:{type:'border'},
   	  	  	dockedItems:[{
   	  	  			xtype:'toolbar',dock:'top',itemId:'top_bar2',
   	  	  			items:[
   	  	  			 {xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'输入供应商中文或英文名称关键字搜索..',enableKeyEvents:true,labelWidth:60,width:320},
   	   	  		    {text:'查询',glyph:0xf002,itemId:'btn_search'},
   	   	  		    {text: '下载模板',	itemId:'btn_download'},
   	   	  		    {text: '导入',	itemId:'btn_import'},
   	   	  		    {text: '新增',glyph:0xf234,itemId:'BTN_ADD'},
   	   	  		    {text: '修改',glyph:0xf0f0,itemId:'BTN_EDT',	disabled:true}
   	  	  			]
   	  	  		}
   	  	  		],
   	  	  items:[{
	   	  		xtype:'tabpanel',
	   	  		itemId:'supplier_tab',
	   	  		region:'center',
   	  	  		autoScroll :'true',
	   	  		items:[
	   	  		{
	   	  			xtype:'grid',
   	  	  			itemId:'SupplierFile',
		   	  	  	title:'供应商档案',
		   	  	  	store:me.store,
		   	  	  	selModel:Ext.create('Ext.selection.CheckboxModel'), 
		   	  	  	listeners:{
		   	  	  		afterrender:function(cmp){
							me.store.load();
						}
		   	  	  	},
		   	  	  	dockedItems : [{
									xtype : 'pagingbar',
									stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
									store : me.store,
									dock : 'bottom',
									displayInfo : true,
									defaultPageSize : 25
					}],
		   	  	  	columns:[ 	  	  			
		   	  	  			{header: '供应商代码',dataIndex: 'supplier_id',align:'center',width:100},
		   	  	  			{header: '状态',dataIndex:'file_status',align:'center',width:100,
		   	  	  				renderer:function(value){
		   	  	  					var sts='';
		   	  	  					if(value==0){
		   	  	  					sts='现有供应商';
		   	  	  					}
		   	  	  					else if(value==1)
		   	  	  					{
		   	  	  						sts='备选供应商';
		   	  	  					}
		   	  	  					else if(value==2)
		   	  	  					{
		   	  	  						sts='淘汰供应商';
		   	  	  					}
		   	  	  					return sts;
		   	  	  			}},
		   	  	  			{header: '<div style="text-align:center">供应商名称</div>',dataIndex: 'cpyname_cn',width:240},
							{header: '<div style="text-align:center">法人代表</div>',dataIndex: 'corporation',align:'center',width:100},
							{header: '固定电话',dataIndex: 'f_phone',align:'center',width:100},
							{header: '联系人',dataIndex: 'contacts',align:'center',width:100},
							{header: '<div style="text-align:center">手机号</div>',dataIndex: 'm_phone',align:'center',width:100},
							{header: '<div style="text-align:center">E-Mail</div>',dataIndex: 'email',align:'center',width:100},
							{header: '传真',dataIndex: 'fax',align:'center',width:100},
							{header: '<div style="text-align:center">联系地址</div>',dataIndex: 'contact_addr',width:240},
							{header: '<div style="text-align:center">所属者名称</div>',dataIndex: 'owner_cpyname',width:240},
							{header: '所属者账号',dataIndex: 'acc_name',align:'center',width:100}
							
   	  	  			]
	   	  		}]
   	  	  	}]
   	  	  }]		
		});
 		me.callParent(arguments);
 		
 	 }
 	});