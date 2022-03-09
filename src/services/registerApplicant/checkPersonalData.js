export const checkPersonalData = (req, res) => {
  const firstName = req.body["first_name"];
  const lastName = req.body["last_name"];
  const { email, dob, address } = req.body;

  console.log(`First Name: ${firstName}`);
  console.log(`Last Name: ${lastName}`);
  console.log(`Email: ${email}`);
  console.log(`Date of birth: ${dob}`);
  console.log(`Address:`);
  console.log(address);

  let message = null;
  let addressChecked = null;

  if (!firstName) {
    message = 'First name not specified';
  } else if (!lastName) {
    message = 'Last name not specified';
  } else if (!dob) {
    message = 'Date of birth not specified';
  } else if (address) {
    if (address instanceof Object) {
      addressChecked = {
        buildingName: address.buildingName,
        buildingNumber: address.buildingNumber,
        country: address.country,
        flatNumber: address.flatNumber,
        line1: address.line1,
        line2: address.line2,
        line3: address.line3,
        postcode: address.postcode,
        state: address.state,
        street: address.street,
        subStreet: address.subStreet,
        town: address.town,
      };
    } else {
      message = 'Incorrect address format';
    }
  }

  if (message) {
    res.status(400).send({ error: message });
  }
  return { firstName, lastName, email, dob, address: addressChecked, message };
}
