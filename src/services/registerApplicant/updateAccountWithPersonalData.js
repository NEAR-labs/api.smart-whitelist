export const updateAccountWithPersonalData = async (account, person) => {
  account.email = person.email;
  account.firstName = person.firstName;
  account.lastName = person.lastName;
  account.dob = person.dob;
  account.buildingName = person.address.buildingName;
  account.buildingNumber = person.address.buildingNumber;
  account.country = person.address.country;
  account.flatNumber = person.address.flatNumber;
  account.line1 = person.address.line1;
  account.line2 = person.address.line2;
  account.line3 = person.address.line3;
  account.postcode = person.address.postcode;
  account.state = person.address.state;
  account.street = person.address.street;
  account.subStreet = person.address.subStreet;
  account.town = person.address.town;

  await account.save();
}
