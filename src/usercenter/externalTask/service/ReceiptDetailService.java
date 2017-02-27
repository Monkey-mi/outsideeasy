package usercenter.externalTask.service;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.externalTask.data.ReceiptDetailMapper;


@Service
public class ReceiptDetailService {
	@Autowired
	private ReceiptDetailMapper mapper;
	/**
	 * 生成一条收货信息
	* @Description:
	* ReceiptDetailService
	* addReceiptDetail
	* @param map void
	* @author chenlong
	* 2016-12-27 上午11:11:12
	 */
	public void addReceiptDetail(Map<String,Object> map) {		
		mapper.addReceiptDetail(map);
	}
	
}
