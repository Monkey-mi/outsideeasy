package common.mongodb.model;

import java.io.Serializable;

public class VideoFileBean implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2755007092048148368L;
	private String id;
	private String file_name;
	private long file_size;
	private String image_file;//图片的mongodb文件名
	private String video_file;//flv视屏的mongodb文件名
	private String origion_file;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public long getFile_size() {
		return file_size;
	}
	public void setFile_size(long file_size) {
		this.file_size = file_size;
	}
	public String getImage_file() {
		return image_file;
	}
	public void setImage_file(String image_file) {
		this.image_file = image_file;
	}
	public String getVideo_file() {
		return video_file;
	}
	public void setVideo_file(String video_file) {
		this.video_file = video_file;
	}
	public String getOrigion_file() {
		return origion_file;
	}
	public void setOrigion_file(String origion_file) {
		this.origion_file = origion_file;
	}
	
}
