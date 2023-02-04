import getGPTResponse from "../../../lib/gpt-engine";

export default async function matchColumns(req, res) {
  switch (req.method) {
    case 'POST':
      let validationTemplateColumns = req.body.validationTemplateColumns;
      let saasTemplateColumns = req.body.saasTemplateColumns;
      if (!Array.isArray(validationTemplateColumns) || !Array.isArray(saasTemplateColumns) || saasTemplateColumns.length != validationTemplateColumns.length){
        return res.json({status: 400, data: "Please send correct input lists"})
      }
      let actualPrompt = `You are a column matcher. Match two lists with the following values.
      List1: ${validationTemplateColumns}
      List2: ${saasTemplateColumns}
      Return the value as a javascript object`;
      let resp = await getGPTResponse(actualPrompt, 100, 0, 0);
      let matchedColumns = {} ;
      try {
        matchedColumns = JSON.parse(resp);
      } catch(e){
        for(let i in saasTemplateColumns){
          matchedColumns[validationTemplateColumns[i]] = saasTemplateColumns[i]
        }
      }
      res.json({ status: 200, data: matchedColumns });
      break;
    default:
      res.json({ status: 405, data: 'Method not found' });
  }
}