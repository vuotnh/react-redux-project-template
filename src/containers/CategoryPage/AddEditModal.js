import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { enqueueSnackbar } from 'notistack';
import axiosInstance from '../../utils/axios';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Grid,
  Typography,
  FormHelperText,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

function AddEditModal(props) {
  const { isOpenModal, setIsOpenModal, dataEdit, setDataEdit, onGetListCategory } = props;
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      code: '',
    },
  });
  const handleCloseModal = () => {
    setDataEdit(null);
    reset();
    setValue('name', '');
    setValue('code', '');
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (dataEdit) {
      setValue('name', dataEdit.name || '');
      setValue('code', dataEdit.code || '');
    }
  }, [dataEdit]);

  const onSubmit = async (data) => {
    try {
      const dataForm = {
        name: data?.name || '',
        code: data?.code || '',
      };
      if (dataEdit) {
        const updateCategory = await axiosInstance({
          method: 'PATCH',
          url: `${import.meta.env.VITE_API_URL}/category/update/${dataEdit.id}`,
          data: dataForm,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (updateCategory.status === 200) {
          enqueueSnackbar('Thao tác thành công', { variant: 'success' });
          await onGetListCategory();
          handleCloseModal();
        }
      } else {
        const createCategory = await axiosInstance({
          method: 'POST',
          url: `${import.meta.env.VITE_API_URL}/category/store`,
          data: dataForm,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (createCategory.status === 201) {
          enqueueSnackbar('Thao tác thành công', { variant: 'success' });
          await onGetListCategory();
          handleCloseModal();
        }
      }
    } catch (err) {
      enqueueSnackbar(err?.message || 'Thao tác thất bại', { variant: 'error' });
    }
  };
  return (
    <Dialog open={isOpenModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography style={{ fontWeight: 'bold' }}>
          {dataEdit ? 'Edit category' : 'Add category'}
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                marginBottom: '20px',
              }}>
              <Controller
                name="name"
                rules={{
                  required: {
                    value: true,
                    message: 'Không được để trống',
                  },
                }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Tên danh mục"
                    value={value}
                    onChange={onChange}
                    sx={{
                      width: '80%',
                    }}
                  />
                )}
              />
              <FormHelperText error>{errors?.name?.message}</FormHelperText>
            </Grid>
            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                marginBottom: '20px',
              }}>
              <Controller
                name="code"
                rules={{
                  required: {
                    value: true,
                    message: 'Không được để trống',
                  },
                }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Mã danh mục"
                    value={value}
                    onChange={onChange}
                    sx={{
                      width: '80%',
                    }}
                  />
                )}
              />
              <FormHelperText error>{errors?.code?.message}</FormHelperText>
            </Grid>
            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                marginBottom: '20px',
              }}>
              <button
                className="btn btn-secondary btn-lg"
                type="button"
                onClick={() => {
                  handleCloseModal();
                }}>
                Huỷ
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ marginLeft: '30px' }}>
                Lưu lại
              </button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}

AddEditModal.propTypes = {
  isOpenModal: PropTypes.bool,
  setIsOpenModal: PropTypes.func,
  dataEdit: PropTypes.object,
  setDataEdit: PropTypes.func,
  onGetListCategory: PropTypes.func,
};

export default AddEditModal;
