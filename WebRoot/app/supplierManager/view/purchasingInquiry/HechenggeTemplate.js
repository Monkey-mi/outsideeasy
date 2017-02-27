Ext.define('srm.supplierManager.view.purchasingInquiry.HechenggeTemplate',{
	extend:'srm.ux.Panel',
	overflowY:'auto',
	alias:'widget.Pi_HechenggeTemplate',
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
				minHeight:690,
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
                        width: '20%',
                        height: '24px',
                        style: "padding:5px;border:1px solid #ccc;",
                        align:'left',
                        valign: 'middle'
                       
                    }
				},
				defaults:{xtype:'label'},
			items:[
				{
					text:'材料名称:',
					colspan:3
				},
				{
				text:"附图",
				rowspan:24
			},
			{
				text:"成本明细"
				,style:'line-height:34px;'
				//,cls:'table_header'
				//height:40
				
			},{
				text:"参数"
				
			},
			
			{
				text:"拆分成本（元）"
				
			},
			
			{
				text:"型号及规格"
			
			},{
				text:""
			},
			{
				text:""
			},{
				text:"基布规格(?D)"
			},
			{
				text:""
			},
			{
				text:""
			},
			{
				text:"基布克重(?克/米)"
			},{
				text:""
			},
			{
				text:""
			}
			,
			{
				text:"基布价格"
			},
			{
				text:""
			},{
				text:""
			},
			{
				text:"发泡层未发泡时厚度(?MM)"
			}
			,
			{
				text:""
			},
			{
				text:""
			},{
				text:"发泡层未发泡时克重(?克/米)"
			},
			{
				text:""
			}
			,
			{
				text:""
			},
			{
				text:"面层厚度(?MM)"
			},{
				text:""
			},
			{
				text:""
			}
			//
			,
			{
				text:"表面层克重(?克/米)"
	
			},{
				text:""
			},
			{
				text:""
			},{
				text:"发泡倍率(?倍)"
			},
			{
				text:""
			},
			{
				text:""
			},
			{
				text:"发泡层  PVC,DOP,钙粉比例"
			},{
				text:""
			},
			{
				text:""
			},
			{
				text:"面层PVC,DOP,钙粉比例"
			},
			{
				text:""
			},{
				text:""
			},
			{
				text:"PVC价格(?元/吨)"
			},
			//
			{
				text:""
			},
			{
				text:""
			},{
				text:"DOP价格(?元/吨)"
			},
			{
				text:""
			},
			{
				text:""
			},
			{
				text:"钙粉价格(?元/吨)"
			},{
				text:""
			},
			{
				text:""
			},
			{
				text:"表面处理类型"
				
			},{
				text:""
			},
			{
				text:""
			},{
				text:"表面处理价格"
			},
			{
				text:""
			}
			,{
				text:""
			},
			{
				text:"成品损耗(?%)"
			},{
				text:""
			},
			{
				text:""
			}
			,{
				text:"包装,运输费用(?元/米)"
			},
			{
				text:""
			},{
				text:""
			},
			{
				text:"人工,煤,电费用(?元/米)"
			}
			
			,
			{
				text:""
				
			},{
				text:""
			},
			{
				text:"税(?元/米)"
			},{
				text:""
			},
			{
				text:""
			},
			{
				text:"利润(?元/米)"
			},
			{
				text:""
			},{
				text:""
			},
			{
				text:"合计"
			}
			,
			
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