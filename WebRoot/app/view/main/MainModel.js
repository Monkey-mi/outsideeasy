/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('srm.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
	constructor : function() {  
	    var me = this;  
	    // 这一句是关键，如果没有的话，this还没有初始化完成,下面的Ext.apply(me.data,....)这句就会出错  
	    this.callParent(arguments);  
	    Ext.apply(me.data,srm.Util.data);
	    // 同步调用取得系统参数  
//	    srm.Util.init(function(){
//	    	Ext.apply(me.data,srm.Util.data);
//	    });
	},
    data: {
    		system_info_cn:{
				name:'供应商关系管理(SRM)',
				btn_account:{
					title:'账户管理',
					tooltip:'用户信息'
				},
				btn_psd:{
					title:'修改密码',
					tooltip:'修改密码'
				},
				btn_help:{
					title:'帮助信息',
					tooltip:'帮助信息'
				},
				btn_logout:{
					title:'注销',
					tooltip:'退出系统'
				}
    		}
    },


    //TODO - add data, formulas and/or methods to support your view
    formulas : {

				isButtonMenu : function(get) {
					return get('menuType.value') == 'button';
				},

				isToolbarMenu : function(get) {
					return get('menuType.value') == 'toolbar';
				},

				isTreeMenu : function(get) {
					return get('menuType.value') == 'tree';
				}

			},
    getModuleDefine : function(moduleId) {
				var result = null;
				Ext.Array.each(this.get('tf_Modules'), function(module) {
							if (module.tf_moduleId == moduleId + ''
									|| module.tf_moduleName == moduleId) {
								result = module;
								return false;
							}
						});
				return result;
			},
				// 根据data.tf_MenuGroups生成菜单条和菜单按钮下面使用的菜单数据
		getMenus : function() {
				var items = [], me = this;
				Ext.Array.each(this.get('sys_menu'), function(group) { // 遍历菜单项的数组
							var submenu = [];
							// 对每一个菜单项，遍历菜单条的数组
							Ext.Array.each(group.sub_menu, function(menuitem) {
										// 根据moduleId取得该模块的定义
//										var module = me.getModuleDefine(menuitem.tf_ModuleId);
											var module =menuitem;
										// 如果模块存在（或者具有浏览权限，以后加入）
										if (module) {
											submenu.push({
														mainmenu : 'true',
														itemId:'mdl_'+module.module,
														text : module.title,
														icon : module.icon,
														glyph : module.glyph,
														handler : 'onMainMenuClick' // MainController中的事件处理程序
													});
											// 如果菜单定义了分隔下一条，那么菜单上加一个分隔线
											if (menuitem.tf_addSeparator)
												submenu.push('-');
										}
									});
							var item = {
								text : group.title,
								menu : submenu,
								icon : group.icon,
								glyph : group.glyph
							};
							items.push(item);
						});
				return items;
			}
});