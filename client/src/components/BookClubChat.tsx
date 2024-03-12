import { observer } from "mobx-react-lite";
import { Segment, Header, Comment, Form, Button } from "semantic-ui-react";

export default observer(function BookClubChat() {
  return (
    <div style={{ width: "85%", marginTop: "20px" }}>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        style={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        <Header as="h4">Club Message Board</Header>
      </Segment>
      <Segment attached clearing style={{ marginBottom: "20px" }}>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src="/assets/user.png" />
            <Comment.Content>
              <Comment.Author as="a">Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Comment>
            <Comment.Avatar src="/assets/user.png" />
            <Comment.Content>
              <Comment.Author as="a">Joe Henderson</Comment.Author>
              <Comment.Metadata>
                <div>5 days ago</div>
              </Comment.Metadata>
              <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Form reply>
            <Form.TextArea style={{ height: "100px" }} />
            <Button
              floated="right"
              content="Post Message"
              labelPosition="left"
              icon="edit"
              primary
              className="btn-dark-blue"
            />
          </Form>
        </Comment.Group>
      </Segment>
    </div>
  );
});
