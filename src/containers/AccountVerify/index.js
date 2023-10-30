import { Card, Typography } from '@mui/material';
import React from 'react';

function AccountVerify() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Card sx={{ minHeight: '50px', display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ paddingLeft: '30px', paddingRight: '30px', color: 'green' }}>
          Đăng ký tài khoản thành công, vui lòng kiểm tra email để xác minh tài khoản
        </Typography>
      </Card>
    </div>
  );
}

export default AccountVerify;
