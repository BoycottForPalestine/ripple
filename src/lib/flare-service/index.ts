const FlareService = {
  dispatchSms: (phoneNumbers: string[], message: string) => {
    console.log(`Sending SMS to ${phoneNumbers.join(", ")}`);
  },
  dispatchEmails: (emails: string[], emailMessage: string) => {
    console.log(`Sending email to ${emails.join(", ")}`);
  },
};

export default FlareService;
