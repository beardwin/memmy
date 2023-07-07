import React, { useState } from "react";
import { HStack, Pressable, Text, useTheme, View, VStack } from "native-base";
import { IconChevronRight } from "tabler-icons-react-native";

interface IProps {
  title: string;

  rightAccessory?: any;
  rightAccessoryEnd?: boolean;

  subtitle?: string;

  icon?: any;

  showChevron?: boolean;

  onPress?: () => void | Promise<void>;

  py?: number;
}

function MCell({
  title,
  rightAccessory,
  rightAccessoryEnd = true,
  subtitle,
  icon,
  onPress,
  showChevron = false,
  py,
}: IProps) {
  const theme = useTheme();
  const [pressedIn, setPressedIn] = useState(false);

  const onPressIn = () => setPressedIn(true);
  const onPressOut = () => setPressedIn(false);

  const cell = (
    <VStack space={1} py={py}>
      <HStack alignItems="center" space={2}>
        {icon && icon}
        <VStack>
          <Text fontSize="md">{title}</Text>
          {subtitle && (
            <Text fontSize="xs" color={theme.colors.app.textSecondary}>
              {subtitle}
            </Text>
          )}
        </VStack>
        {(rightAccessory && rightAccessoryEnd && (
          <View ml="auto" alignItems="center">
            {rightAccessory}
          </View>
        )) ||
          (showChevron && (
            <View ml="auto" alignItems="center">
              <IconChevronRight color={theme.colors.app.accent} />
            </View>
          )) ||
          (rightAccessory && <>{rightAccessory}</>)}
      </HStack>
    </VStack>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        opacity={pressedIn ? 0.7 : 1}
      >
        {cell}
      </Pressable>
    );
  }

  return cell;
}

export default React.memo(MCell);