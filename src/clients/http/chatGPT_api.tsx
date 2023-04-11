import axios from 'axios';

const model = 'text-davinci-003';
const apiKey = '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';
export const sendMessage = async (prompt: string) => {
  return await axios
    .post(
      'https://api.openai.com/v1/engines/' + model + '/completions',
      {
        prompt: prompt,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.5
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + apiKey
        }
      }
    )
    .then((response) => {
      console.log(response.data.choices[0].text);
      return response.data.choices[0].text;
    })
    .catch((error) => {
      console.error(error);
    });
};
