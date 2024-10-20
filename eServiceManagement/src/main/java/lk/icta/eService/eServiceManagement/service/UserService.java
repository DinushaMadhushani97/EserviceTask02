package lk.icta.eService.eServiceManagement.service;

import lk.icta.eService.eServiceManagement.entity.User;

public interface UserService {
	
	//register new user
    User registerUser(User user);
    //
    User loginUser(User user);
}
