const { Router } = require("express");
const Todo = require("../models/Todo");

const router = Router();

/**
 * GET '/'
 * Get tasks
 */
router.get('/', async (_, res) => {
	try {
		const todos = await Todo.findAll();
		res.status(200).json(todos);
		
	} catch (error) { console.log(error); res.status(500).json({ message: 'Server error' }); }
});

/**
 * POST '/'
 * Create task
 */
router.post('/', async (req, res) => {
	try {
		const todo = await Todo.create({
			title: req.body.title,
			done: false,
			labelText: '', // plug for migration
			labelColor: '#b388ff' // plug for migration
		});
		res.status(201).json({todo});

	} catch (error) { console.log(error); res.status(500).json({ message: 'Server error' }); }
});

/**
 * PUT '/:id'
 * Change task
 */
router.put('/:id', async (req, res) => {
	try {
		const todo = await Todo.findByPk(+req.params.id);
		todo.done = req.body.done;
		await todo.save();
		res.status(200).json({todo});

	} catch (error) { console.log(error); res.status(500).json({ message: 'Server error' }); }
});

/**
 * DELETE '/:id'
 * Delete task
 */
router.delete('/:id', async (req, res) => {
	try {
		const todos = await Todo.findAll({ where: { id: +req.params.id }})
		const todo = todos[0];
		await todo.destroy();
		res.status(204).json({});

	} catch (error) { console.log(error); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;