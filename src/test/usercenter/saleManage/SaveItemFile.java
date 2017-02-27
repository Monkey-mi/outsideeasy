package test.usercenter.saleManage;

import java.io.IOException;
import java.io.RandomAccessFile;

/**

 * <b>function:</b> 写入文件、保存文件

 * @createDate 2011-9-21 下午05:44:02

 * @file SaveItemFile.java

 * @package com.hoo.download

 * @project MultiThreadDownLoad

 * @blog http://blog.csdn.net/IBM_hoojo

 * @email hoojo_@126.com

 * @version 1.0

 */
public class SaveItemFile {
    //存储文件

    private RandomAccessFile itemFile;

    

    public SaveItemFile() throws IOException {

        this("", 0);

    }

    

    /**

     * @param name 文件路径、名称

     * @param pos 写入点位置 position

     * @throws IOException

     */

    public SaveItemFile(String name, long pos) throws IOException {

        itemFile = new RandomAccessFile(name, "rw");

        //在指定的pos位置开始写入数据

        itemFile.seek(pos);

    }

    

    /**

     * <b>function:</b> 同步方法写入文件

     * @author hoojo

     * @createDate 2011-9-26 下午12:21:22

     * @param buff 缓冲数组

     * @param start 起始位置

     * @param length 长度

     * @return

     */

    public synchronized int write(byte[] buff, int start, int length) {

        int i = -1;

        try {

            itemFile.write(buff, start, length);

            i = length;

        } catch (IOException e) {

            e.printStackTrace();

        }

        return i;

    }

    

    public void close() throws IOException {

        if (itemFile != null) {

            itemFile.close();

        }

    }

}

//这个类主要是完成向本地的指定文件指针出开始写入文件，并返回当前写入文件的长度（文件指针）。这个类将被线程调用，文件被分成对应的块后，将被线程调用。每个线程都将会调用这个类完成文件的随机写入。

