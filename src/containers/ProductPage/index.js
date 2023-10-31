import React, { useState, useEffect } from 'react';
import AddEditModal from './AddEditModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { Grid, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import makeSelectProductPage from './selectors';
import { getListProductAction } from './actions';
import ProductCard from './ProductCard';
import useWindowDimensions from '../../hooks/windowDimensions';
import axiosInstance from '../../utils/axios';
import { showLoadingAction } from '../App/actions';

function ProductPage(props) {
  const { onGetListProduct, productPageStates, onShowLoading } = props;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [dataEdit, setDataEdit] = useState();
  const windowSize = useWindowDimensions();

  useEffect(async () => {
    await onGetListProduct();
  }, []);

  const handleCloseDeleteDiaglog = () => {
    setSelectedItem(null);
    setOpenDeleteDialog(false);
  };

  const handleOpenModal = (item) => {
    setDataEdit(item);
    setIsOpenModal(true);
  };

  const handleOpenDeleteModal = (item) => {
    setSelectedItem(item);
    setOpenDeleteDialog(true);
  };

  const handleDeleteProduct = async () => {
    try {
      const res = await axiosInstance({
        method: 'DELETE',
        url: `${import.meta.env.VITE_API_URL}/product/delete/${selectedItem.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 204) {
        enqueueSnackbar('Xoá thành công', { variant: 'success' });
        handleCloseDeleteDiaglog();
        await onGetListProduct();
      }
    } catch (err) {
      enqueueSnackbar('Xoá thất bại', { variant: 'error' });
    }
  };

  const handleOpenAddModal = () => {
    setIsOpenModal(true);
  };

  return (
    <div style={{ backgroundColor: '#f8f8ff', width: `${windowSize.width - 270}px` }}>
      <button
        type="button"
        onClick={() => handleOpenAddModal()}
        className="btn btn-primary btn-lg"
        style={{
          marginTop: '20px',
          marginLeft: '50px',
        }}>
        Add
      </button>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container sx={{ width: '95%' }}>
          {productPageStates?.data?.data.map((item) => (
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              sm={6}
              key={item.id}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: '90%', marginTop: '10px', marginBottom: '10px' }}>
                <ProductCard
                  product={item}
                  handleOpenDeleteModal={handleOpenDeleteModal}
                  handleOpenModal={handleOpenModal}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
      <AddEditModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
        onGetListProduct={onGetListProduct}
        onShowLoading={onShowLoading}
      />
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDiaglog}>
        <DialogTitle>{'Bạn có chắc chắn xoá'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            autoFocus
            onClick={handleCloseDeleteDiaglog}>
            Huỷ
          </button>
          <button
            className="btn btn-danger btn-lg"
            autoFocus
            type="button"
            onClick={() => handleDeleteProduct(selectedItem)}>
            Xoá
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

ProductPage.propTypes = {
  onGetListCategory: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  productPageStates: makeSelectProductPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGetListProduct: () => {
      dispatch(getListProductAction());
    },
    onShowLoading: (loading) => {
      dispatch(showLoadingAction(loading));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
