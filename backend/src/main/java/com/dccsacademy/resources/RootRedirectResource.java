package com.dccsacademy.resources;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

@Path("/")
public class RootRedirectResource {

    @GET
    public Response redirectToFrontend() {
        return Response.status(Response.Status.FOUND)
                .location(java.net.URI.create("/frontend/"))
                .build();
    }
}

