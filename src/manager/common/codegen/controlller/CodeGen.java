package manager.common.codegen.controlller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.common.codegen.service.BaseSeqService;
import manager.common.codegen.service.CgrDetailService;
import manager.common.codegen.service.CodegenRuleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

@Controller
@RequestMapping("codegen")
public class CodeGen {
	@Autowired
	private BaseSeqService baseSeqService;
	@Autowired
	private CodegenRuleService genRuleService;
	@Autowired
	private CgrDetailService detailService;
	
	@RequestMapping(value="/BaseSeq.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> BaseSeq(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,baseSeqService);
	}
	
	@RequestMapping(value="/CodegenRule.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> CodegenRule(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,genRuleService);
	}
	
	@RequestMapping(value="/CgrDetail.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> CgrDetail(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,detailService);
	}
	@RequestMapping(value="/BaseSeqService.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> BaseSeqService(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallService(request, response, baseSeqService);
	}
}
