import React from 'react';
import { useField } from 'formik';
import EditorWYSIWYG from '../EditorWYSIWYG';
import { useState, useEffect } from 'react';
import api from '../../domain/api';
import { URI } from '../../domain/constant';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
export { URI as FORM_URI };
export const SelectBox = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='form-group'>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <select
        id={props.name}
        className='form-control custom-select'
        {...field}
        {...props}
      />
      {meta.error ? <div className='text-danger'>{meta.error}</div> : null}
    </div>
  );
};

export const TextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className='form-group'>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <input id={props.name} className='form-control' {...field} {...props} />
      {meta.error ? <div className='text-danger'>{meta.error}</div> : null}
    </div>
  );
};

export const TextInputHorizontal = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className='form-group'>
      <div className='col-md-2'>
        <label htmlFor={props.id || props.name}>{label}</label>
      </div>
      <div className='col-md-10'>
        <input className='form-control' {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className='text-danger'>{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export const TextArea = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className='form-group'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea
        id={props.name}
        className='form-control'
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className='text-danger'>{meta.error}</div>
      ) : null}
    </div>
  );
};
export const RadioButton = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <input type='radio' className='form-check-input' {...field} {...props} />
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? (
        <div className='text-danger'>{meta.error}</div>
      ) : null}
    </>
  );
};

export const CheckBox = ({ label, children, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className='pt-3'> {label} </label>
      <div className='form-check form-switch'>
        <div>
          <input
            className='form-check-input'
            type='checkbox'
            name={field.name}
            checked={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            role='switch'
            id={props.name}
          />

          {meta.touched && meta.error ? (
            <div className='error'>{meta.error}</div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export const HTMLEditor = ({ title, item, formik, col, value }) => {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className={col ? `col-md-${col}` : 'col-md-12'}>
      <div className='form-group'>
        <div className='d-flex justify-content-between'>
          <div>
            <label> {title} </label>
          </div>
          <div style={{ padding: '0px 10px' }}>
            <a
              onClick={() => setShowCode(!showCode)}
              className='btn btn-warning text-black'
            >
              {' '}
              View {showCode ? 'Editor' : 'Code'}
            </a>
          </div>
        </div>
        {showCode ? (
          <textarea
            id={item}
            className='form-control'
            value={value ? value : ''}
            name={item}
            onChange={formik.handleChange}
            rows={9}
          />
        ) : (
          <EditorWYSIWYG
            value={value ? value : ''}
            name={item}
            changeValue={(value) => {
              formik.setFieldValue(item, value);
            }}
          />
        )}

        {formik.errors && formik.errors[item] && (
          <p className='text-danger'> Required </p>
        )}
      </div>
    </div>
  );
};

export const FileUpload = ({ title, item, formik, col, edit, value }) => {
  const [loading, setLoading] = useState(false);
  const uploadImage = async (image) => {
    try {
      setLoading(true);
      const newForm = new FormData();
      newForm.append(`image`, image, image.name);
      const { data } = await api.post(`/upload/`, newForm);
      // console.log(data);
      formik.setFieldValue(item, data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='col-md-6'>
      <label> {title} </label>
      <br />
      {!loading ? (
        <>
          {value ? (
            <div>
              <img
                src={`${URI}${value}`}
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
              />
              <a
                className='btn btn-sm btn-danger'
                onClick={() => formik.setFieldValue(item, null)}
              >
                {' '}
                <i className='fa fa-trash'></i>{' '}
              </a>
            </div>
          ) : (
            <input
              type='file'
              className='form-control-file'
              onChange={(e) => uploadImage(e.target.files[0])}
            />
          )}
        </>
      ) : (
        <div>
          <Skeleton height={10} />
        </div>
      )}
    </div>
  );
};

export const VideoUpload = ({ title, item, formik, col, edit, value }) => {
  const [loading, setLoading] = useState(false);
  const uploadVideo = async (video) => {
    try {
      setLoading(true);
      const newForm = new FormData();
      newForm.append('video', video, video.name);
      const { data } = await api.post('/upload/video', newForm);
      formik.setFieldValue(item, data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className='col-md-6'>
      <label> {title} </label>
      <br />
      {!loading ? (
        <>
          {value ? (
            <div>
              <video
                src={`${URI}${value}`}
                style={{
                  width: '250px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
                controls
                muted
              />
              <br />
              <a
                className='btn btn-sm btn-danger mt-2'
                onClick={() => formik.setFieldValue(item, null)}
              >
                <i className='fa fa-trash'></i> Remove Video
              </a>
            </div>
          ) : (
            <input
              type='file'
              className='form-control-file'
              accept='video/mp4,video/webm,video/quicktime,video/*'
              onChange={(e) => uploadVideo(e.target.files[0])}
            />
          )}
        </>
      ) : (
        <div>
          <p>Uploading video...</p>
          <Skeleton height={10} />
        </div>
      )}
    </div>
  );
};

export const GalleryUpload = ({ title, item, formik, col, edit, value }) => {
  const [loading, setLoading] = useState(false);
  const uploadImage = async (galleryData) => {
    try {
      setLoading(true);
      const newForm = new FormData();
      if (galleryData.length > 0) {
        Array.from(galleryData).forEach((image, index) => {
          newForm.append(`gallery`, image, image.name);
        });

        // newForm.append(`gallery`, image, image.name);
        const { data } = await api.post(`/upload/gallery`, newForm);
        console.log(' Data of gallery ', data);
        let newDataWithFreshData = value ? value : [];
        formik.setFieldValue(item, [...newDataWithFreshData, ...data]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const grid = 2;

  const getItemStyle = (isDragging, draggableStyle) => ({
    //   userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    width: '120px',
    background: isDragging ? 'lightblue' : '#f1f1f1',
    borderRadius: 5,
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: '250px',
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (value) {
      const arrayToFill = value.map((img, index) => {
        console.log('Image', img);
        return {
          id: `item-${index}`,
          dataURL: img,
        };
      });
      setItems(arrayToFill ? arrayToFill : []);
    }
  }, [value]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    console.log({ reorderedItems });

    const itemInFormik = reorderedItems.map((item) => item.dataURL);
    formik.setFieldValue(item, itemInFormik);
    // setItems(reorderedItems);
  };

  const removeItem = (id) => {
    const newArray = items.filter((val) => val.id !== id);
    const itemInFormik = newArray.map((item) => item.dataURL);
    formik.setFieldValue(item, itemInFormik);
  };

  return (
    <div className='col-md-6'>
      <label> {title} </label>
      <br />
      {!loading ? (
        <>
          {value && value.length > 0 ? (
            <>
              <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId='droppable'>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        {items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div style={{ display: 'inline-flex' }}>
                                <div>
                                  <div
                                    className='card'
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                    )}
                                  >
                                    <div>
                                      <img
                                        src={`${URI}${item.dataURL}`}
                                        style={{
                                          width: '100px',
                                          height: '100px',
                                          objectFit: 'contain',
                                        }}
                                      />
                                      <a
                                        className='btn-sm btn-danger'
                                        onClick={() => removeItem(item.id)}
                                      >
                                        <i className='fa fa-trash'> </i>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
              <div style={{ padding: '10px 10px' }}>
                <label style={{ paddingRight: '10px' }}> Add More </label>
                <input
                  type='file'
                  className='form-control-file'
                  multiple
                  onChange={(e) => uploadImage(e.target.files)}
                />
              </div>
            </>
          ) : (
            <input
              type='file'
              className='form-control-file'
              multiple
              onChange={(e) => uploadImage(e.target.files)}
            />
          )}
        </>
      ) : (
        <div>
          <Skeleton height={10} />
        </div>
      )}
    </div>
  );
};
