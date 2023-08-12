import * as z from 'zod';
import { string, object, boolean, TypeOf, record, any } from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserSchema:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: User's email address
 *        password:
 *          type: string
 *          description: User's password
 *        confirmPassword:
 *          type: string
 *          description: User's password confirmation
 *        passwordConfirmation:
 *          type: string
 *          default: stringPassword123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
*/


export const createUserSchema = object({
  body: object({
    emailId: string({
      required_error: 'Email is required'
    }).email('Not a valid email'),
    password: string({
      required_error: 'password is required'
    }),
    confirmPassword: string({
      required_error: 'password is required'
    }),
    isEmailVerified: z.boolean().default(false),
    isPhoneNumberVerified: z.boolean().default(false),
    termsAndConditions: boolean({ required_error: 'User must accept terms and conditions' }).default(true),
    healthProfessionalDetails: object({
      accountStatus: z.enum(['Active', 'Disable']).default('Active'),
      countryCode: z.string({
        required_error: 'Country code required'
      }).regex(/^\+[1-9]\d{1,4}$/, 'Not a valid country code'),
      subscriptionStatus: z.enum(['Active', 'Cancelled', 'Pending', 'Not Started']).default('Not Started'),
      gender: z.enum(['Male', 'Female', 'Other']).default('Other'),
      subscriptionId: z.string().optional(),
      firstName: string({
        required_error: 'firstName is required'
      }),
      lastName: string({
        required_error: 'lastName is required'
      }),
      affiliationAs: z.enum(['Doctor', 'Others']).default('Doctor'),
      licenseNumber: z.string({
        required_error: 'licenseNumber is must required'
      }),
      profilePicturePath: z.string().optional(),
      phoneNumber: string()
        .regex(/^\d{8,14}$/, 'Not a valid phone number')
        .optional(),
      subscribeNewsletter: boolean().default(true),
    }),
    typeOfuser: z.enum(['other', 'clinic', 'hospital']),
    clinicDetails: object({}).optional(),
    hospitalDetails: object({}).optional(),

  }).strict()
    .refine((data) => {
      if (data.typeOfuser === 'other') {
        return !('clinicDetails' in data) && !('hospitalDetails' in data);
      }
      return true;
    }, {
      message: 'Invalid field: clinicDetails or hospitalDetails',
      path: ['clinicDetails', 'hospitalDetails']
    })
    .refine((data) => {
      if (data.typeOfuser === 'clinic') {
        return !('hospitalDetails' in data);
      }
      return true

    }, {
      message: 'clinicDetails are required',
      path: ['clinicDetails']
    })
    .refine((data) => {
      if (data.typeOfuser === 'hospital') {
        return !('clinicDetails' in data)
      }
      return true

    }, {
      message: 'hospital are required',
      path: ['hospitalDetails']
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword']
    })

});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body']



