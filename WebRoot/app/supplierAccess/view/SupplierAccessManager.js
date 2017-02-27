/*供应商准入评估管理界面*/
Ext.define('srm.supplierAccess.view.SupplierAccessManager',{
	extend:'srm.ux.Panel',
	alias:'widget.mng_supplierAccess',
	requires:['srm.supplierAccess.view.WestTab'],
	layout:{
	type:'border',
	padding:0
	},
	listeners:{
		'close':function(cmp){
			//这里防止有些组件没有destroy,必须要加上
			cmp.destroy();
		}
	},
 	initComponent:function(){
 		var me =this;
 		me.store=Ext.create('srm.supplierManager.store.SupplierFile');
 		Ext.apply(me,{
 			layout:'fit',
			items:[
   	  	  	{
   	  	    //region:'center',
   	  	  	//flex:2,
   	  	  	xtype:'panel',
   	  	  	itemId:'plSupplierAccess',
   	  	  	layout:{type:'border'},
   	  	  	dockedItems:[{xtype:'toolbar',dock:'top',itemId:'top_bar',items:[
   	  	  		
   	  		    {xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'输入供应商中文或英文名称关键字搜索..',enableKeyEvents:true,labelWidth:60,width:320},
   	  		    {text:'查询',glyph:0xf002,itemId:'btn_search'},
   	  		    //{text: '准入申请',glyph:0xf15c,itemId:'btn_accessApply',disabled:true},
   	  		    {text: '准入评估',glyph:0xf02b,itemId:'btn_accessEvaluate',disabled:true}
   	  			]}],
   	  		
   	  	  items:[{
	   	  		 xtype:'mng_AcessWestTab',
   	  	  		 itemId:'accesswestTab',
   	  	  		 region:'west',
   	  	  		 //layout:'fit',
   	  	  	 	 split:true,
   	  	  	 	 collapsible: true,
   	  	  		 width:200,
   	  	  		 show:true,
   	  	  		 tools:[
			           {type:'refresh',tooltip:'刷新',handler:function(event,toolEl,panel){
			           		
			           		me.down('#westTab').levstore.load();
			           		me.down('#westTab').matstore.load();
			           }}],
   	  	  		 title:'导航查询'
	   	  	  	}
	   	  	,{
   	  	  	xtype:'grid',
   	  	  	//id:'t_mst_supplier',
   	  	  	itemId:'grd_Supplier',
   	  	  	//flex:2,
   	  	  	region:'center',
   	  	  	layout:'fit',
   	  	  	overflowX:'auto',
   	  	  	overflowY:'auto',
   	  	  	//height:800,
   	  	  	title:'供应商信息一栏',
   	  	  	store:me.store,
   	  	  	selModel:Ext.create('Ext.selection.CheckboxModel'), 
   	  	  	dockedItems:[{
			    		xtype : 'pagingbar',
                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true
			    	  }],
   	  	  	columns:[
//   	  	  			{header:'',xtype:'rownumberer',width:20},
//   	  	  			{header:'准入申请',dataIndex:'apply_sts',align:'center',width:'80',renderer:function(value){
//									if(value<9){//未准入申请
//										//return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' />";
//										return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
//									}else {//已准入申请
//										//return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
//										return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
//									}
//		   	  	  			}},
//					{header:'准入评估',dataIndex:'apply_sts',align:'center',width:'80',renderer:function(value){
//									if(value>9){//未准入评估
//										//return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' />";
//										return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
//									}else {//已准入申请
//										//return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
//										return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
//									}
//		   	  	  			}},		   	  	  			
   	  	  			{header: '供应商代码',dataIndex: 'company_id',align:'center',width:100},
   	  	  			{header: '<div style="text-align:center">供应商名称</div>',dataIndex: 'cpyname_cn',width:240},
   	  	  			{header: '<div style="text-align:center">英文名称</div>',dataIndex: 'cpyname_en',width:160},
					{header: '<div style="text-align:center">法人代表</div>',dataIndex: 'corporation',align:'center',width:100},
					{header: '固定电话',dataIndex: 'f_phone',align:'center',width:100},
					
					{header: '联系人',dataIndex: 'contacts',align:'center',width:100},
					{header: '<div style="text-align:center">手机号</div>',dataIndex: 'm_phone',align:'center',width:100
					},
					{header: '<div style="text-align:center">E-Mail</div>',dataIndex: 'email',align:'center',width:100},
					{header: '传真',dataIndex: 'fax',align:'center',width:100},
						{header: '<div style="text-align:center">注册地址</div>',dataIndex: 'reg_addr',flex:1,minWidth:100}
   	  	  			]
   	  	  	
   	  	  			}]
   	  	  }]		
		});
 		me.callParent(arguments);
 		}
 		,
		//加载目录节点
	    loadGridByTreeNodeId: function(rec,tabflag){
		    	
		    	var me = this;
		    	var store = me.store;
		    	
		    if (!Ext.isEmpty(rec.get('id'))){
		    	//var root=me.down('#westTab').getActiveTab().getRootNode().get('text');
		    	
		    	if(tabflag==1){
		    		me.store.load({params:{level_id:rec.get('id')}});
		    		
		    	}else if(tabflag==2){
		    		
		    		me.store.load({params:{mc_id:rec.get('id')}});
		    	}
		    	
		    }
		    
	 	}
 	});