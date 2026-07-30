package com.vinay.hospitalbooking.repository;

import com.vinay.hospitalbooking.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}