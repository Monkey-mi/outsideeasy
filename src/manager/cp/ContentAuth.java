package manager.cp;


import java.util.Map;

import manager.cp.AuthProxy.AuthSignature;


public interface ContentAuth {
   public void invoke(AuthSignature target,Map<String,Object> param);
}	
