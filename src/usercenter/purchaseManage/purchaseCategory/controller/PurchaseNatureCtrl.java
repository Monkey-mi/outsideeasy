package usercenter.purchaseManage.purchaseCategory.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import usercenter.purchaseManage.purchaseCategory.model.PurchaseNature;
import usercenter.purchaseManage.purchaseCategory.service.PurchaseNatureService;
import util.Const;
import util.WebUtil;

@Controller
@RequestMapping("purchaseNature")
public class PurchaseNatureCtrl {
	@Autowired
	private PurchaseNatureService purchaseNatureService;
	
	@RequestMapping(value="/getPurchaseNatureList.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getPurchaseNatureList(HttpServletRequest request,HttpServletResponse response) throws Exception
	{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<PurchaseNature> list= purchaseNatureService.getPurchaseNatureList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
}
