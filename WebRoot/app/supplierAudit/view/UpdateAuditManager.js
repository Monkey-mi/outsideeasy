/*供应商入驻审核管理界面*/
Ext.define('srm.supplierAudit.view.UpdateAuditManager',{
	extend:'srm.ux.Panel',
	alias:'widget.mng_UpdateAudit',
	requires:[],
	autoScroll:'true',
	
	initComponent:function(){
		var me=this;
		me.store=Ext.create('srm.supplierAudit.store.AuthcationUpdate');
		//附件
		me.attchedStore=Ext.create('srm.supplierAudit.store.AuthUpdateAttched');
		Ext.apply(me,{
 			layout:'fit',
 			width:1000,
			items:[{
				xtype:'panel',
				title:'入驻认证审核',
				itemId:'plSupplierUpdateAudit',
				overflowY:'auto',
				
				dockedItems:[{
					xtype:'toolbar',dock:'top',itemId:'top_bar',
					items:[
						{xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'供应商中文名称关键字搜索..',enableKeyEvents:true,labelWidth:60,width:260},
						{xtype:'combo',itemId:'state_search',fieldLabel:'状态',labelWidth:40,labelAlign:'right',width:140,
		 					store:[[0,'全部'],[1,'待审核'],[2,'审核通过'],[3,'审核不通过']]
		 				},
						{text:'查询',glyph:0xf002,itemId:'btn_search'},
						{text:'刷新',glyph:0xf0e7,itemId:'btn_reflash'},
						"-",
						{text:'详情',glyph:0xf15c,itemId:'btn_view',disabled:true},
						
   	  					"->",
   	  					{text:'审核通过',glyph:0xf0e3,itemId:'btn_AuditPass',disabled:true},
   	  					{text:'审核不通过',glyph:0xf0e3,itemId:'btn_AuditUnPass',disabled:true}
   	  					
					]
				}]
				,
				items:[{
					xtype:'grid',
					
					layout:'fit',
					itemId:'grd_updateAudit',
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
			    	  	{header:'申请时间',dataIndex:'created_dt',align:'center',width:160,xtype: 'datecolumn',format:'Y-m-d H:i:s'},
			    	  	{header: '状态',dataIndex:'state',align:'center',width:100,
   	  	  				renderer:function(value){
   	  	  					var sts='';
   	  	  					if(value==1)
   	  	  					{
   	  	  						sts='待审核';
   	  	  					}
   	  	  					else if(value==2)
   	  	  					{
   	  	  						sts='审核通过';
   	  	  					}
   	  	  					else if(value==3)
   	  	  					{
   	  	  						sts='审核不通过';
   	  	  					}
   	  	  					return sts;
   	  	  				}},
   	  	  				{header: '申请账号',dataIndex:'account',align:'center',flex:1},
			    	  	{header: '<div style="text-align:center">供应商名称</div>',dataIndex: 'cpyname_cn',flex:1},
			    	  	{header: '<div style="text-align:center">法人代表</div>',dataIndex: 'corporation',align:'center',width:180},
						{header: '固定电话',dataIndex: 'f_phone',align:'center',width:260}]
				}]
			}]
		});
		me.callParent(arguments);
	}
	//加载当前选中的变更附件数据
	,loadSingleData:function(recs)
	{
		var me=this;
		//获取选中的记录ID，拼成查询条件
		var idStr='';
		//console.log(recs);
		for(var i=0;i<recs.length;i++)
		{
			if(i==0)
			{
				idStr=recs[0].get('auth_update_id');
			}
			else
			{
				idStr+=','+recs[i].get('auth_update_id');
			}
		}
		//console.log("idStr:"+idStr);
		me.attchedStore.load({
			params:{
				multi_authupdateId_search:idStr
			}
		});
	}
});