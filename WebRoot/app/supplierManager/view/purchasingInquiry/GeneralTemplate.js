Ext.define('srm.supplierManager.view.purchasingInquiry.GeneralTemplate',{
	extend:'srm.ux.Panel',
	alias:'widget.Pi_GeneralTemplate',
	requires:['srm.supplierManager.view.purchasingInquiry.common.TemplateTop',
	'srm.supplierManager.view.purchasingInquiry.common.TemplateBottom'],
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			layout:{
		     type: 'vbox',//垂直分布
		     align: 'stretch'
    		},
			items:[
				{
				//询价明细
				
				flex:1,
				//minHeight:400,
    			//autoScroll:true,
				overflowY:'auto',
				items:[
    			{
    			xtype:'grid',
    			minHeight:340,
    			flex:1,
    			border:true,
    			itemId:'grdGeneralTemplateDetails',
//    			tbar:[{
//					text:'添加',glyph:0xf055,itemId:srm.def.Const.FUNC_ITEMID_BTN_ADD
//				},{
//					text:'删除',glyph:0xf014,itemId:srm.def.Const.FUNC_ITEMID_BTN_DEL
//				}],
    			columns:[
    			//{header:'序号',xtype:'rownumberer',width:40},
    			{header:'<div style="text-align:center">材料名称</div>',dataIndex:'',editor:{xtype:'textfield',allowblank:false},flex:1,minWidth:100},
    			{header:'<div style="text-align:center">规格型号</div>',dataIndex:'',editor:{xtype:'textfield'},width:250},
    			{header:'<div style="text-align:center">数量</div>',dataIndex:'',editor:{xtype:'numberfield'},width:100},
    			{header:'<div style="text-align:center">单位</div>',dataIndex:'',editor:{xtype:'textfield'},width:100},
    			{header:'<div style="text-align:center">单价（元）</div>',dataIndex:'',editor:{xtype:'numberfield'},width:100},
    			{header:'<div style="text-align:center">合计</div>',dataIndex:'',editor:{xtype:'numberfield'},width:120}
    			],
    			selType: 'rowmodel',
    			plugins: [
        			Ext.create('Ext.grid.plugin.RowEditing', {
            			clicksToEdit: 1})
    				]
    			
    				},{
    				html:'<div style="font-size:14px;font-family:宋体;line-height:20px; padding-left:10px;">注：以上询价含17%增值税、含包装、运输等费用。<span style="font-style: italic">（规格型号与数量栏可省略）</span></div>'
    				}]
    		
			}
			]
		});
		this.callParent(arguments);
	}
});