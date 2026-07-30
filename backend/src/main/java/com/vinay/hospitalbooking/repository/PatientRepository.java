package com.vinay.hospitalbooking.repository;

import com.vinay.hospitalbooking.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {

}
