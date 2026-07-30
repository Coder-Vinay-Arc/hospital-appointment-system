package com.vinay.hospitalbooking.service;

import com.vinay.hospitalbooking.entity.Patient;
import com.vinay.hospitalbooking.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    // Add Patient
    public Patient addPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // Get All Patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Get Patient By ID
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElse(null);
    }

    // Update Patient
    public Patient updatePatient(Long id, Patient updatedPatient) {

        Patient patient = patientRepository.findById(id).orElse(null);

        if (patient == null) {
            return null;
        }

        patient.setName(updatedPatient.getName());
        patient.setAge(updatedPatient.getAge());
        patient.setGender(updatedPatient.getGender());
        patient.setPhone(updatedPatient.getPhone());

        return patientRepository.save(patient);
    }

    // Delete Patient
    public String deletePatient(Long id) {

        if (patientRepository.existsById(id)) {
            patientRepository.deleteById(id);
            return "Patient deleted successfully";
        }

        return "Patient not found";
    }
}