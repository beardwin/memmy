import React from "react";
import { HStack, useTheme } from "native-base";
import { IconBookmark } from "tabler-icons-react-native";
import VoteButton from "../../../../common/Vote/VoteButton";
import IconButtonWithText from "../../../../common/IconButtonWithText";

interface Props {
  vote?: number;
  saved?: boolean;
  onSave: () => void;
  onVotePress: (vote: number) => void;
}
export function Actions({ vote, saved, onSave, onVotePress }: Props) {
  const theme = useTheme();

  const onUpvote = () => {
    onVotePress(vote === 1 ? 0 : 1);
  };

  const onDownvote = () => {
    onVotePress(vote === -1 ? 0 : -1);
  };

  return (
    <HStack space={1} alignItems="center" justifyContent="flex-end">
      <IconButtonWithText
        icon={
          <IconBookmark
            size={25}
            color={
              saved ? theme.colors.app.bookmarkText : theme.colors.app.accent
            }
          />
        }
        iconBgColor={saved ? theme.colors.app.bookmark : theme.colors.app.fg}
        onPressHandler={onSave}
      />
      <VoteButton
        onPressHandler={onUpvote}
        type="upvote"
        isVoted={vote === 1}
        isAccented
      />
      <VoteButton
        onPressHandler={onDownvote}
        type="downvote"
        isVoted={vote === -1}
        isAccented
      />
    </HStack>
  );
}
