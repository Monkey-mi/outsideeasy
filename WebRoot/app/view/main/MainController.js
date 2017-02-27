/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('srm.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.window.MessageBox'
    ],
    alias: 'controller.main',
    
	    init:function(){
	    	me=this;
	    },
    	// 选择了主菜单上的菜单后执行
		onMainMenuClick : function(menuitem) {
				var maincenter = this.getView().down('maincenter');
				var itemId=Ext.util.Format.substr(menuitem.getItemId(),4);
				srm.Util.loadModule(itemId);
			},
		// 隐藏顶部和底部的按钮事件
		hiddenTopBottom : function() {
				// 如果要操纵控件，最好的办法是根据相对路径来找到该控件，用down或up最好，尽量少用getCmp()函数。
				this.getView().down('maintop').hide();
				this.getView().down('mainbottom').hide();
				if (!this.showButton) { // 显示顶部和底部的一个控件，在顶部和底部隐藏了以后，显示在页面的最右上角
					this.showButton = Ext.widget('component', {
								glyph : 0xf013,
								view : this.getView(),
								floating : true,
								x : document.body.clientWidth - 32,
								y : 0,
								height : 4,
								width : 26,
								style : 'background-color:#cde6c7',
								listeners : {
									el : {
										click : function(el) {
											var c = Ext.getCmp(el.target.id); // 取得component的id值
											c.view.down('maintop').show();
											c.view.down('mainbottom').show();
											c.hide();
										}
									}
								}
							});
				};
				this.showButton.show();
			},
			// 如果窗口的大小改变了，并且顶部和底部都隐藏了，就要调整显示顶和底的那个控件的位置
			onMainResize : function() {
				if (this.showButton && !this.showButton.hidden) {
					this.showButton.setX(document.body.clientWidth - 32);
				}
			},
			//主界面菜单头部响应
			onTopbarClicked:function(btn){
				 switch (btn.itemId){
				 	case 'btn_account':
				 		srm.Util.loadModule("100011");
				 		break;
				 	case 'btn_psd':
				 		srm.Util.loadModule("100010");
				 		break;
				 	case 'btn_logout':
				 		Ext.Msg.confirm('提示','你确定要注销登陆吗?',function(btn){
				 			if(btn=='yes'){
				 				srm.Const.doLogout();
				 			}
				 		});
				 		break;
				 	case 'btn_help':
				 		Ext.Msg.alert('提示',"待完善");
				 		break;
				 }		
			},		
		'onBeforeTabChange':function(panel,newCard,oldCard){
			if(oldCard&&oldCard.canNotChangeTab){
				return confirm("当前正在编辑界面，是否继续退出?");
			}
				
		},
		'onAfterTabChange':function(panel,newCard,oldCard){
			if(oldCard&&oldCard.canNotChangeTab){
				oldCard.destroy();
			}
		}
});
