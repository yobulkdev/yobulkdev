import getGPTResponse from "../../../lib/gpt-engine";

export default async function generateRegex(req, res) {
  switch (req.method) {
    case 'POST':
      let prompt = req.body.prompt;
      let actualPrompt = 'Generate a regex for this description: ' + prompt;
      let resp = await getGPTResponse(actualPrompt, 50)
      res.json({ status: 200, data: resp });
      break;
    default:
      res.json({ status: 405, data: 'Method not found' });
  }
}