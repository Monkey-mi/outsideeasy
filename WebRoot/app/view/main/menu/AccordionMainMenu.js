/**
 * 折叠式(accordion)菜单，样式可以自己用css进行美化
 */
Ext.define('srm.view.main.menu.AccordionMainMenu', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.mainmenuaccordion',
			layout : {
				type : 'accordion',
				animate : true
			},
			initComponent : function() {
				this.items = [];
				var vm = this.up('app-main').getViewModel();
				var menus = vm.get('sys_menu');
				var me = this;
				for (var i in menus) {
					var menugroup = menus[i];
					var accpanel = {
						menuAccordion : true,
						xtype : 'panel',
						title : menugroup.title,
						bodyStyle : {
							padding : '10px'
						},
						layout : 'fit',
						dockedItems : [{
									dock : 'left',
									xtype : 'toolbar',
									items : []
								}],
						glyph : menugroup.glyph
					};
					for (var j in menugroup.sub_menu) {
						var module = menugroup.sub_menu[j];
						if (module) {
							accpanel.dockedItems[0].items.push({
										itemId:'mdl_'+module.module,
										xtype : 'buttontransparent',
										text : this.addSpace(module.title, 12),
										glyph : module.glyph,
										handler : 'onMainMenuClick'
									});
						}
					}
					this.items.push(accpanel);
				}
				this.callParent(arguments);
			},

			addSpace : function(text, len) {
				var result = text;
				for (var i = text.length; i < len; i++) {
					result += '　';
				}
				return result;
			}

		});