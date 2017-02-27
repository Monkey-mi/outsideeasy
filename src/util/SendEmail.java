package util;
import java.util.Date;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendEmail {


    /**
     * 获取Session
     * @return
     */
    private static Session getSession() {
    	PublishInfo pi=PublishInfo.getInstance();
    	Properties props = new Properties();
        props.put("mail.smtp.host", pi.getHOST());//设置服务器地址
        props.put("mail.store.protocol" , pi.getPROTOCOL());//设置协议
        props.put("mail.smtp.port", pi.getPORT());//设置端口
        props.put("mail.smtp.auth" , Const.YESNO_TYPE_YES);
        final String pi_from=pi.getFROM();
        final String pi_pwd=pi.getPWD();
        Authenticator authenticator = new Authenticator() {

            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(pi_from, pi_pwd);
            }

        };
        Session session = Session.getDefaultInstance(props , authenticator);

        return session;
    }
    
    public static void send(String toEmail , String content) {
        Session session = getSession();
        try {
            // Instantiate a message
            Message msg = new MimeMessage(session);
            PublishInfo pi=PublishInfo.getInstance();
            //Set message attributes
            msg.setFrom(new InternetAddress(pi.getFROM()));
            InternetAddress[] address = {new InternetAddress(toEmail)};
            msg.setRecipients(Message.RecipientType.TO, address);
            msg.setSubject("账号激活邮件");
            msg.setSentDate(new Date());
            msg.setContent(content , "text/html;charset=utf-8");

            //Send the message
            Transport.send(msg);
        }
        catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }
    
    public static void send(String toEmail,String title , String content) {
        Session session = getSession();
        try {
            // Instantiate a message
            Message msg = new MimeMessage(session);
            PublishInfo pi=PublishInfo.getInstance();
            //Set message attributes
            msg.setFrom(new InternetAddress(pi.getFROM()));
            InternetAddress[] address = {new InternetAddress(toEmail)};
            msg.setRecipients(Message.RecipientType.TO, address);
            msg.setSubject(title);
            msg.setSentDate(new Date());
            msg.setContent(content , "text/html;charset=utf-8");

            //Send the message
            Transport.send(msg);
        }
        catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }
    
    /**
     * 判断当前操作是否Windows.
     *
     * @return true---是Windows操作系统
     */
    public static boolean isWindowsOS(){
     boolean isWindowsOS = false;
     String osName = System.getProperty("os.name");
     if(osName.toLowerCase().indexOf("windows")>-1){
      isWindowsOS = true;
     }
     return isWindowsOS;
    }
}
