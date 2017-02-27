Ext.define('srm.view.main.region.LeftMenu',{
	extend:'Ext.panel.Panel',
	uses:['srm.view.main.menu.AccordionMainMenu'],
	alias:'widget.leftMenu',
	layout:'fit',
	title:'导航菜单',
	glyph : 0xf0c9,
	collapsible:true,
	tools : [{
					itemId : 'up',
					type : 'up',
					hidden:true,
					tooltip : '在上面显示菜单条',
					handler : 'showMainMenuToolbar'
			}],
	initComponent : function() {
		var me=this;
		Ext.apply(me,{
			items:[{xtype:'mainmenuaccordion'}]
//			html:'<iframe src="leftmenu.html" height="100%" width="100%" frameborder=0></iframe>'
		});
		me.callParent();
	}
});