var CurrencysUtil = [
					{currency_id: '1', currency_name: '人民币[RMB]'},
                    {currency_id: '2', currency_name: '港币[HKD]'},
                    {currency_id: '3', currency_name: '美元[USD]'},
                    {currency_id: '4', currency_name: '日元[JPY]'},
                    {currency_id: '5', currency_name: '德国马克[DEM]'},
                    {currency_id: '6', currency_name: '澳大利亚元[AUD]'},
                    {currency_id: '7', currency_name: '瑞士法郎[CHF]'},
                    {currency_id: '8', currency_name: '欧元[EUR]'},
                    {currency_id: '9', currency_name: '英镑[GBP]'},
                    {currency_id: '10', currency_name: '加拿大元[CAD]'},
                    {currency_id: '11', currency_name: '丹麦克朗[DKK]'},
                    {currency_id: '12', currency_name: '新加坡元[SGD]'},
                    {currency_id: '13', currency_name: '法国法郎[]'},
                    {currency_id: '14', currency_name: '意里拉[]'},
                    {currency_id: '15', currency_name: '瑞典克朗[]'},
                    {currency_id: '16', currency_name: '澳门元[]'},
                    {currency_id: '17', currency_name: '阿富汗尼[]'},
                    {currency_id: '18', currency_name: '新台币[TWD]'}
];


/**
 * 通过货币的ID获取货币名称
 * getCurrencyName
 * @param id 货币ID
 * @returns currency_name 货币名称
 * @author mishengliang
 * 2016-10-26 下午2:55:48
 */
function getCurrencyName(id){
	for(var i = 0; i < CurrencysUtil.length; i++){
		if(id == CurrencysUtil[i].currency_id){
			return CurrencysUtil[i].currency_name;
		}
	}
	return null;
}