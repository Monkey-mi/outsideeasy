/*供应商物料确认信息页面*/
Ext.define('srm.supplierManager.view.materialConfirm.SupplierMaterialConfirm',{
	extend:'srm.ux.Panel',
	requires:['srm.ux.PagingBar',
			'srm.materialConfirmation.view.MaterialSample'],
	alias:'widget.panel_materialConfirmInfo',
	
	initComponent:function(){
		var me=this;
		me.materialConformstore=Ext.create('srm.materialConfirmation.store.MaterialConfirmation');
		
		Ext.apply(me,{
			layout:{type:'border'},
			padding:0,
			items:[{
				region:'center',
				flex:2,
				overflowY:'auto',
				overflowX:'auto',
				itemId:'grd_materialConfirm',
				xtype:'grid',
				layout:'fit',
				store:me.materialConformstore,
				dockedItems:[{
			    		xtype : 'pagingbar',
                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true,
			    		defaultPageSize:10
			    	  }],
			   	columns:[
			   	{header: '编号',dataIndex: 'confirmation_id',width:40},
				{header: '<div style="text-align:center">材料类别</div>',dataIndex: 'mc_name',align:'center',width:80},
   	  	  			
   	  	  			{header: '<div style="text-align:center">是否替换物料</div>',dataIndex: 'isreplace_material',align:'center',width:80,
   	  	  				renderer:function(value){
   	  	  					if(value==1)
   	  	  					{return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
   	  	  					}
   	  	  					else
   	  	  					{return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';}
   	  	  				}},
   	  	  			{header: '<div style="text-align:center">提交原因</div>',dataIndex: 'submit_reason',align:'center',width:120},
   	  	  			{header: '<div style="text-align:center">提交材料</div>',dataIndex: 'submit_item',align:'center',width:120},
   	  	  			{header: '<div style="text-align:center">是否满足要求</div>',dataIndex: 'ismatch_item',align:'center',width:80,
   	  	  				renderer:function(value){
   	  	  					if(value==0)
   	  	  					{return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
   	  	  					}
   	  	  					else
   	  	  					{return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';}
   	  	  				}},
   	  	  			{header: '<div style="text-align:center">是否完整\\正确</div>',dataIndex: 'integrity_status',align:'center',width:80,
   	  	  				renderer:function(value){
   	  	  					//0:完整
   	  	  					if(value==0)
   	  	  					{return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
   	  	  					}
   	  	  					else
   	  	  					{return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';}
   	  	  				}},
   	  	  			{header: '<div style="text-align:center">最终结论</div>',dataIndex: 'confirm_result',align:'center',width:160,
					renderer:function(value){
						if(value==0)
						{
						return '合格，可以进行小批试制';
						}
						else if(value==1)
						{return '暂时让步接收，可以进行样品试装，样品改进后必须重新送样';}
						else if(value==2)
						{return '不合格，要求改进后重新送样';}
						else if(value==3)
						{return '要求补充、完善上栏所列文件';}
						
						else return '';
					}},
					
   	  	  			{header: '<div style="text-align:center">最终确认人</div>',dataIndex: 'final_confirrmor',width:80},
   	  	  			{header: '<div style="text-align:center">确认时间</div>',dataIndex: 'confirm_date',width:100,align:'center',xtype:'datecolumn',format:'Y-m-d'},
					{header: '<div style="text-align:center">联系人</div>',dataIndex: 'contacts',width:80},
					{header: '<div style="text-align:center">电话</div>',dataIndex: 'f_phone',align:'center',width:100},
					{header: '<div style="text-align:center">地址</div>',dataIndex: 'addr',width:160},
					{header: '<div style="text-align:center">传真</div>',dataIndex: 'fax',align:'center',width:100},
					{header: '<div style="text-align:center">即时通讯</div>',dataIndex: 'm_phone',align:'center',width:100},
					{header: '<div style="text-align:center">申请人</div>',dataIndex: 'proposer',align:'center',width:80},
   	  	  			{header: '<div style="text-align:center">申请单位</div>',dataIndex: 'apply_companyname',align:'center',width:100},
   	  	  			{header: '<div style="text-align:center">申请时间</div>',dataIndex: 'apply_date',align:'center',xtype:'datecolumn',format:'Y-m-d',width:100}
   	  	  			
			   	]
			},
			{
				region:'south',
				layout:'fit',
				flex:3,
				xtype:'MaterialSample',
 				itemId:'materialSample',
 				split:true,
 				
 				canEidt:false
			}]
		});
		
		me.callParent(arguments);
	},
	//根据供应商ID获取物料确认数据
	loadMaterialConfrimData:function(companyid)
	{
		var me=this;
		if(companyid>0)
		{
			me.materialConformstore.load({
				params:{company_id:companyid}
			});
		}
	},
	
	/*根据物料确认ID获取检测明细信息，用于选择上界面物料确认列表中一条记录时显示下界面项目的检测详细*/
	loadCheckDetailsByConfirmId:function(confirm_id)
	{
		var me=this;
		if(confirm_id>0)
		{
			me.down("#materialSample").loadDetailData(confirm_id);
		}
	}
});