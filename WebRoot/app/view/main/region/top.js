Ext.define('srm.view.main.region.top', {
	extend:'Ext.container.Container',
	alias : 'widget.maintop', 
	requires:['srm.ux.ButtonTransparent',
		'srm.view.main.menu.SettingMenu'
	],
	initComponent : function() {
		Ext.apply(this,{
			layout: {
			    type: 'hbox',
			    align: 'top'
			},
			items:[{
				xtype:'toolbar',
				flex:1,
				height:26,
				padding:'2 0 0 0',
				defaults:{border:false},
				
				items:[
				'->',{
					xtype:'buttontransparent',
					bind:{
						text:'{sayHolle}'
					}
				},'-',
//					{xtype:'settingmenu'},'-',
					{xtype:'buttontransparent',itemId:'btn_psd',handler:'onTopbarClicked',
					 glyph:0xf044,
					  bind:{text:'{system_info_cn.btn_psd.title}',
					  	tooltip:'{system_info_cn.btn_psd.tooltip}'
					  }
					},'-',
					{xtype:'buttontransparent',itemId:'btn_account',handler:'onTopbarClicked',
					 glyph:0xf007,
					  bind:{text:'{system_info_cn.btn_account.title}',
					  	tooltip:'{system_info_cn.btn_account.tooltip}'
					  }
					},'-',
					{xtype:'buttontransparent',itemId:'btn_help',glyph : 0xf059,handler:'onTopbarClicked',
					bind:{text:'{system_info_cn.btn_help.title}',
					  	tooltip:'{system_info_cn.btn_help.tooltip}'
					  }
					},'-',
					{xtype:'buttontransparent',itemId:'btn_logout',glyph : 0xf011,handler:'onTopbarClicked',
						bind:{
								text:'{system_info_cn.btn_logout.title}',
					  			tooltip:'{system_info_cn.btn_logout.tooltip}'
					  		}
					},
					{
						glyph : 0xf102,
						xtype:'buttontransparent',
						handler : 'hiddenTopBottom',
						tooltip : '隐藏顶部和底部区域',
						disableMouseOver : true
					}]
			}]
		});
	    this.callParent();  
	}
});