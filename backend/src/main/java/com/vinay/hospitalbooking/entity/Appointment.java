package com.vinay.hospitalbooking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import com.vinay.hospitalbooking.entity.Doctor;
import com.vinay.hospitalbooking.entity.Patient;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "appointments")

public class Appointment {

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private LocalDate appointmentDate;

    private LocalTime appointmentTime;

    private String status;

}
