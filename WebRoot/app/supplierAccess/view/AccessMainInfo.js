/*准入评估信息页面*/
Ext.define('srm.supplierAccess.view.AccessMainInfo',{
	extend:'srm.ux.Window',
	alias:'widget.access_MainInfo',
	requires:['srm.supplierAccess.view.AccessBaseInfo'
			,'srm.supplierAccess.view.EvaluateManager'
			],
//	height:document.body.clientHeight,
//	width:document.body.clientWidth * 0.8>1000?document.body.clientWidth * 0.8:1000,
	overflowY: 'auto',
	listeners:{
		beforeclose:function(){
			var mes=confirm('真的要关闭此页面吗?');
			return mes;
		},
		'close':function(cmp){
			cmp.destroy();
		}
		
//		resize:function(){
//			this.height=document.body.clientHeight;
//			this.width=document.body.clientWidth * 0.8>1000?document.body.clientWidth * 0.8:1000;
//		}
	},
	initComponent:function(){
		var me=this;
		
		Ext.apply(me,{
			height:document.body.clientHeight<800?document.body.clientHeight:800,
			width:document.body.clientWidth<1200?document.body.clientWidth:1200,
			layout:{
		     type: 'vbox',//垂直分布
		     align: 'stretch'
    		},
			items:[{
			//准入评估基本信息
				xtype:'access_BaseInfo',
				itemId:'accessBaseInfo'
				//height:136
			},{
				
//				//13项评估具体页面
				flex:1,
				height:document.body.clientHeight-136,
				padding:'0 4 0 0',
				overflowY: 'auto',
				xtype:'access_EvaluateManager',
				itemId:'access_EvaluateManager',
				accessScore:me.accessScore,
				company_id:me.company_id
			}]
		});
	me.callParent(arguments);
	me.loadRec(me.supplierRec,me.accessScore);
	},
	loadRec:function(supplierRec,accessScore)
	{
		var me=this;

		//加载头部基本的供应商信息
		me.down('#accessBaseInfo').down('#panelSupplierInfo').loadRecord(supplierRec);
		//准入评估页面company_id赋值
		//me.down('#access_EvaluateManager').down('#evaluateItemDetails').loadEvaluateData(supplierRec.get('company_id'),accessScore);
	}
	});