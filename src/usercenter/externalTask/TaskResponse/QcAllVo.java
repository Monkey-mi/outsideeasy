package usercenter.externalTask.TaskResponse;

import java.util.List;

public class QcAllVo {
	private  QcCountVo qcCountVo;//统计信息
	private List<QcVo> qcVos;//质检信息列表
	public QcCountVo getQcCountVo() {
		return qcCountVo;
	}
	public void setQcCountVo(QcCountVo qcCountVo) {
		this.qcCountVo = qcCountVo;
	}
	public List<QcVo> getQcVos() {
		return qcVos;
	}
	public void setQcVos(List<QcVo> qcVos) {
		this.qcVos = qcVos;
	}
	
}
