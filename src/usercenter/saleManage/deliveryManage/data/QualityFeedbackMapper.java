package usercenter.saleManage.deliveryManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.deliveryManage.model.QualityFeedback;
import usercenter.saleManage.deliveryManage.model.QualityFeedbackDetail;
import usercenter.saleManage.deliveryManage.response.QualityFeedbackDetailVo;


public interface QualityFeedbackMapper {
	public List<QualityFeedback> getQualityFeedbackList(Map<String,Object> params);
	public List<QualityFeedbackDetailVo> getQualityFeedbackDetailList(Map<String,Object> params);
	public int getQualityFeedbackList_count(Map<String, Object> params);
	public List<QualityFeedbackDetail> getLastThreeQualityTest(
			Map<String, Object> params);
}
