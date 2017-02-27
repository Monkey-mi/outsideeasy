Ext.define('srm.supplierManager.view.purchasingInquiry.common.TemplateTop',{
	extend:'srm.ux.Panel',
	alias:'widget.Pi_TemplateTop',
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			layout:'column',
			defaults:{
					labelWidth : 100,
					xtype:'textfield',
					labelStyle : 'font-weight:nomal;text-align:left;color:#000',
					padding:'4 8 0 8',
					msgTarget : 'side',
					autoFitErrors : true
			},
			items:[
					{
						fieldLabel:'供应商名称',
						name:'s_name',
						columnWidth:1/3
					},
					{
						fieldLabel:'业务联系人',
						columnWidth:1/3
					},
					{
						fieldLabel:'<span>供应商电话\\传真<span>',
						columnWidth:1/3
					}
					,
					{
						fieldLabel:'采购部门',
						xtype:'combo',
						columnWidth:1/3
					}
					,
					{
						fieldLabel:'采购员',
						columnWidth:1/3
					}
					,
					{
						fieldLabel:'电话\\传真',
						columnWidth:1/3
					}
//					,
//					{
//						fieldLabel:'质量要求',
//						columnWidth:1/3
//					},
//					{
//						fieldLabel:'付款方式',
//						columnWidth:1/3
//					},
//					{
//						fieldLabel:'交货方式',
//						columnWidth:1/3
//					},
//					{
//						fieldLabel:'交货周期',
//						columnWidth:1/3
//					}
			]
		});
		this.callParent(arguments);
	}
});