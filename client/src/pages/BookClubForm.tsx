import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Grid,
  GridColumn,
  GridRow,
  Header,
  Segment,
  Icon,
  Label,
} from "semantic-ui-react";
import { useStore } from "../stores/store";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { BookClubFormValues } from "../models/bookclub";
import LoadingComponent from "../components/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTextInput from "../components/form/CustomTextInput";
import CustomTextArea from "../components/form/CustomTextArea";
import CustomSelectInput from "../components/form/CustomSelectInput";
import { categoryOptions } from "../options/CategoryOptions";
import { readingPaceOptions } from "../options/ReadingPaceOptions";
import CustomDateInput from "../components/form/CustomDateInput";

export default observer(function CreateBookClub() {
  const { bookClubStore } = useStore();
  const {
    createBookClub,
    updateBookClub,
    loadBookClub,
    loadingInitial,
    uploadImage,
    uploading,
    getImageId,
    deleteImage,
    loadAllBookClubs,
    allBookClubNames,
  } = bookClubStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookClub, setBookClub] = useState<BookClubFormValues>(
    new BookClubFormValues()
  );
  const [imageURL, setImageURL] = useState("");
  const [imageChanged, setImageChanged] = useState(false);
  const [initialName, setInitialName] = useState("");

  const [file, setFile] = useState<string | undefined>();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imagePreviewContainer = document.getElementById(
      "image-preview-container"
    ) as HTMLImageElement;
    if (imagePreviewContainer) {
      imagePreviewContainer.style.display = "block";
    }
    if (e.target.files && e.target.files.length > 0) {
      setFile(URL.createObjectURL(e.target.files[0]));
      try {
        const imageUploadResult = await uploadImage(e.target.files[0]);
        const imageURL = imageUploadResult?.url;
        if (imageURL) setImageURL(imageURL);
        setImageChanged(true);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleRemoveFile = () => {
    var idToDelete = getImageId(imageURL);
    if (idToDelete) deleteImage(idToDelete);
    setFile(undefined);
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleRemoveImage = () => {
    setImageChanged(true);
    if (bookClub.image) {
      var idToDelete = getImageId(bookClub.image);
      if (idToDelete) deleteImage(idToDelete);
    }
    bookClub.image = "";
    const imagePreview = document.getElementById(
      "image-preview"
    ) as HTMLImageElement;
    if (imagePreview) {
      imagePreview.src = "";
    }
    const imagePreviewContainer = document.getElementById(
      "image-preview-container"
    ) as HTMLImageElement;
    if (imagePreviewContainer) {
      imagePreviewContainer.style.display = "none";
    }
    setFile(undefined);
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("The book club name is required")
      .test("notOneOf", "Club name already taken", function (value) {
        if (!value) return true;
        const nameExists = allBookClubNames
          .map((name) => name.toLowerCase())
          .includes(value.toLowerCase());

        if (bookClub.id) {
          return nameExists && value.toLowerCase() !== initialName.toLowerCase()
            ? false
            : true;
        } else {
          return nameExists ? false : true;
        }
      }),
    description: Yup.string().required("The book club description is required"),
    category: Yup.string().required("Club genre is required"),
    readingPace: Yup.string().required("Reading pace is required"),
    nextMeeting: Yup.string().required("Meeting date is required").nullable(),
    meetingLink: Yup.string()
      .required("A meeting link is required")
      .url("Link must be a valid URL"),
    currentBook: Yup.string().required("Current book is required"),
    currentBookAuthor: Yup.string().required("Book author is required"),
  });

  useEffect(() => {
    loadAllBookClubs();
    console.log(allBookClubNames);
    if (id) {
      loadBookClub(id).then((bookClub) => {
        setBookClub(new BookClubFormValues(bookClub));
        setInitialName(bookClub!.name);
      });
    }
  }, [id, loadBookClub, initialName]);

  function handleFormSubmit(bookClub: BookClubFormValues) {
    if (imageChanged) bookClub.image = imageURL;
    if (!bookClub.id) {
      bookClub.id = uuid();
      createBookClub(bookClub).then(() => navigate(`/bookclub/${bookClub.id}`));
    } else {
      updateBookClub(bookClub).then(() => navigate(`/bookclub/${bookClub.id}`));
    }
  }

  function handleCancel() {
    navigate(`/bookclub/${bookClub.id}`);
  }

  if (loadingInitial)
    return <LoadingComponent content="Loading book club..." />;

  return (
    <>
      {bookClub.id ? (
        <Header as="h1" className="playfair">
          Edit Book Club
        </Header>
      ) : (
        <Header as="h1" className="playfair">
          Create a Book Club
        </Header>
      )}
      <Segment clearing style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={bookClub}
          onSubmit={(values) => handleFormSubmit(values)}
        >
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <>
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
                placeholder={undefined}
              >
                <Grid columns="equal">
                  <GridRow>
                    <GridColumn width={3} textAlign="right">
                      <Header
                        as="h4"
                        content="Book Club Name"
                        className="form-label-2"
                      />
                    </GridColumn>
                    <GridColumn>
                      <CustomTextInput
                        name="name"
                        placeholder="Name"
                        id="name"
                        className="create-form-input"
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn width={3} textAlign="right">
                      <Header
                        as="h4"
                        content="Club Description"
                        className="form-label-2"
                      />
                    </GridColumn>
                    <GridColumn>
                      <CustomTextArea
                        rows={4}
                        name="description"
                        placeholder="Description"
                        id="description"
                        className="create-form-input"
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn width={3} textAlign="right">
                      <Header
                        as="h4"
                        content="Club Logo (Optional)"
                        className="form-label-2"
                      />
                    </GridColumn>
                    <GridColumn>
                      {file ? (
                        <>
                          <div className="image-preview-container">
                            <img
                              src={file}
                              className="image-preview"
                              id="image-preview"
                            />
                            <Label
                              as="a"
                              color="red"
                              onClick={handleRemoveFile}
                              className="remove-label"
                            >
                              <Icon name="remove" />
                            </Label>
                          </div>
                        </>
                      ) : bookClub.image ? (
                        <div className="image-preview-container">
                          <img
                            src={bookClub.image}
                            className="image-preview"
                            id="image-preview"
                          />
                          <Label
                            as="a"
                            color="red"
                            onClick={handleRemoveImage}
                            className="remove-label"
                          >
                            <Icon name="remove" />
                          </Label>
                        </div>
                      ) : null}
                      <input
                        type="file"
                        onChange={handleChange}
                        id="fileInput"
                        className="create-file-input"
                        style={{ marginBottom: "-10px" }}
                      />
                      <CustomTextInput
                        placeholder="image"
                        name="image"
                        id="image"
                        value={bookClub.image}
                        className="hidden"
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn width={3} textAlign="right">
                      <Header
                        as="h4"
                        content="Meeting Link"
                        className="form-label-2"
                      />
                    </GridColumn>
                    <GridColumn>
                      <CustomTextInput
                        placeholder="Meeting Link"
                        name="meetingLink"
                        id="meetingLink"
                        className="create-form-input"
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn width={3} textAlign="right">
                      <Header
                        as="h4"
                        content="Next Meeting Time"
                        className="form-label-2"
                      />
                    </GridColumn>
                    <GridColumn>
                      <CustomDateInput
                        placeholderText="Next Meeting Time"
                        name="nextMeeting"
                        showTimeSelect
                        timeCaption="time"
                        dateFormat="MMMM dd, yyyy - h:mm aa"
                        minDate={new Date()}
                        id="nextMeeting"
                        className="create-form-input-sm"
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn width={3} textAlign="right">
                      <Header
                        as="h4"
                        content="Genre"
                        className="form-label-2"
                      />
                    </GridColumn>
                    <GridColumn>
                      <CustomSelectInput
                        options={categoryOptions}
                        placeholder="Genre"
                        name="category"
                        id="category"
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn width={3} textAlign="right">
                      <Header
                        as="h4"
                        content="Reading Pace"
                        className="form-label-2"
                      />
                    </GridColumn>
                    <GridColumn>
                      <CustomSelectInput
                        options={readingPaceOptions}
                        placeholder="Reading Pace"
                        name="readingPace"
                        id="readingPace"
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn width={3} textAlign="right">
                      <Header
                        as="h4"
                        content="Current Book"
                        className="form-label-2"
                      />
                    </GridColumn>
                    <GridColumn>
                      <CustomTextInput
                        placeholder="Current Book"
                        name="currentBook"
                        id="currentBook"
                        className="create-form-input-sm"
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn width={3} textAlign="right">
                      <Header
                        as="h4"
                        content="Book Author"
                        className="form-label-2"
                      />
                    </GridColumn>
                    <GridColumn>
                      <CustomTextInput
                        placeholder="Book Author"
                        name="currentBookAuthor"
                        id="bookAuthor"
                        className="create-form-input-sm"
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn>
                      {bookClub.id ? (
                        <>
                          <Button
                            disabled={
                              isSubmitting ||
                              (!dirty && !imageChanged) ||
                              !isValid
                            }
                            loading={isSubmitting || uploading}
                            floated="right"
                            positive
                            className="btn-dark-green"
                            type="submit"
                            content="Submit"
                            id="submit"
                          />
                          <Button
                            floated="right"
                            color="grey"
                            content="Cancel"
                            onClick={handleCancel}
                            id="cancel"
                          />
                        </>
                      ) : (
                        <>
                          <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            floated="right"
                            positive
                            type="submit"
                            className="btn-dark-green"
                            content="Create"
                            id="create"
                          />
                        </>
                      )}
                    </GridColumn>
                  </GridRow>
                </Grid>
              </Form>
            </>
          )}
        </Formik>
      </Segment>
    </>
  );
});
