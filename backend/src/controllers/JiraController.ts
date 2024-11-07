// src/controllers/JiraController.ts
import { Response, NextFunction } from 'express';
import JiraService from '../services/JiraService';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

class JiraController {
  public async createTicket(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { summary, priority, template, link } = req.body;
      const reporter = req.user?.username;

      // Проверка на случай, если reporter отсутствует
      if (!reporter) {
        return res.status(400).json({ message: 'Reporter is required' });
      }

      const description = `Template: ${template}\nLink: ${link}`;

      const ticketUrl = await JiraService.createTicket({
        summary,
        priority,
        description,
        reporter,
        template,
        link,
      });

      return res
        .status(201)
        .json({ message: 'Ticket created successfully', ticketUrl });
    } catch (error) {
      console.error('Error in JiraController.createTicket:', error);
      return res.status(500).json({ message: 'Failed to create Jira ticket' });
    }
  }

  public async getUserTickets(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const reporter = req.user?.username;

      if (!reporter) {
        return res.status(400).json({ message: 'Reporter not provided' });
      }

      const tickets = await JiraService.getUserTickets(reporter);
      return res.status(200).json({ tickets });
    } catch (error) {
      console.error('Error in JiraController.getUserTickets:', error);
      return res.status(500).json({ message: 'Failed to fetch Jira tickets' });
    }
  }
}

export default new JiraController();
