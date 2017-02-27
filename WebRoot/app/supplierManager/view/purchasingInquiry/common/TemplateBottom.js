Ext.define('srm.supplier.view.purchasingInquiry.common.TemplateBottom',{
	extend:'srm.ux.Panel',
	alias:'widget.Pi_TemplateBottom',
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			layout:'column',
			defaults:{
					labelWidth : 100,
					xtype:'textfield',
					labelStyle : 'font-weight:nomal;text-align:left;color:#000',
					padding:'4 8 4 8',
					msgTarget : 'side',
					autoFitErrors : true
			},
			items:[
//				{
//					xtype:'displayfield',
//					columnWidth:1,
//					value:'<div style="font-size:14px;font-family:宋体;line-height:20px; padding:10px 0px 10 0px;">注：以上询价含17%增值税、含包装、运输等费用。<span style="font-style: italic">（规格型号与数量栏可省略）</span></div>'
//				
//				},
			
					{
						fieldLabel:'2、质量要求',
						columnWidth:0.25
					},
					{
						fieldLabel:'3、付款方式',
						columnWidth:0.25
					},{
						fieldLabel:'4、交货方式',
						columnWidth:0.25
					},
					{
						fieldLabel:'5、交货周期',
						columnWidth:0.25
					},
					{
						xtype:'displayfield',
						columnWidth:1,
						value:'6、询价单请贵司确认盖章并回传。'
					}
			]
		});
		this.callParent(arguments);
	}
});