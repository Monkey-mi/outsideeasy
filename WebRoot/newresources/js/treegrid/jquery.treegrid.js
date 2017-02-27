// JavaScript Document
/*
 * 树形表格插件
 * create by yangliping 2016-7-7 14:33:24
 * new TreeGrid(config);
 * */
; (function ($, window, document, undefined) {
	TreeGrid = function(_config){
	_config = _config || {};
	
	var s = "";
	var rownum = 0;
	var __root;
	
	var __selectedData = null;
	var __selectedId = null;
	var __selectedIndex = null;

	var expandLayer = _config.expandLayer || 0;

	var folderOpenIcon = (_config.folderOpenIcon || TreeGrid.FOLDER_OPEN_ICON);
	var folderCloseIcon = (_config.folderCloseIcon || TreeGrid.FOLDER_CLOSE_ICON);
	var defaultLeafIcon = (_config.defaultLeafIcon || TreeGrid.DEFAULT_LEAF_ICON);

	//显示表头行
	drowHeader = function(){
		
		s += "<tr class='header' height='" + (_config.headerHeight || "25") + "'>";
		var cols = _config.columns;
		for(i=0;i<cols.length;i++){
			var col = cols[i];
			s += "<th align='" + (col.headerAlign || _config.headerAlign || "center") + "' width='" + (col.width || "") + "'>" + (col.headerText || "") + "</th>";
		}
		s += "</tr>";
	};
	
	//递归显示数据行
	drowData = function(){
		var rows = _config.data;
		var cols = _config.columns;
		drowRowData(rows, cols, 1, "");
	};
	
	//局部变量i、j必须要用 var 来声明，否则，后续的数据无法正常显示
	drowRowData = function(_rows, _cols, _level, _pid){
		var folderColumnIndex = (_config.folderColumnIndex || 0);
		//console.log("data.length:"+_rows.length);
		for(var i=0;i<_rows.length;i++){
			var id = _pid + "_" + i; //行id
			var row = _rows[i];
			//console.log(row);
			var open = "N";
			if(_level<=expandLayer) open = "Y";

			var dispaly = "none";
			if(_level<=expandLayer+1) dispaly = "table-row"; //显示层等于展开层+1
			
			s += "<tr id='TR" + id + "' pid='" + ((_pid=="")?"":("TR"+_pid)) + "' open='" + open + "' data='" + JSON.stringify(row) + "' rowIndex='" + rownum++ + "' style='display:" + dispaly + "'>";
			for(var j=0;j<_cols.length;j++){
				var col = _cols[j];
				s += "<td align='" + (col.dataAlign || _config.dataAlign || "left") + "'";

				//层次缩进
				if(j==folderColumnIndex){
					s += " style='text-indent:" + (parseInt((_config.indentation || "20"))*(_level-1)) + "px;'> ";
				}else{
					s += ">";
				}

				//节点图标
				if(j==folderColumnIndex){
					if(row.children){ //有下级数据
						if(open=="Y"){
							s += "<img folder='Y' trid='TR" + id + "' src='" + folderOpenIcon + "' class='image_hand'>";
						}else{
							s += "<img folder='Y' trid='TR" + id + "' src='" + folderCloseIcon + "' class='image_hand'>";
						}
					}else{
						s += "<img trid='TR" + id + "' src='" + defaultLeafIcon + "' class='image_hand'>";
					}
				}
				
				//单元格内容
				if(col.handler){
					if((col.folderHidden || false) && row.children){//是否隐藏字段值
						s += "</td>";
					}else{
						s += (eval(col.handler + ".call(new Object(), row, col)") || "") + "</td>";
					}
				}else{
					s += (row[col.dataField] || "") + "</td>";
				}
			}
			s += "</tr>";

			//递归显示下级数据
			if(row.children){
				drowRowData(row.children, _cols, _level+1, id);
			}
		}
	};
	
	//主函数
	this.show = function(){
		this.id = _config.id || ("TreeGrid" + TreeGrid.COUNT++);
		s="";
		s += "<table id='" + this.id + "' cellspacing=0 cellpadding=0 width='" + (_config.width || "100%") + "' class='TreeGrid'>";
		drowHeader();
		drowData();
		s += "</table>";
		
		__root = jQuery("#"+_config.renderTo);
		__root.append(s);
		
		//初始化动作
		init();
	};

	init = function(){
		//以新背景色标识鼠标所指行
		if((_config.hoverRowBackground || "false") == "true"){
			__root.find("tr").hover(
				function(){
					if(jQuery(this).prop("class") && jQuery(this).prop("class") == "header") return;
					jQuery(this).addClass("row_hover");
				},
				function(){
					jQuery(this).removeClass("row_hover");
				}
			);
		}
		
		//将单击事件绑定到tr标签
		__root.find("tr").bind("click", function(){
			__root.find("tr").removeClass("row_active");
			jQuery(this).addClass("row_active");
			
			//获取当前行的数据
			__selectedData = this.data || this.getAttribute("data");
			__selectedId = this.id || this.getAttribute("id");
			__selectedIndex = this.rownum || this.getAttribute("rowIndex");

			//行记录单击后触发的事件
			if(_config.itemClick){
				eval(_config.itemClick + "(__selectedId, __selectedIndex, JSON.parse(__selectedData))");
			}
		});
		//添加：鼠标进过此行显示编辑图标
		__root.find("tr").bind("mouseover", function(){
			jQuery(this).find(".edit_nature").css("display","inline");
		});
		__root.find("tr").bind("mouseleave", function(){
			jQuery(this).find(".edit_nature").css("display","none");
		});
		
		//展开、关闭下级节点
		//对于属性操作：1.6.2之前用attr，1.6.2开始用prop
		__root.find("img[folder='Y']").bind("click", function(){
			var trid = this.trid || this.getAttribute("trid"); //html属性值获取方式
			var isOpen = __root.find("#" + trid).prop("open");
			isOpen = (isOpen == "Y") ? "N" : "Y";
			__root.find("#" + trid).prop("open", isOpen);
			showHiddenNode(trid, isOpen);
		});
		if(_config.TR_ID!=null){//update by wangjialin
			for(var i=0;i<_config.TR_ID.length;i++){
				__root.find("#" + _config.TR_ID[i]).prop("open","Y");
				showHiddenNode(_config.TR_ID[i],"Y");
			}
		}
	};

	//显示或隐藏子节点数据
	showHiddenNode = function(_trid, _open){
		if(_open == "N"){ //隐藏子节点
			__root.find("#"+_trid).find("img[folder='Y']").prop("src", folderCloseIcon);
			__root.find("tr[id^=" + _trid + "_]").css("display", "none");
		}else{ //显示子节点
			__root.find("#"+_trid).find("img[folder='Y']").prop("src", folderOpenIcon);
			showSubs(_trid);
		}
	};

	//递归检查下一级节点是否需要显示
	showSubs = function(_trid){
		var isOpen = __root.find("#" + _trid).prop("open");
		if(isOpen == "Y"){
			var trs = __root.find("tr[pid=" + _trid + "]");
			trs.css("display", "");
			
			for(var i=0;i<trs.length;i++){
				showSubs(trs[i].id);
			}
		}
	};

	//展开或收起所有节点
	this.expandAll = function(isOpen){
		var trs = __root.find("tr[pid='']");
		for(var i=0;i<trs.length;i++){
			var trid = trs[i].id || trs[i].getAttribute("id");
			showHiddenNode(trid, isOpen);
		}
	};
	
	//取得当前选中的行记录
	this.getSelectedItem = function(){
		
		return new TreeGridItem(__root, __selectedId, __selectedIndex,JSON.parse(__selectedData));
	};
	//重新设置config数据
	this.setConfigData=function(data)
	{
		_config.data=data;
		//console.log(data);
		};
};

//公共静态变量
TreeGrid.FOLDER_OPEN_ICON = "images/minus.png";
TreeGrid.FOLDER_CLOSE_ICON = "images/plus.png";
TreeGrid.DEFAULT_LEAF_ICON = "";
TreeGrid.COUNT = 1;


//数据行对象
this.TreeGridItem = function(_root, _rowId, _rowIndex, _rowData){
	var __root = _root;
	this.id = _rowId;
	this.index = _rowIndex;
	this.data = _rowData;
	this.getParent = function(){
		var pid = $("#" + this.id).attr("pid");
		
		if(pid){
			var rowIndex = $("#" + pid).attr("rowIndex");
			var data = $("#" + pid).attr("data");
			
			return new TreeGridItem(_root, pid, rowIndex, _rowData);
		}
		return null;
	};
	
	this.getChildren = function(){
		var arr = [];
		var trs = $(__root).find("tr[pid='" + this.id + "']");
		for(var i=0;i<trs.length;i++){
			var tr = trs[i];
			arr.push(new TreeGridItem(__root, tr.id, $(tr).attr("rowIndex"), JSON.parse($(tr).attr("data"))));
		}
		return arr;
	};
};	   
}(jQuery, window, document));