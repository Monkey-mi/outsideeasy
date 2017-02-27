package util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import util.cmd.CmdExecuter;
import util.properties.FFMpeg;
/**
 * <p>Description: 本类封装FFMpeg对视频的操作</p>
 */
public class FFMpegUtil {

	private final static FFMpeg ffmpeg =FFMpeg.getInstance();

	/**
	 * 生成视频截图
	 * @param imageSavePath 截图文件保存全路径
	 * @param screenSize 截图大小 如640x480
	 * originFileUri 源文件保存的路径
	 */
	public static String makeScreenCut(String originFileUri){
		String filename=SRMStringUtil.getUUID();
		File screencut_save_path=new File(ffmpeg.getScreencut_save_path());
		if(!screencut_save_path.exists()){
			screencut_save_path.mkdirs();
		}
		
		String imageSavePath=ffmpeg.getScreencut_save_path()+filename+".jpg";
		List<String> cmd = new ArrayList<String>();
		cmd.clear();
		cmd.add(ffmpeg.getFfmpeg_path());
		cmd.add("-i");
		cmd.add(originFileUri);
		cmd.add("-y");
		cmd.add("-f");
		cmd.add("image2");
		cmd.add("-ss");
		cmd.add(ffmpeg.getImage_beginsec());
		cmd.add("-t");
		cmd.add(ffmpeg.getImage_time());
		cmd.add("-s");
		cmd.add(ffmpeg.getImage_screensize());
		cmd.add(imageSavePath);
		CmdExecuter.exec(cmd, null);
		return imageSavePath;
	}
	
	/**
	 * 视频转换
	 * originFileUri 源文件保存的路径
	 */
	public static String videoTransfer(String originFileUri){
		String filename=SRMStringUtil.getUUID();
		File convertvideo_save_path=new File(ffmpeg.getConvertvideo_save_path());
		if(!convertvideo_save_path.exists()){
			convertvideo_save_path.mkdirs();
		}
		String fileSavePath=ffmpeg.getConvertvideo_save_path()+"//"+filename+"."+ffmpeg.getVideo_convert_type();
		String audioByte=ffmpeg.getVideo_ab();
		String audioCollection=ffmpeg.getVideo_ar();
		String quality=ffmpeg.getVideo_qscale();
		String fps=ffmpeg.getVideo_r(); 
		List<String> cmd = new ArrayList<String>();
		cmd.clear();
		cmd.add(ffmpeg.getFfmpeg_path());
		cmd.add("-i");
		cmd.add(originFileUri);
		cmd.add("-y");
		cmd.add("-ab");
		cmd.add(audioByte );
		cmd.add("-ar");
		cmd.add( audioCollection );
		cmd.add("-qscale");
		cmd.add(quality );
		cmd.add("-r");
		cmd.add(fps);
//		cmd.add("-s");
//		cmd.add(screenSize);			
		cmd.add( fileSavePath );
		CmdExecuter.exec(cmd, null);
		return fileSavePath;
	}
	
	
	/**
	* @Description: 判断文件格式，是否可以转换成flv
	* ffmpeg能解析的格式：（asx，asf，mpg，wmv，3gp，mp4，mov，avi，flv等） 
	* @param fileName
	* @return
	* @author xufeng
	* @date 2016-5-25 
	*/
	public static boolean isConvertFLV(String fileName) {
	    boolean result = false;
	    String ext = fileName.substring(fileName.lastIndexOf(".") + 1,   
	    		fileName.length()).toLowerCase();
	    
	    if (ext.equals("avi")) {  
	    	result = true;  
	    } else if (ext.equals("mpg")) {  
	    	result = true;  
	    } else if (ext.equals("wmv")) {  
	    	result = true;  
	    } else if (ext.equals("3gp")) {  
	    	result = true;  
	    } else if (ext.equals("mov")) {  
	    	result = true;  
	    } else if (ext.equals("mp4")) {  
	    	result = true;  
	    } else if (ext.equals("asf")) {  
	    	result = true;  
	    } else if (ext.equals("asx")) {  
	    	result = true;   
	    } else if (ext.equals("flv")) {  
	    	result = true;    
	    }  
	    return result;
	  }

}
