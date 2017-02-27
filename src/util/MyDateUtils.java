package util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class MyDateUtils {
	//多线程情况下使用
	private  static ThreadLocal<DateFormat> yyyyMMddHHmmsss_FORMAT = new ThreadLocal<DateFormat>() {
	    @Override
	    protected DateFormat initialValue() {
	        return new SimpleDateFormat("yyyyMMddHHmmsss");
	    }
	};
	
	private  static ThreadLocal<DateFormat> yyyyMMdd_FORMAT = new ThreadLocal<DateFormat>() {
	    @Override
	    protected DateFormat initialValue() {
	        return new SimpleDateFormat("yyyy-MM-dd");
	    }
	};
	private  static ThreadLocal<DateFormat> yyyyMMdd_FORMAT2 = new ThreadLocal<DateFormat>() {
	    @Override
	    protected DateFormat initialValue() {
	        return new SimpleDateFormat("yyyyMMdd");
	    }
	};
	public static Date parse_yyyyMMddHHmmsss(String dateStr) throws ParseException {
        return yyyyMMddHHmmsss_FORMAT.get().parse(dateStr);
    }

    public static String format_yyyyMMddHHmmsss(Date date) {
        return yyyyMMddHHmmsss_FORMAT.get().format(date);
    }
    public static Date parse_yyyyMMdd(String dateStr) throws ParseException {
        return yyyyMMdd_FORMAT.get().parse(dateStr);
    }

    public static String format_yyyyMMdd(Date date) {
        return yyyyMMdd_FORMAT.get().format(date);
    }
    public static Date parse_yyyy_MM_dd(String dateStr) throws ParseException {
        return yyyyMMdd_FORMAT2.get().parse(dateStr);
    }

    public static String format__yyyy_MM_dd(Date date) {
        return yyyyMMdd_FORMAT2.get().format(date);
    }
    public static void clearThreadLocal(){
    	yyyyMMddHHmmsss_FORMAT.remove();
    	yyyyMMddHHmmsss_FORMAT=null;
    	yyyyMMdd_FORMAT.remove();
    	yyyyMMdd_FORMAT=null;
    	yyyyMMdd_FORMAT2.remove();
    	yyyyMMdd_FORMAT2=null;
    	SRMStringUtil.mmsssHHMMddyyyy_FORMAT.remove();
    	SRMStringUtil.mmsssHHMMddyyyy_FORMAT=null;
    }
}
