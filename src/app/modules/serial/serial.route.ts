import express  from 'express';
import { SerialController } from './serial.controller';

const router = express.Router();

router.post('/create-serial',SerialController.createSerial)
router.get('/:day/:date',SerialController.getSerial)
router.get('/get-serial-for-consulting/:day/:date',SerialController.getSerialForConsulting)
router.put('/update/:id',SerialController.UpdateSerial)
router.get('/get-serial-by-phone',SerialController.getSerialByPhoneNumber)



export const SerialRoutes = router;