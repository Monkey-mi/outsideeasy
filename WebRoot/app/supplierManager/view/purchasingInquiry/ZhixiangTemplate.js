Ext.define('srm.supplierManager.view.purchasingInquiry.ZhixiangTemplate',{
	extend:'srm.ux.Panel',
	overflowY:'auto',
	alias:'widget.Pi_ZhixiangTemplate',
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
				layout:{
		     		type: 'vbox',//垂直分布
		     		align: 'stretch'
    			},
    			
				items:[{
				flex:1,
				xtype:'form',
				minHeight:360,
				layout:{
		     		type: 'table',//表格布局
		     		columns:4,
		     		tableAttrs: {
		     			//在这儿控制table标签中的Attrs属性
                        border: 1,
                        cellpadding: 2,
                        cellspacing: 1,
                        width: '98%',
                        align: 'left',
                        style: "border:1px solid #ccc;border-collapse:collapse;margin:0 auto;text-align:center;"
                    },
                    tdAttrs: {//控制td标签的属性，以上用法都是在ext的api中查到，同样的方式可以给tr添加属性
                        width: '25%',
                        height: '24px',
                        style: "padding:5px;border:1px solid #ccc;",
                        align:'left',
                        valign: 'middle'
                       
                    }
				},
				defaults:{xtype:'label'},
			items:[
				
			{
				text:"成本明细",
				style:'line-height:34px;'
				
			},{
				text:"用纸（含克重及等级，如170克A 级牛皮纸）"
				
				
			},
			
			{
				text:"吨位价"
				
			},
			
			{
				text:"单平方价"
			
			},
			{
				text:"面纸"
			
			},
			{
				text:""
			},
			{
				text:""
			},
			{
				text:""
			},{
				text:"B楞"
			},
			{
				text:""
			},
			{
				text:""
			},
			
			{
				text:""
			},
			{
				text:"夹芯"
			},{
				text:""
			},
			{
				text:""
			}
			,{
				text:""
			}
			,
			{
				text:"C楞(A楞)"
			},
			{
				text:""
			},{
				text:""
			},{
				text:""
			},
			{
				text:"里纸"
			}
			,
			{
				text:""
			},
			{
				text:""
			},{
				text:""
			},
			{
				text:"加工费用"
			},
			{
				text:""
			}
			,
			{
				text:""
			},
			{
				text:""
			},
			{
				text:"包装,运输费用"
			},{
				text:""
			},
			{
				text:""
			},
			{
				text:""
			}
			,
			{
				text:"税"
	
			},{
				text:""
			},
			{
				text:""
			},
			{
				text:""
			},{
				text:"利润"
			},
			{
				text:""
			},
			{
				text:""
			},
			{
				text:""
			},
			{
				text:"其他"
			},{
				text:""
			},
			{
				text:""
			},
			{
				text:""
			},
			
			{
				text:"合计（请报双平方价）",
				style:'font-weight:bold;'
			}
			,
			{
				text:""
			},
			{
				text:""
			},{
				text:""
			}
			]
			},
			{//注
			html:'<div style="font-size:14px;font-family:宋体;line-height:20px; padding-left:10px;">注：以上询价含17%增值税、含包装、运输等费用。<span style="font-style: italic">（规格型号与数量栏可省略）</span></div>'
			}]
        	
		});
		this.callParent(arguments);
	}
});