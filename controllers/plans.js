//...This is the controllers/plans.js file...

const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllPlans = async (req, res) => {
    //#swagger.tags=['plans']
    try {
        const result = await mongodb.getDatabase().db('seerstone').collection('plans').find();
        result.toArray().then((plans) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(plans);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSinglePlan = async (req, res) => {
    //#swagger.tags=['plans']
    try {
        const planId = req.params.id;
        if (!ObjectId.isValid(planId)) {
            return res.status(400).json({ error: 'Invalid plan ID' });
        }

        const result = await mongodb.getDatabase().db('seerstone').collection('plans').find({ _id: new ObjectId(planId) });
        result.toArray().then((plans) => {
            if (plans.length === 0) {
                return res.status(404).json({ error: 'Plan not found' });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(plans[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createPlan = async (req, res) => {
    //#swagger.tags=['plans']
    try {
        const plan = {
            user_id: req.body.user_id,
            inspiration_id: req.body.inspiration_id,
            plan_type: req.body.plan_type,
            plan: req.body.plan,
            schedule: req.body.schedule,
        };

        const response = await mongodb.getDatabase().db('seerstone').collection('plans').insertOne(plan);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the plan.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updatePlan = async (req, res) => {
    //#swagger.tags=['plans']
    try {
        const planId = ObjectId.createFromHexString(req.params.id);
        const plan = {
            user_id: req.body.user_id,
            inspiration_id: req.body.inspiration_id,
            plan_type: req.body.plan_type,
            plan: req.body.plan,
            schedule: req.body.schedule,
        };

        const response = await mongodb.getDatabase().db('seerstone').collection('plans').replaceOne({ _id: planId }, plan);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the plan.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePlan = async (req, res) => {
    //#swagger.tags=['plans']
    try {
        const planId = ObjectId.createFromHexString(req.params.id);
        const response = await mongodb.getDatabase().db('seerstone').collection('plans').deleteOne({ _id: planId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the plan.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllPlans,
    getSinglePlan,
    createPlan,
    updatePlan,
    deletePlan
};