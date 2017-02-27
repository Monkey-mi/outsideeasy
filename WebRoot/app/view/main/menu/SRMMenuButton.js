/**
 * 页面最上面的一级功能菜单
 */
Ext.define('srm.view.main.menu.SRMMenuButton', {
			extend : 'Ext.button.Button', 
			alias : 'widget.srmMenuButton', 
			style:'background:#008cd7;',
			// 类初始化时执行
			initComponent : function() {
				// 设置事件监听
				this.listeners = {
					// 鼠标移开，背景设置透明
					mouseout : function() {
						this.setTransparent(document.getElementById(this.id));
					},
					// 鼠标移过，
					mouseover : function() {
						var b = document.getElementById(this.id);
						b.style.backgroundImage = '#0173b0';
						b.style.backgroundColor = '#0173b0';
					}
					
				};
				
				this.callParent(arguments); // 调用你模块的initComponent函数
			},

			setTransparent : function(b) {
				b.style.backgroundImage = '#008cd7';
				b.style.backgroundColor = '#008cd7';
			}
		});