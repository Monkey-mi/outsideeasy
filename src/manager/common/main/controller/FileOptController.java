package manager.common.main.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.basicdata.file.model.MngBaseFileType;
import manager.basicdata.file.service.MngBaseFileTypeService;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import util.Const;
import util.FFMpegUtil;
import util.MyDateUtils;
import util.SRMStringUtil;
import util.WebUtil;
import util.annotation.DocLogger;
import util.properties.FFMpeg;

import com.mongodb.gridfs.GridFSDBFile;
import common.mongodb.model.FileBean;
import common.mongodb.model.VideoFileBean;
import common.mongodb.service.FileOptService;

@Controller
@RequestMapping("fileopt")
public class FileOptController {
	@Autowired
	private FileOptService fileService;
	@Autowired
	private MngBaseFileTypeService bftService;
	
	@RequestMapping(value="/SaveFile.do",method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> SaveFile(@RequestParam("fileName") MultipartFile file,HttpServletRequest request,HttpServletResponse response)throws Exception{
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		String fileName=fileService.SaveFile(file);
		respMap.put("success",true);
		respMap.put("fileName",fileName);
		return respMap;
	}
	

	@RequestMapping(value="/getFileList.do",method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> getFileList(HttpServletRequest request,HttpServletResponse response)throws Exception{
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String,Object> req = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> params=new HashMap<String, Object>();
		//req.put(Const.AJAX_SERVICE_START, 0);//start
		//req.put(Const.AJAX_SERVICE_SIZE, 20);//limit
		//req.put(Const.USE_PAGING, "true");
		SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		if(req.get("uploadDate1")!=null&&req.get("uploadDate1")!=""){
			Date d1=sf.parse(req.get("uploadDate1").toString());
			req.put("uploadDate1", d1);
		}
		if(req.get("uploadDate2")!=null&&req.get("uploadDate2")!=""){
			Date d2=sf.parse(req.get("uploadDate2").toString());
			req.put("uploadDate2", d2);
		}
		if(req.get("useType")!=null&&req.get("useType")!=""){
			req.put("useType", Integer.parseInt(req.get("useType").toString()));
		}
		//req.put(Const.USERNAME, "admin");
		//req.put(Const.ISIMG, "1");
		req.remove("limit");
		req.remove("page");
		req.remove("_dc");
		List<FileBean> fileList = fileService.getFileList(req);
		for (FileBean fileBean : fileList) {
			params.put("f_id", fileBean.getUseType());
			List<MngBaseFileType> baseFileTypes=bftService.getMngBaseFileTypeList(params);
			if(baseFileTypes.size()>0){
				fileBean.setUseTypeName(baseFileTypes.get(0).getType_name());
			}
		}
		respMap.put("success",true);
		respMap.put("total",req.get(Const.AJAX_SERVICE_TOTAL));
		respMap.put("data",fileList);
		return respMap;
	}
	@RequestMapping(value="/deleteFile.do",method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> deleteFile(HttpServletRequest request,HttpServletResponse response)throws Exception{
		String filename=request.getParameter("filename");
		Map<String,Object> map = new HashMap<String,Object>();
		fileService.deleteFileByName(filename);
		map.put("success",true);
		return map;
	}
	
	@DocLogger(explain="mongo文件下载")
	@RequestMapping(value="/downLoadFileFormMongo.do",method=RequestMethod.GET)
	public @ResponseBody void downLoadFileFormMongo(HttpServletRequest request,HttpServletResponse response ) throws Exception {
		String filename=request.getParameter("filename");
		GridFSDBFile file = fileService.retrieveFileOne("fs", filename);
		if(file==null){
			return;
		}
		InputStream in = file.getInputStream();
		filename=(String) file.get("aliases");
		//防止下载出错
		filename=filename.replace(" ", ""); 
		   /* 根据request的locale 得出可能的编码，中文操作系统通常是gb2312 */
		filename = new String(filename.getBytes("GB2312"), "ISO_8859_1");
		
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
	@RequestMapping(value="/uploadVideo.do",method=RequestMethod.POST)
	@ResponseBody
	public  String uploadVideo(HttpServletRequest request,HttpServletResponse response)throws Exception{
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	
    	MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;   
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest   
                .getFile("file");   //对应前台文件对象    
        if(file!=null && file.getSize()>0){
        	if (file.getSize() >50*1024*1024) {
				json.put("message", "文件太大，超过50M");
				json.put("success", false);
				return json.toString();	
			} 
        }else{
        	json.put("message", "文件为空");
			json.put("success", false);
			return json.toString();	
        }
        //判断是否可以转化
		String filename = file.getOriginalFilename();
		boolean canConvertFLV=FFMpegUtil.isConvertFLV(filename);
		String fileType = filename.substring(filename.lastIndexOf(".")); //截取文件格式
		if(!canConvertFLV){
			json.put("success", false);
			json.put("msg", "无法转换"+fileType+"格式");
			return json.toString();
		}
		//获取视频转码文件配置信息
    	FFMpeg ffmpeg =FFMpeg.getInstance();
    	//临时文件夹是否存在
		File originvideo_temp_path=new File(ffmpeg.getOriginvideo_temp_path());
		if(!originvideo_temp_path.exists()){
			originvideo_temp_path.mkdirs();
		}
		//重命名，以防重名
		String serialName = SRMStringUtil.getUUID();
		File tempVideoFile = new File(ffmpeg.getOriginvideo_temp_path()+serialName + fileType);
		//将上传的原始文件写入一个临时位置
        InputStream in = file.getInputStream();
        FileOutputStream out =new FileOutputStream(tempVideoFile);
        
        byte[] buf = new byte[1024];
        int len;
        while ((len = in.read(buf)) > 0) {
           out.write(buf, 0, len);
        }
        in.close();
        out.close();
        VideoFileBean fileBean=fileService.SaveVideoFile(tempVideoFile);
        json.put("fileName", fileBean.getVideo_file());
        //删除临时文件
        tempVideoFile.delete();
		return json.toString();
	}
}
