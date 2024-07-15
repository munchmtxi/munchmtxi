import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

export const setup2FA = (req: Request, res: Response) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  const query = 'UPDATE users SET twoFactorSecret = ? WHERE id = ?';
  db.query(query, [secret.base32, req.user.id], (err, result) => {
    if (err) throw err;
    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
      if (err) throw err;
      res.json({ secret: secret.base32, qrCodeUrl: data_url });
    });
  });
};

export const verify2FA = (req: Request, res: Response) => {
  const { token } = req.body;
  const query = 'SELECT twoFactorSecret FROM users WHERE id = ?';
  db.query(query, [req.user.id], (err, results) => {
    if (err) throw err;
    const verified = speakeasy.totp.verify({
      secret: results[0].twoFactorSecret,
      encoding: 'base32',
      token,
    });
    if (verified) {
      res.status(200).json({ message: '2FA verified' });
    } else {
      res.status(400).json({ message: 'Invalid token' });
    }
  });
};
