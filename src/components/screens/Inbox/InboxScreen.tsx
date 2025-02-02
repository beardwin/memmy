import React, { useEffect } from "react";
import { Text, useTheme, VStack } from "native-base";
import { FlashList } from "@shopify/flash-list";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IconMailOpened } from "tabler-icons-react-native";
import useInbox from "../../../hooks/inbox/useInbox";
import LoadingErrorView from "../../common/Loading/LoadingErrorView";
import LoadingModalTransparent from "../../common/Loading/LoadingModalTransparent";
import InboxTabs from "./InboxTabs";
import LoadingView from "../../common/Loading/LoadingView";
import InboxReplyItem from "./components/InboxReplyItem";
import RefreshControl from "../../common/RefreshControl";
import ILemmyComment from "../../../types/lemmy/ILemmyComment";
import HeaderIconButton from "../../common/Buttons/HeaderIconButton";

function InboxScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) {
  const theme = useTheme();
  const inbox = useInbox();

  useEffect(() => {
    navigation.setOptions({
      // TODO Handle
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <HeaderIconButton
          icon={<IconMailOpened size={24} color={theme.colors.app.accent} />}
          onPress={inbox.doReadAll}
        />
      ),
    });
  }, []);

  const onRefresh = () => {
    inbox.doLoad(true);
  };

  const replyItem = ({ item }: { item: ILemmyComment }) => (
    <InboxReplyItem inbox={inbox} item={item} />
  );

  const onUnreadPress = () => {
    inbox.setTopSelected("unread");
  };
  const onAllPress = () => {
    inbox.setTopSelected("all");
  };
  const onRepliesPress = () => {
    inbox.setBottomSelected("replies");
  };

  const header = (
    <InboxTabs
      onUnreadPress={onUnreadPress}
      onAllPress={onAllPress}
      onRepliesPress={onRepliesPress}
      topSelected={inbox.topSelected}
      bottomSelected={inbox.bottomSelected}
    />
  );

  const empty = (inbox.loading && <LoadingView />) ||
    (inbox.error && (
      <LoadingErrorView onRetryPress={() => inbox.doLoad(true)} />
    )) || (
      <VStack p={4} alignItems="center" justifyContent="center">
        <Text fontStyle="italic">Nothing found in your inbox.</Text>
      </VStack>
    );

  return (
    <VStack flex={1} backgroundColor={theme.colors.app.bg}>
      <LoadingModalTransparent loading={inbox.loading} />
      <FlashList
        renderItem={replyItem}
        data={inbox.items}
        estimatedItemSize={100}
        refreshControl={
          <RefreshControl refreshing={inbox.refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={header}
        ListEmptyComponent={empty}
      />
    </VStack>
  );
}

export default InboxScreen;
