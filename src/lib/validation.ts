import { serviceOptions, type ServiceOptionId } from "@/data/enquiry";

export type EnquiryValues = {
  name: string;
  phone: string;
  email: string;
  location: string;
  landSize: string;
  services: ServiceOptionId[];
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

export const emptyEnquiry: EnquiryValues = {
  name: "",
  phone: "",
  email: "",
  location: "",
  landSize: "",
  services: [],
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "").length;
  return digits >= 7 && digits <= 15;
}

/** Validates the enquiry form. Returns a field-keyed error map. */
export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (values.services.length === 0) {
    errors.services = "Choose Survey, Civil Consultant, or both.";
  }

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (values.phone.trim() === "") {
    errors.phone = "Please enter a phone or WhatsApp number.";
  } else if (!isValidPhone(values.phone)) {
    errors.phone = "That number looks incomplete, include the area or country code.";
  }

  if (values.email.trim() !== "" && !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please check the email address.";
  }

  if (values.location.trim().length < 2) {
    errors.location = "Where is the plot or the project located?";
  }

  return errors;
}

/** Plain-text summary used for the WhatsApp hand-off. */
export function formatEnquirySummary(values: EnquiryValues) {
  const serviceLabels = serviceOptions
    .filter((option) => values.services.includes(option.id))
    .map((option) => option.label);

  const lines = [
    `Service: ${serviceLabels.join(" + ")}`,
    `Name: ${values.name.trim()}`,
    `Phone / WhatsApp: ${values.phone.trim()}`,
    values.email.trim() ? `Email: ${values.email.trim()}` : null,
    `Location: ${values.location.trim()}`,
    values.landSize.trim() ? `Plot size: ${values.landSize.trim()}` : null,
    values.message.trim() ? `\nMessage: ${values.message.trim()}` : null,
  ];

  return lines.filter((line): line is string => line !== null).join("\n");
}
