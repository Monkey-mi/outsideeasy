/*供应商准入评估管理界面*/
Ext.define('srm.materialConfirmation.view.ConfirmManager',{
	extend:'srm.ux.Panel',
	alias:'widget.mng_MaterialConfirm',
	layout:'fit',
//	listeners:{
//		'close':function(cmp){
//			//这里防止有些组件没有destroy,必须要加上
//			cmp.destroy();
//		}
//	},
 	initComponent:function(){
 		var me =this;
 		me.store=Ext.create('srm.materialConfirmation.store.MaterialConfirmation');
 		me.checkDetailStore=Ext.create('srm.materialConfirmation.store.MaterialCheckDetail');
 		Ext.apply(me,{
			items:[
   	  	  	{
   	  	    
   	  	  	xtype:'panel',
   	  	  	itemId:'plMaterialConfirm',
   	  	  	layout:{type:'border'},
   	  	  	dockedItems:[{xtype:'toolbar',dock:'top',itemId:'top_bar',items:[
   	  	  		{xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'输入供应商名称关键字搜索..',enableKeyEvents:true,labelWidth:60,width:320},
   	  		    {text:'查询',glyph:0xf002,itemId:'btn_search'},
   	  	  		{text: '新增',glyph:0xf234,		itemId:srm.def.Const.FUNC_ITEMID_BTN_ADD},
   	  		    {text: '修改',glyph:0xf0f0,	itemId:srm.def.Const.FUNC_ITEMID_BTN_EDT,	disabled:true},
   	  		    {text: '删除',glyph:0xf014,		itemId:srm.def.Const.FUNC_ITEMID_BTN_DEL, disabled:true}
   	  		    
   	  		    
//   	  		    {text: '物料确认',glyph:0xf044,itemId:'btn_MaterialConfirm',disabled:true},
   	  			]}],
   	  	  items:[
//   	  	  	{
//	   	  		 xtype:'mng_WestTab',
//   	  	  		 itemId:'westTab',
//   	  	  		 region:'west',
//   	  	  		 layout:'fit',
//   	  	  	 	 split:true,
//   	  	  	 	 collapsible: true,
//   	  	  		 width:200,
//   	  	  		 show:true,
//   	  	  		 title:'导航查询'
//	   	  	  	}
//	   	  	,
	   	  	{
   	  	  	xtype:'grid',
   	  	  	//id:'t_mst_supplier',
   	  	  	itemId:'grd_MaterialConfirm',
   	  	  	flex:1,
   	  	  	region:'center',
   	  	  	overflowX:'auto',
   	  	  	overflowY:'auto',
   	  	  	//height:800,
   	  	  	title:'物料确认信息一栏',
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
   	  	  			//{header:'',xtype:'rownumberer',width:20},
//   	  	  			{header:'物料确认',dataIndex:'apply_sts',align:'center',width:'80',renderer:function(value){
//									if(value=='4'){//物料确认
//										//return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' />";
//										return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
//										
//									}else {
//										//return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
//										return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
//									}
//		   	  	  			}},
   	  	  			{header: '编号',dataIndex: 'confirmation_id',width:40},
   	  	  			{header: '<div style="text-align:center">供应商名称</div>',dataIndex: 'company_name',width:240},
   	  	  			{header: '<div style="text-align:center">联系人</div>',dataIndex: 'contacts',width:80},
					{header: '<div style="text-align:center">电话</div>',dataIndex: 'f_phone',align:'center',width:100},
					{header: '<div style="text-align:center">地址</div>',dataIndex: 'addr',width:160},
					{header: '<div style="text-align:center">传真</div>',dataIndex: 'fax',align:'center',width:100},
					{header: '<div style="text-align:center">即时通讯</div>',dataIndex: 'm_phone',align:'center',width:100},
					{header: '<div style="text-align:center">申请人</div>',dataIndex: 'proposer',align:'center',width:80},
   	  	  			{header: '<div style="text-align:center">申请单位</div>',dataIndex: 'apply_companyname',align:'center',width:100},
   	  	  			{header: '<div style="text-align:center">申请时间</div>',dataIndex: 'apply_date',align:'center',xtype:'datecolumn',format:'Y-m-d',width:100},
   	  	  			{header: '<div style="text-align:center">材料类别</div>',dataIndex: 'mc_name',align:'center',width:80},
   	  	  			{header: '<div style="text-align:center">材料品名</div>',dataIndex: 'material_name',align:'center',width:100},
   	  	  			{header: '<div style="text-align:center">样品数量</div>',dataIndex: 'material_num',align:'center',width:80},
   	  	  			{header: '<div style="text-align:center">是否替换物料</div>',dataIndex: 'isreplace_material',align:'center',width:80,
   	  	  				renderer:function(value){
   	  	  					if(value==1)
   	  	  					{return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
   	  	  					}
   	  	  					else
   	  	  					{return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';}
   	  	  				}},
   	  	  			{header: '<div style="text-align:center">提交原因</div>',dataIndex: 'submit_reason',align:'center',width:80},
   	  	  			{header: '<div style="text-align:center">提交材料</div>',dataIndex: 'submit_item',align:'center',width:80},
   	  	  			{header: '<div style="text-align:center">最终结论</div>',dataIndex: 'confirm_result',align:'center',width:160,
					renderer:function(value){
						if(value==0)
						{
						return '合格，可以进行小批试制';
						}
						if(value==1)
						{return '暂时让步接收，可以进行样品试装，样品改进后必须重新送样';}
						if(value==2)
						{return '不合格，要求改进后重新送样';}
						else if(value==3)
						{return '要求补充、完善上栏所列文件';}
						
						else return '';
					}}
   	  	  			
   	  	  			]
   	  	  	
   	  	  			}]
   	  	  }]		
		});
 		me.callParent(arguments);
 		}
 		//选择某条记录时加载检测详情
		,
		loadCheckDetailsData:function(rec)
		{
			var me=this;
			var confirmation_id=rec.get('confirmation_id');
			
			if(confirmation_id>0)
			{
				me.checkDetailStore.load({params:{confirmation_id:confirmation_id}});
			}
		}
 	});