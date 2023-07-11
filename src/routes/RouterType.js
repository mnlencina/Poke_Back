const { Router } = require('express');
const getTypeApi = require('../controllers/getTypeApi');


const router = Router();

router.get('/', async (req, res) => {
  const types = await getTypeApi();
  res.send(types);
});

module.exports = router;