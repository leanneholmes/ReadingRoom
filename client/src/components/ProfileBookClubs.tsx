import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Grid, Header, Image, Loader, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useStore } from "../stores/store";
import { UserBookClub } from "../models/profile";

interface Props {
  username?: string;
}

export default observer(function ProfileBookClubs({ username }: Props) {
  const { profileStore } = useStore();
  const { loadUserBookClubs, loadingBookClubs, userBookClubs } = profileStore;

  useEffect(() => {
    if (username) loadUserBookClubs(username);
  }, [loadUserBookClubs, username]);

  if (loadingBookClubs) return <Loader />;

  if (userBookClubs.length < 1)
    return (
      <Grid>
        <Grid.Column width={16}>
          <Header as="h2" style={{ marginBottom: "5px" }}>
            Book Clubs
          </Header>
          This user is not a member of any book clubs.
        </Grid.Column>
      </Grid>
    );

  return (
    <>
      <Header as="h2" style={{ marginBottom: "0", marginLeft: "10px" }}>
        Book Clubs
      </Header>
      <div
        style={{
          marginBottom: "30px",
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {userBookClubs.map((bookClub: UserBookClub) => (
          <div
            key={bookClub.id}
            style={{
              width: "33.3333333333%",
              padding: "10px",
              boxSizing: "border-box",
            }}
          >
            <Segment
              as={Link}
              to={`/bookclub/${bookClub.id}`}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                height: "100%",
                paddingLeft: "0",
                paddingTop: "0",
                paddingBottom: "0",
                paddingRight: "15px",
                borderRadius: "5px",
              }}
            >
              <div>
                <Image
                  src={
                    bookClub.image
                      ? bookClub.image
                      : `/assets/${bookClub.category}.png`
                  }
                  width="120"
                  style={{
                    objectFit: "cover",
                    borderRadius: "5px 0px 0px 5px",
                  }}
                />
              </div>
              <div
                style={{
                  paddingLeft: "10px",
                  paddingTop: "5px",
                  paddingRight: "10px",
                  paddingBottom: "5px",
                  marginTop: "-5px",
                }}
              >
                <div>
                  <Header
                    as="h4"
                    style={{
                      marginBottom: 0,
                      color: "#384776",
                      fontSize: "1.2em",
                    }}
                  >
                    {bookClub.name}
                  </Header>
                  <span style={{ color: "grey", fontSize: "0.95em" }}>
                    <Icon name="bookmark outline" />
                    {bookClub.category}
                    <Icon name="clock outline" style={{ marginLeft: "7px" }} />
                    {bookClub.readingPace}
                  </span>
                </div>
              </div>
            </Segment>
          </div>
        ))}
      </div>
    </>
  );
});
