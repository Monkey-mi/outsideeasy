package usercenter.saleManage.deliveryManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.deliveryManage.data.QualityFeedbackMapper;
import usercenter.saleManage.deliveryManage.model.QualityFeedback;
import usercenter.saleManage.deliveryManage.model.QualityFeedbackDetail;
import usercenter.saleManage.deliveryManage.response.QualityFeedbackDetailVo;
import util.Const;

@Service
public class QualityFeedbackService {
	@Autowired
	private QualityFeedbackMapper mapper;
	
	public List<QualityFeedback> getQualityFeedbackList(Map<String,Object> params){
		params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计
		List<QualityFeedback> qualityFeedbacks=mapper.getQualityFeedbackList(params);
		
		Map<String, Object> map=new HashMap<String, Object>();
		if (params.get("search_product_name")!=null) {
			map.put("search_product_name",params.get("search_product_name"));
		}
		if (params.get("search_product_artno")!=null) {
			map.put("search_product_artno",params.get("search_product_artno"));
		}
		if (params.get("search_order_bh")!=null) {
			map.put("search_order_bh",params.get("search_order_bh"));
		}
		if (params.get("search_agreement_bh")!=null) {
			map.put("search_agreement_bh",params.get("search_agreement_bh"));
		}
		if (params.get("check_detail_id")!=null) {
			map.put("check_detail_id",params.get("check_detail_id"));
		}
		for (QualityFeedback qualityFeedback : qualityFeedbacks) {
			map.put("check_id", qualityFeedback.getCheck_id());
			List<QualityFeedbackDetailVo> qualityFeedbackDetailVos=mapper.getQualityFeedbackDetailList(map);
			qualityFeedback.setList(qualityFeedbackDetailVos);
		}
		params.put(Const.IS_CUSTOM_COUNT, true);
		int count=mapper.getQualityFeedbackList_count(params);
		params.put(Const.AJAX_SERVICE_TOTAL, count);
		return qualityFeedbacks;
	}

	public List<QualityFeedbackDetail> getLastThreeQualityTest(
			Map<String, Object> params) {
		return mapper.getLastThreeQualityTest(params);
	}
}
