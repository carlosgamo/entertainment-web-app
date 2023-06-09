import { Formik } from "formik";
import * as Yup from "yup";
import "./EditTitle.css";
import { updateTitle } from "../../../config/firebase";
import { useState } from "react";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"

const EditTitle = ({ item, categories }) => {

  const MAX_FILE_SIZE = 1000000;

  const [messageVisible, setMessageVisible] = useState(false);

  const [uploadProgress, setUploadProgress] = useState("");

  const [uploadedImage, setUploadedImage] = useState(null);

  function saveChangesMessage() {
    setMessageVisible(true);

    setTimeout(() => {
      setMessageVisible(false);
    }, 3000);
  }

  function addNewTitle() {
    console.log("NEW TITLE");
  }

  const onSubmit = async (
    { id, name, category, rating, year, isTrending, file, thumbnail },
    { setSubmitting, setErrors }
    ) => {

      if (file){
        const storage = getStorage();
        const storageRef = ref(storage, `thumbnail/${id}.jpg`);
        const metadata = {contentType: "image/jpg"};  
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    
        uploadTask.on("state_changed", (snapshot) => {
          const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
          setUploadProgress("Upload is " + progress + "% done")
          
          switch (snapshot.state) {
            case "paused":
              setUploadProgress("Upload is paused")
              break;
            case "running":
              setUploadProgress("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              thumbnail = downloadURL
              setUploadProgress("Upload complete!")
              if (downloadURL) setUploadedImage(downloadURL)
              try {
                updateTitle({
                  id,
                  name,
                  category,
                  rating,
                  year,
                  isTrending,
                  thumbnail,
                });
              saveChangesMessage();
              } catch (error) {
                console.log(Error);
              }
            }
          );
        })
      }else{
        try {
          updateTitle({
            id,
            name,
            category,
            rating,
            year,
            isTrending,
            thumbnail,
          });
        saveChangesMessage();
        } catch (error) {
          console.log(Error);
        }
      }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim("Invalid name").required("Name required"),
    id: Yup.string().trim().required("ID required"),
    category: Yup.string().trim().required("Category required"),
    rating: Yup.string().trim().required("Rating required"),
    year: Yup.number().required("Year required"),
    file: Yup.mixed()
              .test({
                message: "Only PNG/JPG/JPEG smaller than 1MB.",
                test: (file) => {
                      if (file){
                        const formatIsValid = ((file?.type === 'image/jpg') ||
                        (file?.type === 'image/jpeg') ||
                        (file?.type === 'image/png'));
                        const sizeIsValid = file?.size < MAX_FILE_SIZE;

                        if(formatIsValid && sizeIsValid){
                          return true
                        }
                      }else{
                        return true
                      }
                    },
              })
  });

  return (
    <>
      <div className="edit-title-container">
        <div className="edit-h1">Edit title</div>
        <Formik
          initialValues={{
            name: item.title,
            id: item.id,
            category: item.category,
            rating: item.rating,
            year: item.year,
            isTrending: item.isTrending,
            thumbnail: item.thumbnail,
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue, handleSubmit, handleChange, errors, touched, resetForm, handleBlur, dirty}) => (
            <form onSubmit={handleSubmit}>
              <div className="mr-2 ml-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="title-name"
                  className="edit-input w-full"
                  placeholder="Name"
                  value={values.name}
                  onChange={handleChange}
                  name="name"
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className="form-errors">
                {errors.name && touched.name && errors.name}
              </div>
              <div className="edit-title-grid">
                <div>
                  <label htmlFor="title-id">ID</label>
                  <input
                    type="text"
                    id="title-id"
                    className="edit-input w-20"
                    placeholder="ID"
                    value={values.id}
                    onChange={handleChange}
                    name="id"
                    onBlur={handleBlur}
                    disabled={true}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="title-category">Category</label>
                  <select
                    id="title-category"
                    className="edit-input w-auto"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {categories ? (
                      categories.map((category) => {
                        return (
                          <option key={category.name} value={category.name}>
                            {category.name}
                          </option>
                        );
                      })
                    ) : (
                      <option>No categories available</option>
                    )}
                  </select>
                </div>
                <div>
                  <label htmlFor="title-rating">Rating</label>
                  <input
                    type="text"
                    id="title-rating"
                    name="rating"
                    className="edit-input w-20"
                    placeholder="Rating"
                    value={values.rating}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="title-year">Year</label>
                  <input
                    type="number"
                    id="title-year"
                    name="year"
                    className="edit-input w-20"
                    placeholder="Year"
                    value={values.year}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </div>
                <div className="trending-checkbox-container">
                  <label htmlFor="title-isTrending" className="pt-1">Trending</label>
                  <input
                    type="checkbox"
                    id="title-isTrending"
                    name="trending"
                    placeholder="Trending"
                    checked={values.isTrending}
                    className="trending-checkbox"
                    value={values.isTrending}
                    onChange={handleChange}
                    onClick={() =>
                      setFieldValue("isTrending", !values.isTrending)
                    }
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="mb-10 mt-4">
                <div className="form-errors">
                  {errors.file && touched.file && errors.file}
                </div>
                <input 
                      type='file'
                      id="title-thumbnail-input"
                      name="thumbnail-input"
                      className="input-file-thumbnail"
                      onChange={(event) => {
                        setFieldValue("file", event.currentTarget.files[0]);
                      }}
                />
                <p className="input-helper-text">PNG, JPG or JPEG (MAX. 1MB).</p>
                <div className="upload-progress">
                  {uploadProgress ? uploadProgress : null}
                </div>  
                <div className="">
                  {uploadedImage 
                      ? <div>
                          <p className="input-helper-text">New image:</p>
                          <img className="thumbnail-preview-img" src={uploadedImage}/> 
                        </div> 
                      : <div>
                          <p className="input-helper-text">Preview:</p>
                          <img
                              className="thumbnail-preview-img"
                              src={values.thumbnail}
                            />
                        </div>
                  }
                </div>              

              </div>

              <button
                type="submit"
                // disabled={dirty}
                className="control-panel-button edit-title-save-changes"
              >
                Save changes
              </button>
              {messageVisible ? (
                <div className="title-updated-message">
                  Title updated successfully!
                </div>
              ) : null}
              {/* <button
                type="button"
                className="control-panel-button absolute top-4 right-12"
                onClick={() => addNewTitle()}
              >
                New title
              </button> */}
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default EditTitle;
