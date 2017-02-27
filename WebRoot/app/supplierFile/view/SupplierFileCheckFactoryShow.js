//注册附件
Ext.define('srm.supplierFile.view.SupplierFileCheckFactoryShow',{
	extend:'srm.ux.Panel',
	alias:'widget.SupplierFileCheckFactoryShow',
	isAdd:false,
	isEdit:false,
	//overflowY: 'auto',
	//height:800,
	supplier_id:-1,
	initComponent:function(){
		var me=this;
		me.on('beforedestroy',function(panel){
	 		panel.removeAll();
	 	});
		//附件store
		me.checkFactoryStore=Ext.create('srm.supplierFile.store.SupplierCheckfactoryReport');
		Ext.apply(me,{
			layout:{type:'vbox',align:'stretch'},
			items:[{
				flex:1,
				layout:{type:'hbox',align:'stretch'},
				overflowY:'auto',
				overflowX:'hidden',
				items:[{
					flex:1,
					xtype:'grid',
					itemId:'fileGrid',
					border:false,
					store:me.checkFactoryStore,
					columns:[
					{header:'序号', xtype:'rownumberer',width:45},
					{header:'文件名称',dataIndex:'file_name',width:150},
					{header:'说明',dataIndex:'remark',width:150},
					{header:'验厂得分',dataIndex:'check_score',width:80},
					{header:'操作者名称',dataIndex:'operator_name',width:100},
					{header:'验厂时间',dataIndex:'check_factory_dt',width:150, xtype: 'datecolumn',format: 'Y-m-d H:i:s'},
					{header:'验厂人员',dataIndex:'checkor',width:100},
					{
						header:'操作',xtype:'actioncolumn',width:60,
						items:[{
							tooltip:'下载',
							icon:'resources/images/icon/download.png',
							handler:function(grid,rowIndex,colIndex){
								var rec = grid.getStore().getAt(rowIndex);
								if(Ext.isEmpty(rec.get('mogodb_id')))
								{
									Ext.Msg.alert('提示','未上传，无法下载');return;
								}
								var src1='fileopt/downLoadFileFormMongo.do?filename='+rec.get('mogodb_id');
								window.open(src1, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
							}
						}
						]
					}
				]
			}
			]
			}
			
			]
			
		});
		this.callParent(arguments);		
   },
   //加载当前供应商的所有已上传附件
   loadCheckFactoryData:function(rec){
		var me=this;
		supplier_id=rec.get('supplier_id');
		if(supplier_id>0){
			me.supplier_id=supplier_id;
			me.checkFactoryStore.load({
				params:{
					supplier_id:supplier_id
				},
				callback:function(records, operation, success){
						if(records[0]==null)
						{
							
						}
						
					}
			});
		}
	}
});