import { Router } from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController';
import { verifyEmail, requestPasswordReset, resetPassword, setup2FA, verify2FA } from '../controllers/authController'; // Import the additional functions
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/verify-email', verifyEmail); // Add the verify-email route
router.post('/request-password-reset', requestPasswordReset); // Add the request-password-reset route
router.post('/reset-password', resetPassword); // Add the reset-password route
router.post('/setup-2fa', protect, setup2FA); // Add the setup-2fa route
router.post('/verify-2fa', protect, verify2FA); // Add the verify-2fa route

export default router;
