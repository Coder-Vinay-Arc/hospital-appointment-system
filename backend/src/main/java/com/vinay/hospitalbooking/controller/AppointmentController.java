package com.vinay.hospitalbooking.controller;

import com.vinay.hospitalbooking.dto.AppointmentRequest;
import com.vinay.hospitalbooking.entity.Appointment;
import com.vinay.hospitalbooking.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    public Appointment bookAppointment(@Valid @RequestBody AppointmentRequest request) {
        return appointmentService.bookAppointment(request);
    }
}