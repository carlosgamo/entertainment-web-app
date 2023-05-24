import { Formik } from "formik";
import * as Yup from "yup";
import "./EditTitle.css";
import { updateTitle } from "../../../config/firebase";
import { useState } from "react";

const EditTitle = ({ item, categories }) => {
  const [messageVisible, setMessageVisible] = useState(false);

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
    { id, name, category, rating, year, isTrending, thumbnail },
    { setSubmitting, setErrors }
  ) => {
    try {
      const credentialUser = await updateTitle({
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
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim("Invalid name").required("Name required"),
    id: Yup.string().trim().required("ID required"),
    category: Yup.string().trim().required("Category required"),
    rating: Yup.string().trim().required("Rating required"),
    year: Yup.number().required("Year required"),
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
          {({
            values,
            setFieldValue,
            handleSubmit,
            handleChange,
            errors,
            touched,
            resetForm,
            handleBlur,
            dirty,
          }) => (
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
                    className="edit-input w-28"
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
                  <label htmlFor="title-isTrending">Trending</label>
                  <input
                    type="checkbox"
                    id="title-isTrending"
                    name="trending"
                    placeholder="Trending"
                    checked={values.isTrending}
                    className="ml-6"
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
                {/* <input type='file' /> */}
                <img
                  className="object-contain h-36 w-80"
                  src={item.thumbnail.regular.small}
                />
              </div>

              <button
                type="submit"
                disabled={!dirty}
                className="control-panel-button absolute bottom-4 right-8"
              >
                Save changes
              </button>
              {messageVisible ? (
                <div className="title-updated-message">
                  Title updated successfully!
                </div>
              ) : null}
              <button
                type="button"
                className="control-panel-button absolute top-6 right-12 "
                onClick={() => addNewTitle()}
              >
                New title
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default EditTitle;
