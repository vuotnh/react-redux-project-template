import React, { useState, useEffect } from 'react';
import AddEditModal from './AddEditModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectProductPage from './selectors';
import { getListProductAction } from './actions';
import ProductCard from './ProductCard';
import { Grid, Dialog, DialogTitle, DialogContent } from '@mui/material';

function ProductPage(props) {
  const { onGetListProduct, productPageStates } = props;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [dataEdit, setDataEdit] = useState();

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

  const handleDeleteProduct = () => {
    console.log(selectedItem);
  };

  const handleOpenAddModal = () => {
    setIsOpenModal(true);
  };

  return (
    <div style={{ backgroundColor: '#f8f8ff' }}>
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
          {productPageStates?.data?.data.map((item, index) => (
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              sm={6}
              key={item.id}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div
                style={{ width: '90%', marginTop: '10px', marginBottom: '10px' }}
                onClick={() => handleOpenModal(item)}>
                <ProductCard product={item} handleOpenDeleteModal={handleOpenDeleteModal} />
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
