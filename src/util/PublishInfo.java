package util;

import java.io.IOException;
import java.util.Properties;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

public class PublishInfo {
	private  String url;
	private  String pro_name;
	private  String HOST;
	private  String PROTOCOL;
	private  String PORT;
	private  String FROM;
	private  String PWD;
	public String getUrl() {
		return url;
	}

	public String getPro_name() {
		return pro_name;
	}

	public String getHOST() {
		return HOST;
	}

	public void setHOST(String hOST) {
		HOST = hOST;
	}

	public String getPROTOCOL() {
		return PROTOCOL;
	}

	public void setPROTOCOL(String pROTOCOL) {
		PROTOCOL = pROTOCOL;
	}

	public String getPORT() {
		return PORT;
	}

	public void setPORT(String pORT) {
		PORT = pORT;
	}

	public String getFROM() {
		return FROM;
	}

	public void setFROM(String fROM) {
		FROM = fROM;
	}

	public String getPWD() {
		return PWD;
	}

	public void setPWD(String pWD) {
		PWD = pWD;
	}

	private final static PublishInfo INSTANCE = new PublishInfo();

	private PublishInfo() { 
		Properties myProperty = new Properties();
		try {
			myProperty=PropertiesLoaderUtils.loadProperties(new ClassPathResource("config/publishInfo.properties"));
			this.url=myProperty.getProperty("url");
			this.pro_name=myProperty.getProperty("pro_name");
			this.HOST=myProperty.getProperty("HOST");
			this.PROTOCOL=myProperty.getProperty("PROTOCOL");
			this.PORT=myProperty.getProperty("PORT");
			this.FROM=myProperty.getProperty("FROM");
			this.PWD=myProperty.getProperty("PWD");
		} catch (IOException e) {
			e.printStackTrace();
		};
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public void setPro_name(String pro_name) {
		this.pro_name = pro_name;
	}

	public static PublishInfo getInstance() {
	      return INSTANCE;
	}
	
}
