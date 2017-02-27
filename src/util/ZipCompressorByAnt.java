package util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.zip.CRC32;
import java.util.zip.CheckedOutputStream;


import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipOutputStream;

/**
 * 用于压缩文件
 * 该类是进行文件的和压缩。可以是多个文件
 * @author chenlong
 */
public class ZipCompressorByAnt {
	
	private static final int BUFFER = 8192; //读入的速度
	private File zipFile;   //文件压缩后的的文件名  
	  
    public ZipCompressorByAnt(String pathName) { 
	zipFile = new File(pathName);   
    } 
    
    public void compress(String srcPathName) {   //要压缩的的文件
        File file = new File(srcPathName);   
        if (!file.exists())   
            throw new RuntimeException(srcPathName + "不存在！");   
        try {   
            FileOutputStream fileOutputStream = new FileOutputStream(zipFile);   
            CheckedOutputStream cos = new CheckedOutputStream(fileOutputStream,   
                    new CRC32());   //用于校验数据的完整性 使用CRC32算法来计算Checksum数目
            ZipOutputStream out = new ZipOutputStream(cos); 
            out.setEncoding(System.getProperty("sun.jnu.encoding"));//设置文件名编码方式
            String basedir = "";   
            compress(file, out, basedir);   
            out.close();   
        } catch (Exception e) {   
            throw new RuntimeException(e);   
        }   
    }  
    
    private  void compress(File file, ZipOutputStream out, String basedir) {   
        /* 判断是目录还是文件 */  
        if (file.isDirectory()) {   
           // System.out.println("压缩：" + basedir + file.getName());   
            this.compressDirectory(file, out, basedir);   
        } else {   
          //  System.out.println("压缩：" + basedir + file.getName());   
            this.compressFile(file, out, basedir);   
        }   
    } 
    
    /** 压缩一个目录 */  
    private  void compressDirectory(File dir, ZipOutputStream out, String basedir) {   
        if (!dir.exists())   
            return;   
  
        File[] files = dir.listFiles();   
        for (int i = 0; i < files.length; i++) {   
            /* 递归 */  
            compress(files[i], out, basedir + dir.getName() + "/");   
        }   
    }
    
    /** 压缩一个文件 */  
    private  void compressFile(File file, ZipOutputStream out, String basedir) {   
        if (!file.exists()) {   
            return;   
        }   
        try {   
            BufferedInputStream bis = new BufferedInputStream(   
                    new FileInputStream(file));   
            ZipEntry entry = new ZipEntry(basedir + file.getName());   
            out.putNextEntry(entry);   
            int count;   
            byte data[] = new byte[BUFFER];   
            while ((count = bis.read(data, 0, BUFFER)) != -1) {   
                out.write(data, 0, count);   
            }   
            bis.close();   
        } catch (Exception e) {   
            throw new RuntimeException(e);   
        }   
    } 
} 
