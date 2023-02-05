import getGPTResponse from "../../../lib/gpt-engine";

export default async function ajvSchemaGenerator(req, res) {
  switch (req.method) {
    case 'POST':
      let prompt = req.body.prompt;
      let actualPrompt = `You are a AJV schema generator.
      Generate an AJV schema for the description: ${prompt}
      Return the value as a json object`;
      let resp = await getGPTResponse(actualPrompt, 200, 0, 0);
      res.json({ status: 200, data: resp });
      break;
    default:
      res.json({ status: 405, data: 'Method not found' });
  }
}