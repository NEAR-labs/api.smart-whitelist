import axios from 'axios';

export const getApplicantCountries = async (req, res) => {
  try {
    const response = await axios.get('https://documentation.onfido.com/supported-applicant-countries.json');
    res.send(response.data);

  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: 'The list of applicant countries cannot be obtained. Please try again' });
  }
}
