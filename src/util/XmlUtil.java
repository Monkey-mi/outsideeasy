package util;

import java.io.StringWriter;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Result;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import manager.common.user.model.Role;

import org.apache.cxf.headers.Header;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;


public class XmlUtil {
	private static DocumentBuilderFactory factory=DocumentBuilderFactory.newInstance();
	private static DocumentBuilder builder;
   public static Document init(){
	   Document document;
	   if(builder==null){
		   try {
			builder=factory.newDocumentBuilder();
		} catch (ParserConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	   }
	   document=builder.newDocument();
	   document.setXmlStandalone(true);
	   return document;
   }
   public static Element createElement(Document document,String name,String value){
	   Element el=document.createElement(name);
	   if(value!=null){
		   el.appendChild(document.createTextNode(value));
	   }
	   return el;
   }
   public static String getTextFromDocument(Node doc) {
	   DOMSource source=new DOMSource(doc);
	   StringWriter writer=new StringWriter();
	   Result resultStr =new StreamResult(writer);
	   String xmlStr = null;
	   try {
		Transformer transformer = TransformerFactory.newInstance().newTransformer();
		transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		transformer.transform(source, resultStr);
		xmlStr = writer.getBuffer().toString();
	} catch (TransformerConfigurationException e) {
		// TODO Auto-generated ca tch block
		e.printStackTrace();
	} catch (TransformerFactoryConfigurationError e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}catch (TransformerException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	   return xmlStr;
   }
   public static String getCpSql(String module,String cp){
	   StringBuffer sql=new StringBuffer("in(select cp_table_key from content_permit ");
	   System.out.println(sql+"++++++++++++++++++++++++++++++++++++++++++++");
	   @SuppressWarnings("unused")
	StringBuffer cp1=null;
	   StringBuffer where=new StringBuffer("where cp_module='"+module+"'");
	   if(cp!=null&&!cp.equals("all")){
		   cp1=new StringBuffer(cp+"='true'");
	   }
	   System.out.println(sql+"++++++++++++++++++++++++++++++++++++++++++++");
	   List<Role> userrole=SessionUtil.getCurrentUserRoles();
	   if(userrole.size()>0){
		   where.append(" and (tar_type='R'");
	   }	
	   System.out.println(sql+"++++++++++++++++++++++++++++++++++++++++++++");
	   for(Role item:userrole){
		   if(userrole.indexOf(item)==0){
			   where.append("and tar_id="+item.getRole_id());
		   }else{
			   where.append("or tar_id="+item.getRole_id());
		   }
		   if(userrole.indexOf(item)==userrole.size()-1){
			   where.append(")");
		   }
	   }
	   System.out.println(sql+"++++++++++++++++++++++++++++++++++++++++++++");
	   String login_id=SessionUtil.getCurrentUser().getLogin_id();
	   if(!login_id.equals("")&&login_id!=null){
		   where.append("or (tar_type='U' and tar_id='"+login_id+"')");
	   }
	   System.out.println(sql+"++++++++++++++++++++++++++++++++++++++++++++");
	   sql.append(where);
	   sql.append(")");
	  
	   return sql.toString();
   }
   public static boolean isMatch(String content,String regx){
	   boolean flag=false;
	   Pattern pattern=Pattern.compile(regx);
	   Matcher m=pattern.matcher(content);
	   flag= m.find();
	   return flag;
   }
   public static String getSOAPUserName(Map<String, Object> message){
	   @SuppressWarnings("unchecked")
		List<Header> headerList = (List<Header>) message.get(Header.HEADER_LIST);
		if(headerList!=null && headerList.size()>0){
			Element element = (Element)headerList.get(0).getObject();
			String username = element.getElementsByTagName("wsse:Username").item(0).getTextContent();
			return username;
		}else{
			return null;
		}
   }
}
