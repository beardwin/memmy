import React from "react";
import { FlashList } from "@shopify/flash-list";
import { PostView } from "lemmy-js-client";
import useProfile from "../../../hooks/profile/useProfile";
import CompactFeedItem from "../Feed/components/CompactFeedItem/CompactFeedItem";
import NoResultView from "../../common/NoResultView";
import LoadingView from "../../common/Loading/LoadingView";
import LoadingErrorView from "../../common/Loading/LoadingErrorView";
import NotFoundView from "../../common/Loading/NotFoundView";
import RefreshControl from "../../common/RefreshControl";

interface IProps {
  route: any;
}

function UserSavedPostsScreen({ route }: IProps) {
  const profile = useProfile(false, route?.params?.fullUsername);

  const keyExtractor = (item: PostView) => item.post.id.toString();

  const renderItem = ({ item }: { item: PostView }) => (
    <CompactFeedItem post={item as PostView} />
  );

  if (!profile.profile) {
    return <LoadingView />;
  }

  if (profile.error) {
    return <LoadingErrorView onRetryPress={() => profile.doLoad(true)} />;
  }

  if (profile.notFound) {
    return <NotFoundView />;
  }

  return (
    <FlashList
      renderItem={renderItem}
      estimatedItemSize={150}
      data={profile.savedPosts}
      keyExtractor={keyExtractor}
      ListEmptyComponent={<NoResultView type="profilePosts" p={4} />}
      refreshing={profile.loading}
      refreshControl={
        <RefreshControl
          refreshing={profile.refreshing}
          onRefresh={profile.doLoad}
        />
      }
    />
  );
}

export default UserSavedPostsScreen;
