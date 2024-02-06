//...This is the controllers/plans.js file...

const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getPlanEntryById = async (req, res) => {
    //#swagger.tags=['plans']
    try {
        const planId = req.params.id;
        if (!ObjectId.isValid(planId)) {
            return res.status(400).json({ error: 'Invalid plan ID' });
        }

        const plan = await mongodb.getDatabase().db('seerstone').collection('plans').findOne({ _id: new ObjectId(planId) });
        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(plan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createPlanEntry = async (req, res) => {
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

const updatePlanEntryById = async (req, res) => {
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

const deletePlanEntryById = async (req, res) => {
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

const getPlanEntriesByUserId = async (req, res) => {
    //#swagger.tags=['plans']
    const { id } = req.params;
    try {
        const plans = await mongodb.getDatabase().db('seerstone').collection('plans').find({ user_id: id }).toArray();
        res.status(200).json(plans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPlanEntriesByUserIdAndInspirationId = async (req, res) => {
    //#swagger.tags=['plans']
    const { id } = req.params;
    try {
        const plans = await mongodb.getDatabase().db('seerstone').collection('plans').find({ user_id: id, inspiration_id: req.params.inspiration_id }).toArray();
        res.status(200).json(plans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getPlanEntryById,
    createPlanEntry,
    updatePlanEntryById,
    deletePlanEntryById,
    getPlanEntriesByUserId,
    getPlanEntriesByUserIdAndInspirationId
};