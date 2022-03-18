export const getStoredPerson = (account) => {
  let storedPerson = null;

  if (account.status === 'registered' || account.status === 'registered_token' ||
    account.status === 'account_is_whitelisted' || account.status === 'applicant_was_rejected')
  {
    storedPerson = {
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      dob: account.dob,
      address: {
        buildingName: account.buildingName,
        buildingNumber: account.buildingNumber,
        country: account.country,
        flatNumber: account.flatNumber,
        line1: account.line1,
        line2: account.line2,
        line3: account.line3,
        postcode: account.postcode,
        state: account.state,
        street: account.street,
        subStreet: account.subStreet,
        town: account.town,
      },
      message: null
    };
  }

  return storedPerson;
}
