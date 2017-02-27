
package usercenter.supplierFiles.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import common.user.model.LoginAccount;

import usercenter.supplierFiles.model.CheckFactoryCycleUnit;
import usercenter.supplierFiles.model.QualificationChange;
import usercenter.supplierFiles.model.QualificationChangeAttached;
import usercenter.supplierFiles.model.SupplierFiles;
import usercenter.supplierFiles.service.CheckFactoryCycleService;
import usercenter.supplierFiles.service.SupplierFactoryCycleInfoService;
import usercenter.supplierFiles.service.SupplierFilesService;
import util.Const;
import util.SessionUtil;
import util.WebUtil;
import util.annotation.DocLogger;

@Controller
@RequestMapping(value="supplierFiles")
public class SupplierFilesController {
	@Autowired
	private SupplierFilesService supplierFilesService;
	@Autowired
	private SupplierFactoryCycleInfoService supplierFacCheckSerivce;
	@Autowired
	private CheckFactoryCycleService checkFacService;
	
	/**
	 * @Description:跳转供应商库页面
	 * SupplierFilesController
	 * gojsp_supplierList
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-15 上午9:40:54
	 */
	@RequestMapping(value = { "/supplierList" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_supplierList(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/purchaseManage/SupplierManage/supplierList");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转供应商档案页面
	 * SupplierFilesController
	 * gojsp_supplierInfo
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-15 上午9:40:58
	 */
	@RequestMapping(value = { "/supplierInfo/{d+}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_supplierInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/purchaseManage/SupplierManage/supplierInfo");
		return modelAndView;
	}
	
	
	@RequestMapping(value = { "/qualificationChange/{d+}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_qualificationChange(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/purchaseManage/SupplierManage/qualificationChange");
		return modelAndView;
	}
	
	/**
	 * @Description: 通过拥有者ID查询供应商列表信息
	 * SupplierFilesController
	 * getSupplierFilseByOwnerId
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-7-29 下午2:05:57
	 */
	@RequestMapping(value="/getSupplierFilseByOwnerId.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getSupplierFilseByOwnerId(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		List<Map<String, Object>> supplierList = supplierFilesService.getSupplierFilseByOwnerId(qryParam,respMap);
		respMap.put(Const.AJAX_DATA_ROOT, supplierList);
		
		return respMap;
	}
	
	/**
	 * @Description: 获取验厂周期基础数据
	 * SupplierFilesController
	 * getCheckCycle
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-1 下午3:20:16
	 */
	@RequestMapping(value="/getCheckCycle.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getCheckCycle(){
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<CheckFactoryCycleUnit>checkFacList = checkFacService.getCheckFactoryCycleList();
		respMap.put("checkFacList", checkFacList);
		return respMap;
	}
	
	/**
	 * @Description: 更改账号下供应商的验厂周期
	 * SupplierFilesController
	 * updateCheckCycle
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-11 上午10:52:13
	 */
	@RequestMapping(value="/updateCheckCycle.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateCheckCycle(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		supplierFacCheckSerivce.updateSupplierFactoryCycleInfo(qryParam);
		return respMap;
	}
	
	/**
	 * @Description:获取基本信息变更记录
	 * SupplierFilesController
	 * getQualificationChangeList
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-1 上午10:54:12
	 */
	@RequestMapping(value="/getQualificationChangeList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getQualificationChangeList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<QualificationChange> list = supplierFilesService.getQualificationChangeList(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		respMap.put(Const.AJAX_SERVICE_TOTAL,list.size());
		return respMap;
	}
	
	/**
	 * @Description:获取公司证照变更记录
	 * SupplierFilesController
	 * getQualificationChangeList
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-1 上午10:54:12
	 */
	@RequestMapping(value="/getQualificationChangeAttachedList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getQualificationChangeAttachedList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<QualificationChangeAttached> list = supplierFilesService.getQualificationChangeAttachedList(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	
	/**
	 * @Description:新增供应商
	 * SupplierFilesController
	 * addSupplierFiles
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-10 下午2:42:27
	 */
	@DocLogger(explain="邀请加入供应商")
	@RequestMapping(value="/addSupplierFiles.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> addSupplierFiles(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		supplierFilesService.addSupplierFiles(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		return respMap;
	}
	/**
	 * @Description:检验输入的公司名称是否有效
	 * SupplierFilesController
	 * checkCompany
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-11 下午2:56:24
	 */
	@RequestMapping(value="/checkCompany.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> checkCompany(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		String message=supplierFilesService.checkCompany(qryParam);
		respMap.put(Const.AJAX_SERVICE_MESSAGE,message);
		return respMap;
	}
	
	/**
	 * @Description:
	 * SupplierFilesController
	 * updateSupplierStatusById
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-11 下午2:56:24
	 */
	@RequestMapping(value="/updateSupplierStatusById.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateSupplierStatusById(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		supplierFilesService.updateSupplierStatusById(qryParam);
		return respMap;
	}
	
	/**
	 * @Description:批量通过ID改变供应商状态
	 * SupplierFilesController
	 * batchUpdateSupplierStatusById
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-9-27 下午2:57:33
	 */
	@RequestMapping(value="/batchUpdateSupplierStatusById.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> batchUpdateSupplierStatusById(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		supplierFilesService.batchUpdateSupplierStatusById(qryParam);
		return respMap;
	}
	
	/**
	 * @Description: 逻辑删除供应商
	 * SupplierFilesController
	 * deleteSupplierById
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-20 下午2:56:32
	 */
	@RequestMapping(value="/deleteSupplierById.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deleteSupplierById(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		supplierFilesService.deleteSupplierById(qryParam);
		return respMap;
	}
	@RequestMapping(value="/batchDeleteSupplierById.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> batchDeleteSupplierById(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		supplierFilesService.batchDeleteSupplierById(qryParam);
		return respMap;
	}
	
	/**
	 * @Description: 更新供应商的验厂周期
	 * SupplierFilesController
	 * updateSupplierCheckFac
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-16 上午10:41:45
	 */
	@RequestMapping(value="/addOrupdateSupplierCheckFac.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateSupplierCheckFac(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		supplierFacCheckSerivce.addOrUpdate(qryParam);
		return respMap;
	}
	@RequestMapping(value="/batchAddOrupdateSupplierCheckFac.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> batchAddOrupdateSupplierCheckFac(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		supplierFacCheckSerivce.addOrUpdateBatch(qryParam);
		return respMap;
	}
	
	/**
	 * @Description: 重新发送邀请
	 * SupplierFilesController
	 * inviteSupplierAgain
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-20 下午6:58:42
	 */
	@RequestMapping(value="/inviteSupplierAgain.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> inviteSupplierAgain(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		qryParam.put("invite_status", 0);
		supplierFilesService.inviteSupplierAgain(qryParam);
		return respMap;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/batchInviteSupplierAgain.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> batchInviteSupplierAgain(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		String datas = (String)qryParam.get("inviteSuppliersData");
		JSONArray supplierDatas = JSONArray.fromObject(datas);
		for(int i=0; i<supplierDatas.size(); i++){
			JSONObject suppilerInAgain = supplierDatas.getJSONObject(i);
			suppilerInAgain.put("invite_status", 0);
			supplierFilesService.inviteSupplierAgain(suppilerInAgain);
		}
		return respMap;
	}
	
	/**
	 * SupplierFilesController
	 * vipAccessApplication
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 */
	@DocLogger(explain="VIP准入申请")
	@RequestMapping(value="/vipAccessApplication.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> vipAccessApplication(HttpServletRequest request,HttpServletResponse response){//vip准入申请
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		supplierFilesService.vipAccessApplication(qryParam);//将处理逻辑放入service中
		return respMap;
	}
	
	/**
	 * @Description: 通过拥有者ID查询供应商列表信息
	 * SupplierFilesController
	 * getSuppliersByOwnerId
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-12-19 
	 */
	@RequestMapping(value="/getSuppliersByOwnerId.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getSuppliersByOwnerId(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		if(loginAccount.getAccount_type() == 0){//主账号
			qryParam.put("regId", loginAccount.getLogin_id());
		}else if(loginAccount.getAccount_type() == 1){//子账号
			qryParam.put("saId", loginAccount.getLogin_id());
		}
		List<SupplierFiles> supplierList = supplierFilesService.getSuppliersByOwnerId(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, supplierList);
		
		return respMap;
	}
}
