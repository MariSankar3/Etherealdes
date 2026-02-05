import { z } from 'zod';

// Phone number validation with international support
export const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid international phone number')
  .transform((val) => {
    // Ensure it starts with + for international format
    if (val && !val.startsWith('+')) {
      return `+${val}`;
    }
    return val;
  });

// Email validation
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .toLowerCase()
  .trim();

// Name validation
export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
  .transform((val) => val.trim());

// Message validation
export const messageSchema = z
  .string()
  .min(1, 'Message is required')
  .min(10, 'Message must be at least 10 characters')
  .max(1000, 'Message must be less than 1000 characters')
  .transform((val) => val.trim());

// Contact form schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  message: messageSchema,
});

// Company name validation (for business forms)
export const companyNameSchema = z
  .string()
  .min(1, 'Company name is required')
  .min(2, 'Company name must be at least 2 characters')
  .max(100, 'Company name must be less than 100 characters')
  .transform((val) => val.trim());

// Project type validation
export const projectTypeSchema = z.enum([
  'web-development',
  'mobile-app',
  'ui-ux-design',
  'marketing',
  'api-backend',
  'chatbot',
  'other'
], {
  errorMap: () => ({ message: 'Please select a valid project type' })
});

// Budget range validation
export const budgetRangeSchema = z.enum([
  'under-10k',
  '10k-25k',
  '25k-50k',
  '50k-100k',
  'over-100k'
], {
  errorMap: () => ({ message: 'Please select a valid budget range' })
});

// Timeline validation
export const timelineSchema = z.enum([
  'asap',
  '1-2-weeks',
  '1-month',
  '2-3-months',
  '3-6-months',
  'flexible'
], {
  errorMap: () => ({ message: 'Please select a valid timeline' })
});

// Extended contact form schema for business inquiries
export const businessContactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  company: companyNameSchema.optional(),
  projectType: projectTypeSchema.optional(),
  budget: budgetRangeSchema.optional(),
  timeline: timelineSchema.optional(),
  message: messageSchema,
});

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: emailSchema,
});

// Search form schema
export const searchFormSchema = z.object({
  query: z
    .string()
    .min(1, 'Search query is required')
    .min(2, 'Search query must be at least 2 characters')
    .max(100, 'Search query must be less than 100 characters')
    .transform((val) => val.trim()),
});

// Validation error helper
export const getValidationError = (error) => {
  if (error?.message) {
    return error.message;
  }
  return 'Invalid input';
};

// Phone number formatting helper
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  
  // Remove all non-digit characters except +
  const cleaned = phoneNumber.replace(/[^\d+]/g, '');
  
  // Ensure it starts with +
  if (cleaned && !cleaned.startsWith('+')) {
    return `+${cleaned}`;
  }
  
  return cleaned;
};

// Country codes for phone input (popular countries)
export const countryCodes = [
  { code: '+91', country: 'IN', name: 'India' },
  { code: '+1', country: 'US', name: 'United States' },
  { code: '+44', country: 'GB', name: 'United Kingdom' },
  { code: '+61', country: 'AU', name: 'Australia' },
  { code: '+86', country: 'CN', name: 'China' },
  { code: '+81', country: 'JP', name: 'Japan' },
  { code: '+49', country: 'DE', name: 'Germany' },
  { code: '+33', country: 'FR', name: 'France' },
  { code: '+39', country: 'IT', name: 'Italy' },
  { code: '+34', country: 'ES', name: 'Spain' },
  { code: '+31', country: 'NL', name: 'Netherlands' },
  { code: '+46', country: 'SE', name: 'Sweden' },
  { code: '+47', country: 'NO', name: 'Norway' },
  { code: '+45', country: 'DK', name: 'Denmark' },
  { code: '+358', country: 'FI', name: 'Finland' },
  { code: '+41', country: 'CH', name: 'Switzerland' },
  { code: '+43', country: 'AT', name: 'Austria' },
  { code: '+32', country: 'BE', name: 'Belgium' },
  { code: '+351', country: 'PT', name: 'Portugal' },
  { code: '+353', country: 'IE', name: 'Ireland' },
  { code: '+48', country: 'PL', name: 'Poland' },
  { code: '+420', country: 'CZ', name: 'Czech Republic' },
  { code: '+36', country: 'HU', name: 'Hungary' },
  { code: '+30', country: 'GR', name: 'Greece' },
  { code: '+7', country: 'RU', name: 'Russia' },
  { code: '+380', country: 'UA', name: 'Ukraine' },
  { code: '+55', country: 'BR', name: 'Brazil' },
  { code: '+52', country: 'MX', name: 'Mexico' },
  { code: '+54', country: 'AR', name: 'Argentina' },
  { code: '+56', country: 'CL', name: 'Chile' },
  { code: '+57', country: 'CO', name: 'Colombia' },
  { code: '+58', country: 'VE', name: 'Venezuela' },
  { code: '+51', country: 'PE', name: 'Peru' },
  { code: '+593', country: 'EC', name: 'Ecuador' },
  { code: '+595', country: 'PY', name: 'Paraguay' },
  { code: '+598', country: 'UY', name: 'Uruguay' },
  { code: '+591', country: 'BO', name: 'Bolivia' },
  { code: '+27', country: 'ZA', name: 'South Africa' },
  { code: '+234', country: 'NG', name: 'Nigeria' },
  { code: '+254', country: 'KE', name: 'Kenya' },
  { code: '+20', country: 'EG', name: 'Egypt' },
  { code: '+212', country: 'MA', name: 'Morocco' },
  { code: '+216', country: 'TN', name: 'Tunisia' },
  { code: '+213', country: 'DZ', name: 'Algeria' },
  { code: '+971', country: 'AE', name: 'United Arab Emirates' },
  { code: '+966', country: 'SA', name: 'Saudi Arabia' },
  { code: '+972', country: 'IL', name: 'Israel' },
  { code: '+90', country: 'TR', name: 'Turkey' },
  { code: '+98', country: 'IR', name: 'Iran' },
  { code: '+92', country: 'PK', name: 'Pakistan' },
  { code: '+880', country: 'BD', name: 'Bangladesh' },
  { code: '+94', country: 'LK', name: 'Sri Lanka' },
  { code: '+95', country: 'MM', name: 'Myanmar' },
  { code: '+66', country: 'TH', name: 'Thailand' },
  { code: '+84', country: 'VN', name: 'Vietnam' },
  { code: '+65', country: 'SG', name: 'Singapore' },
  { code: '+60', country: 'MY', name: 'Malaysia' },
  { code: '+63', country: 'PH', name: 'Philippines' },
  { code: '+62', country: 'ID', name: 'Indonesia' },
  { code: '+82', country: 'KR', name: 'South Korea' },
  { code: '+852', country: 'HK', name: 'Hong Kong' },
  { code: '+886', country: 'TW', name: 'Taiwan' },
  { code: '+853', country: 'MO', name: 'Macau' },
  { code: '+856', country: 'LA', name: 'Laos' },
  { code: '+855', country: 'KH', name: 'Cambodia' },
  { code: '+977', country: 'NP', name: 'Nepal' },
  { code: '+975', country: 'BT', name: 'Bhutan' },
  { code: '+960', country: 'MV', name: 'Maldives' },
  { code: '+93', country: 'AF', name: 'Afghanistan' },
  { code: '+992', country: 'TJ', name: 'Tajikistan' },
  { code: '+996', country: 'KG', name: 'Kyrgyzstan' },
  { code: '+998', country: 'UZ', name: 'Uzbekistan' },
  { code: '+994', country: 'AZ', name: 'Azerbaijan' },
  { code: '+374', country: 'AM', name: 'Armenia' },
  { code: '+995', country: 'GE', name: 'Georgia' },
  { code: '+373', country: 'MD', name: 'Moldova' },
  { code: '+371', country: 'LV', name: 'Latvia' },
  { code: '+372', country: 'EE', name: 'Estonia' },
  { code: '+370', country: 'LT', name: 'Lithuania' },
  { code: '+375', country: 'BY', name: 'Belarus' },
  { code: '+381', country: 'RS', name: 'Serbia' },
  { code: '+387', country: 'BA', name: 'Bosnia and Herzegovina' },
  { code: '+389', country: 'MK', name: 'North Macedonia' },
  { code: '+385', country: 'HR', name: 'Croatia' },
  { code: '+386', country: 'SI', name: 'Slovenia' },
  { code: '+421', country: 'SK', name: 'Slovakia' },
  { code: '+40', country: 'RO', name: 'Romania' },
  { code: '+359', country: 'BG', name: 'Bulgaria' },
].sort((a, b) => {
  // Keep India at the top, then sort the rest alphabetically
  if (a.country === 'IN') return -1;
  if (b.country === 'IN') return 1;
  return a.name.localeCompare(b.name);
});

// Default country code (can be set based on user's location)
export const getDefaultCountryCode = () => {
  // You can implement geolocation detection here
  // For now, return India as default
  return '+91';
};
