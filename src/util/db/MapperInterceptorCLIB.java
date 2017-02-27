package util.db;

import java.lang.reflect.Method;

import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

public class MapperInterceptorCLIB implements MethodInterceptor {

	@Override
	public Object intercept(Object arg0, Method arg1, Object[] arg2,
			MethodProxy mProxy) throws Throwable {
		// TODO Auto-generated method stub
		return mProxy.invoke(arg0, arg2);
	}

}
