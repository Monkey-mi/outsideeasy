package manager.supplierAccess.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import manager.supplierAccess.service.AccessBasetableService;
import manager.supplierAccess.service.SupplierAccessScoreDetailsService;
import manager.supplierAccess.service.SupplierAccessScoreService;
import manager.supplierAccess.service.SupplierAccessScoreSummaryService;
import manager.supplierAccess.service.SupplierAccessUploadImgService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

@Controller
@RequestMapping("supplierAccess")
public class SupplierAccessController {
	@Autowired
	private AccessBasetableService accessBasetableService;
	@Autowired
	private SupplierAccessScoreService supplierAccessScoreService;
	@Autowired
	private SupplierAccessUploadImgService supplierAccessUploadImgService;
	@Autowired
	private SupplierAccessScoreSummaryService supplierAccessScoreSummaryService;
	@Autowired
	private SupplierAccessScoreDetailsService supplierAccessScoreDetailsService;
	//新供应商准入评估模板表
	@RequestMapping(value="/AccessBasetable.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Modules(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,accessBasetableService);
	}
	//新供应商准入细则评估打分表
	@RequestMapping(value="/SupplierAccessScore.do",method=RequestMethod.POST)
	@ResponseBody 
		public Map<String,Object> ModulesAccessScore(HttpServletRequest request,HttpServletResponse response) throws Exception{
			return WebUtil.DynamicCallCURD(request,response,supplierAccessScoreService);
		}
	//准入评估图片上传表
	@RequestMapping(value="/SupplierAccessUploadImg.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ModulesUploadImg(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,supplierAccessUploadImgService);
	}
	//准入评估分数汇总信息
	@RequestMapping(value="/SupplierAccessScoreSummary.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ModulesAccessScoreSummary(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,supplierAccessScoreSummaryService);
	}
	//准入评估明细查看，多表组合
	@RequestMapping(value="/SupplierAccessScoreDetails.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ModulesAccessScoreDetails(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,supplierAccessScoreDetailsService);
	}
}
