package manager.applicationRecord.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.applicationRecord.service.MngAccessApplicationInfoService;
import manager.applicationRecord.service.MngAccessApplicationRecordService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

@Controller
@RequestMapping(value="mngAccessApplicationRecord")
public class MngAccessApplicationRecordController {
	@Autowired
	private MngAccessApplicationRecordService mngAccessApplicationRecordService;
	@Autowired
	private MngAccessApplicationInfoService mngAccessApplicationInfoService;
	@RequestMapping(value="/accessApplicationRecordbg.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> Modules(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,mngAccessApplicationRecordService);
	}
	@RequestMapping(value="/accessApplicationInfobg.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> ModulesInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,mngAccessApplicationInfoService);
	}

}
