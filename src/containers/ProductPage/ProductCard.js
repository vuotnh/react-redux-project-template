import { Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import React from 'react';

function ProductCard(props) {
  const { product, handleOpenDeleteModal, handleOpenModal } = props;
  return (
    <Card sx={{ borderRadius: '20px' }}>
      <CardHeader title={product?.name} subheader={product?.category?.name} />
      <CardMedia
        component="img"
        height="300"
        image={`${import.meta.env.VITE_API_URL}/storage/images/${product?.images[0]?.image?.name}`}
        alt="test"
        onClick={() => handleOpenModal(product)}
      />
      <CardContent>
        <Typography component={'span'} variant="body2" color="text.secondary">
          <div dangerouslySetInnerHTML={{ __html: product?.description }}></div>
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography
            style={{
              fontWeight: 700,
              fontSize: '20px',
            }}>{`Price:  ${product?.price}$`}</Typography>
          {product?.discountRate && (
            <Typography
              style={{
                fontWeight: 700,
                color: 'red',
              }}>{`Discount:  ${product?.discountRate}%`}</Typography>
          )}
          <i className="far fa-trash-alt fa-2x" onClick={() => handleOpenDeleteModal(product)}></i>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
