import { Router, Request, Response } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const userFiles = upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'licenseFile', maxCount: 1 }])

import validate from '../../middleware/validateResource';
import { createUserSchema } from '../../schema/user_schema/user.schema';
import { listUserSchema, registerUserSchema } from '../../schema/user_schema/register.schema';

const router = Router();

/**
 * @openapi
 * /:
 *   get:
 *     tags:
 *       - Server Status
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
*/

router.get("/", (req: Request, res: Response) => {
  const greeting = req.t('welcomeMessage');
  res.json({ message: greeting });
  // res.sendStatus(200)
});


/**
 * @openapi
 * '/register':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserSchema'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
*/



/**
  * @openapi
  * '/sendOtp/{id}':
  *  post:
  *     tags:
  *     - SendOtp
  *     summary: Get a one time otp by the id
  *     parameters:
  *      - name: id
  *        in: path
  *        description: The id of the request
  *        required: true
  *     responses:
  *       200:
  *         description: Success
  *         content:
  *          application/json:
  *           schema:
  *              $ref: ''
  *       404:
  *         description: id not found
*/


export default router;
