/*省市区三级数据操作类
 *var proTest=getProvinceByCity("杭州市"); //浙江省
	var codeTest=getCityCodeByCityName("杭州市"); //330100
	var nameTest=getCityNameByCityCode("330521");//德清县
 * 
 * */

/*
 * 加载数据json对象js文件，必须的
 * create by yangliping
 * 2016-6-20 10:42:46
 * */
$(function(){
	$("body").prepend("<script type='text/javascript' src='/newresources/js/cityJsonData.js'></script>");
});
/*根据城市名获取省份名称
 * create by yangliping
 * 2016-6-20 10:41:30
 * */
function getProvinceByCity(cityname)
{
	var pro;
	var provalue;
	if(isDataReady())
	{
	
		$.each(ChineseDistricts,function(key,value){
			$.each(value,function(code,address){
				if(address==cityname)
				{
					//console.log("key:"+key);
					pro=key;
					return;
				}
			});
			
		});
		$.each(ChineseDistricts[86],function(key,value){
			if(key==pro)
			{
				//console.log("pro:"+value);
				provalue=value;
				return;
			}
		});
	}
	return provalue;
}

/*
 * 根据城市代码获取城市名称
 * yangliping
 * 2016-6-20 10:40:59
 * */
function getCityNameByCityCode(code)
{
	var return_name;
	if(isDataReady())
	{
		var pro=ChineseDistricts[86];
		$.each(pro,function(key,value){
			if(key==code)
			{
				return_name=value;
				return;
			}
			else
			{
				if($.isPlainObject(ChineseDistricts[key]))
				{
					var city=ChineseDistricts[key];
					$.each(city,function(key2,value2){
						if(key2==code)
						{
							return_name=value2;
							return;
						}
						else
						{
							if($.isPlainObject(ChineseDistricts[key2]))
							{
								var country=ChineseDistricts[key2];
								$.each(country,function(key3,value3){
									if(key3==code)
									{
										return_name=value3;
										return;
									}
								});
							}
						}
					});
				}
			}
		});
	}
	return return_name;
}

/*
 * 根据中文地名获取区域编号
 * create by yangliping
 * 2016-6-20 10:40:20
 */
function getCityCodeByCityName(address){
	var return_code;
	
	if(isDataReady())
	{
		//console.log("地址参数："+address);
		$.each(ChineseDistricts,function(key,value){
			if(value==address)
			{
				return_code=key;
				//console.log("一层");
				return;
			}
			else
			{
				if($.isPlainObject(ChineseDistricts[key]))
				{
					var cityData=ChineseDistricts[key];
					$.each(cityData,function(key2,value2){
						
						if(value2==address)
						{
							return_code=key2;
							//console.log("二层");
							return;
						}
						else
						{
							if($.isPlainObject(ChineseDistricts[key2]))
							{
								var countryData=ChineseDistricts[key2];
								$.each(countryData,function(key3,value3){
									if(value3==address)
									{
									return_code=key3;
									//console.log("三层");
									return;
									}
								});
							}
						}
					});
				}
			}
		});
		
	}
	return return_code;
}
/*
 * 数据是否正确加载
 * create by yangliping
 * 2016-6-20 10:39:50
 * */
function isDataReady(){
	if(typeof ChineseDistricts === 'undefined')
	{
		throw new Error('The file "cityJsonData.js" must be included first!');
		return false;
	}
	else
	return true;
}


/**
 * 根据城市代码获取 省份+城市+地区 字符串
 * getCityAndProvStrByCode
 * @param cityCode  地区编码
 * @returns any
 * @author mishengliang
 * 2016-12-6 下午3:48:02
 */
function getCityAndProvStrByCode(cityCode){
	var str = "";
	if(cityCode != null && cityCode != undefined){
		var provinceName = getCityNameByCityCode(parseInt(cityCode/10000)*10000);
		var cityName = getCityNameByCityCode(parseInt(cityCode/100)*100);
		var districtName = getCityNameByCityCode(parseInt(cityCode));
		str = provinceName+cityName+districtName;
	}
	return str;
}