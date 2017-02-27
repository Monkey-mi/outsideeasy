package usercenter.common.announcement.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import usercenter.common.announcement.model.Announcement;
import usercenter.common.announcement.model.WebContentVo;
import usercenter.common.announcement.service.AnnouncementService;
import util.Const;
import util.WebUtil;

@Controller
@RequestMapping("announcement")
public class AnnouncementCtrl {
	@Autowired
	private AnnouncementService announcementService;
	
	@RequestMapping(value = { "/helpCenterLeftMenu" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_helpCenterLeftMenu(ModelAndView modelAndView ){
		modelAndView.setViewName("/helpCenter/helpCenterLeftMenu");
		return modelAndView;
	}
	@RequestMapping(value = { "/helpCenterContent" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_helpCenterContent(ModelAndView modelAndView ){
		modelAndView.setViewName("/helpCenter/helpCenterContent");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转公告列表
	 * AnnouncementCtrl
	 * gojsp_announcementList
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-13 上午11:16:38
	 */
	@RequestMapping(value = { "/announcementList" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_announcementList(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/announcement/announcementList");
		return modelAndView;
	}
	/**
	 * @Description:跳转公告详情
	 * AnnouncementCtrl
	 * gojsp_announcementDetail
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-13 下午2:04:13
	 */
	@RequestMapping(value = { "/announcementDetail/{d+}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_announcementDetail(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/announcement/announcementDetail");
		return modelAndView;
	}
	
	/**
	 * @Description:获取公告列表
	 * AnnouncementCtrl
	 * getAnnouncementList
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-11-9 下午2:32:27
	 */
	@RequestMapping(value="/getAnnouncementList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getAnnouncementList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		int nLimit =0,npage =0;
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
		npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
		int nStart=nLimit*npage;
		qryParam.put("start",nStart);
		List<Announcement> list=announcementService.getAnnouncementList(qryParam);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * @Description:获取最新公告
	 * AnnouncementCtrl
	 * getNewAnnouncementList
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-11-10 上午8:51:36
	 */
	@RequestMapping(value="/getNewAnnouncementList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getNewAnnouncementList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		qryParam.put("limit", Integer.parseInt(qryParam.get("limit").toString()));
		List<Announcement> list=announcementService.getNewAnnouncementList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * @Description:根据ID获取公告
	 * AnnouncementCtrl
	 * getAnnouncementById
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-11-10 上午9:05:59
	 */
	@RequestMapping(value="/getAnnouncementById.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getAnnouncementById(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Announcement announcement=announcementService.getAnnouncementById(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, announcement);
		return respMap;
	}
	/**
	 * @Description:获取帮助中心列表
	 * AnnouncementCtrl
	 * getHelpContentList
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-11-17 下午3:24:37
	 */
	@RequestMapping(value="/getHelpContentList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getHelpContentList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<WebContentVo> list=announcementService.getHelpContentList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * @Description:根据ID帮助中心内容
	 * AnnouncementCtrl
	 * getHelpContentById
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-11-17 下午3:23:54
	 */
	@RequestMapping(value="/getHelpContentById.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getHelpContentById(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Announcement announcement=announcementService.getAnnouncementById(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, announcement);
		return respMap;
	}
}
