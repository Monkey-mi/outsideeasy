package common.mongodb.model;

import java.io.Serializable;
import java.util.Date;

public class FileBean implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8542972525368301556L;
	private String id;
	private long chunkSize;
	private long length;
	private String md5;
	private String contentType;
	private String filename;
	private Date uploadDate;
	private String aliases;
	private int isimg;
	private int useType;
	private String useTypeName;
	private String comName;
	private int comID;
	private String userName;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public long getChunkSize() {
		return chunkSize;
	}
	public void setChunkSize(long chunkSize) {
		this.chunkSize = chunkSize;
	}
	public long getLength() {
		return length;
	}
	public void setLength(long length) {
		this.length = length;
	}
	public String getMd5() {
		return md5;
	}
	public void setMd5(String md5) {
		this.md5 = md5;
	}
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public Date getUploadDate() {
		return uploadDate;
	}
	public void setUploadDate(Date uploadDate) {
		this.uploadDate = uploadDate;
	}
	public String getAliases() {
		return aliases;
	}
	public void setAliases(String aliases) {
		this.aliases = aliases;
	}
	public int getIsimg() {
		return isimg;
	}
	public void setIsimg(int isimg) {
		this.isimg = isimg;
	}
	public int getUseType() {
		return useType;
	}
	public void setUseType(int useType) {
		this.useType = useType;
	}
	public String getComName() {
		return comName;
	}
	public void setComName(String comName) {
		this.comName = comName;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public int getComID() {
		return comID;
	}
	public void setComID(int comID) {
		this.comID = comID;
	}
	public String getUseTypeName() {
		return useTypeName;
	}
	public void setUseTypeName(String useTypeName) {
		this.useTypeName = useTypeName;
	}
	
}
