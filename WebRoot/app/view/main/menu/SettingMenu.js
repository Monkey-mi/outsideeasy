/**
 * 显示在顶部的按钮菜单，可以切换至标准菜单，菜单树
 */
Ext.define('srm.view.main.menu.SettingMenu', {
			extend : 'srm.ux.ButtonTransparent',
			alias : 'widget.settingmenu',
			text : '设置',
			glyph : 0xf013,
			tooltip : '偏好设置',
			initComponent : function() {
				this.menu = [];
				this.menu.push( {
							text : '列表设置',
							menu : [{
										text : '列宽自动调整',
										menu : [{
													autoRender : true,
													xtype : 'segmentedbutton',
													reference : 'autocolumnmode', // 加入了这一句，在改变数据的时候可以触发bind绑定的事件
													defaultUI : 'default',
													value : 'onlyfirstload',
													items : [{
																text : '首次加载',
																tooltip : '第一次加载到数据时进行列宽自动调整',
																value : 'onlyfirstload'
															}, {
																text : '每次加载',
																tooltip : '每一次加载到数据时都进行列宽自动调整(低效率)',
																value : 'everyload'
															}, {
																text : '禁止自动调整',
																value : 'disable'

															}]
												}]
									}, {
										text : '自动选中记录',
										menu : [{
													autoRender : true,
													xtype : 'segmentedbutton',
													reference : 'autoselectrecord', // 加入了这一句，在改变数据的时候可以触发bind绑定的事件
													defaultUI : 'default',
													value : 'disable',
													items : [{
																text : '每次加载',
																tooltip : '每次加载到数据的时候都选中第一条记录',
																value : 'everyload'
															}, {
																text : '单条选中',
																tooltip : '加载到数据只有一条时选中',
																value : 'onlyone'
															}, {
																text : '不自动选择',
																value : 'disable'
															}]
												}]
									}]
						});

				this.listeners = {
					menushow : function(button, menu) {
						// 设置当前的菜单类型为已选中的类型，本来应该是自动setValue的，不知道为什么没有自动赋值。
						button.down('segmentedbutton').setValue(this.up('app-main')
								.getViewModel().get('menuType.value'));
					}
				}, this.callParent();
			}
		});