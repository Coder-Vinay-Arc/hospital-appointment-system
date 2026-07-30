package com.vinay.hospitalbooking.service;

import com.vinay.hospitalbooking.dto.AppointmentRequest;
import com.vinay.hospitalbooking.entity.Appointment;
import com.vinay.hospitalbooking.entity.Doctor;
import com.vinay.hospitalbooking.entity.Patient;
import com.vinay.hospitalbooking.exception.ResourceNotFoundException;
import com.vinay.hospitalbooking.repository.AppointmentRepository;
import com.vinay.hospitalbooking.repository.DoctorRepository;
import com.vinay.hospitalbooking.repository.PatientRepository;
import org.springframework.stereotype.Service;
import com.vinay.hospitalbooking.exception.ResourceNotFoundException;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              DoctorRepository doctorRepository,
                              PatientRepository patientRepository) {

        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }

    public Appointment bookAppointment(AppointmentRequest request) {

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found"));

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        Appointment appointment = new Appointment();

        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setStatus(request.getStatus());

        appointment.setDoctor(doctor);
        appointment.setPatient(patient);

        return appointmentRepository.save(appointment);
    }
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Appointment not found"));
    }
}