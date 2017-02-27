package usercenter.externalTask.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.common.main.model.DriverMobilePhone;
import usercenter.common.main.model.LicensePlate;
import usercenter.common.main.service.DriverMobilePhoneService;
import usercenter.common.main.service.LicensePlateService;
import usercenter.externalTask.TaskResponse.DeStatusVo;
import usercenter.externalTask.TaskResponse.SelectDownVo;
import usercenter.externalTask.TaskResponse.ShippingAndDetailVo;
import usercenter.externalTask.TaskResponse.ShippingDetailListVo;
import usercenter.externalTask.data.ShippingRegistrationMapper;
import usercenter.externalTask.model.ShippingRegistration;
import usercenter.externalTask.model.TaskFile;
import util.WebUtil;


@Service
public class ShippingRegistrationService {
	@Autowired
	private ShippingRegistrationMapper mapper;
	@Autowired
	private TaskFileService taskFileService;
	@Autowired
	private TaskDeliverGoodsService taskDeliverGoodsService;
	@Autowired
	private DriverMobilePhoneService driverMobilePhoneService;
	@Autowired
	private LicensePlateService licensePlateService;
	@Autowired
	private TaskService taskService;
   
	/**
	 * 查询出啦运货单列表
	* @Description:
	* ShippingRegistrationService
	* getShippingRegistrationList
	* @param params
	* @return List<ShippingRegistration>
	* @author chenlong
	* 2016-12-19 下午5:23:33
	 */
	public List<ShippingRegistration> getShippingRegistrationList(Map<String,Object> params) {
		return mapper.getShippingRegistrationList(params);
	}
	/**
	 * 添加发货的物流信息
	* @Description:
	* ShippingRegistrationService
	* addShippingRegistration
	* @param arr void
	* @author chenlong
	* 2016-12-5 上午11:11:09
	 */
	public boolean addShippingRegistration(Map<String,Object> params) {
		Map<String,Object> param = new HashMap<String, Object>();
		params.put("shipping_state", 0);
		mapper.addShippingRegistration(params);//生成运单记录	
		param.put("shipping_id", params.get("shipping_id"));
		String[] arrpro = params.get("arrpro").toString().split(",");//发货清单集
	    param.put("arrpro", arrpro);
	    boolean flag = taskDeliverGoodsService.updateDeliverdetail(param);//检查发货量是否符合要求
	    if(flag){
	    	taskDeliverGoodsService.updateDeliverForGoods(param);	    				
			if(!WebUtil.isEmpty(params.get("arrpic"))){
				String[] arrpic = params.get("arrpic").toString().split(",");//图片集
				param.put("arrpic", arrpic);
				taskFileService.updateForShipping(param);
			}
	    }else{
	    	mapper.deleteShippingRegistration(params);//验证没通过删除运单记录	
	    }
	    return flag;
	}
	/**
	 * 查询下拉选相的车牌和司机
	* @Description:
	* ShippingRegistrationService
	* getForSelect
	* @param params
	* @return SelectDownVo
	* @author chenlong
	* 2016-12-19 下午1:56:55
	 */
	public SelectDownVo getForSelect(Map<String,Object> params) {
		params.put("enable", 0);
		List<DriverMobilePhone> list1 = driverMobilePhoneService.getDriverMobilePhoneForSelect(params);
		List<LicensePlate> list2 = licensePlateService.getLicensePlateForSelect(params);
		SelectDownVo selectDownVo = new SelectDownVo();
		selectDownVo.setlDriverMobilePhones(list1);
		selectDownVo.setLicensePlates(list2);
		return selectDownVo;
	}
	
	/**
	 * 根据ID查询出该运单 
	* @Description:
	* ShippingRegistrationService
	* getShippingForID
	* @param params
	* @return ShippingRegistration
	* @author chenlong
	* 2016-12-21 下午1:31:23
	 */
	public ShippingRegistration getShippingForID(Map<String,Object> params){
		return mapper.getShippingForID(params);
	}
	/**
	 * 查询出运单中的详情
	* @Description:
	* ShippingRegistrationService
	* getShippingForDetails
	* @param params
	* @return ShippingRegistration
	* @author chenlong
	* 2016-12-21 下午1:34:13
	 */
	public ShippingAndDetailVo getShippingForDetails(Map<String,Object> params){
		taskDeliverGoodsService.deletedeliverGoods(params);//清理冗余数据
		ShippingAndDetailVo  shippingAndDetailVo = new ShippingAndDetailVo();
		ShippingRegistration shippingRegistration =  mapper.getShippingForNumber(params);
		if(shippingRegistration!=null){
			shippingAndDetailVo.setShippingRegistration(shippingRegistration);//shippingRegistration
		    params.put("shipping_id", shippingRegistration.getShipping_id());
		    params.put("file_type",  49);
			params.put("is_delete",  0);
			List<TaskFile> fileList = taskFileService.getTaskShippingFile(params);
			shippingAndDetailVo.setTaskFiles(fileList);
			List<ShippingDetailListVo> list = taskDeliverGoodsService.getdeliverGoodsForID(params);//getdeliverGoodsForID
			shippingAndDetailVo.setShippingDetailListVos(list);
		}
		return shippingAndDetailVo;
	}
	/**
	 * 运单内容的更新
	* @Description:
	* ShippingRegistrationService
	* updateShippingRegistration
	* @param params
	* @return boolean
	* @author chenlong
	* 2016-12-22 上午11:06:19
	 */
	public String updateShippingRegistration(Map<String,Object> params){
		String message = "成功";
		boolean flag1 = getShippingStatusForEdit(params);//查询所有发货单的状态
		int flag2 = mapper.getShippingStatus(params);//查询当前运单的状态
		if(flag1&&(flag2==0)){
    	   mapper.updateShippingRegistration(params);//运单
    	   if(!WebUtil.isEmpty(params.get("arrpic"))){
				String[] arrpic = params.get("arrpic").toString().split(",");//图片集
				params.put("arrpic", arrpic);
				taskFileService.updateForShipping(params);//图片
			}
		}else{
			if(!flag1){
				message="运单中存在已收货状态的发货单！";
			}else if(flag2==1){
				message="运单已被取消";
			}
		}
		return message;
    }
	/**
	 * 返回当前运单是否可编辑
	* @Description:
	* ShippingRegistrationService
	* getShippingStatusForEdit
	* @param params
	* @return boolean
	* @author chenlong
	* 2016-12-22 上午11:05:09
	 */
     public boolean getShippingStatusForEdit(Map<String,Object> params){
    	 boolean flag = true;
    	 params.put("is_delete", 0);
    	 List<Integer> li = mapper.getShippingStatusForEdit(params);
    	 if(li!=null){
	         for(Iterator<Integer> iterator = li.iterator();iterator.hasNext();){
	        	 int status = iterator.next();
	        	 if(status==10){
	        		 flag = false; 
	        		 break;
	        	 }
	         }
    	 }else{
    		 flag = false;
    	 }
    	 return flag;
    }
     /**
 	 * 返回当前运单状态
 	* @Description:true:正常
 	* ShippingRegistrationService
 	* getShippingStatusForEdit
 	* @param params
 	* @return boolean
 	* @author chenlong
 	* 2016-12-22 上午11:05:09
 	 */
      public boolean getShippingStatus(Map<String,Object> params){
    	  boolean flag = false;
    	  Integer flag2 =  mapper.getShippingStatusForID(params);//查询所有发货单的状态
    	  if(flag2==0){
    		  flag = true;
    	  }
     	 return flag;
     }
      /**
       * 更新运单状态
      * @Description:
      * ShippingRegistrationService
      * updateShippingRegistrationForCancel
      * @param params void
      * @author chenlong
      * 2016-12-23 下午3:12:57
       */
      public void updateShippingRegistrationForCancel(Map<String,Object> params){
    	  mapper.updateShippingRegistrationForCancel(params);
      }
      /**
       * 取消一个运单
      * @Description:
      * ShippingRegistrationService
      * cancelShippingOne
      * @param params
      * @return String
      * @author chenlong
      * 2016-12-23 下午4:41:52
       */
      public  String cancelShippingOne(Map<String,Object> params){
    	  Map<String,Object> param = getShippingIdForNum(params);
    	  @SuppressWarnings("unchecked")
  		  List<DeStatusVo> list = (ArrayList<DeStatusVo>)(param.get("list"));
  		  if((param.get("message").toString()).equals("成功")){
  			params.put("deliver_state", 15);
  			for(Iterator<DeStatusVo> iterator = list.iterator();iterator.hasNext();){
  				DeStatusVo deStatusVo = iterator.next();				
  				if(deStatusVo.getDeliver_state() == 5){	//状态为待收货时进行删除	
  				  params.put("delivery_quantity", deStatusVo.getDelivery_quantity());//减去产量
  				  params.put("t_id", deStatusVo.getT_id());
  				  params.put("deliver_number", deStatusVo.getDeliver_number());
  				  taskDeliverGoodsService.updateCancelDertailvo(params);
  				  params.put("deliver_type", deStatusVo.getDeliver_type());
  			      taskService.updateProductSend(params);
  			      param.put("is_delete", 0);
  			      param.put("deliver_state", 5);
  			      param.put("shipping_state", 1);
  			      updateShippingRegistrationForCancel(param);
  			    }else{//状态为已取消时不进行操作			    	
  			    }
  			 }
  		  }
  		  return param.get("message").toString();	
      }
      /**
       * 检查当前运货单能否被取消
      * @Description:
      * ShippingRegistrationService
      * getShippingIdForNum
      * @param params
      * @return Map<String,Object>
      * @author chenlong
      * 2016-12-23 下午4:23:49
       */
      public Map<String,Object> getShippingIdForNum(Map<String,Object> params){
    	   String message = "成功";
    	    params.put("is_delete", 0);
    	    List<DeStatusVo> list =  mapper.getShippingIdForNum(params);
    	    boolean flag = true;
    	    if(list.get(0).getShipping_state()==1){
    	        flag = false;
    	    }
	  		Map<String,Object> param = new HashMap<String, Object>();
	  		for(Iterator<DeStatusVo> iterator = list.iterator();iterator.hasNext();){
	  			DeStatusVo deStatusVo = iterator.next();
	  			if(flag){
	  				if(deStatusVo.getDeliver_state() == 5){		  					
	  				}else if(deStatusVo.getDeliver_state() == 15){//存在已被取消的发货单
	  					    message="成功";
	  				}else{//存在已被收货消的发货单
	  					    message="发货单状态已改变!无法操作";
	  					    break;
	  				}
	  			}else{//存在已被收货消的运单
	  				   message="运单已被取消!无法操作";
	  				   break;
	  				}
	  		}	
	  		param.put("shipping_id", list.get(0).getShipping_id());
	  		param.put("message", message);
	  		param.put("list", list);
	  		return param;		    	  
	      }
}
