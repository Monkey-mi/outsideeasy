package usercenter.purchaseManage.purchaseCategory.controller;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import usercenter.common.model.TreeModel;
import usercenter.purchaseManage.purchaseCategory.model.PurchaseCategory;
import usercenter.purchaseManage.purchaseCategory.service.PurchaseCategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import util.CacheData;
import util.WebUtil;
import util.Const;

@Controller
@RequestMapping("purchaseCategory")
public class PurchaseCategoryCtrl {

	@Autowired
	private PurchaseCategoryService purchaseCategoryService;
	
	/**
	 * @Description:跳转采购类目页面
	 * PurchaseCategoryCtrl
	 * gojsp_purchaseCategoryList
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-15 上午9:34:50
	 */
	@RequestMapping(value = { "/purchaseCategoryList" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_purchaseCategoryList(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/purchaseManage/purchaseCategoryManage/purchaseCategoryList");
		return modelAndView;
	}
	
	/**
	 *采购类别*/
	@RequestMapping(value="/purchaseCategory.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> companyClass(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,purchaseCategoryService);
	}
	
	@RequestMapping(value="/getPurchaseCategoryTree.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getPurchaseCategoryTree(HttpServletRequest request,HttpServletResponse response) throws Exception
	{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<TreeModel> treelist= purchaseCategoryService.getPurchaseCategoryTree(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, treelist);
		respMap.put(Const.AJAX_SERVICE_TOTAL, treelist.size());
		return respMap;
	}
	
	@RequestMapping(value="/getPurchaseCategoryTree2Json.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getPurchaseCategoryTree2Json(HttpServletRequest request,HttpServletResponse response) throws Exception
	{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<TreeModel> treelist= purchaseCategoryService.getPurchaseCategoryTree2Json(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, treelist);
		respMap.put(Const.AJAX_SERVICE_TOTAL, treelist.size());
		return respMap;
	}
	@RequestMapping(value="/getPurchaseCategoryList.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getPurchaseCategoryList(HttpServletRequest request,HttpServletResponse response) throws Exception
	{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<PurchaseCategory>list=purchaseCategoryService.getPurchaseCategoryList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	@RequestMapping(value="/updatePurchaseCategory.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> updatePurchaseCategory(HttpServletRequest request,HttpServletResponse response) throws Exception
	{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		purchaseCategoryService.updatePurchaseCategory(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
	@RequestMapping(value="/updatePurchaseCategoryOrder.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> updatePurchaseCategoryOrder(HttpServletRequest request,HttpServletResponse response) throws Exception
	{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		purchaseCategoryService.updatePurchaseCategoryOrder(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
	@RequestMapping(value="/addPurchaseCategory.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> addPurchaseCategory(HttpServletRequest request,HttpServletResponse response) throws Exception
	{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		purchaseCategoryService.addPurchaseCategory(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
	@RequestMapping(value="/deletePurchaseCategory.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> deletePurchaseCategory(HttpServletRequest request,HttpServletResponse response) throws Exception
	{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		purchaseCategoryService.deletePurchaseCategory(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
	/**
	 * @Description:根据当前类目ID找到父类目
	 * PurchaseCategoryCtrl
	 * getParentCategoryById
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-9-9 上午11:21:22
	 */
	@RequestMapping(value="/getParentCategoryById.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getParentCategoryById(HttpServletRequest request,HttpServletResponse response) throws Exception
	{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		PurchaseCategory purchaseCategory=purchaseCategoryService.getParentCategoryById(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, purchaseCategory);
		return respMap;
	}
	/**
	 * @Description:更新子类目采购性质
	 * PurchaseCategoryCtrl
	 * updateChildrenCategoryNature
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-9-9 下午2:34:24
	 */
	@RequestMapping(value="/updateChildrenCategoryNature.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> updateChildrenCategoryNature(HttpServletRequest request,HttpServletResponse response) throws Exception
	{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		purchaseCategoryService.updateChildrenCategoryNature(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
	/**
	 * @Description:根据f_id查询所有子级、孙子级及数目
	 * PurchaseCategoryCtrl
	 * getCategoryCountByFid
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-11-3 上午10:31:34
	 */
	@RequestMapping(value="/getPurchaseCategoryListByFid.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getPurchaseCategoryListByFid(HttpServletRequest request,HttpServletResponse response) throws Exception
	{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<PurchaseCategory> list=purchaseCategoryService.getPurchaseCategoryListByFid(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
}