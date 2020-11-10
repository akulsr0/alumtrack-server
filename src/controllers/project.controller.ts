import { Request, Response } from 'express';
import Project from '../models/Project';
import User from '../models/User';

// @route GET /api/project?user=id
// @desc Get user's project from their id
// @access Public
const getUserProjects = async (req: Request, res: Response) => {
  try {
    const userId = req.query.user;
    const user = await User.findById(userId)
      .populate('projects')
      .select('id  projects');
    res.json({ user });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// @route POST /api/project/
// @desc Add new project
// @access Private
const addProject = async (req: Request, res: Response) => {
  try {
    const { title, language, description } = req.body;
    const { id } = req.body.user;
    const project = new Project({ title, language, description, author: id });
    await project.save();
    const user = await User.findById(id);
    if (user) {
      user.projects.push(project._id);
      await user.save();
    }
    res.json({ message: 'Project Saved', project, success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

export { getUserProjects, addProject };
