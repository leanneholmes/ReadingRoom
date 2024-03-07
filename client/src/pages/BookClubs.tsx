import { useEffect, useState } from "react";
import { Container, Header, Loader } from "semantic-ui-react";
import BookClubList from "../components/BookClubList";
import LoadingComponent from "../components/LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { PagingParams } from "../models/pagination";
import InfiniteScroll from "react-infinite-scroller";

function BookClubs() {
  const { bookClubStore } = useStore();
  const { bookClubsAsMap } = bookClubStore;
  const { loadBookClubs, setPagingParams, pagination } = bookClubStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadBookClubs().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    loadBookClubs();
  }, [loadBookClubs]);

  if (bookClubStore.loadingInitial && !loadingNext) return <LoadingComponent />;
  return (
    <Container style={{ marginTop: "6em", paddingBottom: "3em" }}>
      <Header as="h1" className="playfair" style={{ marginBottom: "30px" }}>
        All Book Clubs
      </Header>
      <InfiniteScroll
        pageStart={0}
        loadMore={handleGetNext}
        hasMore={
          !loadingNext &&
          !!pagination &&
          pagination.currentPage < pagination.totalPages
        }
        initialLoad={false}
      >
        <BookClubList bookClubs={bookClubsAsMap} />
      </InfiniteScroll>
      <div style={{ textAlign: "center" }}>
        <Loader active={loadingNext} />
      </div>
    </Container>
  );
}

export default observer(BookClubs);
