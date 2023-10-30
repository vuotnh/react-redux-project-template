import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectUserList from './selectors';
import { getUserListAction } from './actions';
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

function UserPage(props) {
  const { onGetListUser, userPageStates } = props;

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

  const handleDeleteUser = async (item) => {
    try {
      const res = await axiosInstance({
        method: 'DELETE',
        url: `${import.meta.env.VITE_API_URL}/user/deleteUser/${item.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 204) {
        enqueueSnackbar('Xoá thành công', { variant: 'success' });
        handleCloseDeleteDiaglog();
        await onGetListUser();
      }
    } catch (err) {
      enqueueSnackbar('Xoá thất bại', { variant: 'error' });
    }
  };

  useEffect(async () => {
    await onGetListUser();
  }, []);
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <TableContainer sx={{ width: '90%', marginTop: '20px' }}>
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
                <Typography sx={{ fontWeight: '700' }}>Email</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: '700' }}>Số điện thoại</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: '700' }}>Hành động</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userPageStates.data?.data?.map((item, index) => (
              <TableRow key={item.email}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{`${item.firstName} ${item.lastName}`}</TableCell>
                <TableCell>{item.email || ''}</TableCell>
                <TableCell>{item.phone || ''}</TableCell>
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
            onClick={() => handleDeleteUser(selectedItem)}>
            Xoá
          </button>
        </DialogContent>
      </Dialog>
      <AddEditModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
        onGetListUser={onGetListUser}
      />
    </div>
  );
}

UserPage.propTypes = {
  onGetListUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userPageStates: makeSelectUserList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGetListUser: () => {
      dispatch(getUserListAction());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
