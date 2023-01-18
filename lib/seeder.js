const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;

const seedTestData = async () => {
  // load env variables
  dotenv.config();
  const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/yobulk';
  const dbName = process.env.DATABASE_NAME || 'yobulk';

  // test data
  const testTemplate = {
    columns: [
      {
        is_required: true,
        label: 'Name',
        example: 'Arden Lee',
        data_type: 'Text',
        custom_message: 'Name can only be a string value.',
        key: 'clcyx07n300003n6olmrfd7wf',
      },
      {
        is_required: true,
        label: 'MailID',
        example: 'sodales@google.org',
        data_type: 'Email',
        custom_message:
          'Email should be in correct format like "sodales@google.org"',
        key: 'clcyx1fdm00013n6orplf2btz',
      },
      {
        is_required: true,
        label: 'DateofJoining',
        example: 'Aug 5, 2022',
        data_type: 'Date',
        custom_message: 'Please check the date format ',
        key: 'clcyx27ei00023n6oeoljm8mp',
      },
      {
        is_required: true,
        label: 'EMP Age',
        example: '23',
        data_type: 'Number',
        custom_message: 'Only numbers are allowed',
        key: 'clcyx2suq00033n6o6xa68ej4',
      },
      {
        is_required: true,
        label: 'EMP Status',
        example: 'TRUE',
        data_type: 'Boolean',
        custom_message: 'Can be either TRUE or FALSE',
        key: 'clcyx3m2r00043n6oicbxm5gz',
      },
    ],
    template_name: 'YoBulk',
    schema: {
      type: 'object',
      properties: {
        Name: {
          type: 'string',
        },
        MailID: {
          type: 'string',
          format: 'email',
        },
        DateofJoining: {
          type: 'string',
          format: 'custom-date-time',
        },
        'EMP Age': {
          type: 'integer',
        },
        'EMP Status': {
          type: 'string',
          format: 'custom-boolean',
        },
      },
      required: ['Name', 'MailID', 'DateofJoining', 'EMP Age', 'EMP Status'],
      errorMessage: {
        properties: {
          Name: 'Name can only be a string value.',
          MailID: 'Email should be in correct format like "sodales@google.org"',
          DateofJoining: 'Please check the date format ',
          'EMP Age': 'Only numbers are allowed',
          'EMP Status': 'Can be either TRUE or FALSE',
        },
      },
      additionalProperties: false,
    },
    created_date: new Date(),
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
