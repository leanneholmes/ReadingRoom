import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, Header, Icon, Image, Confirm } from "semantic-ui-react";
import { useStore } from "../stores/store";
import LoadingComponent from "../components/LoadingComponent";
import { observer } from "mobx-react-lite";
import PhotoWidgetDropzone from "../components/PhotoWidgetDropzone";
import EditProfileForm from "../components/EditProfileForm";

export default observer(function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [files, setFiles] = useState<any>([]);
  const { username } = useParams();
  const { profileStore } = useStore();
  const {
    loadingProfile,
    loadProfile,
    profile,
    uploadPhoto,
    isCurrentUser,
    uploading,
  } = profileStore;

  function myCustomButton() {
    if (files.length > 0)
      return (
        <Button positive onClick={handleConfirm}>
          Upload
        </Button>
      );
    return (
      <Button disabled positive onClick={handleConfirm}>
        Upload
      </Button>
    );
  }

  function handleEdit() {
    setEditMode(!editMode);
  }

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file);
  }

  function showConfirm() {
    setOpen(true);
  }

  function handleConfirm() {
    if (files[0]) {
      handlePhotoUpload(files[0]);
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
      setFiles([]);
    } else {
      console.log("handle this case");
    }
    setOpen(false);
  }

  function handleCancel() {
    if (files.length > 0) {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    }
    setFiles([]);
    setOpen(false);
  }

  useEffect(() => {
    if (username) loadProfile(username);
  }, [loadProfile, username]);

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  if (loadingProfile) return <LoadingComponent content="Loading Profile..." />;
  if (uploading) return <LoadingComponent content="Loading Changes..." />;

  return (
    <>
      <Header as="h1">View Profile</Header>
      <Grid
        style={{
          marginTop: "10px",
        }}
      >
        <Grid.Row>
          <Grid.Column width={4}>
            <Image
              avatar
              size="small"
              src={profile?.image || "/assets/user.png"}
            />
            {isCurrentUser && (
              <Button
                circular
                icon
                color="teal"
                style={{ position: "absolute", left: "42%" }}
                onClick={showConfirm}
              >
                <Icon name="pencil" />
              </Button>
            )}
          </Grid.Column>
          <Grid.Column width={9}>
            <Confirm
              confirmButton={myCustomButton}
              onCancel={handleCancel}
              onConfirm={handleConfirm}
              content={
                files && files.length > 0 ? (
                  <div style={{ textAlign: "center" }}>
                    <PhotoWidgetDropzone setFiles={setFiles} />
                    <Header as="h4" style={{ marginTop: "0px" }}>
                      Image Preview:
                    </Header>
                    <Image
                      centered
                      src={files[0].preview}
                      style={{
                        width: "150px",
                        height: "150px",
                        marginBottom: "10px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ) : (
                  <PhotoWidgetDropzone setFiles={setFiles} />
                )
              }
              open={open}
              style={{ marginTop: "-10%" }}
            ></Confirm>
            <Header as="h2">{profile?.displayName}</Header>

            {editMode ? (
              <EditProfileForm setEditMode={setEditMode} />
            ) : (
              <span style={{ whiteSpace: "pre-wrap" }}>{profile?.bio}</span>
            )}
          </Grid.Column>
          <Grid.Column width={3}>
            {isCurrentUser && !editMode && (
              <Button
                basic
                color="orange"
                content="Edit Profile"
                onClick={handleEdit}
              />
            )}

            {isCurrentUser && editMode && (
              <Button content="Cancel" onClick={handleEdit} />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
});
