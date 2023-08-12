import * as z from 'zod';
import { string, object, boolean, TypeOf, record, any } from 'zod';


export const createPhoneOtpServiceSchema = object({
    body: object({
        countryCode: string({ required_error: 'Email is required' }),
        phoneNumber: string({ required_error: 'Phone number is required' })
    }).strict()
});

export const validatePhoneOtpServiceSchema = object({
    body: object({
        countryCode: string({ required_error: 'Email is required' }),
        phoneNumber: string({ required_error: 'Phone number is required' }),
        otp: string({ required_error: 'OTP is required' })
    }).strict()
});


export const createEmailOtpServiceSchema = object({
    body: object({
        email: string({ required_error: 'Email is required' }).email('Check your email')
    }).strict()
});


export const validateEmailOtpServiceSchema = object({
    body: object({
        email: string({ required_error: 'Email is required' }).email('Check your email'),
        otp: string({ required_error: 'OTP is required' })
    }).strict()
});

export type createPhoneOtpServiceType = TypeOf<typeof createPhoneOtpServiceSchema>
export type validatePhoneOtpServiceType = TypeOf<typeof validatePhoneOtpServiceSchema>
export type createEmailOtpServiceType = TypeOf<typeof createEmailOtpServiceSchema>
export type validateEmailOtpServiceType = TypeOf<typeof validateEmailOtpServiceSchema>
