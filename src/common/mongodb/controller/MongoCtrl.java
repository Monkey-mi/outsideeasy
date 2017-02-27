package common.mongodb.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import util.Const;
import util.TansferData;
import util.WebUtil;

import com.mongodb.gridfs.GridFSDBFile;

import common.mongodb.model.FileBean;
import common.mongodb.service.FileOptService;

@Controller
@RequestMapping("fileCenter")
public class MongoCtrl {
	@RequestMapping(value = { "/cutImage" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_cutImage(ModelAndView modelAndView ){
		modelAndView.setViewName("/common/cutImage");
		return modelAndView;
	}

	@Autowired
	private FileOptService fileService;
	
	/**上传图片并返回图片名称。
	 * 不过，一般保存成功的同时，也要保存文件名，所以不大会用得到
	 * 返回 信息
	 * success：true 保存成功;false:失败
	 * msg：描述信息
	 * file_path：文件路径
	 * */
    @RequestMapping(value="/uploadImgFile.do",method = RequestMethod.POST)
    @ResponseBody
    public String uploadFile(HttpServletRequest request,HttpServletResponse response) throws Exception {
    	JSONObject json = new JSONObject();
    	json.put("success", true);
    	
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;   
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest   
                .getFile("file");   //对应前台文件对象       
        
        if(file!=null && file.getSize()>0){
        	if (file.getSize() >10*1024*1024) {
				json.put("message", "文件太大，超过10M");
				return json.toString() ;	
			} 
	        
            String originalName=file.getOriginalFilename();
            
            boolean flag=false;//默认不 是图片
            //获取文件后缀，与传过来的参数file_name重新组装文件名
            if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
            	String this_suffix=originalName.substring(originalName.lastIndexOf("."));
            	
            	for(String suffix:Const.imgArray){
            		if(suffix.equalsIgnoreCase(this_suffix)){
            			flag=true;
            			break;
                    }
            	}
            	
            }
            if(!flag){
        		json.put("message", "不是图片");
				return json.toString() ;
        	}
            String fileName=fileService.SaveFile(file);
            json.put("file_path", fileName);   
            json.put("message", "上传成功");    
        }else{
        	json.put("message", "文件不存在");
        }
        return json.toString();
    }

	@RequestMapping(value="/deleteFile.do",method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> deleteFile(HttpServletRequest request,HttpServletResponse response)throws Exception{
		String filename=request.getParameter("file");
		Map<String,Object> map = new HashMap<String,Object>();
		fileService.deleteFileByName(filename);
		map.put("success",true);
		return map;
	}
	
	@RequestMapping(value="/downLoadFileFormMongo.do",method=RequestMethod.GET)
	@ResponseBody
	public  void downLoadFileFormMongo(HttpServletRequest request,HttpServletResponse response ) throws Exception {
		String filename=request.getParameter("file");
		GridFSDBFile file = fileService.retrieveFileOne("fs", filename);
		InputStream in;
		if(file!=null){
			in = file.getInputStream();
		}else{
			File tempfile=new File(WebUtil.getRootPath()+"/newresources/images/tasks/notexist.png");
			in=new FileInputStream(tempfile);
		}
		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment;filename="
                + filename);
	    OutputStream out = response.getOutputStream();
	    
        TansferData.limitSpeed(out, in,TansferData.getSpeed500kb(), null, false);
        in.close();
        out.flush();
        out.close();
	}
	/**
	 * @Description:删除无用的mogo文件
	 * MongoCtrl
	 * delUselessMogoFile
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-11-15 下午2:18:43
	 */
	@RequestMapping(value="/delUselessMogoFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> delUselessMogoFile(HttpServletRequest request,HttpServletResponse response)throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		fileService.delUselessMogoFile(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT,true);
		return respMap;
	}
}
