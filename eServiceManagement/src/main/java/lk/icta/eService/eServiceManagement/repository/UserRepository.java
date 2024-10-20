package lk.icta.eService.eServiceManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lk.icta.eService.eServiceManagement.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	User findByUserName(String userName);

}
