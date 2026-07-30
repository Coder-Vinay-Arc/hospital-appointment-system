package com.vinay.hospitalbooking.repository;

import com.vinay.hospitalbooking.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

}
