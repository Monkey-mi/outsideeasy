//
Ext.define('srm.ux.Panel',{
	extend : 'Ext.panel.Panel',
	alternateClassName : 'srm.Panel',
	layout : 'fit',
	modFuncsDisabled : {},
	listeners : {
		beforedestroy:function(panel){
			//Extjs5 关闭前清空所有内容，否则再次打开数据就会异常
			panel.removeAll();
		},
		afterrender : function(cmp) {
			// 根据modFuncsDisabled设置按钮的disable/enable
			for (prop in cmp.modFuncsDisabled) {
//				console.log(prop+":"+cmp.modFuncsDisabled[prop]);
				btn = cmp.down('#' + prop);
				var result=cmp.modFuncsDisabled[prop];
				if (btn) {
					// 设置按钮初始状态
//					if (cmp.modFuncsDisabled[prop])
//						btn.hide();
					if (result==1){//禁用
						btn.disable();
					}else if(result==2){//可用
						
					}else if(result){//不显示 result==3
						btn.hide();
					}else{//显示result==0
						
					}	
				}
			}
			// 自动设置grid控件中的行选择变化时的功能按钮变化
			// 因为按钮ID可以是自定义的，所以这里就只能管到预定义的几个
			// 其余的需要模块自行处理
			var gridpanels = cmp.query('gridpanel');
			Ext.each(gridpanels, function(grid) {
					
				grid.on('selectionchange', function(selModel,
						selections) {
					var n = selections.length || 0;
					var btn = grid.down('#'+ srm.Const.FUNC_ITEMID_BTN_DEL);
					// 删除按钮必须是选中一些行时有效
					if (btn){
						btn.setDisabled(n == 0);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_EDT);
					// 编辑时只能是选中一行
					if (btn){
						btn.setDisabled(n != 1);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_RESET);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n != 1);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_PRINT);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n == 0);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_STOP);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n != 1);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_ACC);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_BACKUP);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_DESC);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_SUBMIT);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_COPY);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_LOCK);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_SIGN);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_RESIGN);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_DISACC);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_MDF);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_SYN);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
					btn = grid.down('#'+srm.Const.FUNC_ITEMID_BTN_PERMIT);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n  == 0);
					}
				}, cmp);
			});
		}
	},
	initComponent : function() {
//		this.addEvents(
//    			/**
//    			 * 呼叫帮助
//    			 * param: 	scope
//    			 * 					help_id
//    			 */
//    			'callHelp'
//		);
//		this.addCls('tp_grid_header');
		
		this.callParent(arguments);
	},
	isDirty: Ext.emptyFn
});
