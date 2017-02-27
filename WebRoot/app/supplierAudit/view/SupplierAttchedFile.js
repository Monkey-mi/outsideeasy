Ext.define('srm.supplierAudit.view.SupplierAttchedFile',{
	extend:'srm.ux.Panel',
	alias:'widget.audit_AttchedFileInfo',
	requires:[],
	overflowY: 'auto',
	initComponent:function(){
		var me=this;
		me.attchedStore=Ext.create('srm.supplierAudit.store.Attched');
		Ext.apply(me,{
			layout:{type:'vbox',align:'stretch'},
			items:[{
				xtype:'grid',
				itemId:'fileGrid',
				border:false,
				store:me.attchedStore,
				columns:[{header:'序号', xtype:'rownumberer',width:40},
						{header:'文件名称',dataIndex:'file_type_id',flex:1,renderer:function(v,metaData){
							if(v==18){return '营业执照';}
							else if(v==19){return '税务登记证';}
							else if(v==20){return '组织机构代码证';}
							else if(v==21){return '纳税人资格证书';}
							}
						},
						{
							header:'操作',xtype:'actioncolumn',width:80,
							items:[{
								icon:'resources/images/icon/download.png',
								tooltip:'下载',
								
								handler:function(grid,rowIndex,colIndex){
									var rec = grid.getStore().getAt(rowIndex);
									var mongo_id=rec.get('mogodb_id');
									if(Ext.isEmpty(mongo_id))
									{
										Ext.Msg.alert('提示','当前还没有上传文件，无法下载');return;
									}
									window.open('PfTaskFileCtrl/downLoadFileFormMongo.do?fileId='+mongo_id, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
									}
								},{
									icon:'resources/images/icon/application_view_list.png',
									tooltip:'预览',
									handler:function(grid,rowIndex,colIndex)
									{
										var rec = grid.getStore().getAt(rowIndex);
										var mogodb_id=rec.get('mogodb_id');
										if(!Ext.isEmpty(mogodb_id))
										{
											me.showPic(mogodb_id);
										}
										else
										{
											Ext.Msg.alert('提示','当前还没有上传文件,无法预览');
											return;
										}
									}
								}]
						}]
			},{
				flex:1,
				layout:'absolute',
				items:[{
					//预览图片
					xtype:'image',
					x:2,
	    			y:2,
					minHeight:'100%',
					minWidth:'100%',
					itemId:'PIC',
					border:true,
					src:'',
					style:"position:absolute;left:0;top:0;"
				}]
				
				
			}]
		});
		me.callParent(arguments);
	},
	loadfileData:function(company_id)
	{
		var me=this;
		me.attchedStore.load({
				params:{
					company_id:company_id
				}
			});
	},
	//展示图片
	showPic:function(mongo_id)
	{
		var me=this;
		var newsrc='PfTaskFileCtrl/downLoadFileFormMongo.do?fileId='+mongo_id;
		var imgPanel=me.down('#PIC');
		imgPanel.setSrc(newsrc);
	}
});