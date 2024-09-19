package com.dccsacademy.resources;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;

import java.net.URI;

@Path("/frontend")
public class FrontendResource {

    @GET
    @Path("{path: .*}")
    public Response getFrontend(@PathParam("path") String path) {

        if (!path.isEmpty() && !Character.isLetterOrDigit(path.charAt(0))) {
            return Response.seeOther(URI.create("/frontend")).build();
        }

        return Response.ok(getClass().getResourceAsStream("/META-INF/resources/frontend/index.html"))
                .status(Response.Status.OK)
                .build();
    }
}

