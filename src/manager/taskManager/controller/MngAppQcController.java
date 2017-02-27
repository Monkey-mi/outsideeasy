package manager.taskManager.controller;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import manager.taskManager.service.MngAppQcService;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.gridfs.GridFSDBFile;

import common.mongodb.service.FileOptService;

import util.Const;
import util.WebUtil;
@Controller
@RequestMapping("appQc")
public class MngAppQcController {
	@Autowired
	private MngAppQcService appQcService;
	@Autowired
	private FileOptService fileService;
	
	@RequestMapping(value="/appQcbg.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Modules(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,appQcService);
	}
	/**
	 * 上传文件进mongoDB，并保存文件序列号
	 * @param file
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-15
	 */
	@RequestMapping(value="/QcFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> QcFile(@RequestParam("file") MultipartFile file,HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		String fileType =file.getContentType();
		if(file != null && file.getSize()>5*1024*1024){//判断是否文件大于5M
			respMap.put("message","你上传的文件太大，超过5M");
			respMap.put("success",false);
			return respMap;
		}
			
		String fileName = null;	
		Map<String,Object> map = new HashMap<String, Object>();
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Integer id=Integer.parseInt(qryParam.get("qc_id").toString());//获取质检表的id
		map.put("qc_id", id);		
		String suffix = fileType.substring(fileType.lastIndexOf("/"));
		
		for(String str : Const.imgArray){//判断是否是图片文件
			if(suffix.equals(str)){
			
				 fileName = fileService.SaveFile(file);//把文件存入mongoDB
				 map.put("qc_file", fileName);
				 appQcService.updateQcFile(map);//把上传的文件序列号存入数据库
			}	
		}
		if(WebUtil.isEmpty(fileName)){
			respMap.put("message","你上传的文件格式不对，上传失败");
			respMap.put("success",false);
			return respMap;
		}else{
		System.out.println(fileType);	
		respMap.put("success",true);
		respMap.put("fileName",fileName);
		return respMap;
		}
	}
	/**
	 * 删除mongoDB附件，并删除文件序列号
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-15
	 */
	@RequestMapping(value="/deleteQcFile.do",method=RequestMethod.POST)
	@ResponseBody
	public  Map<String,Object> deleteFile(HttpServletRequest request,HttpServletResponse response)throws Exception{
		Map<String,Object> map = new HashMap<String,Object>();
		Map<String,Object> qryParam =  WebUtil.getDefaultParamsMap(request);		
		String filename= qryParam.get("qc_file").toString();//获取文件序列号
		fileService.deleteFileByName(filename);//把文件从mongoDB中删除
		Integer id=Integer.parseInt(qryParam.get("qc_id").toString());
		Map<String,Object> maps = new HashMap<String, Object>();
		String fileQCName =null;
		maps.put("qc_id", id);
		maps.put("qc_file",fileQCName);
		appQcService.updateQcFile(maps);//把上传的从数据库删除
		map.put("success",true);
		return map;
	}
	/**
	 * 下载文件下来
	 * @param request
	 * @param response
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-15
	 */
	@RequestMapping(value="/downLoadFileFormMongo.do",method=RequestMethod.GET)
	@ResponseBody
	public  void downLoadFileFormMongo(HttpServletRequest request,HttpServletResponse response ) throws Exception {
		String filename=request.getParameter("file");
		GridFSDBFile file = fileService.retrieveFileOne("fs", filename);
		InputStream in = file.getInputStream();
		filename=(String) file.get("aliases");
		String fileName = filename;
//		for(String name:list){
//			filename=name;
//			System.out.println(name);
//		}
		/* 根据request的locale 得出可能的编码，中文操作系统通常是gb2312 */
		filename=filename.replace(" ", ""); 
		fileName = new String(filename.getBytes("GB2312"), "ISO_8859_1");
		filename = fileName;
		response.setContentType(file.getContentType());
	    response.setHeader("Content-Disposition", "attachment;filename="
                + filename);
	    OutputStream out = response.getOutputStream();
	    byte[] buffer = new byte[2048];
        int i = -1;
        while ((i = in.read(buffer)) != -1) {
            out.write(buffer, 0, i);
        }
        
        in.close();
        out.flush();
        out.close();
	}
	
}
