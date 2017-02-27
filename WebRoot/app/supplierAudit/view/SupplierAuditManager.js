/*供应商入驻审核管理界面*/
Ext.define('srm.supplierAudit.view.SupplierAuditManager',{
	extend:'srm.ux.Panel',
	alias:'widget.mng_supplierAudit',
	requires:[],
	autoScroll:'true',
	
	initComponent:function(){
		var me=this;
		me.store=Ext.create('srm.supplierAudit.store.SupplierFile');
		//me.attchedStore=Ext.create('srm.supplierAudit.store.Attched');
		Ext.apply(me,{
 			layout:'fit',
 			width:1000,
			items:[{
				xtype:'panel',
				title:'入驻认证审核',
				itemId:'plSupplierAudit',
				overflowY:'auto',
				
				dockedItems:[{
					xtype:'toolbar',dock:'top',itemId:'top_bar',
					items:[
						{xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'供应商中文名称关键字搜索..',enableKeyEvents:true,labelWidth:60,width:260},
						{xtype:'combo',itemId:'applysts_search',fieldLabel:'状态',labelWidth:40,labelAlign:'right',width:140,
		 					store:[[0,'全部'],[5,'待审核'],[15,'审核通过'],[20,'不合格']]
		 				},
						{text:'查询',glyph:0xf002,itemId:'btn_search'},
						{text:'刷新',glyph:0xf0e7,itemId:'btn_reflash'},
						"-",
						{text:'详情',glyph:0xf15c,itemId:'btn_view',disabled:true},
						
   	  					"->",
   	  					{text:'审核通过',glyph:0xf0e3,itemId:'btn_AuditPass',disabled:true},
   	  					{text:'不合格',glyph:0xf0e3,itemId:'btn_AuditUnPass',disabled:true}
   	  					
					]
				}]
				,
				items:[{
					xtype:'grid',
					
					layout:'fit',
					itemId:'grd_supplierAudit',
					store:me.store,
					selModel:Ext.create('Ext.selection.CheckboxModel'), 
					dockedItems:[{
			    		xtype : 'pagingbar',
                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true,
			    		defaultPageSize:25
			    	  }],
			    	  columns:[
			    	  	{header:'序号',xtype:'rownumberer',align:'center',width:80},
			    	  	/*{header: '编号',dataIndex: 'company_id',align:'center',width:100},*/
			    	  	{header:'申请时间',dataIndex:'operater_dt',align:'center',width:160,xtype: 'datecolumn',format:'Y-m-d H:i:s'},
			    	  	{header: '状态',dataIndex:'apply_sts',align:'center',width:100,
   	  	  				renderer:function(value){
   	  	  					var sts='';
   	  	  					if(value==5)
   	  	  					{
   	  	  						sts='待审核';
   	  	  					}
   	  	  					else if(value==15)
   	  	  					{
   	  	  						sts='审核通过';
   	  	  					}
   	  	  					else if(value==20)
   	  	  					{
   	  	  						sts='不合格';
   	  	  					}
   	  	  					return sts;
   	  	  				}},
   	  	  				{header: '申请账号',dataIndex:'account',align:'center',flex:1},
			    	  	{header: '<div style="text-align:center">供应商名称</div>',dataIndex: 'cpyname_cn',flex:1},
			    	  	{header: '<div style="text-align:center">法人代表</div>',dataIndex: 'corporation',align:'center',width:120},
						{header: '固定电话',dataIndex: 'f_phone',align:'center',width:260}]
				}]
			}]
		});
		me.callParent(arguments);
	}
});