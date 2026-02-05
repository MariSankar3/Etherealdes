"use client"

import React from 'react'
import UserConfiguration from "../../Config/UserConfiguration"
import Button from '../../components/common/Button'
import { ChevronRight } from '../../components/icons/icons'
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useFormValidation } from '../../hooks/useFormValidation';
import { contactFormSchema } from '../../utils/validation';
import FormInput from '../../components/common/FormInput';
import PhoneInput from '../../components/common/PhoneInput';

function RightSecContent() {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        submitSuccess,
        submitError,
        setValue,
        watch,
        reset,
    } = useFormValidation(contactFormSchema, {
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const sendEmail = async (data) => {
        try {
            // Create a template parameters object for EmailJS
            const templateParams = {
                from_name: data.name,
                from_email: data.email,
                from_phone: data.phone,
                message: data.message,
            };

            await emailjs.send(
                "service_4cn6arm",
                "template_0owxl3h",
                templateParams,
                {
                    publicKey: "lMaCjBmij1WCF-sA2",
                }
            );

            console.log('SUCCESS!');
            return Promise.resolve();
        } catch (error) {
            console.log('FAILED...', error);
            throw new Error(error.text || 'Failed to send email');
        }
    };

    const onSubmit = handleSubmit(sendEmail);

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const formColors = {
        borderColor: "#9CA3AF",
        focusBorderColor: "#9CA3AF",
        textColor: "#FFFFFF",
        placeholderColor: "#9CA3AF",
        errorBgColor: "#111111",
        errorTextColor: "#F87171",
        countryArrowColor: "#D1A000",
    }

    return (
        <section
        aria-labelledby="contact-heading"
         itemScope
         itemType="https://schema.org/ProfessionalService"
         className='h-full'>
          <meta itemProp="name" content="Ethereal Design Studio" />
<meta itemProp="email" content="hello@etherealdesign.io" />
<meta itemProp="serviceType" content="Design Studio" />

          <h2 id="contact-heading" className="sr-only">
  Contact Ethereal Design Studio
</h2>
<h3 className="sr-only">
  Get in touch with our design studio
</h3>
<p id="contact-desc" className="sr-only">
  Use this form to contact our design studio about your project.
</p>


            <div className='flex flex-col md:border-l border-[#4E4E4E] p-[24px] md:p-[20px] md:px-[60px] md:gap-[20px] flex-1 h-[95%] justify-between'>
                {/* Success Message */}
                {submitSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-500 text-white p-4 rounded-lg mb-4 border-2 border-green-400 shadow-lg"
                    >
                        Your email has been sent successfully!
                    </motion.div>
                )}

                {/* Error Message */}
                {submitError && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500 text-white p-4 rounded-lg mb-4 border-2 border-red-400 shadow-lg"
                    >
                        {submitError}
                    </motion.div>
                )}

                <motion.form
                    onSubmit={onSubmit}
                    className='flex flex-col gap-[20px]'
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p
                        className='uppercase text-[26px] font-anton'
                        variants={fadeUp}
                    >
                        Lets HAVE COFFEE!
                    </motion.p>
                    <motion.div
                        className='relative flex flex-col gap-[10px] text-[32px] font-antonio font-[100] text-[#ffffff80]'
                        variants={staggerContainer}
                    >
                        {/* Name Input */}
                        <FormInput
                            name='name'
                            placeholder="Full name"
                            {...register('name')}
                            error={errors.name?.message}
                            required
                            variants={fadeUp}
                            className="placeholder:text-gray-400 focus:border-yellow-500"
                            {...formColors}
                        />

                        {/* Email Input */}
                        <FormInput
                            name='email'
                            type="email"
                            placeholder="Contact mail ID"
                            {...register('email')}
                            error={errors.email?.message}
                            required
                            variants={fadeUp}
                            className="placeholder:text-gray-400 focus:border-yellow-500"
                            {...formColors}
                        />

                        {/* Phone Input */}
                        <PhoneInput
                            value={watch('phone')}
                            onChange={(value) => setValue('phone', value)}
                            error={errors.phone?.message}
                            required
                            variants={fadeUp}
                            className="placeholder:text-gray-400"
                            {...formColors}
                            defaultCountry="IN"
                            dropdownBg="#0B0B0B"
                            dropdownBorder="#4F4E4E"
                            dropdownText="#FFFFFF"
                            dropdownHoverBg="rgba(255,255,255,0.06)"
                            dropdownSelectedBg="rgba(255,255,255,0.10)"
                        />

                        {/* Message Input */}
                        <FormInput
                            name='message'
                            type="textarea"
                            placeholder="Message"
                            {...register('message')}
                            error={errors.message?.message}
                            required
                            variants={fadeUp}
                            className="placeholder:text-gray-400 focus:border-yellow-500"
                            {...formColors}
                        />

                        <div className='absolute bottom-4 right-0'>
                            <Button type='submit' disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#74F125]"></div>
                                ) : (
                                    <ChevronRight className='text-[#74F125]' />
                                )}
                            </Button>
                        </div>
                    </motion.div>
                </motion.form>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.a
                        href="mailto:hello@etherealdesign.io"
                        className='font-antonio text-center font-thin hidden md:block sm:text-[40px] md:text-[42px] lg:text-[60px] xl:text-[76px] 2xl:text-[80px] opacity-50'
                        variants={fadeUp}
                    >
                        hello@etherealdesign.io
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}

export default RightSecContent