package util.properties;

import java.io.File;
import java.io.IOException;
import java.util.Properties;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import common.model.BusinessException;

import util.WebUtil;

public class FFMpeg {

	private String originvideo_temp_path;//原文件临时存储路径
	private String convertvideo_save_path;//转换文件临时存储路
	private String screencut_save_path;//截图存放路径
	
	private String video_convert_type;//转换视频设置
	private String video_qscale;//转换质量
	private String video_ab;//音频码率
	private String video_ac;//声道数
	private String video_ar;//声音采样频率
	private String video_r;//帧频
	
	private String image_beginsec;//截图相关设置
	private String image_time;//持续时间
	private String image_screensize;//截图图片大小
	
	private String ffmpeg_path;//可执行程序路径
	public String getOriginvideo_temp_path() {
		return originvideo_temp_path;
	}
	public void setOriginvideo_temp_path(String originvideo_temp_path) {
		this.originvideo_temp_path = originvideo_temp_path;
	}
	public String getConvertvideo_save_path() {
		return convertvideo_save_path;
	}
	public void setConvertvideo_save_path(String convertvideo_save_path) {
		this.convertvideo_save_path = convertvideo_save_path;
	}
	public String getScreencut_save_path() {
		return screencut_save_path;
	}
	public void setScreencut_save_path(String screencut_save_path) {
		this.screencut_save_path = screencut_save_path;
	}
	public String getVideo_convert_type() {
		return video_convert_type;
	}
	public void setVideo_convert_type(String video_convert_type) {
		this.video_convert_type = video_convert_type;
	}
	public String getVideo_qscale() {
		return video_qscale;
	}
	public void setVideo_qscale(String video_qscale) {
		this.video_qscale = video_qscale;
	}
	public String getVideo_ab() {
		return video_ab;
	}
	public void setVideo_ab(String video_ab) {
		this.video_ab = video_ab;
	}
	public String getVideo_ac() {
		return video_ac;
	}
	public void setVideo_ac(String video_ac) {
		this.video_ac = video_ac;
	}
	public String getVideo_ar() {
		return video_ar;
	}
	public void setVideo_ar(String video_ar) {
		this.video_ar = video_ar;
	}
	public String getVideo_r() {
		return video_r;
	}
	public void setVideo_r(String video_r) {
		this.video_r = video_r;
	}
	public String getImage_beginsec() {
		return image_beginsec;
	}
	public void setImage_beginsec(String image_beginsec) {
		this.image_beginsec = image_beginsec;
	}
	public String getImage_time() {
		return image_time;
	}
	public void setImage_time(String image_time) {
		this.image_time = image_time;
	}
	public String getImage_screensize() {
		return image_screensize;
	}
	public void setImage_screensize(String image_screensize) {
		this.image_screensize = image_screensize;
	}

	public String getFfmpeg_path() {
		return ffmpeg_path;
	}
	public void setFfmpeg_path(String ffmpeg_path) {
		this.ffmpeg_path = ffmpeg_path;
	}

	private final static FFMpeg INSTANCE=new FFMpeg();
	
	private FFMpeg(){
		Properties myProperty = new Properties();
		boolean iswindowServer=WebUtil.isWindowServer();
		try {
			myProperty=PropertiesLoaderUtils.loadProperties(new ClassPathResource("config/ffmpeg.properties"));
			if(iswindowServer){
				this.originvideo_temp_path=myProperty.getProperty("originvideo_temp_path");
				this.convertvideo_save_path=myProperty.getProperty("convertvideo_save_path");
				this.screencut_save_path=myProperty.getProperty("screencut_save_path");
				
				this.ffmpeg_path=WebUtil.getRootPath()+"/tools/ffmpeg.exe";
			}else{
				this.originvideo_temp_path=myProperty.getProperty("originvideo_temp_path_linux");
				this.convertvideo_save_path=myProperty.getProperty("convertvideo_save_path_linux");
				this.screencut_save_path=myProperty.getProperty("screencut_save_path_linux");
				
				this.ffmpeg_path=myProperty.getProperty("linux_ffmpeg_path");
			}
			File file=new File(this.ffmpeg_path);
			if(!file.exists()){
				throw new BusinessException("ffmpeg可执行文件不存在于"+this.ffmpeg_path);
			}
			this.video_convert_type=myProperty.getProperty("video_convert_type");
			this.video_qscale=myProperty.getProperty("video_qscale");
			this.video_ab=myProperty.getProperty("video_ab");
			this.video_ac=myProperty.getProperty("video_ac");
			this.video_ar=myProperty.getProperty("video_ar");
			this.video_r=myProperty.getProperty("video_r");
			
			this.image_beginsec=myProperty.getProperty("image_beginsec");
			this.image_time=myProperty.getProperty("image_time");
			this.image_screensize=myProperty.getProperty("image_screensize");
		} catch (IOException e) {
			e.printStackTrace();
		};
	}
	public static FFMpeg getInstance() {
	      return INSTANCE;
	}
}
