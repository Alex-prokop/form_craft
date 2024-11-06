import { getSalesforceAccessToken } from '../utils/salesforceAuth';
import https from 'https';

export const createSalesforceAccountAndContact = async (
  username: string,
  email: string,
  phone?: string
) => {
  const { accessToken, instanceUrl } = await getSalesforceAccessToken();

  const existingAccountId = await findSalesforceRecord(
    'Account',
    { Name: username },
    accessToken,
    instanceUrl
  );
  let accountId;
  if (existingAccountId) {
    console.log(
      `Account с именем "${username}" уже существует, ID:`,
      existingAccountId
    );
    accountId = existingAccountId;
  } else {
    accountId = await createSalesforceRecord(
      'Account',
      { Name: username, Phone: phone || '' },
      accessToken,
      instanceUrl
    );
  }

  const existingContactId = await findSalesforceRecord(
    'Contact',
    { Email: email },
    accessToken,
    instanceUrl
  );
  if (existingContactId) {
    console.log(
      `Contact с email "${email}" уже существует, ID:`,
      existingContactId
    );
    return {
      status: 200,
      message: {
        message: 'Contact уже существует в Salesforce',
        contactId: existingContactId,
      },
    };
  }

  await createSalesforceRecord(
    'Contact',
    { AccountId: accountId, LastName: username, Email: email, Phone: phone },
    accessToken,
    instanceUrl
  );

  return {
    status: 201,
    message: {
      message: 'Account и Contact успешно созданы или обновлены в Salesforce',
    },
  };
};

const findSalesforceRecord = (
  objectName: string,
  queryFields: Record<string, string>,
  accessToken: string,
  instanceUrl: string
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const query = Object.entries(queryFields)
      .map(([key, value]) => `${key}='${value}'`)
      .join(' AND ');
    const path = `/services/data/${process.env.SALESFORCE_API_VERSION}/query/?q=SELECT+Id+FROM+${objectName}+WHERE+${query}`;

    const options = {
      hostname: new URL(instanceUrl).hostname,
      path,
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    const req = https.request(options, (res) => {
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        const responseJson = JSON.parse(responseBody);
        resolve(
          responseJson.records && responseJson.records.length > 0
            ? responseJson.records[0].Id
            : null
        );
      });
    });

    req.on('error', (error) => {
      console.error(`Ошибка при поиске ${objectName}:`, error.message);
      reject(error);
    });
    req.end();
  });
};

const createSalesforceRecord = (
  objectName: string,
  data: object,
  accessToken: string,
  instanceUrl: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const dataString = JSON.stringify(data);
    const options = {
      hostname: new URL(instanceUrl).hostname,
      path: `/services/data/${process.env.SALESFORCE_API_VERSION}/sobjects/${objectName}`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': dataString.length,
      },
    };

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        const responseJson = JSON.parse(responseBody);
        res.statusCode === 201
          ? resolve(responseJson.id)
          : reject(new Error(`Ошибка создания ${objectName}: ${responseBody}`));
      });
    });

    req.on('error', (error) => {
      console.error(
        `Ошибка HTTP-запроса при создании ${objectName}:`,
        error.message
      );
      reject(error);
    });
    req.write(dataString);
    req.end();
  });
};
