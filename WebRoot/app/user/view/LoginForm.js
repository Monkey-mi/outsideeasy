function getNewVCode(){
	var vcode_img=document.getElementById('vCodeImg');
	if(vcode_img){
		vcode_img.src='common/getVerifyCode.do?_dc='+new Date().getTime();
	}
}
Ext.define('srm.user.view.LoginForm',{
	extend:'Ext.form.Panel',
	alias:'widget.frm_login',
	uses:['srm.def.ui.plugins.FormKeyMapper'],
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
		layout:{type:'absolute'},
		plugins:{
			          ptype: 'FormKeyMapper'
		},
//		padding:'80 20 0 260',
		border:false,
		
		width:290,
		height:174,
		defaults:{
			selectOnFocus:true},
		bodyStyle:{background:'none!important'},
		items:[
		{
			xtype:'image',
			src:'resources/images/home/login.png',
			width:30,
			height:32,
			x:40,
			y:0
		},
		{
			x:70,
			y:0,
			width:180,
			height:30,
			xtype:'textfield',
//			emptyText:'用户名',
			name:'login_id'
			//fieldLabel:'用户名',
			//height:24
			//fieldStyle:{background:'#e5f8fe'}
			
		},
		{
			xtype:'image',
			src:'resources/images/home/pass.png',
			width:30,
			height:32,
			x:40,
			y:42
		},
		{
			x:70,
			y:42,
			height:30,
			width:180,
			xtype:'textfield',
			name:'pwd',
			inputType : 'password'
//			emptyText:'密码',
			//fieldLabel:'密&nbsp;&nbsp;&nbsp;&nbsp;码',
			//fieldStyle:{background:'#e5f8fe'}
			//height:24
		},
		{
			x:40,
			y:84,
			width:80,
			height:30,
			xtype:'textfield',
			name:'verify_code',
			//labelWidth:80,
			//labelAlign:'left',
			//columnWidth:.5,
			//fieldLabel:'验证码',
			hidden:!srm_needVCode,
			nextTargetId : 'btn_login'
			//fieldStyle:{background:'#e5f8fe'},
			
			
//			,emptyText:'验证码'
		},{
			x:130,
			y:84,
			width:150,
			height:33,
        		        xtype: 'container',
				        baseCls:'x-plain',
				        //columnWidth:.5,
				        hidden:!srm_needVCode,
				        name :'vCode',
				        itemId :'vCode',
				        html:'<div > '
				        	 +'   <a href="#" title="如看不清楚,请点击图片更换" onclick="getNewVCode();">'
				        	 +'     <img height="33px" width="97px" id="vCodeImg" src="common/getVerifyCode.do" onclick="getNewVCode();" '
				        	 +'        border="0" /><span style="color:#000000">换一张</span>'
				        	 +'   </a>'
				        	 +'</div>',
				        border: false
	     },
	     {
	     	x:40,
	     	y:138,
	     	xtype:'button',
	     	width:210,
	     	height:30,
	     	text:'登录',
			itemId:'btn_login',
			cls:'loginbtn',
			style:{background:'#fd9003',border:0},
			handler:function(btn){
				var form=btn.up('form');
				var Values=form.getValues();
				var result=srm.Const.doLogin(Values.login_id,Values.pwd,Values.verify_code);
				if(result){
					getNewVCode();
				}
			}
	     }
		]
		});
		me.callParent(this);
		
	}
});