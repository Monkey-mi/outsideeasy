package test.usercenter.saleManage;

import org.apache.log4j.Logger;

public class DownloadUtils {
	private static Logger log = Logger.getLogger(BatchDownloadFile.class);
    public static void download(String url) {

        DownloadInfo bean = new DownloadInfo(url);

        log.debug(bean);

        BatchDownloadFile down = new BatchDownloadFile(bean);

        new Thread(down).start();

    }

    

    public static void download(String url, int threadNum) {

        DownloadInfo bean = new DownloadInfo(url, threadNum);

        log.debug(bean);

        BatchDownloadFile down = new BatchDownloadFile(bean);

        new Thread(down).start();

    }

    

    public static void download(String url, String fileName, String filePath, int threadNum) {

        DownloadInfo bean = new DownloadInfo(url, fileName, filePath, threadNum);

        log.debug(bean);

        BatchDownloadFile down = new BatchDownloadFile(bean);

        new Thread(down).start();

    }
}
