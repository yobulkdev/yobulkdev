const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;

const seedTestData = async () => {
  // load env variables
  dotenv.config();
  const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/yobulk';
  const dbName = process.env.DATABASE_NAME || 'yobulk';

  // test data
  const testTemplate = {
    validators: [
      {
        name: 'first_name',
        valFunc:
          '(x) => {\r\n let regex = new RegExp("([a-z][a-zA-Z]*)");\r\n return regex.test(x);\r\n }',
      },
    ],
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        first_name: {
          type: 'string',
          format: 'first_name',
        },
        email: {
          type: 'string',
          format: 'email',
          minLength: 1,
        },
        date: {
          type: 'string',
          format: 'custom-date-time',
          minLength: 1,
        },
        status: {
          type: 'string',
          format: 'custom-boolean',
        },
      },
      required: ['id', 'first_name', 'email', 'date', 'status'],
      errorMessage: {
        properties: {
          first_name: 'Only string(With character A-Z) type is accepted.',
          id: 'Only valid integer format type is accepted',
          email: 'Only Valid email ID format is accepted',
          date: 'Only valid date format is accepted',
          status: 'Only boolean is accepted',
        },
      },
    },
    template_name: 'YoBulk',
    columns: [
      {
        key: 'cle7cfex70000jsgq1wircymy',
        label: 'id',
        data_type: 'integer',
        is_required: true,
      },
      {
        key: 'cle7cfex80001jsgq6mi75ijn',
        label: 'first_name',
        data_type: 'string',
        is_required: true,
      },
      {
        key: 'cle7cfex80002jsgq178ifwz6',
        label: 'email',
        data_type: 'string',
        is_required: true,
      },
      {
        key: 'cle7cfex90003jsgq7vqn5e9r',
        label: 'date',
        data_type: 'string',
        is_required: true,
      },
      {
        key: 'cle7cfex90004jsgqd7vi8rbf',
        label: 'status',
        data_type: 'string',
        is_required: true,
      },
    ],
  };

  const testOrganization = {
    orgName: 'YoBulk',
    workspaces: [
      {
        workspaceId: {
          $oid: '63c563a8408a18f66f9123b7',
        },
        workspaceName: 'YoBulk Workspace',
        collaborators: ['test@yobulk.dev'],
      },
    ],
  };

  const testImporter = {
    name: 'YoBulk',
    templateId: '',
    organizationId: '',
    workspaceId: '63c563a8408a18f66f9123b7',
    templateName: 'YoBulk',
    date: new Date(),
  };

  // connecting and seeding data
  const client = new MongoClient(dbUri, {
    useNewUrlParser: true,
  });

  await client.connect();
  const db = client.db(dbName);
  const testTem = await db
    .collection('templates')
    .findOne({ template_name: 'YoBulk' });
  if (!testTem) {
    const newTemplate = await db
      .collection('templates')
      .insertOne(testTemplate);
    testImporter.templateId = newTemplate.insertedId.toString();
  }
  const testOrg = await db
    .collection('organizations')
    .findOne({ orgName: 'YoBulk' });
  if (!testOrg) {
    const newOrg = await db
      .collection('organizations')
      .insertOne(testOrganization);
    testImporter.organizationId = newOrg.insertedId.toString();
  }
  const testImp = await db.collection('importers').findOne({ name: 'YoBulk' });
  if (!testImp) {
    await db.collection('importers').insertOne(testImporter);
  }
  console.log('Seeding complete!');
  client.close();
};

seedTestData();
