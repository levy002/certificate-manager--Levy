package com.dccsacademy.resources;

import com.dccsacademy.dtos.DepartmentDto;
import com.dccsacademy.services.DepartmentService;
import com.dccsacademy.utils.ResponseBuilder;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/backend/api/v1/departments")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DepartmentResource {

    @Inject
    DepartmentService departmentService;

    @GET
    public Response getDepartments() {
        try{
            List<DepartmentDto> departments = departmentService.getDepartments();
            return ResponseBuilder.buildSuccessResponse("Departments retrieved successfully", departments, Response.Status.OK);
        } catch(Exception e) {
            return ResponseBuilder.buildErrorResponse(e.getMessage(), Response.Status.BAD_REQUEST);
        }
    }

    @GET
    @Path("/{id}")
    public Response getDepartmentById(@PathParam("id") Long id) {
        try {
            DepartmentDto department = departmentService.getDepartmentById(id);
            return ResponseBuilder.buildSuccessResponse("Department retrieved successfully", department, Response.Status.OK);
        } catch (EntityNotFoundException e) {
            return ResponseBuilder.buildErrorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        }
    }

    @POST
    public Response createDepartment(DepartmentDto departmentDto) {
        try {
            DepartmentDto createdDepartment = departmentService.createDepartment(departmentDto);
            return ResponseBuilder.buildSuccessResponse("Department created successfully", createdDepartment, Response.Status.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseBuilder.buildErrorResponse(e.getMessage(), Response.Status.BAD_REQUEST);
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateDepartment(@PathParam("id") Long id, DepartmentDto departmentDto) {
        try {
            DepartmentDto updatedDepartment = departmentService.updateDepartment(id, departmentDto);
            return ResponseBuilder.buildSuccessResponse("Department updated successfully", updatedDepartment, Response.Status.OK);
        } catch (EntityNotFoundException e) {
            return ResponseBuilder.buildErrorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            return ResponseBuilder.buildErrorResponse(e.getMessage(), Response.Status.BAD_REQUEST);
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteDepartment(@PathParam("id") Long id) {
        try {
            departmentService.deleteDepartment(id);
            return ResponseBuilder.buildSuccessResponse("Department deleted successfully", null, Response.Status.NO_CONTENT);
        } catch (EntityNotFoundException e) {
            return ResponseBuilder.buildErrorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        }
    }
}

