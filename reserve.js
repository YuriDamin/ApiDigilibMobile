const Reserve = require("../models/reserve");

//GET: Search all reserves.
exports.findAll = async (req, res) => {
    try {
        const reserves = await Reserve.findAll();
        res.json(reserves);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//GET: Search reserves by id receive.
exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const reserve = await Reserve.findOne({ 
            where: { id } 
        });

        if (!!reserve) {
            res.json(reserve);
        } else {
            res.status(404).json({ error: "Reserve not found." })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

//POST: Insert a reserve.
exports.create = async (req, res) => {
    try {
        const newReserve = await Reserve.create({
            returnDate: req.body.returnDate,
            bookId: req.body.bookId,
            userId: req.body.userId,
            reserveDate: req.body.reserveDate,
            reserveStatus: req.body.reserveStatus,
            observation: req.body.observation
        });
        res.json(newReserve);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
};   

//PUT: Update reserve data.
exports.update = async (req, res) => {
    const { id } = req.params;
    try {
      const payload = {};

      if (!!req.body.returnDate) {
          payload.returnDate = req.body.returnDate;
      }
      if (!!req.body.bookId) {
          payload.bookId = req.body.bookId;
      }
      if (!!req.body.userId) {
          payload.userId = req.body.userId;
      }
      if (!!req.body.reserveDate) {
        payload.reserveDate = req.body.reserveDate;
      }
      if (!!req.body.reserveStatus) {
          payload.reserveStatus = req.body.reserveStatus;
      }
      if (!!req.body.observation) {
          payload.observation = req.body.observation;
      }

      const updatedReserve = await Reserve.update(payload, {
          where: { id },
      });

      res.json({ success: !!updatedReserve && +updatedReserve[0] > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
}
};

//DELETE: Remove reserve data.
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedReserve = await Reserve.destroy({ where: { id } });

        res.json({ success: !!deletedReserve });
    } catch (err) {
        res.status(500).json({ error: "Reserve not found." });
    }
}; 
