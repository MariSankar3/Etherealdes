"use client";

import { ChevronRight } from "../../components/icons/icons";
import Button from "../../components/common/Button";
import React from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useFormValidation } from "../../hooks/useFormValidation";
import { contactFormSchema } from "../../utils/validation";
import FormInput from "../../components/common/FormInput";
import PhoneInput from "../../components/common/PhoneInput";

/* Animations */
const container = {
  hidden: { opacity: 0, x: 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const formColors = {
  borderColor: "#121212",
  focusBorderColor: "#121212",
  textColor: "#FFFFFF",
  placeholderColor: "#121212",
  errorBgColor: "#FFFFFF",
  errorTextColor: "#B91C1C",
  countryArrowColor: "#fff",
};

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
  } = useFormValidation(contactFormSchema, {
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const sendEmail = async (data) => {
    try {
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
        { publicKey: "lMaCjBmij1WCF-sA2" }
      );

      return Promise.resolve();
    } catch (error) {
      throw new Error(error.text || "Failed to send email");
    }
  };

  const onSubmit = handleSubmit(sendEmail);

  return (
    <motion.div
      className="hidden sm:flex flex-col p-[16px] md:px-[40px] md:gap-[14px] md:w-full min-h-[75vh]"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Heading */}
      <motion.p
        className="uppercase text-[20px] font-anton"
        variants={item}
      >
        Lets HAVE COFFEE!
      </motion.p>

      {/* Success */}
      {submitSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white text-[#ff4e21] p-3 rounded-md mb-3 border border-white"
        >
          Your email has been sent successfully!
        </motion.div>
      )}

      {/* Error */}
      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white text-red-600 p-3 rounded-md mb-3 border border-red-200"
        >
          {submitError}
        </motion.div>
      )}

      {/* Form */}
      <motion.form
        className="flex flex-col gap-[16px] text-[22px] font-antonio font-[100] text-black flex-1"
        onSubmit={onSubmit}
      >
        <FormInput
          variants={item}
          type="text"
          placeholder="Full name"
          {...register("name")}
          error={errors.name?.message}
          required
          {...formColors}
        />

        <FormInput
          variants={item}
          type="email"
          placeholder="Contact mail ID"
          {...register("email")}
          error={errors.email?.message}
          required
          {...formColors}
        />

        <PhoneInput
          variants={item}
          value={watch("phone")}
          onChange={(value) => setValue("phone", value)}
          error={errors.phone?.message}
          required
          defaultCountry="IN"
          {...formColors}
          dropdownBg="#FFFFFF"
          dropdownBorder="#FFFFFFAA"
          dropdownText="#121212"
          dropdownHoverBg="#FF4E2114"
          dropdownSelectedBg="#FF4E2126"
        />

        <FormInput
          variants={item}
          type="textarea"
          placeholder="Message"
          {...register("message")}
          error={errors.message?.message}
          required
          {...formColors}
        />

        {/* Submit */}
        <motion.div variants={item} className="flex justify-end pt-[8px]">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#FF4E21]" />
            ) : (
              <ChevronRight className="text-[#FF4E21]" />
            )}
          </Button>
        </motion.div>
      </motion.form>

      {/* Email Below */}
      <motion.a
        variants={item}
        href="mailto:hello@etherealdesign.io"
        className="font-antonio font-thin text-[20px] md:text-[26px] opacity-60 pt-[10px]"
      >
        hello@etherealdesign.io
      </motion.a>
    </motion.div>
  );
}

export default RightSecContent;
