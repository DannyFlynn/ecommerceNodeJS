const con = require("../Db/pizza");

const deleteOrder = (req, res) => {
  const id = req.params.id;

  con.query("DELETE FROM pizza_order WHERE id = ?", id, async (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      await res.status(200).json({ message: "delete success" });
    }
  });
};

module.exports = deleteOrder;
