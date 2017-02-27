/*供应商入驻审核管理界面*/
Ext.define('srm.applicationRecord.view.MngAccessApplicationManager',{
	extend:'srm.ux.Panel',
	alias:'widget.mngAccessApplication',
	requires:[],
	autoScroll:'true',
	
	initComponent:function(){
		var me=this;
		me.store=Ext.create('srm.applicationRecord.store.MngAccessApplicationRecord');
		Ext.apply(me.store.proxy.extraParams,{usePaging:true});
		me.infostore=Ext.create('srm.applicationRecord.store.MngAccessApplicationInfo');
		me.infoVo2store=Ext.create('srm.applicationRecord.store.MngAccessApplicationInfoVo2');
		me.infoVo3store=Ext.create('srm.applicationRecord.store.MngAccessApplicationInfoVo3');
		Ext.apply(me,{
 			layout:'fit',
 			width:1000,
			items:[{
				xtype:'panel',
				title:'准入申请',
				itemId:'accessApplication',
				overflowY:'auto',
				
				dockedItems:[{
					xtype:'toolbar',dock:'top',itemId:'top_bar',
					items:[
						{xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'供应商中文名称关键字搜索..',enableKeyEvents:true,labelWidth:60,width:260},
						{xtype:'combo',itemId:'applysts_search',fieldLabel:'状态',labelWidth:40,labelAlign:'right',width:140,
		 					store:[[5,'全部'],[0,'未填写'],[1,'已保存'],[2,'已提交'],[3,'已通过'],[4,'未通过']]
		 				},
						{text:'查询',glyph:0xf002,itemId:'btn_search'},
						{text:'刷新',glyph:0xf0e7,itemId:'btn_reflash'},
						"-",
						{text:'详情',glyph:0xf15c,itemId:'btn_view',disabled:true},
						
   	  					"->",
   	  					{text:'审核通过',glyph:0xf0e3,itemId:'btn_AuditPass',disabled:true},
   	  					{text:'不通过',glyph:0xf0e3,itemId:'btn_AuditUnPass',disabled:true}
   	  					
					]
				}]
				,
				items:[{
					xtype:'grid',
					
					layout:'fit',
					itemId:'grd_accessApplication',
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
			    	  	{header: '流水表id',dataIndex: 'record_id',hidden:true},
			    	  	{header: '<div style="text-align:center">提交人</div>',dataIndex: 'submit_name',align:'center',width:180},
			    	  	{header: '<div style="text-align:center">接收人</div>',dataIndex: 'receive_name',align:'center',width:180},
			    	  	{header:'创建时间',dataIndex:'create_dt',align:'center',width:160,xtype: 'datecolumn',format:'Y-m-d H:i:s'},
			    	  	{header: '准入申请状态',dataIndex:'access_status',align:'center',width:100,
   	  	  				renderer:function(value){
   	  	  					var sts='';
   	  	  					if(value==0)
   	  	  					{
   	  	  						sts='未填写';
   	  	  					}
   	  	  					else if(value==1)
   	  	  					{
   	  	  						sts='已保存';
   	  	  					}
   	  	  					else if(value==2)
   	  	  					{
   	  	  						sts='已提交';
   	  	  					}else if(value==3)
   	  	  					{
   	  	  					    sts='已通过';
   	  	  					}else if(value==4)
   	  	  					{
   	  	  					    sts='未通过';
   	  	  					}
   	  	  					return sts;
   	  	  				}},		    	  	
			    		{header:'准入邀请表ID',dataIndex:'receive_invite_id',align:'center',width:80},
						{header: '模板头ID',dataIndex: 'h_id',align:'center',width:100}]
				}]
			}]
		});
		me.callParent(arguments);
	}
});