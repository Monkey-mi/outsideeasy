package usercenter.externalTask.TaskResponse;

import java.util.List;

/**
 * 返回统计信息和收货信息列表
 * @author chenlong
 *
 */
public class LogisticsItemAll {
private LogisticsCount logisticsCount;//统计信息
private List<LogisticsItemVo> logisticsItemVo;//收货信息列表
public LogisticsCount getLogisticsCount() {
	return logisticsCount;
}
public void setLogisticsCount(LogisticsCount logisticsCount) {
	this.logisticsCount = logisticsCount;
}
public List<LogisticsItemVo> getLogisticsItemVo() {
	return logisticsItemVo;
}
public void setLogisticsItemVo(List<LogisticsItemVo> logisticsItemVo) {
	this.logisticsItemVo = logisticsItemVo;
}


}
