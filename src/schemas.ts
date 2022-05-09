import { FastifyRequest, RequestGenericInterface } from "fastify";

export interface find extends RequestGenericInterface {
    Querystring: {
        first_name?: string,
        last_name?: string,
        email?: string,
        phone?: string
    };
}

export type addElement = FastifyRequest<{
    Body: {
        first_name: string,
        last_name: string,
        email: string,
        phone: string,
        blacklisted: boolean,
        last_edit: string,
    }
}>

