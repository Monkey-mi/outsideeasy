package util;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

/**
 * @author Administrator
 * 通过http post发送信息到短信平台
 */
public class HttpRequestUtils {

	/**
     * httpPost
     * @param url  路径
     * @param jsonParam 参数
     * @return
     * @throws IOException 
     */
    public static String httpPost(String url,Map<String,Object> params) throws IOException{
        return httpPost(url, params, false);
    }

    /**
     * post请求
     * @param url         url地址
     * @param jsonParam     参数
     * @param noNeedResponse    不需要返回结果
     * @return
     * @throws IOException
     */
    public static String httpPost(String url,Map<String,Object> params, boolean noNeedResponse) throws IOException{
        //post请求返回结果
        CloseableHttpClient httpClient = HttpClients.createDefault();
        String resultstr = null;
        HttpPost method = new HttpPost(url);
        if (null != params) {
            List<NameValuePair> listparams=new ArrayList<NameValuePair>();
            for(String key:params.keySet()){
                //建立一个NameValuePair数组，用于存储欲传送的参数  
                listparams.add(new BasicNameValuePair(key,params.get(key).toString()));
            }
            //添加参数 
            method.setEntity(new UrlEncodedFormEntity(listparams,"gb2312"));
        }
        CloseableHttpResponse result = httpClient.execute(method);
        //为了释放资源，我们必须手动消耗掉result或者取消连接（使用CloseableHttpResponse类的close方法）
        try {
            /**请求发送成功，并得到响应**/
            if (result.getStatusLine().getStatusCode() == 200) {
                HttpEntity entity1 = result.getEntity();
                resultstr = EntityUtils.toString(entity1,"gb2312");
                EntityUtils.consume(entity1);
            }

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }finally{
            result.close();
        }

        if (noNeedResponse) {
            return null;
        }
        return resultstr;
    }


    /**
     * 发送get请求
     * @param url    路径
     * @return
     * @throws IOException 
     * @throws ClientProtocolException 
     */
    public static String httpGet(String url) throws ClientProtocolException, IOException{
        //get请求返回结果
        String resultstr = null;

        CloseableHttpClient client =HttpClients.createDefault();
        //发送get请求
        HttpGet request = new HttpGet(url);
        CloseableHttpResponse response = client.execute(request);
        //为了释放资源，我们必须手动消耗掉result或者取消连接（使用CloseableHttpResponse类的close方法）
        try {
            /**请求发送成功，并得到响应**/
            if (response.getStatusLine().getStatusCode() == 200) {
                HttpEntity entity1 = response.getEntity();
                resultstr = EntityUtils.toString(entity1);
                URLDecoder.decode(resultstr, "gb2312");
                EntityUtils.consume(entity1);
            }

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }finally{
            response.close();
        }
        return resultstr;
    }
    
    //生成6位随机码
    public static String getRandomIntString(int length){
		String base = "0123456789";   
	    Random random = new Random();   
	    StringBuffer sb = new StringBuffer();   
	    for (int i = 0; i < length; i++) {
	        int number = random.nextInt(base.length());
	        sb.append(base.charAt(number));
	    }   
	    return sb.toString();
	}
    
    public static void main(String[] args) throws IOException {
        String sid=SysSerialId.getNextSerialId();
        System.out.println("sid:"+sid);
    	
    	//post提交请求，获取数据
        String str2="http://smsapi.ums86.com:8888/sms/Api/Send.do";
        String msg="您的验证码为"+getRandomIntString(6);
        Map<String,Object> params=new HashMap<String,Object>();
        params.put("SpCode", "003096");//企业号
        params.put("LoginName", "zj_tpsxx");//账号
        params.put("Password", "51ko0pcgmcgrh");//密码
        params.put("MessageContent",msg );//消息模板
        params.put("UserNumber", "18107327286");//接收人电话-15700099155,18768225375
        params.put("SerialNumber", sid);//回执编号，必须20位数字
        params.put("ScheduleTime", "");//立即发送
        params.put("f", "1");//存在无效号码时，有效号码仍能发出短信，无效号码返回在参数faillist中
        String postresult;
        try {
            postresult = HttpRequestUtils.httpPost(str2,params);
            if(postresult!=null){
            	System.out.println("postresult:"+postresult);
            }else{
            	System.out.println("postresult is null");
            }
            
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
