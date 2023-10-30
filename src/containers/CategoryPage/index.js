import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectCategoryList from './selectors';
import { getListCategoryAction } from './actions';
import { enqueueSnackbar } from 'notistack';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import axiosInstance from '../../utils/axios';
import AddEditModal from './AddEditModal';

function CategoryPage(props) {
  const { onGetListCategory, categoryPageStates } = props;

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [dataEdit, setDataEdit] = useState();

  const handleCloseDeleteDiaglog = () => {
    setSelectedItem(null);
    setOpenDeleteDialog(false);
  };

  const handleOpenModal = (item) => {
    setDataEdit(item);
    setIsOpenModal(true);
  };

  const handleOpenAddModal = () => {
    setIsOpenModal(true);
  };

  const handleDeleteCategory = async (item) => {
    try {
      const res = await axiosInstance({
        method: 'DELETE',
        url: `http://localhost:8082/category/delete/${item.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 204) {
        enqueueSnackbar('Xoá thành công', { variant: 'success' });
        handleCloseDeleteDiaglog();
        await onGetListCategory();
      }
    } catch (err) {
      enqueueSnackbar('Xoá thất bại', { variant: 'error' });
    }
  };

  useEffect(async () => {
    await onGetListCategory();
  }, []);
  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <div style={{ width: '90%', marginTop: '20px' }}>
        <button
          type="button"
          className="btn btn-primary bt-lg"
          style={{ minWidth: '100px' }}
          onClick={() => handleOpenAddModal()}>
          Thêm mới
        </button>
      </div>
      <TableContainer sx={{ width: '90%', marginTop: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography sx={{ fontWeight: '700' }}>Số thứ tự</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: '700' }}>Tên</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: '700' }}>Mã</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: '700' }}>Hành động</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryPageStates.data?.data?.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name || ''}</TableCell>
                <TableCell>{item.code || ''}</TableCell>
                <TableCell>
                  <button className="btn btn-primary" onClick={() => handleOpenModal(item)}>
                    <i className="far fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                      setSelectedItem(item);
                      setOpenDeleteDialog(true);
                    }}>
                    <i className="far fa-trash-alt"></i>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
            onClick={() => handleDeleteCategory(selectedItem)}>
            Xoá
          </button>
        </DialogContent>
      </Dialog>
      <AddEditModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
        onGetListCategory={onGetListCategory}
      />
    </div>
  );
}

CategoryPage.propTypes = {
  onGetListCategory: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  categoryPageStates: makeSelectCategoryList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGetListCategory: () => {
      dispatch(getListCategoryAction());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
