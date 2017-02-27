package util;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.MessageDigest;

public class TansferData {
	private final static int Download_Read_Unit=1024;//每次读取的最小单元
	private final static int speed_200kb=200*1024;//每秒200KB
	private final static int speed_500kb=500*1024;//每秒500KB
	private final static int speed_1mb=1024*1024;//每秒1M
	
	public static int getDownloadReadUnit() {
		return Download_Read_Unit;
	}

	public static int getSpeed200kb() {
		return speed_200kb;
	}

	public static int getSpeed500kb() {
		return speed_500kb;
	}

	public static int getSpeed1mb() {
		return speed_1mb;
	}

	/**return 读写使用的总时间
	 *os:输入流
	 *is:输入流
	 *speed:传输速度，单位字节
	 *md5:计算md5值工具，对输出无影响 */
	public  static Long limitSpeed(OutputStream os,InputStream is ,int speed, MessageDigest md5,boolean usemd5) throws  Exception {
		byte[] b = null;
		long startTime=System.currentTimeMillis();
		long start=startTime;
		b = new byte[Download_Read_Unit];
		try {
			long count = 0;
			int j;
			while ((j = is.read(b)) != -1) {

				if (count + j > speed) {
					int need = (int) (speed - count);
					// 剩下的数
					int left = (int) (j + count - speed);
					byte[] temp = new byte[need];
					byte[] leftTemp = new byte[left];
					System.arraycopy(b, 0, temp, 0, need);
					System.arraycopy(b, need, leftTemp, 0, left);
					os.write(temp);
					if(usemd5){
						md5.update(temp);
					}
					os.flush();
					long endTime = System.currentTimeMillis();
					long sleepTime = startTime + 1000 - endTime;
					if (sleepTime > 0) {
						Thread.sleep(sleepTime);
					}

					startTime = System.currentTimeMillis();
					count = 0;
					os.write(leftTemp);
					if(usemd5){
						md5.update(leftTemp);
					}
					os.flush();
					count += left;
					continue;
				}

				if (count + j < speed) {
					count += j;
					byte[] temp = new byte[j];
					System.arraycopy(b, 0, temp, 0, j);
					os.write(temp);
					if(usemd5){
						md5.update(b);
					}
					os.flush();
					continue;
				}

				if (count + j == speed) {
					byte[] temp = new byte[j];
					System.arraycopy(b, 0, temp, 0, j);
					os.write(temp);
					if(usemd5){
						md5.update(b);
					}
					os.flush();
					long endTime = System.currentTimeMillis();
					long sleepTime = startTime + 1000 - endTime;
					if (sleepTime > 0) {
						Thread.sleep(sleepTime);
					}
					// 重置计数器
					startTime = System.currentTimeMillis();
					count = 0;
					continue;

				}
			}		
		} finally {
			try {
				is.close();
			} catch (IOException e) {
				throw  e;
			}
		}
		long end = System.currentTimeMillis();
		long usetime=end-start;
		return usetime;

	}
}
