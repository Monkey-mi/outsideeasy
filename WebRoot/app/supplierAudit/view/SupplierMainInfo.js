Ext.define('srm.supplierAudit.view.SupplierMainInfo',{
	extend:'srm.ux.Window',
	alias:'widget.SupplierMainInfo',
	modal:true,
	autoScroll :'true',
	height:document.body.clientHeight<860?document.body.clientHeight:860,
	width:document.body.clientWidth<1200?document.body.clientWidth:1200,
	initComponent:function(){
		var me=this;
		me.authOpinionStore=Ext.create('srm.supplierAudit.store.AuthcationInfo');
		Ext.apply(me,{
			layout:'fit',
			items:[
			{
				xtype:'tabpanel',
				itemId:'tab_pl',
				autoScroll :'true',
				defaults:{padding:2},
				activeTab:0,
				items:[
				{
					title:'基本信息',
					itemId:'supplierBaseInfo',
	    			xtype:'audit_supplierBaseInfo'
	    			
				},{
					title:'公司证照',
					itemId:'supplierAttchedFile',
					xtype:'audit_AttchedFileInfo'
				},
				{
					title:'审核意见',
					//hidden:true,
					
					itemId:'auth_opinion_pl',
					xtype:'panel',
					overflowY:'auto',
					layout:'fit',
					items:[{
						xtype:'grid',
						itemId:'grdOpinion',
						
						store:me.authOpinionStore,
						columns:[
						{header:'序号',xtype:'rownumberer',width:40},
						{header: '审核结果',dataIndex: 'auth_state',align:'center',width:160,renderer:function(value){
								var v='';
								if(value==0)
								{v='通过';}
								else if(value==1){ v='不通过';}
								return v;
							}
						},{header: '<div style="text-align:center">审核意见</div>',dataIndex: 'auth_opinion',flex:1,renderer:function(v,metaData){
								metaData.tdAttr='data-qtip="'+v+'"';
								return v;
							}
					},
						{header: '审核时间',dataIndex: 'create_dt',align:'center',width:160,xtype: 'datecolumn',format:'Y-m-d H:i:s'}
					
						]
					}]
				}
				]
			}]
			
		});
		me.callParent(arguments);
		me.loadRec(me.supplierRec);
	},
	loadRec:function(rec)
	{
		var me=this;
		
		me.down('#supplierBaseInfo').loadBaseData(rec);
		//加载业务数据
		me.down('#supplierBaseInfo').down('#supplierotherInfo').loadOtherData(rec);
		me.down('#supplierAttchedFile').loadfileData(rec.get('company_id'));
		if(rec.get('apply_sts')==20)
		{
			
			me.authOpinionStore.load({params:{company_id:rec.get('company_id')}});
			me.down('#tab_pl').setActiveTab(0);
		}
		else
		{
			//不是审核未通过的状态隐藏审核意见tab选项卡
			me.down('#tab_pl').tabBar.items.items[2].hide();
			}
		
	}
	
});