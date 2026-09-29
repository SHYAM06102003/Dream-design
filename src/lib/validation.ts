import { serviceOptions, type ServiceOptionId } from "@/data/enquiry";

export type EnquiryValues = {
  name: string;
  phone: string;
  email: string;
  location: string;
  landSize: string;
  budget: string;
  houseType: string;
  floors: string;
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
  budget: "",
  houseType: "",
  floors: "",
  services: [],
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function countPhoneDigits(value: string) {
  return value.replace(/\D/g, "").length;
}

export function isValidPhone(value: string) {
  const digits = countPhoneDigits(value);
  return digits >= 7 && digits <= 15;
}

/** Validates the enquiry form. Returns a field-keyed error map. */
export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (values.phone.trim() === "") {
    errors.phone = "Please enter a phone or WhatsApp number.";
  } else if (!isValidPhone(values.phone)) {
    errors.phone = "That number looks incomplete — include the country or area code.";
  }

  if (values.email.trim() !== "" && !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please check the email address.";
  }

  if (values.location.trim().length < 2) {
    errors.location = "Where is the land located?";
  }

  if (values.landSize.trim().length < 2) {
    errors.landSize = "An approximate plot size is enough to start.";
  }

  if (values.services.length === 0) {
    errors.services = "Choose at least one service.";
  }

  return errors;
}

/** Plain-text summary used for the WhatsApp hand-off. */
export function formatEnquirySummary(values: EnquiryValues) {
  const serviceLabels = serviceOptions
    .filter((option) => values.services.includes(option.id))
    .map((option) => option.label);

  const lines = [
    `Name: ${values.name.trim()}`,
    `Phone / WhatsApp: ${values.phone.trim()}`,
    values.email.trim() ? `Email: ${values.email.trim()}` : null,
    `Location: ${values.location.trim()}`,
    `Land size: ${values.landSize.trim()}`,
    values.budget.trim() ? `Budget: ${values.budget.trim()}` : null,
    values.houseType ? `House type: ${values.houseType}` : null,
    values.floors ? `Floors: ${values.floors}` : null,
    serviceLabels.length ? `Services: ${serviceLabels.join(", ")}` : null,
    values.message.trim() ? `\nMessage: ${values.message.trim()}` : null,
  ];

  return lines.filter((line): line is string => line !== null).join("\n");
}
