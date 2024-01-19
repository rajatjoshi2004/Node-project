const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
const { Pool } = require('pg');
const multer = require('multer');



dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    // PG_USER: Joi.string().required(),
    // PG_HOST: Joi.string().required(),
    // PG_DATABASE: Joi.string().required(),
    // PG_PASSWORD: Joi.string().required(),
    // PG_PORT: Joi.string().required(),
    DATABASE_URL: Joi.string().required(),
    // MONGOPG_URL: Joi.string().required().description('Mongo DB url'),
    // JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    FIREBASE_TOPIC_FOR_ALL: Joi.string().description('Firebase topic string for all is required'),
    REFERRAL_POINTS_TO_REFERRER: Joi.number().description('Referral point to be given to referrer is required'),
    REFERRAL_POINTS_TO_REFEREE: Joi.number().description('Referral point to be given to referee is required'),
    AMOUNT_PER_REFERRAL_POINT: Joi.number().description('Amount to be given to per referral point'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const connectionString = envVars.DATABASE_URL;

const db = new Pool({ connectionString });

const excelFilter = (req, file, cb) => {
  if (file.mimetype.includes('excel') || file.mimetype.includes('spreadsheetml')) {
    cb(null, true);
  } else {
    cb('Please upload only excel file.', false);
  }
};
/** permanet storage for excel file of app for data  */
const excelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `src/uploads/imports`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-import-${file.originalname}`);
  },
});
/** temp storage for media/assets of app  */

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/temp/');
  },
  filename(req, file, cb) {
    const fileExt = file.originalname.split('.');
    cb(null, `${Date.now()}.${fileExt[fileExt.length - 1]}`);
  },
});
const multerUpload = multer({ storage });
const multerUploadExcel = multer({ storage: excelStorage, fileFilter: excelFilter });

module.exports = {
  env: envVars.NODE_ENV,
  defaultTopic: envVars.FIREBASE_TOPIC_FOR_ALL,
  frontEndUrl: envVars.FRONTEND_URL,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  baseURL: `http://localhost:${envVars.PORT}`,
  db,
  multerUpload,
  multerUploadExcel,
  referralPointsToReferrer: envVars.REFERRAL_POINTS_TO_REFERRER,
  referralPointsToReferee: envVars.REFERRAL_POINTS_TO_REFEREE,
  amountPerReferralPoint: envVars.AMOUNT_PER_REFERRAL_POINT,
};
