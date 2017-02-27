/*供应商档案管理界面*/
Ext.define('srm.supplierManager.view.SupplierManager',{
	extend:'srm.ux.Panel',
	alias:'widget.SupplierManager',
	
	autoScroll :'true',
 	initComponent:function(){
 		var me =this;
 		//me.customflag=0;
 		me.store=Ext.create('srm.supplierManager.store.SupplierFile');
 		//归档
 		me.Archivestore=Ext.create('srm.supplierManager.store.ArchiveSupplierFile');
 		//me.registerAttchedStore=Ext.create('srm.supplierManager.store.AppRegisterAttched');
 		//厂商类别，三级
 		me.materialClassStore_1=Ext.create('srm.supplierManager.store.MaterialClass');
		me.materialClassStore_2=Ext.create('srm.supplierManager.store.MaterialClass');
		me.materialClassStore_3=Ext.create('srm.supplierManager.store.MaterialClass');
		me.materialClassStore_1.proxy.extraParams.is_archive=0;
		me.materialClassStore_1.proxy.extraParams.f_id=0;
		me.materialClassStore_2.proxy.extraParams.is_archive=0;
		me.materialClassStore_3.proxy.extraParams.is_archive=0;
		//me.registerAttchedStore.load();
		me.materialClassStore_1.load();
 		
 		//me.treeStore=Ext.create('srm.basicdata.level.store.MaterialLevel');
/*删除功能由物理删除改成逻辑删除，则不删除相关联的信息
 		//发票抬头store
		me.invoicestore=Ext.create('srm.supplierManager.store.AppInvoiceTitle');
		//主要设备明细store
		me.devicelistStore=Ext.create('srm.supplierManager.store.AppDevicelist');
		//公司产品主要用料表
		me.metarialStore=Ext.create('srm.supplierManager.store.AppMetarial');
		//公司主要客户
		me.maincustomerStore=Ext.create('srm.supplierManager.store.AppMainCustomer');
		//公司主要竞争对手
		me.competitorStore=Ext.create('srm.supplierManager.store.AppCompetitor');
		//公司银行账号
		me.bankAccountStore=Ext.create('srm.supplierManager.store.AppBankAccount');
		//公司产品
		me.goodsStore=Ext.create('srm.supplierManager.store.AppGoods');
		//附件store
		me.registerAttchedStore=Ext.create('srm.supplierManager.store.AppRegisterAttched');
 		//附件自定义上传store
		me.customAttchedStore=Ext.create('srm.supplierManager.store.AppRegisterAttched');
*/		
 		Ext.apply(me,{
 			layout:'fit',
			items:[
   	  	  	{
   	  	  	xtype:'panel',
   	  	  	itemId:'plSupplier',
   	  	  	layout:{type:'border'},
   	  	  	dockedItems:[
   	  	  		{
   	  	  			xtype:'toolbar',dock:'top',itemId:'top_bar2',
   	  	  			items:[
   	  	  			{text: '新增',glyph:0xf234,		itemId:srm.def.Const.FUNC_ITEMID_BTN_ADD},
   	  		    	{text: '修改',glyph:0xf0f0,	itemId:srm.def.Const.FUNC_ITEMID_BTN_EDT,	disabled:true},
   	  		    	{text: '删除',glyph:0xf014,		itemId:srm.def.Const.FUNC_ITEMID_BTN_DEL, disabled:true},
   	  		   		 "-",
   	  		    	{text: '受理',glyph:0xf15c,		itemId:'btn_Accept', disabled:true},
					{text:'审核通过',glyph:0xf0e3,itemId:'btn_AuditPass',disabled:true},
   	  				{text:'不合格',glyph:0xf0e3,itemId:'btn_AuditUnPass',disabled:true},
   	  				"-",
   	  				{text:'归档',glyph:0xf0c6,itemId:'btn_Archive',disabled:true},
   	  				"-",
   	  				{text:'刷新',glyph:0xf0e7,itemId:'btn_reflash'},
   	  				{text:'筛选',glyph:0xf002,itemId:'btn_queryMore'}
   	  	  			]
   	  	  		},
   	  	  		{xtype:'toolbar',dock:'top',itemId:'top_bar',
   	  	  		items:[
				{xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'供应商中文或英文名称关键字搜索..',enableKeyEvents:true,labelWidth:60,width:260},
 				{xtype:'combo',itemId:'applysts_search',fieldLabel:'状态',labelWidth:40,labelAlign:'right',width:140,
 					store:[[0,'全部'],[5,'已提交'],[10,'审核中'],[15,'审核通过'],[20,'不合格']]
 				},
 				{xtype:'combo',itemId:'materialClass_1_search',fieldLabel:'厂商类别',labelWidth:70,labelAlign:'right',width:170,displayField:'mc_name',valueField:'mc_id',store:me.materialClassStore_1,
 					queryMode:'local',
					forceSelection:true,
 					listeners:{
 						'change':function(th,newValue,oldValue,eOpts)
 						{
 							if(!Ext.isEmpty(newValue))
 							{
 							me.down('#materialClass_2_search').setValue('');
 							me.materialClassStore_2.load({params:{f_id:newValue}});
 							}
 						}
 					}
 				},
 				{xtype:'combo',itemId:'materialClass_2_search',width:100,displayField:'mc_name',valueField:'mc_id',store:me.materialClassStore_2,
 					queryMode:'local',
					forceSelection:true,
 					listeners:{
 						'change':function(th,newValue,oldValue,eOpts)
 						{
 							if(!Ext.isEmpty(newValue))
 							{
 							me.down('#materialClass_3_search').setValue('');
 							me.materialClassStore_3.load({params:{f_id:newValue}});
 							}
 						}
 					}
 				},
 				{xtype:'combo',itemId:'materialClass_3_search',width:100,displayField:'mc_name',valueField:'mc_id',store:me.materialClassStore_3,queryMode:'local',
					forceSelection:true},
   	  	  		{text:'查询',glyph:0xf002,itemId:'btn_search'}
		  		]
   	  	  		}
   	  	  		],
   	  	  items:[{
	   	  		 xtype:'mng_WestTab',
   	  	  		 itemId:'westTab',
   	  	  		 region:'west',
   	  	  		 layout:'fit',
   	  	  	 	 split:true,
   	  	  	 	 collapsible: true,
   	  	  		 width:200,
   	  	  		 show:true,
   	  	  		 tools:[
			           {type:'refresh',tooltip:'刷新',handler:function(event,toolEl,panel){
			           		
			           		me.down('#westTab').levstore.load();
			           		me.down('#westTab').matstore.load();
			           }}
			    ],
   	  	  		 title:'导航查询'
	   	  	  	}
	   	  	,{
	   	  		xtype:'tabpanel',
	   	  		itemId:'supplier_tab',
	   	  		region:'center',
   	  	  		autoScroll :'true',
	   	  		items:[{
	   	  		xtype:'grid',
   	  	  	//id:'t_mst_supplier',
   	  	  	itemId:'grd_Supplier',
   	  	  	
   	  	  	//overflowY:'auto',
   	  	  	//height:800,
   	  	  	title:'当前供应商',
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
//   	  	  	{header:'序号',xtype:'rownumberer',width:40},
   	  	  	{header: '编号',dataIndex: 'company_id',align:'center',width:60},
   	  	  			{header: '状态',dataIndex:'apply_sts',align:'center',width:100,
   	  	  				renderer:function(value){
   	  	  					
   	  	  					var sts='';
   	  	  					if(value==5)
   	  	  					{
   	  	  						sts='已提交';
   	  	  					}
   	  	  					else if(value>5&&value<=10)
   	  	  					{
   	  	  						sts='审核中';
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
   	  	  			{header: '<div style="text-align:center">供应商名称</div>',dataIndex: 'cpyname_cn',width:240},
   	  	  			
   	  	  			{header:'<div style="text-align:center">厂商类别</div>',dataIndex:'mc_name_1',width:100},
   	  	  			{header:'<div style="text-align:center">一级子类别</div>',dataIndex:'mc_name_2',width:160},
   	  	  			{header:'<div style="text-align:center">二级子类别</div>',dataIndex:'mc_name_3',width:160,renderer:function(v,metaData){
						metaData.tdAttr='data-qtip="'+v+'"';
						return v;
					}},
					{header: '<div style="text-align:center">法人代表</div>',dataIndex: 'corporation',align:'center',width:100},
					{header: '固定电话',dataIndex: 'f_phone',align:'center',width:100},
					
					{header: '联系人',dataIndex: 'contacts',align:'center',width:100},
					{header: '<div style="text-align:center">手机号</div>',dataIndex: 'm_phone',align:'center',width:100
					},
					{header: '<div style="text-align:center">E-Mail</div>',dataIndex: 'email',align:'center',width:100},
					{header: '传真',dataIndex: 'fax',align:'center',width:100},
						{header: '<div style="text-align:center">注册地址</div>',dataIndex: 'reg_addr',flex:1,minWidth:100},
						{header:'操作员',dataIndex:'operator',align:'center',width:80},
						{header:'操作时间',dataIndex:'operater_dt',align:'center',width:90,xtype: 'datecolumn',format:'Y-m-d'},
						{header:'审核员',dataIndex:'auditor',align:'center',width:80},
						{header:'审核时间',dataIndex:'audit_dt',align:'center',width:90,xtype: 'datecolumn',format:'Y-m-d'},
						{header: '<div style="text-align:center">英文名称</div>',dataIndex: 'cpyname_en',width:160}
   	  	  			]
   	  	  			//grd_Supplier end
	   	  		},
	   	  		{
	   	  			//归档列表
	   	  			xtype:'grid',
   	  	  	
   	  	  	itemId:'grd_ArchiveSupplier',
   	  	  	
   	  	  	region:'center',
   	  	  	autoScroll :'true',
   	  	  	//overflowY:'auto',
   	  	  	//height:800,
   	  	  	title:'归档供应商',
   	  	  	store:me.Archivestore,
   	  	  	selModel:Ext.create('Ext.selection.CheckboxModel'), 
   	  	  	dockedItems:[{
			    		xtype : 'pagingbar',
                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		store:me.Archivestore,
			    		dock:'bottom',
			    		displayInfo:true,
			    		defaultPageSize:25
			    	  }],
   	  	  	columns:[ 	  	  			
   	  	  			{header: '编号',dataIndex: 'company_id',align:'center',width:60},
//   	  	  			{header:'资质初审',dataIndex:'apply_sts',align:'center',width:'80',renderer:function(value){
//									if(value<2){//未准入申请
//										//return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' />";
//										return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
//									}else {//已准入申请
//										//return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
//										return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
//									}
//		   	  	  			}},
   	  	  			{header: '状态',dataIndex:'apply_sts',align:'center',width:100,
   	  	  				renderer:function(value){
   	  	  					
   	  	  					var sts='';
   	  	  					if(value==5)
   	  	  					{
   	  	  						sts='已提交';
   	  	  					}
   	  	  					else if(value>5&&value<=10)
   	  	  					{
   	  	  						sts='审核中';
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
   	  	  			{header: '<div style="text-align:center">供应商名称</div>',dataIndex: 'cpyname_cn',width:240},
   	  	  			{header: '<div style="text-align:center">英文名称</div>',dataIndex: 'cpyname_en',width:160},
					{header: '<div style="text-align:center">法人代表</div>',dataIndex: 'corporation',align:'center',width:100},
					{header: '固定电话',dataIndex: 'f_phone',align:'center',width:100},
					
					{header: '联系人',dataIndex: 'contacts',align:'center',width:100},
					{header: '<div style="text-align:center">手机号</div>',dataIndex: 'm_phone',align:'center',width:100
					},
					{header: '<div style="text-align:center">E-Mail</div>',dataIndex: 'email',align:'center',width:100},
					{header: '传真',dataIndex: 'fax',align:'center',width:100},
						{header: '<div style="text-align:center">注册地址</div>',dataIndex: 'reg_addr',flex:1,minWidth:100},
						{header:'操作员',dataIndex:'operator',align:'center',width:80},
						{header:'操作时间',dataIndex:'operater_dt',align:'center',width:90,xtype: 'datecolumn',format:'Y-m-d'},
						{header:'审核员',dataIndex:'auditor',align:'center',width:80},
						{header:'审核时间',dataIndex:'audit_dt',align:'center',width:90,xtype: 'datecolumn',format:'Y-m-d'}
   	  	  			]
   	  	  			// grd_ArchiveSupplier end
	   	  		}/*,
	   	  		{
	   	  			xtype:'grid',
   	  	  	
   	  	  	itemId:'grd_File',
   	  	  	
   	  	  	region:'center',
   	  	  	autoScroll :'true',
   	  	  	//overflowY:'auto',
   	  	  	//height:800,
   	  	  	title:'认证文件',
   	  	  	store:me.registerAttchedStore,
   	  	  	selModel:Ext.create('Ext.selection.CheckboxModel'), 
   	  	  	tbar:[{text:'上传',itemId:'BTN_UP',handler : function() {
										me.upLoad();
									}}
					
   			],
   	  	  	dockedItems:[{
			    		xtype : 'pagingbar',
                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		store:me.registerAttchedStore,
			    		dock:'bottom',
			    		displayInfo:true,
			    		defaultPageSize:25
			    	  }],
   	  	  	columns:[ 	  	  			
   	  	  			{header: '编号',dataIndex: 'id',align:'center',width:60},
   	  	  			{header: '厂商编号',dataIndex:'company_id',align:'center',width:100},
   	  	  			{header: '文件名',dataIndex: 'file_name',width:240},
   	  	  			{header: '文件路径',dataIndex: 'file_path',width:160},
					{header: '文件格式',dataIndex: 'file_format',align:'center',width:100},
					{header:'创建时间',dataIndex:'create_dt',align:'center',width:90,xtype: 'datecolumn',format:'Y-m-d'}
   	  	  			]
   	  	  			// grd_ArchiveSupplier end
	   	  		}*/
	   	  		]
   	  	  	
   	  	  			}
   	  	  			]
   	  	  
   	  	  }
   	  	  ]		
		});
 		me.callParent(arguments);
 		
 	 }
 	 ,loadMain:function(){
		var me=this;
		me.store.loadPage(1,{//修改，翻页后再去筛选，不查找前页的数据
		    callback: function(records, operation, success) {
		        if(records.length>0){
		        	me.down('#grd_Supplier').getSelectionModel().select(records[0]);
		        }		        
		    }
		});
	}
 	 
 	 //加载目录节点
	 ,loadGridByTreeNodeId: function(rec,tabflag){
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
	 	},
	 	upLoad : function(){
	 		var me = this;
	 		var grid=me.down('#grd_File');
	 		var recs=grid.getSelectionModel().getSelection();
	 		console.log(recs);
	 		var recordData = "[";
		    var a=false;
		    Ext.each(recs, function(rec) {
		          if(a){
		         	    recordData += ",";
		           }
		           recordData += Ext.encode(rec.data);
		            a=true;
		     });
		     recordData += "]";
		     console.log(recordData);
	 		Ext.Ajax.request({
									// 将生成的xml发送到服务器端,需特别注意这个页面的地址
									url : 'supplier/upMogoFile.do',
									async : false,
									timeout : 600000,
									method : 'POST',
									waitMsg : '正在进行数据验证，请耐心等候...',
									success : function(response, opts) {
										var obj = Ext.decode(response.responseText);
										alert(obj.message);
										me.registerAttchedStore.reload();
									},
									params : {
										/*file_path:rec.get('file_path'),
										company_id:rec.get('company_id'),
										file_name:rec.get('file_name'),
										create_dt:rec.get('create_dt')*/
										recordData : recordData
									}
								});
	 	}
	 	/*
	 	//加载当前选中的供应商的业务、附件数据，用于物理删除时获取数据
		,loadSingleData:function(rec)
		{
			var me=this;
			var company_id=rec.get('company_id');
			
			if(company_id>0)
			{
			//发票抬头store
			me.invoicestore.load({
				params:{
					company_id:company_id
				}
			});
			//主要设备明细
			me.devicelistStore.load({
				params:{
					company_id:company_id
				}
			});
			//公司产品主要用料表
			me.metarialStore.load({
				params:{
					company_id:company_id
				}
			});
			//公司主要客户maincustomerStore
			me.maincustomerStore.load({
				params:{
					company_id:company_id
				}
			});
			//公司主要竞争对手
			me.competitorStore.load({
				params:{
					company_id:company_id
				}
			});
			//公司银行账号
			me.bankAccountStore.load({
				params:{
					company_id:company_id
				}
			});
			//主要产品
			me.goodsStore.load({
				params:{
					company_id:company_id
				}
			});
			//规定上传的附件
			me.registerAttchedStore.load({params:{
				 	company_id:company_id,
				 	iscustom:0
				}});
			//自定义上传的附件
			me.customAttchedStore.load({params:{
				 	company_id:company_id,
				 	iscustom:1
				}});
		}
		
		}*/
 	});