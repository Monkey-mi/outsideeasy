/**自定义任务进度条插件，用于发布任务单的显示进度
 * 先初始化init()
 * 配置项type:1,任务发布方；type=2,生产方
 * 然后传入showByTask(task)
 * */
 
(function($) {
	//设置任务单状态流程进度条,num从1开始
	var setTaskStaticBar=function (num)
	{
		$(".task_static_wrap").find(".task_static_l").each(function(index,element){			
				if(index<num)
				{
					$(this).find(".task_static_text").addClass("maincolor3");
					$(this).prev().removeClass("task_static_r");
					$(this).prev().removeClass("p_task_static_r");
					$(this).prev().addClass("task_static_r_curr");
					$(this).next().find(".task_static_tip").css("display","none");
					if(index==num-1)
					{
						$(this).next().find(".task_static_tip").css("display","block");
					}
				}
			});
		
	};
	//设置显示时间
	var showTaskTime=function (task){
		var $taskDivStatic = $(".task_static_wrap .task_static_desc");
		if(defaults.type==1){
			if(task.state>=5 && task.czsj!=null && task.state < 40){
				$taskDivStatic.eq(0).html(task.czsj);
			}
			if(task.state>=10 && task.send_time!=null && task.state < 40){
				$taskDivStatic.eq(1).html(task.send_time);
			}
			if(task.state>=15 && task.receive_time!=null && task.state < 40){
				$taskDivStatic.eq(2).html(task.receive_time);
			}
			if(task.state>=20 && task.finish_product_time!=null && task.state < 40){
				$taskDivStatic.eq(3).html(task.finish_product_time);
			}
			if(task.state>=25 && task.finish_task_time!=null && task.state < 40){
				$taskDivStatic.eq(4).html(task.finish_task_time);
			}
			if(task.state==30 && task.stop_time!=null && task.send_time == null){
				$taskDivStatic.eq(1).html(task.stop_time);
			}else if(task.state==30 && task.stop_time!=null && task.send_time != null){
				$taskDivStatic.eq(2).html(task.stop_time);
			}
			if( task.state >= 40){
				$taskDivStatic.eq(0).html(task.czsj);
				$taskDivStatic.eq(1).html(task.send_time);
				$taskDivStatic.eq(2).html(task.receive_time);
				$taskDivStatic.eq(3).html(task.endTaskTime);
			}
		}else{
			if(task.state>=10 && task.send_time!=null && task.state < 40){
				$taskDivStatic.eq(0).html(task.send_time);
			}
			if(task.state>=15 && task.receive_time!=null && task.state < 40){
				$taskDivStatic.eq(1).html(task.receive_time);
			}
			if(task.state>=20 && task.finish_product_time!=null && task.state < 40){
				$taskDivStatic.eq(2).html(task.finish_product_time);
			}
			if(task.state>=25 && task.finish_task_time!=null && task.state < 40){
				$taskDivStatic.eq(3).html(task.finish_task_time);
			}
			if(task.state==30 && task.stop_time!=null){
				$taskDivStatic.eq(1).html(task.stop_time);
			}
			if( task.state >= 40){
				$taskDivStatic.eq(0).html(task.send_time);
				$taskDivStatic.eq(1).html(task.receive_time);
				$taskDivStatic.eq(2).html(task.endTaskTime);
			}
		}
		
	};
	
 	//默认配置
 	var defaults = {
		name: '自定义任务进度条插件',
		type:1,
		onSomeEvent: function() {}
	};
	//初始化
	$.fn.taskStaticBar_init = function(options) {
		//配置参数覆盖
		var options = $.extend(defaults, options); 
 		
		return $(this).each(function() {
			var $this = $(this);
			if(defaults.type==1){
				$this.html(
				"<div class='task_static_wrap clearfix'>"
							+"	<div class='task_static_l'>"
							+"		<div class='task_static_linner_wrap'>"
							+"			<div class='task_static_text maincolor3'>创建任务单</div>"
							+"			<div class='task_static_desc'>&nbsp;</div>"
							+"		</div>"
							+"	</div>"
							+"	<div class='task_static_r'>"
							+"		<div class='task_static_linner_wrap'>"
							+"			<div class='task_static_tip' style='display:block'>请完善资料后派发</div>"
							+"		</div>"
							+"	</div>"
							+"	<div class='task_static_l'>"
							+"		<div class='task_static_linner_wrap'>"
							+"			<div class='task_static_text'>派发任务单</div>"
							+"			<div class='task_static_desc'>&nbsp;</div>"
							+"		</div>"
							+"	</div>"
							+"	<div class='task_static_r'>"
							+"		<div class='task_static_linner_wrap'>"
							+"			<div class='task_static_tip'>等待对方确认</div>"
							+"		</div>"
							+"	</div>"
							+"	<div class='task_static_l'>"
							+"		<div class='task_static_linner_wrap'>"
							+"			<div class='task_static_text'>任务单生产</div>"
							+"			<div class='task_static_desc'>&nbsp;</div>"
							+"		</div>"
							+"	</div>"
							+"	<div class='task_static_r'>"
							+"		<div class='task_static_linner_wrap'>"
							+"			<div class='task_static_tip'>任务在执行</div>"
							+"		</div>"
							+"	</div>"					
							+"	<div class='task_static_l'>"
							+"		<div class='task_static_linner_wrap'>"
							+"			<div class='task_static_text'>在验收</div>"
							+"			<div class='task_static_desc'>&nbsp;</div>"
							+"		</div>"
							+"	</div>"
							+"	<div class='task_static_r'>"
							+"		<div class='task_static_linner_wrap'>"
							+"			<div class='task_static_tip'>等待全部验收</div>"
							+"		</div>"
							+"	</div>"
							+"	<div class='task_static_l' style='width:100px;'>"
							+"		<div class='task_static_linner_wrap'>"
							+"			<div class='task_static_text'>验收完成</div>"
							+"			<div class='task_static_desc'>&nbsp;</div>"
							+"		</div>"
							+"	</div>"
							+"</div>"				
				    );
					}else{
				$this.html(
					"<div  class='task_static_wrap clearfix'>"
						+"<div class='task_static_l'>"
						+"	<div class='task_static_linner_wrap'>"
						+"		<div class='task_static_text maincolor3'>等待接受</div>"
						+"		<div class='task_static_desc'>&nbsp;</div>"
						+"	</div>"
						+"</div>"
						+"<div class='p_task_static_r'>"
						+"	<div class='task_static_linner_wrap'>"
						+"		<div class='task_static_tip' style='display:block'>请确认接受任务</div>"
						+"	</div>"
						+"</div>"
						+"<div class='task_static_l'>"
						+"	<div class='task_static_linner_wrap'>"
						+"		<div class='task_static_text''>任务执行</div>"
						+"		<div class='task_static_desc'>&nbsp;</div>"
						+"	</div>"
						+"</div>"
						+"<div class='p_task_static_r'>"
						+"	<div class='task_static_linner_wrap'>"
						+"		<div class='task_static_tip'>生产进行中</div>"
						+"	</div>"
						+"</div>"
						+"<div class='task_static_l'>"
						+"	<div class='task_static_linner_wrap'>"
						+"		<div class='task_static_text''>在验收</div>"
						+"		<div class='task_static_desc'>&nbsp;</div>"
						+"	</div>"
						+"</div>"
						+"<div class='p_task_static_r'>"
						+"	<div class='task_static_linner_wrap'>"
						+"		<div class='task_static_tip'>等待对方合格验收</div>"
						+"	</div>"
						+"</div>"
						+"<div class='task_static_l' style='width:100px;'>"
						+"	<div class='task_static_linner_wrap'>"
						+"		<div class='task_static_text''>验收完成</div>"
						+"		<div class='task_static_desc'>&nbsp;</div>"
						+"	</div>"
						+"</div>"
					+"</div>"
				);
			}
		});
		
	};
    /*var taskparam = {
    		state:5//默认状态5 
    };*/
	//通过任务单显示界面
	$.fn.taskStaticBar_showByTask=function (task) {
		/*$.extend(taskparam, task);//将任务单参数赋值入 taskparam
*/		return $(this).each(function() {
			if(task==null) {
				$.error( '请输入任务单号' );
				return this;
			}
			var state=task.state;
	   		var sel_index=1;
			if(defaults.type==1){
				switch(state){
					case 5:
						sel_index=1;
						break;
					case 10:
						sel_index=2;
						break;
					case 15:
						sel_index=3;
						break;
					case 20:
						sel_index=4;
						break;
					case 25:
						sel_index=5;
						break;
					case 30:
						sel_index=1;
						cancelStausChange(task);
						break;
					case 40:
						sel_index=4;
						endStausChange();//终止状态是页面的top条的变换
						break;
					default:
						sel_index=1;
						break;
				}
			}else{
				switch(state){
					case 10:
						sel_index=1;
						break;
					case 15:
						sel_index=2;
						break;
					case 20:
						sel_index=3;
						break;
					case 25:
						sel_index=4;
						break;
					case 30:
						sel_index=1;
						cancelStausChange(task);
						break;
					case 40:
						sel_index=3;
						endStausChange();
						break;
					default:
						sel_index=1;
						break;
				}
			}
			setTaskStaticBar(sel_index);
   			showTaskTime(task);  			
		});
	};
	/**
	 * 任务单终止状态的改变
	 */
	var endStausChange = function(){
		var $topStateView = $(".task_static_wrap").find(".task_static_l");
		if(defaults.type==2){//销售
			$topStateView.eq(2).find(".task_static_text").html("任务终止");
			$topStateView.eq(2).nextAll("div").hide();
			setTaskStaticBar(3);
		}
		if(defaults.type==1){
			$topStateView.eq(3).find(".task_static_text").html("任务终止");	
			$topStateView.eq(3).nextAll("div").hide();
			setTaskStaticBar(3);
		}
	};
	/**
	 * 任务单取消状态的改变
	 */
	var cancelStausChange = function(task){
		var $topStateView = $(".task_static_wrap").find(".task_static_l");
		if(defaults.type==2){
			$topStateView.eq(1).find(".task_static_text").html("任务取消");
			$topStateView.eq(1).nextAll("div").hide();
			$topStateView.eq(1).prev(".task_static_r").find(".task_static_linner_wrap").hide();
			setTaskStaticBar(2);
		}
		if(defaults.type==1 && task.send_time != null){
			$topStateView.eq(2).find(".task_static_text").html("任务取消");
			$topStateView.eq(2).nextAll("div").hide();
			$topStateView.eq(1).prev(".task_static_r").find(".task_static_linner_wrap").hide();
			setTaskStaticBar(3);
		}else if(defaults.type==1 && task.send_time == null){
			$topStateView.eq(1).find(".task_static_text").html("任务取消");			
			$topStateView.eq(1).nextAll("div").hide();
			$topStateView.eq(1).prev(".task_static_r").find(".task_static_linner_wrap").hide();
			setTaskStaticBar(2);
		}
	};
})(jQuery);