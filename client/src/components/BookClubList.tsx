import {
  Grid,
  Image,
  Item,
  Button,
  GridRow,
  GridColumn,
  Header,
  Label,
  Icon,
  Segment,
  Select,
} from "semantic-ui-react";
import { BookClub } from "../models/bookclub";
import { Link } from "react-router-dom";
import { categoryOptions } from "../options/CategoryOptions";
import { readingPaceOptions } from "../options/ReadingPaceOptions";

interface Props {
  bookClubs: BookClub[];
}

export default function BookClubList({ bookClubs }: Props) {
  return (
    <>
      <Select
        options={categoryOptions}
        placeholder="Filter by Category"
        name="category"
        style={{ backgroundColor: "#f3f4f6", borderColor: "#f3f4f6" }}
      />
      <Select
        options={readingPaceOptions}
        placeholder="Filter by Pace"
        name="category"
        style={{
          backgroundColor: "#f3f4f6",
          borderColor: "#f3f4f6",
          marginLeft: "10px",
        }}
      />
      <Button
        color="black"
        className="btn-dark-blue"
        content="Reset Filters"
        style={{ marginLeft: "10px" }}
      />
      {bookClubs.map((bookclub) => (
        <Segment style={{ marginBottom: "25px" }}>
          <Grid>
            <GridRow key={bookclub.id} stretched style={{ fontSize: "1.05em" }}>
              <GridColumn width={4}>
                <Image src={`/assets/${bookclub.category}.png`} />
              </GridColumn>
              <GridColumn width={9}>
                <GridRow style={{ height: "30%" }}>
                  <Header size="large">{bookclub.name}</Header>
                  {bookclub.members?.length}{" "}
                  {bookclub.members?.length === 1 ? "Member" : "Members"}
                </GridRow>
                <GridRow style={{ height: "50%", marginTop: "10px" }}>
                  <p>{bookclub.description}</p>
                  <p>
                    {bookclub.isOwner && (
                      <Item.Description>
                        <Label
                          basic
                          color="green"
                          style={{ fontSize: "0.9em" }}
                        >
                          You are the owner of this club
                        </Label>
                      </Item.Description>
                    )}
                    {bookclub.isMember && !bookclub.isOwner && (
                      <Item.Description>
                        <Label
                          basic
                          color="orange"
                          style={{ fontSize: "0.9em" }}
                        >
                          You are a member of this club
                        </Label>
                      </Item.Description>
                    )}
                  </p>
                </GridRow>
                <GridRow style={{ height: "20%" }}>
                  <Label
                    size="large"
                    as="a"
                    style={{ backgroundColor: "#06282d", color: "#fff" }}
                  >
                    <Icon name="book" />
                    {bookclub.category}
                  </Label>
                  <Label size="large" color="black" as="a">
                    <Icon name="time" />
                    {bookclub.readingPace} Pace
                  </Label>
                </GridRow>
              </GridColumn>
              <GridColumn width={3}>
                <GridRow style={{ height: "20%" }}>
                  <Button
                    as={Link}
                    to={`/bookclub/${bookclub.id}`}
                    floated="right"
                    icon
                  >
                    View Club <Icon name="chevron right" />
                  </Button>
                </GridRow>
              </GridColumn>
            </GridRow>
          </Grid>
        </Segment>
      ))}
    </>
  );
}
