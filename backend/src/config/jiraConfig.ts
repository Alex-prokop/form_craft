// src/config/jiraConfig.ts
import dotenv from 'dotenv';

dotenv.config();

export const jiraConfig = {
  host: process.env.JIRA_HOST,
  username: process.env.JIRA_USERNAME,
  apiToken: process.env.JIRA_API_TOKEN,
  projectKey: 'SR',
};
