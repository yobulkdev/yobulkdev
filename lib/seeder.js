const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;

// test data
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

const testTemplates = [
  {
    name: 'YoBulk',
    schema: {
      _id: new ObjectId('63f1e1b4db835d47c31261b0'),
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
    },
  },
  {
    name: 'String Verification',
    schema: {
      _id: new ObjectId('63f1e1b4db835d47c31261b1'),
      validators: [
        {
          name: 'first_name',
          valFunc: "(x) => (x.startsWith('yo') ? true : false)",
        },
      ],
      schema: {
        type: 'object',
        properties: {
          age: {
            type: 'integer',
          },
          Name: {
            type: 'string',
            format: 'first_name',
          },
          email: {
            type: 'string',
            format: 'email',
            pattern: '^((?!yahoo|gmail).)*$',
            minLength: 1,
          },
          date: {
            type: 'string',
            format: 'custom-date-time',
            pattern:
              '^([0-2][0-9]|(3)[0-1])(/)(((0)[0-9])|((1)[0-2]))(/)\\d{4}$',
            minLength: 1,
          },
        },
        required: ['age', 'Name', 'email', 'custom-date-time'],
        errorMessage: {
          properties: {
            Name: 'Should start with yo',
            age: 'Should be an integer',
            email: 'GMAIL AND yahoo mail ids are not accepted',
            date: 'Only dd/mm/yyyy is accepted',
          },
        },
      },
      template_name: 'String Verification',
      columns: [
        {
          key: 'cleb56n970000ekgq4kp65ck3',
          label: 'age',
          data_type: 'integer',
          is_required: true,
        },
        {
          key: 'cleb56n980001ekgqcwku165t',
          label: 'Name',
          data_type: 'string',
          is_required: true,
        },
        {
          key: 'cleb56n980002ekgq7uowfmee',
          label: 'email',
          data_type: 'string',
          is_required: true,
        },
        {
          key: 'cleb56n980003ekgq3rdu9rs6',
          label: 'date',
          data_type: 'string',
          is_required: false,
        },
      ],
    },
  },
  {
    name: 'Integer Length Verification',
    schema: {
      _id: new ObjectId('63f1e1b4db835d47c31261b2'),
      validators: [
        {
          name: 'first_name',
          valFunc:
            "(x) => {let regex = new RegExp('([A-Z][a-zA-Z]*)');return regex.test(x);}",
        },
      ],
      schema: {
        type: 'object',
        properties: {
          age: {
            type: 'integer',
            maximum: 999,
          },
          Name: {
            type: 'string',
            format: 'first_name',
          },
          email: {
            type: 'string',
            format: 'email',
          },
        },
        required: ['age', 'Name', 'email'],
        errorMessage: {
          properties: {
            age: 'Age should not be more than 3 digit',
            Name: 'Should be a set of character ',
            email: 'Should be a valid email',
          },
        },
      },
      template_name: 'Integer Length Verification',
      columns: [
        {
          key: 'cleb57kib0004ekgq1h6n16u1',
          label: 'age',
          data_type: 'integer',
          is_required: true,
        },
        {
          key: 'cleb57kib0005ekgqbaei0281',
          label: 'Name',
          data_type: 'string',
          is_required: true,
        },
        {
          key: 'cleb57kib0006ekgqdqa5487y',
          label: 'email',
          data_type: 'string',
          is_required: true,
        },
      ],
    },
  },
  {
    name: 'Email Verification',
    schema: {
      _id: new ObjectId('63f1e1b4db835d47c31261b3'),
      validators: [],
      schema: {
        type: 'object',
        properties: {
          age: {
            type: 'integer',
          },
          Name: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
            pattern: '^((?!yahoo|gmail).)*$',
          },
        },
        required: ['age', 'Name', 'email'],
        errorMessage: {
          properties: {
            age: 'Age should be an integer',
            Name: 'Should be a set of character ',
            email: 'Should not include yahoo and gmail IDs',
          },
        },
      },
      template_name: 'Email Verification',
      columns: [
        {
          key: 'cleb585sv0007ekgq837n3l6z',
          label: 'age',
          data_type: 'integer',
          is_required: true,
        },
        {
          key: 'cleb585sv0008ekgqhwlmae40',
          label: 'Name',
          data_type: 'string',
          is_required: true,
        },
        {
          key: 'cleb585sv0009ekgqgd8d440h',
          label: 'email',
          data_type: 'string',
          is_required: true,
        },
      ],
    },
  },
  {
    name: 'Date Verification',
    schema: {
      _id: new ObjectId('63f1e1b4db835d47c31261b4'),
      validators: [],
      schema: {
        type: 'object',
        properties: {
          age: {
            type: 'integer',
          },
          Name: {
            type: 'string',
          },
          date: {
            type: 'string',
            format: 'custom-date-time',
            pattern:
              '^([0-2][0-9]|(3)[0-1])(/)(((0)[0-9])|((1)[0-2]))(/)\\d{4}$',
            minLength: 1,
          },
        },
        required: ['age', 'Name', 'custom-date-time'],
        errorMessage: {
          properties: {
            Name: 'Should be a set of characters',
            age: 'Should be a number',
            date: 'Only dd/mm/yyyy format is accepted',
          },
        },
      },
      template_name: 'Date Verification',
      columns: [
        {
          key: 'cleb58wkt000aekgqd13bbw22',
          label: 'age',
          data_type: 'integer',
          is_required: true,
        },
        {
          key: 'cleb58wkt000bekgq9s8g4cfb',
          label: 'Name',
          data_type: 'string',
          is_required: true,
        },
        {
          key: 'cleb58wkt000cekgqcw700e5i',
          label: 'date',
          data_type: 'string',
          is_required: false,
        },
      ],
    },
  },
];

const testImporters = {
  YoBulk: {
    name: 'YoBulk',
    templateId: '',
    organizationId: '',
    workspaceId: '63c563a8408a18f66f9123b7',
    templateName: 'YoBulk',
    date: new Date(),
  },
  'String Verification': {
    name: 'String Verification',
    templateId: '',
    organizationId: '',
    workspaceId: '63c563a8408a18f66f9123b7',
    templateName: 'String Verification',
    date: new Date(),
  },
  'Integer Length Verification': {
    name: 'Integer Length Verification',
    templateId: '',
    organizationId: '',
    workspaceId: '63c563a8408a18f66f9123b7',
    templateName: 'Integer Length Verification',
    date: new Date(),
  },
  'Email Verification': {
    name: 'Email Verification',
    templateId: '',
    organizationId: '',
    workspaceId: '63c563a8408a18f66f9123b7',
    templateName: 'Email Verification',
    date: new Date(),
  },
  'Date Verification': {
    name: 'Date Verification',
    templateId: '',
    organizationId: '',
    workspaceId: '63c563a8408a18f66f9123b7',
    templateName: 'Date Verification',
    date: new Date(),
  },
};

const seedTestData = async () => {
  // load env variables
  dotenv.config();
  const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/yobulk';
  const dbName = process.env.DATABASE_NAME || 'yobulk';

  // connecting and seeding data
  const client = new MongoClient(dbUri, {
    useNewUrlParser: true,
  });
  await client.connect();
  const db = client.db(dbName);

  // creating an organization and storing organization id
  let orgId;
  const testOrg = await db
    .collection('organizations')
    .findOne({ orgName: 'YoBulk' });

  if (!testOrg) {
    const newOrg = await db
      .collection('organizations')
      .insertOne(testOrganization);
    orgId = newOrg.insertedId.toString();
  }

  // creating demo templates
  for (const item of testTemplates) {
    const testTem = await db
      .collection('templates')
      .findOne({ template_name: item.name });
    if (!testTem) {
      const newTemplate = await db
        .collection('templates')
        .insertOne(item.schema);
      testImporters[item.name]['templateId'] =
        newTemplate.insertedId.toString();
      testImporters[item.name]['organizationId'] = orgId;
    }

    const testImp = await db
      .collection('importers')
      .findOne({ name: item.name });
    if (!testImp) {
      await db.collection('importers').insertOne(testImporters[item.name]);
    }
  }

  console.log('Seeding complete!');
  client.close();
};

seedTestData();

// 64 - parallel
