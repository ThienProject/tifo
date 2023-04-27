import axios from 'axios';

const model = 'text-davinci-003';
const apiKey = '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';
export const sendMessage = async (prompt: string) => {
  return await axios
    .post(
      'https://api.openai.com/v1/engines/' + model + '/completions',
      {
        prompt: prompt,
        max_tokens: 500,
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
