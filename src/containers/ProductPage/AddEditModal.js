import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { enqueueSnackbar } from 'notistack';
import axiosInstance from '../../utils/axios';
import { styled } from '@mui/material/styles';
import { v4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Grid,
  Typography,
  FormHelperText,
  Autocomplete,
  Stack,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    // borderRadius: '20px',
  },
});
const useStyles = makeStyles(() => ({
  imageContainer: {
    width: 'fit-content',
    maxWidth: '400px',
    position: 'relative',
    marginRight: '20px',
    '&:hover .overlay': {
      opacity: 1,
    },
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    opacity: 0,
    transition: '.3s ease',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    '&:hover': {
      opacity: 1,
    },
  },
}));
function AddEditModal(props) {
  const { isOpenModal, setIsOpenModal, dataEdit, setDataEdit } = props;
  const classes = useStyles();
  const stackImageRef = useRef();
  const addButtonRef = useRef();
  const [imageFileList, setImageFileList] = useState([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    register,
  } = useForm({
    defaultValues: {},
  });
  const [categoryList, setCategoryList] = useState([]);

  useEffect(async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const listCategoryRes = await axiosInstance({
      url: `${apiUrl}/category/list`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (listCategoryRes.status === 200) {
      setCategoryList(listCategoryRes.data?.data);
    }
  }, []);
  const handleCloseModal = () => {
    setDataEdit(null);
    reset();
    setValue('name', '');
    setValue('code', '');
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (dataEdit) {
      setValue('productName', dataEdit?.name);
      setValue('productDescription', dataEdit?.description);
      setValue('categoryId', dataEdit?.category);
      setValue('price', dataEdit?.price);
      setValue('discountRate', dataEdit?.discountRate);
      const imageList = [];
      for (let i = 0; i < dataEdit.images.length; i += 1) {
        const imageFile = Object.assign({}, dataEdit.images[i].image);
        imageFile['key'] = v4();
        imageList.push(imageFile);
      }
      setImageFileList(imageList);
    }
  }, [dataEdit]);

  const ImageCard = (item) => {
    return (
      <div className={classes.imageContainer} key={item.key}>
        <div className={classes.overlay}>
          <a
            href="#"
            className="icon"
            title="User Profile"
            onClick={() => removeThis(event, item.key)}
            style={{
              marginLeft: '5px',
              color: 'white',
            }}>
            <i className="fa-solid fa-xmark"></i>
          </a>
        </div>
        <img
          src={
            item.blobSrc
              ? item.blobSrc
              : `${import.meta.env.VITE_API_URL}/storage/images/${item.filePath}`
          }
          alt="1"
          className="image-card"
          style={{
            width: '300px',
            height: 'auto',
          }}
        />
      </div>
    );
  };

  const removeThis = (event, key) => {
    const newImageList = imageFileList.filter((item) => item.key !== key);
    setImageFileList(newImageList);
  };

  const clickAddButton = () => {
    addButtonRef.current.click();
  };

  const addNewFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      file['blobSrc'] = e.target.result;
      file['key'] = v4();
      const newImageFileList = [...imageFileList];
      setImageFileList([...newImageFileList, file]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    // try {
    //   const dataForm = {
    //     name: data?.name || '',
    //     code: data?.code || '',
    //   };
    //   if (dataEdit) {
    //     const updateCategory = await axiosInstance({
    //       method: 'PATCH',
    //       url: `${import.meta.env.VITE_API_URL}/category/update/${dataEdit.id}`,
    //       data: dataForm,
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //     if (updateCategory.status === 200) {
    //       enqueueSnackbar('Thao tác thành công', { variant: 'success' });
    //       await onGetListCategory();
    //       handleCloseModal();
    //     }
    //   } else {
    //     const createCategory = await axiosInstance({
    //       method: 'POST',
    //       url: `${import.meta.env.VITE_API_URL}/category/store`,
    //       data: dataForm,
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //     if (createCategory.status === 201) {
    //       enqueueSnackbar('Thao tác thành công', { variant: 'success' });
    //       await onGetListCategory();
    //       handleCloseModal();
    //     }
    //   }
    // } catch (err) {
    //   enqueueSnackbar(err?.message || 'Thao tác thất bại', { variant: 'error' });
    // }
    console.log(data);
    console.log(imageFileList);
  };
  return (
    <Dialog open={isOpenModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography style={{ fontWeight: 'bold' }}>
          {dataEdit ? 'Edit Product' : 'Add Product'}
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
                width: '100%',
                marginBottom: '20px',
              }}>
              <Controller
                name="productName"
                rules={{
                  required: {
                    value: true,
                    message: 'Không được để trống',
                  },
                }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CustomTextField
                    label="Tên sản phẩm"
                    value={value}
                    onChange={onChange}
                    sx={{
                      width: '100%',
                    }}
                  />
                )}
              />
              <FormHelperText error>{errors?.productName?.message}</FormHelperText>
            </Grid>
            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: 'fit-content',
                marginBottom: '20px',
              }}>
              <Controller
                name="productDescription"
                rules={{
                  required: {
                    value: true,
                    message: 'Không được để trống',
                  },
                }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    style={{
                      width: '100%',
                    }}
                  />
                )}
              />
              <FormHelperText error>{errors?.productDescription?.message}</FormHelperText>
            </Grid>
            <Grid
              item
              container
              sx={{
                width: '100%',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Grid container sx={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'Không được để trống',
                      },
                    }}
                    name="categoryId"
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        options={categoryList || []}
                        value={value || null}
                        getOptionLabel={(option) => option.name}
                        size="small"
                        onChange={(e, options) => {
                          onChange(options);
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" placeholder="Chọn danh mục" />
                        )}
                      />
                    )}
                  />
                  <FormHelperText error>{errors.fromUnitId?.message}</FormHelperText>
                </Grid>
                <Grid item xs={12} md={1} />
                <Grid item xs={12} md={4}>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      id="productPrice"
                      {...register('price', { required: true })}
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text"
                        style={{
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                        }}>
                        Đồng
                      </span>
                    </div>
                  </div>
                  <FormHelperText error>
                    {errors?.price?.type === 'required' ? 'Không được để trống' : ''}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} md={1} />
                <Grid item xs={12} md={2}>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      id="discountRate"
                      {...register('discountRate', { required: true })}
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text"
                        style={{
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                        }}>
                        %
                      </span>
                    </div>
                  </div>
                  <FormHelperText error>
                    {errors?.discountRate?.type === 'required' ? 'Không được để trống' : ''}
                  </FormHelperText>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                marginBottom: '20px',
              }}>
              <div style={{ display: 'flex', overflowX: 'auto', overflowY: 'hidden' }}>
                <Stack direction="row" ref={stackImageRef}>
                  {imageFileList.map((item) => {
                    return ImageCard(item);
                  })}
                  <div className="image-add-button">
                    <button
                      type="button"
                      className="button-add-file btn btn-primary "
                      onClick={clickAddButton}>
                      <i className="fa-solid fa-plus fa-2xl"></i>
                      <input
                        type="file"
                        ref={addButtonRef}
                        className="newFileField"
                        onChange={addNewFile}
                        style={{ display: 'none' }}
                      />
                    </button>
                  </div>
                </Stack>
              </div>
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
};

export default AddEditModal;
