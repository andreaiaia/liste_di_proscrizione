export const find = {
    type: 'object',
    properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        phone: { type: 'string', pattern: '[0-9]{15}' },
    }
}

export const addElement = {
    type: 'object',
    required: ['first_name', 'last_name', 'email', 'phone', 'blacklisted', 'last_edit'],
    properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        phone: { type: 'string', pattern: '[0-9]{15}' },
        blacklisted: { type: 'boolean' },
        last_edit: { type: 'string' },
    }
}

