/*准入评估表的表头基本信息页面（共有信息）*/
Ext.define('srm.supplierManager.view.accessToEvaluate.EvaluateBaseInfo',{
	extend:'srm.ux.Panel',
	alias:'widget.access_EvaluateBaseInfo',
	
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			defaults:{padding:'4 4 0 4'},
			items:[{
				xtype:'form',
				layout:{type:'hbox',align:'stretch'},
				defaults:{xtype:'container',padding:'0 0 0 0'},
				items:[{
				//供应商信息
					flex:3,
					xtype:'fieldset',
					title:'<span style="color:#008cd6">供应商信息</span>',
					collapsible: true,
					padding:4,
					items:[{
						defaults:{xtype:'textfield',
				 			labelWidth : 100,
							labelStyle : 'font-weight:nomal;text-align:left;color:#000',
							padding:'1 0 1 8',
							msgTarget : 'side',
							autoFitErrors : true},
						layout:'column',
						itemId:'panelSupplierInfo',
						xtype:'form',
						items:[{
    						fieldLabel:'供应商',
    						name:'cpyname_cn',
							itemId:'cpyname_cn',
							readOnly:true,
    						columnWidth:1/3
    						}
    						,{
    						fieldLabel:'产品',
    						columnWidth:1/3
    						},{
    						fieldLabel:'经营许可有效期',
    						columnWidth:1/3
    						},{
    						fieldLabel:'联系人',
    						itemId:'contacts',
							name:'contacts',
							readOnly:true,
    						columnWidth:1/3
    						},{
    						fieldLabel:'电话',
    						itemId:'m_phone',
							name:'m_phone',
							readOnly:true,
    						columnWidth:1/3
    						},{
    						fieldLabel:'电子邮件',
    						itemId:'email',
							name:'email',
							readOnly:true,
    						columnWidth:1/3
    						},{
    						fieldLabel:'工厂所有者',
    						columnWidth:1/3
    						},
    						{
    						fieldLabel:'工厂人数',
    						columnWidth:1/3
    						},{
    						fieldLabel:'总销售额',
    						columnWidth:1/3
    						},{
    						fieldLabel:'地址',
    						itemId:'contact_addr',
							name:'contact_addr',
							readOnly:true,
    						columnWidth:2/3
    						}]
					}]
				},{
				//审核信息
					flex:2,
					xtype:'fieldset',
					padding:4,
					title:'<span style="color:#008cd6">审核信息</span>',
					collapsible: true,
					itemId:'plEvaluateExamineInfo',
					items:[{
						defaults:{xtype:'textfield',
				 			labelWidth : 100,
							labelStyle : 'font-weight:nomal;text-align:left;color:#000',
							padding:'4 0 4 8',
							msgTarget : 'side',
							autoFitErrors : true},
						layout:'column',
					items:[{
    				fieldLabel:'供评估日期',
    				columnWidth:0.5
    			},{
    				fieldLabel:'总分',
    				columnWidth:0.5
    			},{
    				fieldLabel:'主任审核员',
    				columnWidth:0.5
    			},{
    				fieldLabel:'关键区域分数',
    				columnWidth:0.5
    			},{
    				fieldLabel:'审核员',
    				columnWidth:0.5
    			},{
    				fieldLabel:'评估总得分',
    				columnWidth:0.5
    			}]
				}]
				}]}]
				
			
		});
	me.callParent(arguments);}});