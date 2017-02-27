/*准入评估信息页面*/
Ext.define('srm.supplierManager.view.accessToEvaluate.EvaluateMain',{
	extend:'srm.ux.Panel',
	alias:'widget.access_EvaluateMain',
	requires:['srm.supplierManager.view.accessToEvaluate.EvaluateBaseInfo'
			,'srm.supplierManager.view.accessToEvaluate.EvaluateDetails'
			],
	height:800,
	overflowY: 'auto',
	initComponent:function(){
		var me=this;
		me.on('beforedestroy',function(panel){
	 		panel.removeAll();
	 	});
		Ext.apply(me,{
			
			layout:{
		     type: 'vbox',//垂直分布
		     align: 'stretch'
    		},
			items:[{
			//准入评估基本信息
				xtype:'access_EvaluateBaseInfo',
				itemId:'access_EvaluateBaseInfo'
				//height:200
			},{
				
//				//13项评估具体页面
				flex:1,
				overflowY: 'auto',
				xtype:'access_EvaluateDetails',
				itemId:'access_EvaluateDetails'
			}]
		});
	me.callParent(arguments);}});