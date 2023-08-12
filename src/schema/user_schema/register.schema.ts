import * as z from 'zod';
import { string, object, boolean, TypeOf, record, any } from 'zod';


export const registerUserSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required'
        }).email('Not a valid email'),
        password: string({
            required_error: 'password is required'
        }),
        confirmPassword: string({
            required_error: 'password is required'
        }),
        phoneNumber: string()
            .regex(/^\+[1-9]\d{1,10}$/, 'Not a valid phone number')
            .optional(),
        displayName: string({
            required_error: 'displayName is required'
        }),
        emailVerified: z.boolean().default(false),
        termsAndConditions: boolean({ required_error: 'User must accept terms and conditions' }).default(true),
        photoURL: string().default('https://patient.upchaarnepal.com/assets/hero_content/doctor_pic.png'),

    }).strict()
        .refine((data) => data.password === data.confirmPassword, {
            message: 'Passwords do not match',
            path: ['confirmPassword']
        })

});

export const listUserSchema = object({
    body: object({
        maxResults: z.number({
            required_error: 'maxResults is required'
        }).default(50),
        pageToken: z.string({
            required_error: 'pageToken is required'
        }).default('0')
    }).strict()
});

export type RegisterUserPayload = Omit<TypeOf<typeof registerUserSchema>, 'body.confirmPassword'>;

export type listUserSchemaPayload = TypeOf<typeof listUserSchema>;


