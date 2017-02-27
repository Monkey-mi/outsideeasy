package util;

import util.WebUtil;

import java.util.concurrent.ConcurrentLinkedQueue;

import manager.common.main.model.SRMLog;
import manager.common.main.service.ModuleService;

public class SysLogger implements Runnable{
	private Thread worker = null;
	private static ConcurrentLinkedQueue<SRMLog> logQueue= new ConcurrentLinkedQueue<SRMLog>(); 
	private boolean toRun=true; 
	private int timeCount=0;
	private int maxRowCount = 100;
	private int maxTimeCount = 60;
	//日志写入
	private void flush(){
		SRMLog log=null;
		if(timeCount%maxTimeCount==0)
			while((log=logQueue.poll())!=null){
				WebUtil.getAppCtx().getBean(ModuleService.class).addGpLog(log);
			}
	}
	//日志入队
	public void log(SRMLog log){
		logQueue.offer(log);
	}
	public void start(){
		worker = new Thread(this);
		worker.start();
	}
	public void stop(){
		toRun = false;
		SRMLog log=null;
		while((log=logQueue.poll())!=null){
			WebUtil.getAppCtx().getBean(ModuleService.class).addGpLog(log);
		}
	}
	@Override
	public void run() {
		while(true){
			flush();
			if(toRun==false)
				break;
			try {
				Thread.sleep(1000);
				this.timeCount++;
			} catch (InterruptedException e) {
			}
		}
	}
}
