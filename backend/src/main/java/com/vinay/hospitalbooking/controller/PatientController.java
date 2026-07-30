package com.vinay.hospitalbooking.controller;

import com.vinay.hospitalbooking.entity.Patient;
import com.vinay.hospitalbooking.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    // Get All Patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    // Get Patient By ID
    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    // Add Patient
    @PostMapping
    public Patient addPatient(@Valid @RequestBody Patient patient) {
        return patientService.addPatient(patient);
    }

    // Update Patient
    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable Long id,
                                 @Valid @RequestBody Patient patient) {

        return patientService.updatePatient(id, patient);
    }

    // Delete Patient
    @DeleteMapping("/{id}")
    public String deletePatient(@PathVariable Long id) {
        return patientService.deletePatient(id);
    }
}