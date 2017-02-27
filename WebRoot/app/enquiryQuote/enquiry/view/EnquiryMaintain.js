Ext.define('srm.enquiryQuote.enquiry.view.EnquiryMaintain',{
	extend:'srm.ux.Window',
	alias:'widget.edt_Enquiry',
	width:980,
    height:800,
    modal : true,
	
	initComponent:function(){
		var me=this;
		me.detailstore=Ext.create('srm.enquiryQuote.enquiry.store.EnquiryDetail');
		me.distributionstore=Ext.create('srm.enquiryQuote.enquiry.store.EnquiryDistribution');
		me.toBeDeleteFileArray=[];
		Ext.apply(me,{
			layout:{
				type:'vbox',
				align:'stretch'
			},
			tbar:[{text:'保存',glyph:0xf0c7,itemId:'BTN_SAVE'},
	    			{text:'关闭',glyph:0xf00d,
	    				handler:function(){
	    					me.close();	
	    				}
	    			}],
			items:[{
				xtype:'form',
				height:200,
				title:'基础信息',
				bodyPadding: 10,
				store:me.mainstore,
				layout: 'column',
	       		defaults:{labelWidth:80,xtype:'textfield',padding:3},
				items:
				[
					{fieldLabel:'询价公司',name:'company_id',hidden:true,columnWidth:1},
					{fieldLabel:'询价编号',name:'enquiry_id',columnWidth:0.25,hidden:true,readOnly:true,fieldStyle:'background:#E6E6E6'},
					{fieldLabel:'询价项目',name:'enquiry_item',columnWidth:1,maxLength:100},
					{fieldLabel:'询价人员',name:'enquiry_person',columnWidth:0.5,readOnly:true,fieldStyle:'background:#E6E6E6'},
					{fieldLabel:'询价日期',name:'enquiry_date',itemId:'enquiry_date',xtype:'datefield',columnWidth:0.5},
					{fieldLabel:'发        票',name:'invoice',columnWidth:0.5,maxLength:15},
					{fieldLabel:'税        率',name:'tax_rate',columnWidth:0.25,xtype:'numberfield',decimalPrecision :3,maxValue:0.99},
					{fieldLabel:'付款方式',name:'payment_way',columnWidth:0.25,maxLength:100},
					{fieldLabel:'截止日期',name:'enddate',xtype:'datefield',columnWidth:.25},
					{fieldLabel:'备注说明',name:'remark',columnWidth:0.75}
				]
			},
				{
					xtype:'tabpanel',
					flex:1,
					items:[
					{
						xtype:'grid',
						itemId:'grd_EnquiryDetail',
						title:'询价明细',
						selModel:Ext.create('Ext.selection.CheckboxModel'),
						tbar:[{text:'增加',glyph:0xf055,itemId:'btn_enquirydetail_add'},
							{text:'删除',glyph:0xf014,itemId:'btn_enquirydetail_del',disabled:true}
						],
						features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }],
						columns:[
							{header:'顺序',dataIndex:'item_order',width:40,
								summaryType: 'count',
				   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }
							},
							{header:'明细编号',dataIndex:'enquiry_detail_id',width:40,hidden:true},
							{header:'产品名称',dataIndex:'pro_name',width:160,
								editor:{},
								renderer:function(v,metaData){
					                metaData.tdAttr = 'data-qtip="' + (v) + '"';  
					            	return v;
					            }
							},
							{header:'类别',dataIndex:'mc_id',width:120,
								editor:{
			    					xtype : 'treepicker',    
								    displayField : 'text',
								    valueField: 'id',
								    store:me.treeStore,
								    rootVisible:false,
								    maxPickerWidth:240
			    				},
			    				renderer:function(value){
									var rec=me.materialClassstore.findRecord('mc_id',value,0,false,false,true);
									return Ext.isEmpty(rec)?value:rec.get('mc_name');
			   	  	  			}
							},
							{header:'数量',dataIndex:'qty',width:80,xtype:'numbercolumn',editor:{},
					            summaryType: 'sum',
				   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            },
					            renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            }
					        },
							{header:'单位',dataIndex:'unit',width:80,editor:{}},
							{header:'交货周期',dataIndex:'delivery_cycle',width:120,editor:{}},
							{header:'描述',dataIndex:'description',width:160,editor:{}},
							{header:'附件',dataIndex:'attched',width:100
								,renderer:function(v,metaData){
						            if(Ext.isEmpty(v)){
						            	return '<div style="color:red">未上传</div>';
						            }else{
						            	return '<div style="color:green">已上传</div>';
						            } 
						        }
							},
							{header:'操作',xtype:'actioncolumn',width:250,
								items:[
								{
									icon:'resources/images/icon/add.png',
									tooltip:'上传',
									handler:function(grid,rowIndex,colIndex){
										if(!me.canUseButtonOrEdit()){//已经提交，不可编辑
											return;
										}
										var currentrec = grid.getStore().getAt(rowIndex);
										if(!Ext.isEmpty(currentrec.get('attched'))){
											Ext.Msg.alert('提示','请先删除上传附件');
											return;
										}
										var win=Ext.widget('upEnquiryFile',{				
												itemId: 'upEnquiryFile',
												currentrec:currentrec,
												closable: true
										});
										win.show();
									}
								},{
										icon:'resources/images/icon/download.png',
										tooltip:'下载',
										handler:function(grid,rowIndex,colIndex){
											var rec = grid.getStore().getAt(rowIndex);
											if(rec.get('enquiry_detail_id')<=0 || Ext.isEmpty(rec.get('attched'))){
												Ext.Msg.alert('提示','无附件');return;
											}
											var file_path=encodeURIComponent(encodeURIComponent(rec.get('attched')));
											window.open('common/downloadFile.do?file_path='+file_path, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
										}
								},{
									icon:'resources/images/icon/delete.gif',
									tooltip:'删除',
									handler:function(grid,rowIndex,colIndex){
										if(!me.canUseButtonOrEdit()){//已经提交，不可编辑
											return;
										}
										var currentrec = grid.getStore().getAt(rowIndex);
										if(Ext.isEmpty(currentrec.get('attched'))){
											Ext.Msg.alert('提示','文件尚未上传，无法删除');
											return;
										}
										Ext.Msg.confirm("提示","是否确认删除上传的附件?",function(btn){
									   		if(btn=="yes")
									   		{
									   			me.toBeDeleteFileArray.push(currentrec.get('attched'));
									   			currentrec.set('attched',null);
									   		}
									   });//confirm
									}//handler
								}]
							}
						],
						store:me.detailstore,
				    	plugins:Ext.create('Ext.grid.plugin.CellEditing', {
							        clicksToEdit : 1,
							        autoCancel: false,
							        itemId:'cellEditing'
				        }),
				        listeners: {
							selectionchange: function(grid, rec) {
								if (rec.length>0){
									me.down('#btn_enquirydetail_del').setDisabled(false);
								 }else{
								 	me.down('#btn_enquirydetail_del').setDisabled(true);
								 }
							}
						}
					},
					{
						xtype:'grid',
						itemId:'grd_EnquiryDistribution',
						title:'询价发布',
						tbar:[{text:'增加',glyph:0xf055,itemId:'btn_EnquiryDistribution_add'},
							{text:'删除',glyph:0xf014,itemId:'btn_EnquiryDistribution_del',disabled:true}
						],
						columns:[
						{header:'',xtype:'rownumberer',width:25},
						
						{header:'分发公司',dataIndex:'cpyname_cn',width:200,
							renderer:function(v,metaData){
					            metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				    			return v;
					        }
						},
						{header:'分发日期',dataIndex:'distribute_date',width:100,xtype:'datecolumn',format:'Y-m-d',
							editor:{
								xtype:'datefield'
							}
						}
						],
						store:me.distributionstore,
						plugins:Ext.create('Ext.grid.plugin.CellEditing', {
							        clicksToEdit : 1,
							        autoCancel: false,
							        itemId:'cellEditing'
				        }),
				        listeners: {
							selectionchange: function(grid, rec) {
								if (rec.length>0){
									me.down('#btn_EnquiryDistribution_del').setDisabled(false);
								 }else{
								 	me.down('#btn_EnquiryDistribution_del').setDisabled(true);
								 }
							}
						}
					}
					]
				}]
			});
		me.callParent(arguments);
		
	},
	//加载数据,页面初始化
	loadData:function(rec,isAdd,isEdit){
		var me=this;
		var form=me.down('form');
		form.loadRecord(rec);
		if(isEdit){
			me.detailstore.load({
				params:{
					enquiry_id:rec.get('enquiry_id')
				}
			});
			me.distributionstore.load({
				params:{
					enquiry_id:rec.get('enquiry_id')
				}
			});
		}
	},
	//删除上传的文件,在保存时执行
	deleteUploadFile:function(){
		var me=this;
		srm.Const.callServiceMethodSync('common/deleteFileByPath.do',{
				patharray:me.toBeDeleteFileArray.join(',')
		});
		me.toBeDeleteFileArray=[];//重置
	},
	//是否可以使用按钮或者编辑
	canUseButtonOrEdit:function(){
		var me=this;
		if(me.cannotedit){
			Ext.Msg.alert('提示','已提交,不可修改');
			return false;
		}else{
			return true;
		}
	}
});