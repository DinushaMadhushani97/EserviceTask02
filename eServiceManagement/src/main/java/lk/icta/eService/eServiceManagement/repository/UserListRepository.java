package lk.icta.eService.eServiceManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lk.icta.eService.eServiceManagement.entity.User;
import lk.icta.eService.eServiceManagement.entity.UserList;

@Repository
public interface UserListRepository extends JpaRepository<UserList, Long>{

//	UserList save(UserList userList);

}
