package test.usercenter.saleManage;

public class TestDownloadMain {
    public static void main(String[] args) {

//        DownloadInfo bean = new DownloadInfo("http://i7.meishichina.com/Health/UploadFiles/201109/2011092116224363.jpg");
//
//        System.out.println(bean);
//
//        BatchDownloadFile down = new BatchDownloadFile(bean);
//
//        new Thread(down).start();
        //DownloadUtils.download("http://i7.meishichina.com/Health/UploadFiles/201109/2011092116224363.jpg");

        DownloadUtils.download("https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1246824636,1580964257&fm=116&gp=0.jpg", 
        		"aa.jpg", 
                "D:/temp", 5);
       // System.exit(0);
    }
    
}
