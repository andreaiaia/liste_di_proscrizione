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
        is_blocked: boolean,
        last_editor: string,
    }
}>

export interface patchElement extends RequestGenericInterface {
    Querystring: {
        id: string;
    }
    Body: {
        first_name?: string,
        last_name?: string,
        email?: string,
        phone?: string,
        is_blocked?: boolean,
        last_editor?: string,
    }
}

// export type patchElement = FastifyRequest<{
// }>