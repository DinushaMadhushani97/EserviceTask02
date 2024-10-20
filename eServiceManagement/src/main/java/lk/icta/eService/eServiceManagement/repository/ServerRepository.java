package lk.icta.eService.eServiceManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lk.icta.eService.eServiceManagement.entity.Server;


@Repository
public interface ServerRepository extends JpaRepository<Server, Long>{

}
