package lk.icta.eService.eServiceManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lk.icta.eService.eServiceManagement.entity.Resource;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {

}
