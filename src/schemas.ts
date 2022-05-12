import { FastifyRequest, RequestGenericInterface } from "fastify";

export interface find extends RequestGenericInterface {
    Querystring: {
        first_name?: string,
        last_name?: string,
        email?: string,
        phone?: string
    };
}

export interface addElement extends RequestGenericInterface {
    Body: {
        first_name: string,
        last_name: string,
        email: string,
        phone: string,
        is_blocked: boolean,
        last_edited_by: string,
    }
}

export interface patchElement extends RequestGenericInterface {
    Querystring: {
        id: string;
    }
    Body: {
        is_blocked?: boolean,
        last_edited_by?: string,
        id: string
    }
}

export interface deleteElement extends RequestGenericInterface {
    Querystring: {
        id: string
    }
}