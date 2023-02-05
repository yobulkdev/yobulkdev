const getGPTResponse = async (prompt, maxTokens, temperature, frequencyPenalty) => {
  const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
  const apiKey = process.env.OPENAI_SECRET_KEY;
  let output;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: maxTokens,
        temperature: temperature || 0.2,
        stop: '',
        n: 1,
        frequency_penalty: frequencyPenalty || 0.2,
      }),
    });
    const parsedResponse = await response.json();
    output = parsedResponse.choices[0].text.replace('\n', '').replace('\n', '');
  } catch (err) {
    console.log(err);
    output = 'Please try again';
  }
  return output;
};

export default getGPTResponse;