// src/services/JiraService.ts
import { jiraConfig } from '../config/jiraConfig';

interface CreateTicketParams {
  summary: string;
  priority: 'High' | 'Average' | 'Low';
  description: string;
  reporter: string;
  template?: string;
  link?: string;
}

class JiraService {
  private getAuthHeader() {
    const { username, apiToken } = jiraConfig;
    const authString = `${username}:${apiToken}`;
    return `Basic ${Buffer.from(authString).toString('base64')}`;
  }

  public async createJiraUser(email: string, displayName: string) {
    const response = await fetch(`${jiraConfig.host}/rest/api/3/user`, {
      method: 'POST',
      headers: {
        Authorization: this.getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailAddress: email,
        displayName: displayName,
        notification: false,
        applicationAccess: { applicationKey: 'jira-software' },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to create Jira user:', errorText);
      throw new Error(
        `Не удалось создать пользователя в Jira: ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log('Jira user created successfully:', data);
    return data;
  }

  public async createTicket({
    summary,
    priority,
    description,
    reporter,
    template,
    link,
  }: CreateTicketParams) {
    console.log('Creating ticket with:', {
      summary,
      priority,
      description,
      reporter,
      template,
      link,
    });

    const response = await fetch(`${jiraConfig.host}/rest/api/3/issue`, {
      method: 'POST',
      headers: {
        Authorization: this.getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          project: { key: jiraConfig.projectKey },
          summary: summary,
          priority: { name: priority },
          description: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [
                  { type: 'text', text: `Template: ${template || ''}` },
                  { type: 'text', text: `Link: ${link || ''}` },
                  { type: 'text', text: description },
                ],
              },
            ],
          },
          issuetype: { name: 'Task' },
          reporter: { name: reporter },
        },
      }),
    });

    console.log('Jira API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to create Jira ticket:', errorText);
      throw new Error(`Failed to create Jira ticket: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Ticket created successfully:', data);
    return `${jiraConfig.host}/browse/${data.key}`;
  }

  public async getUserTickets(reporter: string) {
    const response = await fetch(
      `${jiraConfig.host}/rest/api/3/search?jql=reporter=${reporter}`,
      {
        method: 'GET',
        headers: {
          Authorization: this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch Jira tickets:', errorText);
      throw new Error('Failed to fetch Jira tickets');
    }

    const data = await response.json();
    console.log('User tickets retrieved successfully:', data);
    return data.issues;
  }
}

export default new JiraService();
