package com.vinay.hospitalbooking.service;

import com.vinay.hospitalbooking.exception.DoctorDeletionException;
import com.vinay.hospitalbooking.exception.ResourceNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import com.vinay.hospitalbooking.entity.Doctor;
import com.vinay.hospitalbooking.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;
    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public Doctor addDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }


    public void deleteDoctor(Long id) {

        if (!doctorRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Doctor not found with id: " + id
            );
        }

        try {
            doctorRepository.deleteById(id);

        } catch (DataIntegrityViolationException e) {

            throw new DoctorDeletionException(
                    "Cannot delete doctor because appointments exist."
            );
        }
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {

        Doctor doctor = doctorRepository.findById(id).orElse(null);

        if (doctor == null) {
            return null;
        }

        doctor.setName(updatedDoctor.getName());
        doctor.setSpecialization(updatedDoctor.getSpecialization());
        doctor.setPhone(updatedDoctor.getPhone());
        doctor.setEmail(updatedDoctor.getEmail());

        return doctorRepository.save(doctor);
    }

}
